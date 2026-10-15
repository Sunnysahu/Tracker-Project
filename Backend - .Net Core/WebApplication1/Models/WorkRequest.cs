using System.ComponentModel.DataAnnotations;

namespace Tracker.Models;

public class WorkRequest
{
    [Key]
    public Guid Id { get; set; }

    [Required, MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required, MaxLength(150)]
    public string ClientName { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string? Description { get; set; }

    [Required, MaxLength(20)]
    public string Priority { get; set; } = string.Empty;   

    [Required, MaxLength(20)]
    public string Status { get; set; } = string.Empty;   

    [Required]
    public DateOnly DueDate { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime UpdatedDate { get; set; }

    public string? Notes { get; set; }
}