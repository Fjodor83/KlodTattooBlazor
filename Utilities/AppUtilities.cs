namespace KlodTattooBlazor.Utilities;

/// <summary>
/// Utility generiche per l'applicazione
/// </summary>
public static class AppUtilities
{
    /// <summary>
    /// Validazione email
    /// </summary>
    public static bool IsValidEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            return false;

        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }

    /// <summary>
    /// Validazione telefono
    /// </summary>
    public static bool IsValidPhone(string phone)
    {
        if (string.IsNullOrWhiteSpace(phone))
            return false;

        // Accetta solo numeri, spazi, +, -, (, )
        return System.Text.RegularExpressions.Regex.IsMatch(
            phone,
            @"^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$"
        );
    }

    /// <summary>
    /// Converte una data a formato localizato
    /// </summary>
    public static string FormatDate(DateTime date, string locale)
    {
        return locale switch
        {
            "de-DE" => date.ToString("dd.MM.yyyy"),
            "it-IT" => date.ToString("dd/MM/yyyy"),
            "en" => date.ToString("MM/dd/yyyy"),
            _ => date.ToString("yyyy-MM-dd")
        };
    }

    /// <summary>
    /// Ottiene il nome della lingua in base al codice
    /// </summary>
    public static string GetLanguageName(string languageCode)
    {
        return languageCode switch
        {
            "de-DE" => "Deutsch",
            "en" => "English",
            "it-IT" => "Italiano",
            _ => "Unknown"
        };
    }

    /// <summary>
    /// Slug da stringa (per URL)
    /// </summary>
    public static string GenerateSlug(string text)
    {
        if (string.IsNullOrWhiteSpace(text))
            return string.Empty;

        var normalizedString = text.Normalize(System.Text.NormalizationForm.FormD);
        var stringBuilder = new System.Text.StringBuilder();

        foreach (var c in normalizedString)
        {
            var unicodeCategory = System.Globalization.CharUnicodeInfo.GetUnicodeCategory(c);
            if (unicodeCategory != System.Globalization.UnicodeCategory.NonSpacingMark)
            {
                stringBuilder.Append(c);
            }
        }

        var slug = stringBuilder.ToString().Normalize(System.Text.NormalizationForm.FormC);
        slug = System.Text.RegularExpressions.Regex.Replace(slug, @"[^a-z0-9\s-]", "", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
        slug = System.Text.RegularExpressions.Regex.Replace(slug, @"[\s-]+", "-").Trim('-');

        return slug.ToLowerInvariant();
    }
}
