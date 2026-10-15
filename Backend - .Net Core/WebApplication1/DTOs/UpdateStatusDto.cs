using System.ComponentModel.DataAnnotations;
using Tracker.Models;

namespace Tracker.DTOs;

public class UpdateStatusDto
{
    [Required(ErrorMessage = "Status is required")]
    public Status Status { get; set; }
}
