//USEUNIT STDLib

let HCMClient = Aliases.HCMClient;
let mainMenu = HCMClient.ClientMainWindow.mainMenu

// =====================================================================
// Author:        Bharath
// Function:      openFDMToolBarSettings
// Description:   Opens the FDM toolbar Settings menu using OCR clicks
// Created On:    2025-06-20
// Modified On:   None
// =====================================================================

function openFDMToolBarSettings() {
  Log.AppendFolder("openFDMToolBarSettings - Opens the FDM toolbar Settings menu using OCR clicks")

  try {
    OCR.Recognize(mainMenu).BlockByText("FDM").Click();
    Log.Message("Clicked on 'FDM' menu item.");
    OCR.Recognize(Aliases.HCMClient.DropDownForm.SubSmartControl).BlockByText("Settings").Click();
    Log.Message("Clicked on 'Settings' option.");
  } catch (error) {
    Log.Error("Failed to open FDM toolbar settings.", error);
  } finally{
    Log.PopLogFolder()
  }
}

// =====================================================================
// Author:        Bharath
// Function:      closeFDMSettings
// Description:   Closes the FDM Settings form
// Created On:    2025-06-20
// Modified On:   None
// =====================================================================

function closeFDMSettings() {
  Log.AppendFolder("closeFDMSettings - Closes the FDM Settings form")
  try {
    HCMClient.SettingsForm.Close();
    Log.Message("Settings Form closed successfully.");
  } catch (error) {
    Log.Error("Failed to close FDM Settings.", error);
  } finally {
    Log.PopLogFolder()
  }
}

// =====================================================================
// Author:        Bharath
// Function:      cancelFDMSettings
// Description:   Clicks the Cancel button in the FDM Settings form
// Created On:    2025-06-20
// Modified On:   None
// =====================================================================

function cancelFDMSettings() {
  
  Log.AppendFolder("cancelFDMSettings - Clicks the Cancel button in the FDM Settings form")

  try {
    let HCMClient = Aliases.HCMClient;
    let CancelButton = HCMClient.SettingsForm.FindChild("Name", `WinFormsObject("buttonCancel")`, 50, true);

    if (CancelButton && CancelButton.Visible) {
      CancelButton.Click();
      Log.Message("Cancel button clicked successfully.");
    } else {
      Log.Warning("Cancel button is not visible or could not be found.");
    }
  } catch (error) {
    Log.Error("Error occurred while attempting to click Cancel button.", error);
  } finally {
    Log.PopLogFolder()
  }
}


// =====================================================================
// Author:        Bharath
// Function:      okFDMSettings
// Description:   Clicks the OK button in the FDM Settings form
// Created On:    2025-06-20
// Modified On:   None
// =====================================================================

function okFDMSettings() {
  
  Log.AppendFolder("okFDMSettings - Clicks the OK button in the FDM Settings form")

  try {
    let HCMClient = Aliases.HCMClient;
    let ApplyButton = HCMClient.SettingsForm.FindChild("Name", `WinFormsObject("buttonOK")`, 50, true);

    if (ApplyButton && ApplyButton.Visible) {
      ApplyButton.Click();
      Log.Message("OK button clicked successfully.");
    } else {
      Log.Error("OK button is not visible or could not be found.");
    }
  } catch (error) {
    Log.Error("Error occurred while attempting to click the OK button.", error);
  } finally{
    Log.PopLogFolder()
  }
}

// =====================================================================
// Author:        Bharath
// Function:      applyFDMSettings
// Description:   Attempts to click the Apply button in the FDM Settings form
// Created On:    2025-06-20
// Modified On:   None
// =====================================================================

function applyFDMSettings() {
  Log.AppendFolder("applyFDMSettings - Attempts to click the Apply button in the FDM Settings form")

  try {
    let HCMClient = Aliases.HCMClient;
    let ApplyButton = HCMClient.SettingsForm.FindChild("Name", `WinFormsObject("buttonApply")`, 50, true);

    if (ApplyButton && ApplyButton.Visible) {
      ApplyButton.Click();
      Log.Message("Apply button clicked successfully.");
    } else {
      Log.Error("Apply button is not visible or could not be found.");
    }
  } catch (error) {
    Log.Error("Error occurred while attempting to click the Apply button.", error);
  } finally{
    Log.PopLogFolder()
  }
}

function EnableSSO() {
  // Calls the toggle function to enable Single Sign-On
  enableDisableSingleSignOn(cbChecked);
}

function DisableSSO() {
  // Calls the toggle function to enable Single Sign-On
  enableDisableSingleSignOn(0);
}

function SSO(){
  enableDisableSingleSignOn(Project.Variables.SignOnToggle);
}


// =====================================================================
// Author:        Bharath
// Function:      enableDisableSingleSignOn
// Description:   Opens the 'General' tab and sets the Single Sign-On checkbox
//                based on the desired state: cbChecked or cbUnchecked.
// Created On:    22-Jul-2025
// Modified On:   22-Jul-2025
// =====================================================================

function enableDisableSingleSignOn(desiredState) {
  Log.AppendFolder("enableDisableSingleSignOn - SSO Toggle Workflow");

  try {
    
    openFDMToolBarSettings()  
  
    let tabControl = Aliases.HCMClient.SettingsForm.tabControl1;

    if (!tabControl.Exists) {
      Log.Error("Tab control not found.");
      return;
    }

    tabControl.ClickTab("General");

    let groupBox = tabControl.tabPageSystemSettings.gbSingleSignOn;
    let checkBox = groupBox.checkBoxSignOn;

    if (!groupBox.Exists || !checkBox.Exists) {
      Log.Error("Single Sign-On group or checkbox not found.");
      return;
    }

    // Validate label text
    if (aqObject.CheckProperty(groupBox, "Text", cmpEqual, "Single Sign On")) {
      checkBox.wState = desiredState;
      Log.Message("🔧 SSO checkbox set to: " + (desiredState === cbChecked ? "Checked" : "Unchecked"));
    } else {
      Log.Warning("GroupBox label mismatch. Expected: 'Single Sign On'");
    }
    
    okFDMSettings()

  } catch (error) {
    Log.Error("Exception in enableDisableSingleSignOn: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}


