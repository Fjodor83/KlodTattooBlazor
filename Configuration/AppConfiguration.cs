namespace KlodTattooBlazor.Configuration;

/// <summary>
/// Configurazione globale dell'applicazione Klod Tattoo Blazor
/// </summary>
public static class AppConfiguration
{
    /// <summary>
    /// Titolo dell'applicazione
    /// </summary>
    public const string AppTitle = "Klod Tattoo Studio";

    /// <summary>
    /// Descrizione dell'applicazione
    /// </summary>
    public const string AppDescription = "Professionelles Tattoo-Studio in Obernburg am Main. Spezialisiert auf Realismus, Traditional und Blackwork.";

    /// <summary>
    /// URL base dell'applicazione
    /// </summary>
    public const string BaseUrl = "/";

    /// <summary>
    /// Colore tema principale (oro)
    /// </summary>
    public const string ThemeColor = "#d4af37";

    /// <summary>
    /// Impostazioni EmailJS
    /// </summary>
    public static class EmailJs
    {
        /// <summary>
        /// ID del servizio EmailJS - IMPORTANTE: Inserire il valore effettivo!
        /// </summary>
        public const string ServiceId = "service_xxxxxxx";

        /// <summary>
        /// ID template per i booking - IMPORTANTE: Inserire il valore effettivo!
        /// </summary>
        public const string TemplateIdBooking = "template_booking";

        /// <summary>
        /// ID template per i contatti - IMPORTANTE: Inserire il valore effettivo!
        /// </summary>
        public const string TemplateIdContact = "template_contact";

        /// <summary>
        /// Chiave pubblica EmailJS - IMPORTANTE: Inserire il valore effettivo!
        /// </summary>
        public const string PublicKey = "your_public_key_here";
    }

    /// <summary>
    /// Lingue supportate
    /// </summary>
    public static class Languages
    {
        public const string DE = "de-DE";
        public const string EN = "en";
        public const string IT = "it-IT";
    }

    /// <summary>
    /// Stili di tatuaggio supportati
    /// </summary>
    public static class TattooStyles
    {
        public const string Realistic = "realistic";
        public const string Traditional = "traditional";
        public const string Blackwork = "blackwork";
        public const string Cartoons = "cartoons";
       
    }
}
