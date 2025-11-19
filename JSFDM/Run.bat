@echo off
setlocal EnableDelayedExpansion

:: === CONFIGURATION ===
set "PJS_PATH=%USERPROFILE%\Desktop\JSFDM\JSFDM\JSFDM.pjs"
set "PROJECT_NAME=JSFDM"
set "LOG_DIR=%USERPROFILE%\Desktop\JSFDM\Logs"
set "LOG_EXPORT=%LOG_DIR%\JSFDM_Log.html"
set "SUMMARY_EXPORT=%LOG_DIR%\JSFDM_Summary.xml"
set "ERROR_LOG=%LOG_DIR%\JSFDM_Errors.txt"
set "TE_PATH=C:\Program Files (x86)\SmartBear\TestExecute 15\Bin\TestExecute.exe"

:: === VALIDATE PATHS ===
if not exist "%PJS_PATH%" (
    echo ERROR: Project suite not found at "%PJS_PATH%"
    exit /b 1
)

if not exist "%TE_PATH%" (
    echo ERROR: TestExecute not found at "%TE_PATH%"
    exit /b 1
)

if not exist "%LOG_DIR%" (
    mkdir "%LOG_DIR%"
)

:: === ELEVATE PRIVILEGES ===
:: Check for admin rights
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo Requesting administrator privileges...
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

:: === EXECUTE TESTS ===
echo Starting TestExecute run at %DATE% %TIME% >> "%LOG_DIR%\runlog.txt"

start /wait "" "%TE_PATH%" ^
"%PJS_PATH%" /run /exit /SilentMode /DoNotShowLog ^
/p:"%PROJECT_NAME%" ^
/ExportLog:"%LOG_EXPORT%" /ExportSummary:"%SUMMARY_EXPORT%" /ErrorLog:"%ERROR_LOG%" >> "%LOG_DIR%\runlog.txt" 2>&1

echo Completed TestExecute run at %DATE% %TIME% >> "%LOG_DIR%\runlog.txt"

:: === EXIT CODE HANDLING ===
if %ERRORLEVEL% EQU 0 (
    echo TestExecute completed successfully.
) else (
    echo TestExecute failed with exit code %ERRORLEVEL%.
)

endlocal
