using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tracker.DTOs;
using Tracker.Models;
using Tracker.Services;

namespace Tracker.Controllers;

[Route("api/[controller]")]
[ApiController]
public class WorkRequestsController(IWorkRequestService service) : ControllerBase
{
    private readonly IWorkRequestService _service = service;

    [HttpGet]
    public async Task<ActionResult<WorkRequestListResponse>> GetAll(
        [FromQuery] string? status,
        [FromQuery] string? search,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10
    )
    {
        if (page < 1) page = 1;

        if (pageSize < 1 || pageSize > 100) pageSize = 10;

        var result = await _service.GetAll(status, search, page, pageSize);

        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<WorkRequestDto>> GetById(Guid id)
    {
        var item = await _service.GetById(id);

        if (item != null)
            return Ok(item);

        return NotFound(new ApiErrorResponse
        {
            Status = 404,
            Message = "Work request not found",
            Errors = [$"No work request with id {id}"]
        });
    }

    [HttpPost]
    public async Task<ActionResult<WorkRequestDto>> Create([FromBody] CreateWorkRequestDto dto)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();

            return BadRequest(new ApiErrorResponse
            {
                Status = 400,
                Message = "Validation failed",
                Errors = errors
            });
        }


        if (!Enum.IsDefined(dto.Priority))
            return BadRequest(new ApiErrorResponse
            {
                Status = 400,
                Message = "Invalid priority",
                Errors = ["Priority must be Low, Medium or High"]
            });

        if (!Enum.IsDefined(dto.Status))
            return BadRequest(new ApiErrorResponse
            {
                Status = 400,
                Message = "Invalid status",
                Errors = ["Status must be New, InProgress, Blocked or Completed"]
            });

        var created = await _service.Create(dto);

        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPatch("{id:guid}/status")]
    public async Task<ActionResult<WorkRequestDto>> UpdateStatus(Guid id, [FromBody] UpdateStatusDto dto)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();

            return BadRequest(new ApiErrorResponse
            {
                Status = 400,
                Message = "Validation failed",
                Errors = errors
            });
        }

        if (!Enum.IsDefined(typeof(Status), dto.Status))
            return BadRequest(new ApiErrorResponse
            {
                Status = 400,
                Message = "Invalid status",
                Errors = ["Status must be New, InProgress, Blocked or Completed"]
            });

        var updated = await _service.UpdateStatus(id, dto.Status);

        if (updated == null)
            return NotFound(new ApiErrorResponse
            {
                Status = 404,
                Message = "Work request not found",
                Errors = [$"No work request with id {id}"]
            });

        return Ok(updated);
    }

    [HttpPost("{id:guid}/notes")]
    public async Task<ActionResult<WorkRequestDto>> AddNote(Guid id, [FromBody] AddNoteDto dto)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();

            return BadRequest(new ApiErrorResponse
            {
                Status = 400,
                Message = "Validation failed",
                Errors = errors
            });
        }

        var updated = await _service.AddNote(id, dto.Note);

        if (updated == null)
        return NotFound(new ApiErrorResponse
        {
            Status = 404,
            Message = "Work request not found",
            Errors = [$"No work request with id {id}"]
        });

        return Ok(updated);
    }
}

