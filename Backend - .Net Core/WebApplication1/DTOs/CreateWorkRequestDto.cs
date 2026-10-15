using System.ComponentModel.DataAnnotations;
using Tracker.Models;

namespace Tracker.DTOs;

public class CreateWorkRequestDto
{
    [Required(ErrorMessage = "Title is required")]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;


    [Required(ErrorMessage = "Client name is required")]
    [MaxLength(150)]

    public string ClientName { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string? Description { get; set; }


    [Required(ErrorMessage = "Priority is required")]
    public Priority Priority { get; set; }

    [Required(ErrorMessage = "Status is required")]

    public Status Status { get; set; }

    [Required(ErrorMessage = "Due date is required")]

    public DateOnly DueDate { get; set; }

    public string? Notes { get; set; }
}