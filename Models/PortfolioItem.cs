using System.ComponentModel.DataAnnotations;

namespace KlodTattooBlazor.Models;

public class PortfolioItem
{
    public int Id { get; set; }

    [Required]
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    [Required]
    public string ImageUrl { get; set; } = string.Empty;

    public int? TattooStyleId { get; set; }
    
    public TattooStyle? TattooStyle { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
}
