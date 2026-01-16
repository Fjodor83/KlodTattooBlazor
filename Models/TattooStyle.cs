using System.ComponentModel.DataAnnotations;

namespace KlodTattooBlazor.Models;

public class TattooStyle
{
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    public List<PortfolioItem> PortfolioItems { get; set; } = new();
}
