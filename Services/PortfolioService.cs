using System.Net.Http.Json;
using KlodTattooBlazor.Models;

namespace KlodTattooBlazor.Services;

public class PortfolioService
{
    private readonly HttpClient _http;
    private PortfolioData? _cachedData;

    public PortfolioService(HttpClient http)
    {
        _http = http;
    }

    public async Task<List<PortfolioItem>> GetAllItemsAsync()
    {
        await EnsureDataLoadedAsync();
        return _cachedData?.PortfolioItems ?? new List<PortfolioItem>();
    }

    public async Task<List<PortfolioItem>> GetItemsByStyleAsync(string styleName)
    {
        var allItems = await GetAllItemsAsync();
        return allItems
            .Where(p => p.TattooStyle != null && p.TattooStyle.Name == styleName)
            .ToList();
    }

    public async Task<PortfolioItem?> GetItemByIdAsync(int id)
    {
        var allItems = await GetAllItemsAsync();
        return allItems.FirstOrDefault(p => p.Id == id);
    }

    public async Task<List<string>> GetAllStylesAsync()
    {
        await EnsureDataLoadedAsync();
        return _cachedData?.TattooStyles.Select(s => s.Name).ToList() ?? new List<string>();
    }

    private async Task EnsureDataLoadedAsync()
    {
        if (_cachedData == null)
        {
            _cachedData = await _http.GetFromJsonAsync<PortfolioData>("data/portfolio.json");
        }
    }
}
