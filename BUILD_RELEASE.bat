@echo off
REM Klod Tattoo Blazor - Script di Build Produzione
REM Questo script crea una build ottimizzata per la produzione

echo.
echo ====================================
echo   KLOD TATTOO BLAZOR - BUILD PROD
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

REM Pulisce build precedenti
echo [1/4] Pulizia build precedenti...
dotnet clean -c Release >nul 2>&1

REM Ripristina le dipendenze
echo [2/4] Ripristino dipendenze...
dotnet restore
if %errorlevel% neq 0 (
    echo ERRORE: Ripristino dipendenze fallito
    pause
    exit /b 1
)

REM Esegue la build di produzione
echo [3/4] Build ottimizzata in corso...
dotnet publish -c Release
if %errorlevel% neq 0 (
    echo ERRORE: Build fallita
    pause
    exit /b 1
)

REM Completa
echo.
echo [4/4] Build completata!
echo.
echo Build disponibile in: bin\Release\net8.0\publish
echo.

pause
