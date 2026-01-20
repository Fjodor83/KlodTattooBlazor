using KlodTattooBlazor;
using KlodTattooBlazor.Configuration;
using KlodTattooBlazor.Models;
using KlodTattooBlazor.Services;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Blazored.LocalStorage;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

// ===== CONFIGURAZIONE SERVIZI =====

// HttpClient for loading JSON data
builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

// Local Storage
builder.Services.AddBlazoredLocalStorage();

// EmailJS Settings - Utilizza la configurazione centralizzata
builder.Services.AddScoped<EmailJsSettings>(sp => new EmailJsSettings
{
    ServiceId = AppConfiguration.EmailJs.ServiceId,
    TemplateIdBooking = AppConfiguration.EmailJs.TemplateIdBooking,
    TemplateIdContact = AppConfiguration.EmailJs.TemplateIdContact,
    PublicKey = AppConfiguration.EmailJs.PublicKey
});

// Application Services
builder.Services.AddScoped<PortfolioService>();
builder.Services.AddScoped<EmailJsService>();
builder.Services.AddScoped<LocalizationService>();

// ===== BUILD E INIZIALIZZAZIONE =====

var host = builder.Build();

// Initialize localization on app startup
var localizationService = host.Services.GetRequiredService<LocalizationService>();
await localizationService.InitializeAsync();

// Run the application
await host.RunAsync();
