namespace KlodTattooBlazor.Models;

public class PortfolioData
{
    public List<TattooStyle> TattooStyles { get; set; } = new();
    public List<PortfolioItem> PortfolioItems { get; set; } = new();
}
