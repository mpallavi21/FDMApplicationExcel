
// =====================================================================
// Author:        Bharath
// Function:      closeWindowPage
// Description:   Closes the active page from the panel.
// Created On:    24-06-2025
// Modified On:   
// =====================================================================
function closeWindowPage() {
  try {
    Log.AppendFolder("Closes the active page from the panel.");

    var parentPanel = Aliases.HCMClient.ClientMainWindow.MdiClient;
    var buttonClose = parentPanel.FindChild("Name", "WinFormsObject(\"buttonClose\")", 10);

    if (buttonClose.Exists && buttonClose.Enabled) {
      buttonClose.Click();
      Log.Message("Closed the page successfully.");
    } else {
      Log.Warning("Close button not found or not enabled.");
    }

  } catch (error) {
    Log.Error("Failed to close the page: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      clickOnConfirmFDMYesButton
// Description:   Clicks the 'Yes' button on the FDM Diagnostic Model
//                Configuration dialog.
// Created On:    25-06-2025
// Modified On:   
// =====================================================================
function clickOnConfirmFDMButton() {
  try {
    Log.AppendFolder("Click on confirm FDM Button")
    let yesButton = Aliases.HCMClient.dlgFDMConfiguration.btnYes;
    let WndCaption = Aliases.HCMClient.dlgFDMConfiguration.Static.WndCaption;
    Log.Message("Confirmation dialog caption: " + WndCaption);
      
    if (yesButton.Exists && yesButton.Enabled) {
      yesButton.SetFocus()
      yesButton.Click();
      Log.Message("'Yes' button clicked successfully on FDM Diagnostic Model dialog.");
    }
    
    let okButton = Aliases.HCMClient.dlgFDMConfiguration.btnOK;
    if (okButton.Exists && okButton.Enabled) {
      okButton.SetFocus()
      okButton.Click();
      Log.Message("'OK' button clicked successfully on FDM Diagnostic Model dialog.");
    }
  } catch (error) {
    Log.Error("Failed to click 'Yes || ok' button: " + error.message);
  } finally{
    Log.PopLogFolder()
  }
}


function CloseWindow() {
  Log.AppendFolder("CloseWindow - Locate and Click Close Button");

  try {
    let mdiClient = Aliases.HCMClient.ClientMainWindow.MdiClient;

    let closeBtn = mdiClient.FindChild("Name", 'WinFormsObject("buttonClose")', 100,true);
    if (closeBtn && closeBtn.Exists) {
      Log.Message("Close button found. Clicking now.");
      closeBtn.Click();
    } else {
      Log.Error("Close button not found.");
    }

  } catch (e) {
    Log.Error("Exception in test(): " + e.message);
  } finally {
    Log.PopLogFolder();
  }
}

