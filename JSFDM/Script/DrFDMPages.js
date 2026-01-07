//USEUNIT STDLib

// =====================================================================
// Author:        Bharath
// Function:      launchDRFDM
// Description:   Terminates existing DR FDM if running, then launches via TestedApps.
// Created On:    30-Jul-2025
// Modified On:   30-Jul-2025
// =====================================================================

function launchDRFDM() {
  Log.AppendFolder("launchDRFDM - Terminate & Launch DR FDM");

  try {
    
    let process = Sys.WaitProcess("Dr.FDCM",3000); // Wait for up to 3 seconds

    if (process.Exists) {
      Log.Message("DR FDM application is running. Terminating process...");
      process.Terminate();
      Log.Message("DR FDM process terminated successfully.");
    } 
    
    Log.Message("Launching DR FDM application...");
    TestedApps.Dr_FDCM.Run();
    
    let mainForm = Aliases.Dr_FDCM.Form1;
    
    // Wait for main form to confirm launch
    if (mainForm.WaitProperty("Exists", true, 30000)) {
      Log.Message("DR FDM launched successfully.");
    } else {
      Log.Warning("DR FDM launch timed out or failed.");
    }

  } catch (error) {
    Log.Error("Exception during DR FDM launch sequence: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}



// =====================================================================
// Author:        Bharath
// Function:      setServiceControlCheckbox
// Description:   Checks the Servicecontrolrb checkbox only if it's unchecked.
// Created On:    30-Jul-2025
// Modified On:   30-Jul-2025
// =====================================================================

function setServiceControlCheckbox() {
  Log.AppendFolder("setServiceControlCheckbox - Ensure Checkbox Checked");

  try {
    let checkbox = Aliases.Dr_FDCM.Form1.WinFormsObject("Servicecontrolrb");

    if (!checkbox.Exists) {
      Log.Error("Servicecontrolrb checkbox not found.");
      return;
    }

    if (!checkbox.wChecked) {
      Log.Message("Checkbox is unchecked. Checking it...");
      checkbox.Click(); // Check it
    } else {
      Log.Message("Checkbox is already checked. No action needed.");
    }

  } catch (error) {
    Log.Error("Exception while checking Servicecontrolrb: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      setCollectLogsCheckbox
// Description:   Sets the Collectlogsrb checkbox to a desired state:
//                checked (true) or unchecked (false).
// Parameters:    shouldCheck - Boolean indicating desired checked state
// Created On:    30-Jul-2025
// Modified On:   30-Jul-2025
// =====================================================================

function setCollectLogsCheckbox() {
  Log.AppendFolder("setCollectLogsCheckbox - Set Collect Logs State");

  try {
    let checkbox = Aliases.Dr_FDCM.Form1.WinFormsObject("Collectlogsrb");

    if (!checkbox.Exists) {
      Log.Error("Collectlogsrb checkbox not found.");
      return;
    }

    if (!checkbox.wChecked) {
      Log.Message("Checkbox is unchecked. Checking it...");
      checkbox.Click(); // Check it
    } else {
      Log.Message("Checkbox is already checked. No action needed.");
    }

  } catch (error) {
    Log.Error("Exception in setCollectLogsCheckbox: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      clickOkayIfEnabled
// Description:   Verifies if the "okay" button is enabled and clicks it.
// Created On:    30-Jul-2025
// Modified On:   30-Jul-2025
// =====================================================================

function clickOkayIfEnabled() {
  Log.AppendFolder("clickOkayIfEnabled - Check and Click OK Button");

  try {
    let okButton = Aliases.Dr_FDCM.Form1.WinFormsObject("okay");

    if (!okButton.Exists) {
      Log.Error("OK button not found.");
      return;
    }

    if (okButton.Enabled) {
      Log.Message("OK button is enabled. Clicking it...");
      okButton.Click();
    } else {
      Log.Warning("OK button is disabled. Cannot click.");
    }

  } catch (error) {
    Log.Error("Exception while trying to click OK button: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      clickCancelIfEnabled
// Description:   Verifies if the "CANCEL" button is enabled and clicks it.
// Created On:    30-Jul-2025
// Modified On:   30-Jul-2025
// =====================================================================

function clickCancelIfEnabled() {
  Log.AppendFolder("clickCancelIfEnabled - Check and Click CANCEL Button");

  try {
    let cancelButton = Aliases.Dr_FDCM.Form1.WinFormsObject("CANCEL");

    if (!cancelButton.Exists) {
      Log.Error("CANCEL button not found.");
      return;
    }

    if (cancelButton.Enabled) {
      Log.Message("CANCEL button is enabled. Clicking it...");
      cancelButton.Click();
    } else {
      Log.Warning("CANCEL button is disabled. Cannot click.");
    }

  } catch (error) {
    Log.Error("Exception while trying to click CANCEL button: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      bringFDMServicesFormToFront
// Description:   Checks if FDMservicesForm exists, and brings it to front.
// Created On:    30-Jul-2025
// Modified On:   30-Jul-2025
// =====================================================================

function bringFDMServicesFormToFront() {
  Log.AppendFolder("bringFDMServicesFormToFront - Check & Activate Form");

  try {
    let form = Aliases.Dr_FDCM.WinFormsObject("FDMservicesForm");

    if (!form.Exists) {
      Log.Error("FDMservicesForm not found.");
      return;
    }

    Log.Message("FDMservicesForm exists. Bringing it to front...");
    form.Activate(); // Brings the form to foreground

  } catch (error) {
    Log.Error("Error while activating FDMservicesForm: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      clickStartButton
// Description:   Clicks the Start button inside the FDMservicesForm.
// Created On:    30-Jul-2025
// Modified On:   30-Jul-2025
// =====================================================================

function clickStartButton() {
  Log.AppendFolder("clickStartButton - Interact with Start Button");

  try {
    let startButton = Aliases.Dr_FDCM.WinFormsObject("FDMservicesForm").WinFormsObject("Startbtn");

    if (!startButton.Exists) {
      Log.Error("Start button not found in FDMservicesForm.");
      return;
    }

    if (startButton.Enabled) {
      Log.Message("Start button is enabled. Clicking it...");
      startButton.Click();
    } else {
      Log.Warning("Start button is disabled. Cannot click.");
    }
    
    Delay(40000,"waiting for start services")

  } catch (error) {
    Log.Error("Exception while clicking Start button: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      clickStopButton
// Description:   Clicks the Stop button inside the FDMservicesForm.
// Created On:    30-Jul-2025
// Modified On:   30-Jul-2025
// =====================================================================

function clickStopButton() {
  Log.AppendFolder("clickStopButton - Interact with Stop Button");

  try {
    let stopButton = Aliases.Dr_FDCM.WinFormsObject("FDMservicesForm").WinFormsObject("Stopbtn");

    if (!stopButton.Exists) {
      Log.Error("Stop button not found in FDMservicesForm.");
      return;
    }

    if (stopButton.Enabled) {
      Log.Message("Stop button is enabled. Clicking it...");
      stopButton.Click();
    } else {
      Log.Warning("Stop button is disabled. Cannot click.");
    }
    
    Delay(30000,"waiting for stop services")

  } catch (error) {
    Log.Error("Exception while clicking Stop button: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      bringFinalFormToFront
// Description:   Checks if FinalForm exists and brings it to the front.
// Created On:    30-Jul-2025
// Modified On:   30-Jul-2025
// =====================================================================

function bringFinalFormToFront() {
  Log.AppendFolder("bringFinalFormToFront - Check & Activate FinalForm");

  try {
    let form = Aliases.Dr_FDCM.WinFormsObject("FinalForm");

    if (!form.Exists) {
      Log.Error("FinalForm not found.");
      return;
    }

    Log.Message("FinalForm exists. Activating it...");
    form.Activate(); // Brings the form to foreground

  } catch (error) {
    Log.Error("Error while activating FinalForm: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      checkCollectAndProceedToFinalForm
// Description:   Ensures Collectlogsrb is checked, clicks OK, waits for FinalForm.
// Created On:    30-Jul-2025
// Modified On:   30-Jul-2025
// =====================================================================

function checkCollectAndProceedToFinalForm() {
  Log.AppendFolder("checkCollectAndProceedToFinalForm - Collect Logs Flow");

  try {
    //launch DR FDM
    launchDRFDM()

    // Step 1: Check Collectlogsrb if not already checked
    setCollectLogsCheckbox()

    // Step 2: Click OK button
    clickOkayIfEnabled()

    // Step 3: Wait for FinalForm to appear and activate
    let maxWaitTime = 60000; // 60 seconds
    let interval = 500;
    let waited = 0;
    let t0 = aqDateTime.Now();
    
    while (waited < maxWaitTime) {
      let finalForm = Aliases.Dr_FDCM.FinalForm;
      if (finalForm.Exists) {
        Log.Message("FinalForm detected. Activating it...");
        finalForm.Activate();
        let logOutput = Aliases.Dr_FDCM.FinalForm.WinFormsObject("LogOutputLocation");
        

        if (!logOutput.Exists) {
          Log.Error("LogOutputLocation control not found.");
          return;
        }
        
        let t1 = aqDateTime.Now();
        Log.Message("Logout form appeared at: " + aqConvert.DateTimeToFormatStr(t1, "%H:%M:%S.%zzz"));
        let duration  = aqDateTime.TimeInterval(t0,t1)
        
        Log.Message("Time taken between OK click and logout form appearing: " + aqConvert.DateTimeToFormatStr(duration, "%H:%M:%S.%zzz") + " seconds");
        
        let caption = logOutput.WndCaption;
        Log.Message("LogOutputLocation caption: " + caption);
        break;
      }
      Delay(interval);
      waited += interval;
    }

    if (waited >= maxWaitTime) {
      Log.Warning("FinalForm did not appear within the expected time.");
    }
    
    terminateDRFDM()

  } catch (error) {
    Log.Error("Exception in checkCollectAndProceedToFinalForm: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      terminateDRFDM
// Description:   Checks if the DR FDM process is running and terminates it.
// Created On:    30-Jul-2025
// Modified On:   30-Jul-2025
// =====================================================================

function terminateDRFDM() {
  Log.AppendFolder("ensureDRFDMClosed - Terminate DR FDM if running");

  try {
    let process = Sys.WaitProcess("Dr.FDCM",3000); // Wait for up to 3 seconds

    if (process.Exists) {
      Log.Message("DR FDM application is running. Terminating process...");
      process.Terminate();
      Log.Message("DR FDM process terminated successfully.");
    } 

  } catch (error) {
    Log.Error("Exception while checking or terminating DR FDM: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}



function startServices() {
  Log.AppendFolder("startServices - DR FDM Full Startup");

  try {
    launchDRFDM();
    Log.Message("DR FDM launched.");

    setCollectLogsCheckbox(true);
    Log.Message("Collect logs checkbox set.");

    setServiceControlCheckbox();
    Log.Message("Service control checkbox set.");

    clickOkayIfEnabled();
    Log.Message("OK button clicked.");

    bringFDMServicesFormToFront();
    Log.Message("Service form activated.");

    clickStartButton();
    Log.Message("Start button clicked.");

  } catch (error) {
    Log.Error("Error in startServices: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}


function stopServices() {
  Log.AppendFolder("stopServices - DR FDM Full stopup");

  try {
    launchDRFDM();
    Log.Message("DR FDM launched.");

    setCollectLogsCheckbox(true);
    Log.Message("Collect logs checkbox set.");

    setServiceControlCheckbox();
    Log.Message("Service control checkbox set.");

    clickOkayIfEnabled();
    Log.Message("OK button clicked.");

    bringFDMServicesFormToFront();
    Log.Message("Service form activated.");

    clickStopButton();
    Log.Message("stop button clicked.");
    

  } catch (error) {
    Log.Error("Error in stopServices: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}
