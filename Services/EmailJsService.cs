using Microsoft.JSInterop;
using KlodTattooBlazor.Models;
using System.Text.Json;

namespace KlodTattooBlazor.Services;

public class EmailJsService
{
    private readonly IJSRuntime _jsRuntime;
    private readonly EmailJsSettings _settings;

    public EmailJsService(IJSRuntime jsRuntime, EmailJsSettings settings)
    {
        _jsRuntime = jsRuntime;
        _settings = settings;
    }

    public async Task<bool> SendBookingEmailAsync(BookingRequest request)
    {
        try
        {
            var templateParams = new
            {
                client_name = request.ClientName,
                client_email = request.Email,
                body_part = request.BodyPart,
                idea_description = request.IdeaDescription,
                preferred_date = request.PreferredDate.ToString("dd/MM/yyyy")
            };

            var result = await _jsRuntime.InvokeAsync<string>(
                "emailjs.send",
                _settings.ServiceId,
                _settings.TemplateIdBooking,
                templateParams,
                _settings.PublicKey
            );

            return !string.IsNullOrEmpty(result);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error sending email: {ex.Message}");
            return false;
        }
    }

    public async Task<bool> SendContactEmailAsync(string name, string email, string message)
    {
        try
        {
            var templateParams = new
            {
                from_name = name,
                from_email = email,
                message = message
            };

            var result = await _jsRuntime.InvokeAsync<string>(
                "emailjs.send",
                _settings.ServiceId,
                _settings.TemplateIdContact,
                templateParams,
                _settings.PublicKey
            );

            return !string.IsNullOrEmpty(result);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error sending contact email: {ex.Message}");
            return false;
        }
    }
}
