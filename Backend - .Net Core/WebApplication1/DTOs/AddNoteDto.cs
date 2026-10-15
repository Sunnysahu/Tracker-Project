using System.ComponentModel.DataAnnotations;

namespace Tracker.DTOs;

public class AddNoteDto
{
    [Required(ErrorMessage = "Note is required")]
    [MinLength(1)]
    public string Note { get; set; } = string.Empty;
}