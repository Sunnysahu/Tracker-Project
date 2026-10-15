namespace Tracker.DTOs;

public class WorkRequestListResponse
{
    public List<WorkRequestDto> Items { get; set; } = new();
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
}