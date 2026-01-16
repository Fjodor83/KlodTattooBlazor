using Blazored.LocalStorage;
using System.Globalization;
using System.Net.Http.Json;

namespace KlodTattooBlazor.Services;

public class LocalizationService
{
    private readonly ILocalStorageService _localStorage;
    private readonly HttpClient _http;
    private Dictionary<string, Dictionary<string, string>> _localizations = new();
    private string _currentCulture = "de-DE";
    private const string CULTURE_KEY = "app_culture";

    public event Action? OnCultureChanged;

    public LocalizationService(ILocalStorageService localStorage, HttpClient http)
    {
        _localStorage = localStorage;
        _http = http;
    }

    public async Task InitializeAsync()
    {
        var savedCulture = await _localStorage.GetItemAsync<string>(CULTURE_KEY);
        _currentCulture = savedCulture ?? "de-DE";
        await LoadLocalizationAsync(_currentCulture);
    }

    public async Task SetCultureAsync(string culture)
    {
        if (_currentCulture == culture) return;

        _currentCulture = culture;
        await _localStorage.SetItemAsync(CULTURE_KEY, culture);
        await LoadLocalizationAsync(culture);
        
        CultureInfo.CurrentCulture = new CultureInfo(culture);
        CultureInfo.CurrentUICulture = new CultureInfo(culture);
        
        OnCultureChanged?.Invoke();
    }

    public string GetString(string key)
    {
        if (_localizations.TryGetValue(_currentCulture, out var dict) && 
            dict.TryGetValue(key, out var value))
        {
            return value;
        }
        return key; // Return key if not found
    }

    public string this[string key] => GetString(key);

    public string CurrentCulture => _currentCulture;

    public List<string> SupportedCultures => new() { "de-DE", "it-IT", "en" };

    private async Task LoadLocalizationAsync(string culture)
    {
        if (_localizations.ContainsKey(culture)) return;

        try
        {
            var data = await _http.GetFromJsonAsync<Dictionary<string, string>>($"localization/{culture}.json");
            if (data != null)
            {
                _localizations[culture] = data;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error loading localization for {culture}: {ex.Message}");
        }
    }
}
