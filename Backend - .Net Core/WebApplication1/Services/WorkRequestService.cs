using Microsoft.EntityFrameworkCore;
using Tracker.Data;
using Tracker.DTOs;
using Tracker.Models;

namespace Tracker.Services;

public class WorkRequestService(AppDbContext db) : IWorkRequestService
{
    private readonly AppDbContext _db = db;

    public async Task<WorkRequestListResponse> GetAll(string? status, string? search, int page, int pageSize)
    {
        var query = _db.WorkRequests.AsQueryable();

        if (!string.IsNullOrWhiteSpace(status))
            query = query.Where(x => x.Status == status);

        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.Trim().ToLower();
            query = query.Where(x =>
                x.Title.ToLower().Contains(s) ||
                x.ClientName.ToLower().Contains(s));
        }

        var total = await query.CountAsync();

        var items = await query
            .OrderByDescending(x => x.CreatedDate)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(x => MapToDto(x))
            .ToListAsync();

        return new WorkRequestListResponse
        {
            Items = items,
            TotalCount = total,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<WorkRequestDto?> GetById(Guid id)
    {
        var item = await _db.WorkRequests.FindAsync(id);
        return item == null ? null : MapToDto(item);
    }

    public async Task<WorkRequestDto> Create(CreateWorkRequestDto dto)
    {
        var entity = new WorkRequest
        {
            Id = Guid.NewGuid(),
            Title = dto.Title.Trim(),
            ClientName = dto.ClientName.Trim(),
            Description = dto.Description?.Trim(),
            Priority = dto.Priority.ToString(),
            Status = dto.Status.ToString(),
            DueDate = dto.DueDate,
            CreatedDate = DateTime.UtcNow,
            UpdatedDate = DateTime.UtcNow,
            Notes = dto.Notes?.Trim()
        };

        _db.WorkRequests.Add(entity);
        await _db.SaveChangesAsync();

        return MapToDto(entity);
    }

    public async Task<WorkRequestDto?> UpdateStatus(Guid id, Status status)
    {
        var item = await _db.WorkRequests.FindAsync(id);
        if (item == null) return null;

        item.Status = status.ToString();
        item.UpdatedDate = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        return MapToDto(item);
    }

    public async Task<WorkRequestDto?> AddNote(Guid id, string note)
    {
        var item = await _db.WorkRequests.FindAsync(id);
        if (item == null) return null;

        item.Notes = string.IsNullOrWhiteSpace(item.Notes)
            ? note.Trim()
            : item.Notes + "\n" + note.Trim();

        item.UpdatedDate = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        return MapToDto(item);
    }

    private static WorkRequestDto MapToDto(WorkRequest e) => new()
    {
        Id = e.Id,
        Title = e.Title,
        ClientName = e.ClientName,
        Description = e.Description,
        Priority = e.Priority,
        Status = e.Status,
        DueDate = e.DueDate,
        CreatedDate = e.CreatedDate,
        UpdatedDate = e.UpdatedDate,
        Notes = e.Notes
    };
}