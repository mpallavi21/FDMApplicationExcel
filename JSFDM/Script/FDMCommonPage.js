//USEUNIT STDLib

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
    Log.AppendFolder("Click on confirm FDM Button");

    // Capture dialog caption for traceability
    let WndCaption = Aliases.HCMClient.dlgFDMConfiguration.Static.WndCaption;
    if(WndCaption.Exists) {
      Log.Message("Confirmation dialog caption: " + WndCaption);
    }
    
    // Handle 'Yes' button
    let yesButton = Aliases.HCMClient.dlgFDMConfiguration.btnYes;
    if (yesButton.Exists) {
      if (yesButton.WaitProperty("Enabled", true, 5000)) {
        yesButton.ClickButton(); // safer than Click()
        Log.Message(WndCaption)
        Log.Message("'Yes' button clicked successfully.");
      } 
    } 

    // Handle 'OK' button (may appear after Yes)
    let okButton = Aliases.HCMClient.dlgFDMConfiguration.btnOK;
    if (okButton.Exists) {
      if (okButton.WaitProperty("Enabled", true, 5000)) {
        okButton.ClickButton();
        Log.Message("'OK' button clicked successfully.");
      }
    } 

  } catch (error) {
    Log.Error("Failed to click confirmation buttons: " + error.message);
  } finally {
    Log.PopLogFolder();
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

function test(){
      clickToolbarItem(2)
}

  // One-liner description: Iterate toolbar items by count, match name, and click

function clickToolbarItem(expectedIndex) {
  var toolbar = Aliases.HCMClient.ClientMainWindow.tbarHCM;
  
    var item = toolbar.Items.Item_2(expectedIndex);
    for(var i=0; i<= expectedIndex;i++){
      Sys.Desktop.Keys("[Right]")
    }
    Sys.Desktop.Keys("[Enter]")
    
//    item.OnKeyPress("Enter");
//    Log.Message("Clicked toolbar item:  at index " + expectedIndex);
//    
    
}

