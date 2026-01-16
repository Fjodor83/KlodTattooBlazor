using KlodTattooBlazor;
using KlodTattooBlazor.Models;
using KlodTattooBlazor.Services;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Blazored.LocalStorage;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

// HttpClient for loading JSON data
builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

// Local Storage
builder.Services.AddBlazoredLocalStorage();

// EmailJS Settings (will be loaded from appsettings.json or hardcoded)
builder.Services.AddScoped<EmailJsSettings>(sp => new EmailJsSettings
{
    ServiceId = "service_xxxxxxx", // User will replace this
    TemplateIdBooking = "template_booking",
    TemplateIdContact = "template_contact",
    PublicKey = "your_public_key_here"
});

// Services
builder.Services.AddScoped<PortfolioService>();
builder.Services.AddScoped<EmailJsService>();
builder.Services.AddScoped<LocalizationService>();

var host = builder.Build();

// Initialize localization
var localizationService = host.Services.GetRequiredService<LocalizationService>();
await localizationService.InitializeAsync();

await host.RunAsync();
