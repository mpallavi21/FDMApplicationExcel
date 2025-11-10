@echo off
setlocal

echo Checking for running TestExecute instances...

:: Kill any running TestExecute-related processes
for %%P in (TestExecute.exe TCHookX86.exe TestCompleteService15.exe) do (
    taskkill /F /IM %%P >nul 2>&1
    wmic process where "name='%%P'" delete >nul 2>&1
)

:: Wait briefly to ensure cleanup
timeout /t 3 >nul

:: Validate project path
set "PJS_PATH=%USERPROFILE%\Desktop\JSFDM\JSFDM\JSFDM.pjs"
if not exist "%PJS_PATH%" (
    echo Project file not found: %PJS_PATH%
    exit /b
)

echo Launching TestExecute...
"%ProgramFiles(x86)%\SmartBear\TestExecute 15\Bin\TestExecute.exe" "%PJS_PATH%" /r /p:JSFDM /DoNotOpenLog /ExportLog:"%USERPROFILE%\Desktop\JSFDM\execution_log.mht"

exit
