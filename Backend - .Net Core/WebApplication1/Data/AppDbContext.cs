using Microsoft.EntityFrameworkCore;
using Tracker.Models;

namespace Tracker.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<WorkRequest> WorkRequests { get; set; }
}