namespace Tracker.DTOs;

public class WorkRequestDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string ClientName { get; set; } = string.Empty;

    public string? Description { get; set; }
    public string Priority { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;
    public DateOnly DueDate { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    
    public string? Notes { get; set; }
}