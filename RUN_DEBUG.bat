@echo off
REM Klod Tattoo Blazor - Script di Avvio Locale
REM Questo script avvia l'applicazione in modalità debug

echo.
echo ====================================
echo   KLOD TATTOO BLAZOR - AVVIO
echo ====================================
echo.

REM Verifica se .NET è installato
dotnet --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRORE: .NET SDK non è installato
    echo Scaricarlo da: https://dotnet.microsoft.com/download
    pause
    exit /b 1
)

REM Naviga nella cartella corretta
cd /d "%~dp0"

REM Ripristina le dipendenze
echo [1/3] Ripristino dipendenze...
dotnet restore
if %errorlevel% neq 0 (
    echo ERRORE: Ripristino dipendenze fallito
    pause
    exit /b 1
)

REM Avvia l'app
echo.
echo [2/3] Compilazione in corso...
echo [3/3] Avvio applicazione...
echo.
echo Collegati a: http://localhost:5000
echo.
echo Premi Ctrl+C per fermare il server
echo.

dotnet watch run

pause
