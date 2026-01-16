using System.ComponentModel.DataAnnotations;

namespace KlodTattooBlazor.Models;

public class BookingRequest
{
    [Required(ErrorMessage = "Il nome è obbligatorio")]
    public string ClientName { get; set; } = string.Empty;

    [Required(ErrorMessage = "L'email è obbligatoria")]
    [EmailAddress(ErrorMessage = "Email non valida")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "La parte del corpo è obbligatoria")]
    public string BodyPart { get; set; } = string.Empty;

    [Required(ErrorMessage = "La descrizione dell'idea è obbligatoria")]
    public string IdeaDescription { get; set; } = string.Empty;

    [Required(ErrorMessage = "La data preferita è obbligatoria")]
    public DateTime PreferredDate { get; set; } = DateTime.Now.AddDays(7);
}
