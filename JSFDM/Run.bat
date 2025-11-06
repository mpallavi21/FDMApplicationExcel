@echo off
echo Checking for running TestExecute instances...

:: Kill any running TestExecute instance
taskkill /F /IM TestExecute.exe >nul 2>&1
taskkill /F /IM TCHookX86.exe >nul 2>&1
taskkill /F /IM TestCompleteService15.exe >nul 2>&1
wmic process where "name='TestExecute.exe'" delete >nul 2>&1
wmic process where "name='TCHookX86.exe'" delete >nul 2>&1
wmic process where "name='TestCompleteService15.exe'" delete >nul 2>&1

:: Wait briefly to ensure cleanup
timeout /t 3 >nul

echo Launch TestExecute
TestExecute.exe "%USERPROFILE%\Desktop\JSFDM\JSFDM\JSFDM.pjs" /r /p:JSFDM /DoNotOpenLog

