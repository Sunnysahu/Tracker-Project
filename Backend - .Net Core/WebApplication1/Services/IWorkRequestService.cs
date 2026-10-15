using Tracker.DTOs;
using Tracker.Models;

namespace Tracker.Services;

public interface IWorkRequestService
{
    Task<WorkRequestListResponse> GetAll(string? status, string? search, int page, int pageSize);
    Task<WorkRequestDto?> GetById(Guid id);
    Task<WorkRequestDto> Create(CreateWorkRequestDto dto);
    Task<WorkRequestDto?> UpdateStatus(Guid id, Status status);
    Task<WorkRequestDto?> AddNote(Guid id, string note);
}
