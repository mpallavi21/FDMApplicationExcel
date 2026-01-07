 //USEUNIT GenericMethods
//USEUNIT FDMCommonPage
//USEUNIT STDLib


function clickOnSystemAttachDocument() {
  Log.AppendFolder("clickOnSystemAttachDocument - System Document Attach Flow");

  try {
  let HCMClient = Aliases.HCMClient;
  let frmHCMClientMain = HCMClient.ClientMainWindow;
  OCR.Recognize(frmHCMClientMain.mainMenu).BlockByText("Tools").Click();
  OCR.Recognize(HCMClient.DropDownForm.SubSmartControl).BlockByText("*Documents*").Click();
  frmHCMClientMain.panelLeftPanMain.tabControlLeftPanMain.tabPageOnlineView.panelOnlineView.panelTabControlOnlineView.tabControlOnlineView.tabConnected.Keys("[Right][Enter]");
  } catch (error) {
    Log.Error("❌ Error in clickOnSystemAttachDocument: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
  
 
}





// =====================================================================
// Author:        Bharath
// Function:      clickOnAttachApplication
// Description:   Navigates through the Tools > Applications menu and triggers
//                the attach action via keyboard in the connected tree view.
// =====================================================================

function clickOnAttachApplication() {
  Log.AppendFolder("clickOnAttachApplication - Attach Application via Menu");

  try {
    let HCMClient = Aliases.HCMClient;
    let frmHCMClientMain = HCMClient.ClientMainWindow;

    // Step 1: Click on 'Tools' menu using OCR
    OCR.Recognize(frmHCMClientMain.mainMenu).BlockByText("Tools").Click();
    Log.Message("Clicked 'Tools' from the main menu.");

    // Step 2: Click on 'Applications' from the dropdown
    OCR.Recognize(Aliases.HCMClient.DropDownForm.SubSmartControl).BlockByText("Applications").Click();
    Log.Message("Selected 'Applications' from the Tools dropdown.");

    // Step 3: Expand and attach application via keyboard
    frmHCMClientMain.panelLeftPanMain.tabControlLeftPanMain.tabPageOnlineView.panelOnlineView.panelTabControlOnlineView.tabControlOnlineView.tabConnected.Keys("[Right][Enter]");
      
    Log.Message("Application attached from the connected applications list.");
  } catch (error) {
    Log.Error("Failed to attach application: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}


function test(){
  clickOnAttachApplication()
  uploadAppAttachPackageFile("C:\\Program Files (x86)\\Honeywell\\FDM\\ClientMachine\\Bin","HCMClient")
  DetachApplication()
}
// =====================================================================
// Author:        Bharath
// Function:      uploadAppAttachPackageFile
// Description:   Opens the Application Selection dialog, navigates to the specified
//                folder, selects the package file, and uploads it via file dialog.
// Created On:    27-June-2025
// Modified On:   --
// =====================================================================
function uploadAppAttachPackageFile(folderPath, fileName) {
  Log.AppendFolder("uploadAppAttachPackageFile - Upload Application Package");

  try {
    let HCMClient = Aliases.HCMClient;

    // Access the Application Selection dialog
    let ApplicationSelectionDlg = HCMClient.ApplicationSelectionDlg;

    if (ApplicationSelectionDlg.Exists) {
      // Click the Browse button to open file dialog
      ApplicationSelectionDlg.buttonBrowse.Click();

      let dlgOpen = HCMClient.dlgOpen;
      let progress = dlgOpen.WorkerW.ReBarWindow32.AddressBandRoot.progress;

      // Navigate to the folder path
      progress.BreadcrumbParent.toolbar.ClickItem("All locations");
      progress.comboBox.SetText(folderPath);

      // Select the desired file to upload
      dlgOpen.OpenFile(folderPath + "\\" + fileName);

      Log.Message("File '" + fileName + "' added successfully from: " + folderPath);

      // Confirm if the file has been uploaded successfully
      if (ApplicationSelectionDlg.buttonOK.Enabled) {
        ApplicationSelectionDlg.buttonOK.Click()
        Log.Message("File '" + fileName + "' uploaded successfully.");
      } else {
        Log.Error("Upload failed: OK button is not enabled.");
        if (ApplicationSelectionDlg.buttonCancel) {
          return false;
        }
      }
    } else {
      Log.Warning("Application Selection dialog not found.");
    }
    HCMClient.dlgFDMConfiguration.btnOK.WaitProperty("Exists",true,10000)
    if(HCMClient.dlgFDMConfiguration.btnOK.Exists){
      caption = Aliases.HCMClient.dlgFDMConfiguration.Window("Static", "*", 1).WndCaption
      HCMClient.dlgFDMConfiguration.btnOK.Click()
      Log.Message(caption)
    }
  } catch (error) {
    Log.Error("Failed to upload application attach package file: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}
function selectAppByLabel() { 
  appLabel = "HCMClient"
  const grid = Aliases.HCMClient.ResourceSelectionDlg.fpSpread1;
  const sheet = grid.ActiveSheet;
  rowCount = sheet.RowCount;
  ColCount = sheet.ColumnCount;

  labelColIndex = 0; // Column with device name
  checkboxColIndex = 1; // Column with checkbox

  for (let i = 0; i < rowCount; i++) {    
    const label = sheet.GetClipValue(i, labelColIndex,rowCount,ColCount); // Correct method
    const cellType = sheet.GetCellType(i, checkboxColIndex);

    if (label.includes(appLabel) && cellType === "CheckBox") {
      const isChecked = sheet.GetValue(i, checkboxColIndex); // Correct method
      if (!isChecked) {
        sheet.ClickCell(i, checkboxColIndex);
        Log.Message(`Selected '${label}' at row ${i}`);
      } else {
        Log.Message(`'${label}' already selected`);
      }
    }
  }
}



// =====================================================================
// Author:        Bharath
// Function:      DetachApplication
// Description:   Navigates through the application menu using OCR to detach
//                a connected application node from the tree view.
// Created On:    27-June-2025
// Modified On:   [Updated with robust waits and checks]
// =====================================================================
function DetachApplication() {
  try {
    Log.AppendFolder("DetachApplication - Navigates through the application menu using OCR to detach\n a connected application node from the tree view.")
    let HCMClient = Aliases.HCMClient;
    let frmHCMClientMain = HCMClient.ClientMainWindow;

    // === Step 1: Click 'Tools' using OCR ===
    if (frmHCMClientMain.mainMenu.Exists) {
      OCR.Recognize(frmHCMClientMain.mainMenu).BlockByText("Tools").Click();
      Log.Message("Clicked 'Tools' from the main menu.");
    } else {
      Log.Error("Main menu not found.");
      return;
    }
          
    // === Step 2: Click 'Applications' from the dropdown ===
    if (Aliases.HCMClient.DropDownForm.SubSmartControl.Exists) {

      OCR.Recognize(HCMClient.DropDownForm.SubSmartControl).BlockByText("Other Applications").Click();
      Log.Message("Selected 'Applications' from the Tools dropdown.");
    } else {
      Log.Error("Applications option in dropdown not found.");
      return;
    }

    // === Step 3: Navigate and detach from tree view ===
    let treeView = frmHCMClientMain.panelLeftPanMain.tabControlLeftPanMain.tabPageOnlineView.panelOnlineView.panelTabControlOnlineView.tabControlOnlineView.tabConnected.treeView;

    if (treeView.Exists) {
      treeView.Keys("[Right][Down][Enter]");
      Log.Message("Detached application from the connected applications list.");
    } else {
      Log.Error("Connected applications tree view not found.");
      return;
    }
    
    var dlgFDM = Aliases.HCMClient.dlgFDMConfiguration;
    var dlgFDMConfiguration = Aliases.HCMClient.dlgFDMConfiguration
    var staticText = dlgFDM.Static;

    if (staticText.Exists && staticText.WndCaption === "There are no items for selection") {
      Log.Message("Warning detected: 'There are no items for selection'");
    
      if (dlgFDMConfiguration.btnOK.Exists && dlgFDMConfiguration.btnOK.Enabled) {
        dlgFDMConfiguration.btnOK.Click();
        Log.Message("'OK' button clicked to dismiss the warning.");
        return false
      } else {
        Log.Error("'OK' button not found or not enabled.");
      }
    } else {
      Log.Message("No warning message displayed.");
    }

    // === Step 4: Handle Resource Selection dialog ===
    let resourceSelectionDlg = HCMClient.WaitAliasChild("ResourceSelectionDlg", 5000);

    if (resourceSelectionDlg.Exists) {
      resourceSelectionDlg.fpSpread1.Click(229, 33);
      Log.Message("Clicked device selection grid.");

      if (resourceSelectionDlg.OKButton.Exists && resourceSelectionDlg.OKButton.Enabled) {
        resourceSelectionDlg.OKButton.Click();
        Log.Message("Clicked 'OK' on Resource Selection dialog.");
      } else {
        Log.Error("'OK' button is not available or enabled.");
        return;
      }

      if (HCMClient.dlgFDMConfiguration.btnYes.Exists) {
        let WndCaption = HCMClient.dlgFDMConfiguration.Static.WndCaption;
        HCMClient.dlgFDMConfiguration.btnYes.Click();
        Log.Message("Confirmation dialog caption: " + WndCaption);
      } else {
        Log.Warning("'Yes' button not found in FDM Configuration dialog.");
      }

    } else {
      Log.Error("Resource Selection dialog not found.");
      return;
    }

    // === Step 5: Final FDM Configuration confirmation ===
    let configDlg = HCMClient.WaitAliasChild("dlgFDMConfiguration", 10000);

    if (configDlg.Exists && configDlg.btnOK.Exists) {
      let caption = configDlg.Window("Static", "*", 1).WndCaption;
      configDlg.btnOK.ClickButton();
      Log.Message("Final confirmation: " + caption);
    } else {
      Log.Error("FDM Configuration confirmation dialog not found.");
    }

  } catch (error) {
    Log.Error("Failed to detach application: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
  
}

function clickOnDeviceAttachDocument(Device) {
  Log.AppendFolder("clickOnAttachDocument - Initiating Document Attachment");

  try {
    Delay(1000)
    Aliases.HCMClient.ClientMainWindow.panelLeftPanMain.Click()
    let treeView = Aliases.HCMClient.ClientMainWindow.panelLeftPanMain.tabControlLeftPanMain.tabPageOnlineView.panelOnlineView.panelTabControlOnlineView.tabControlOnlineView.tabConnected.treeView;

    if (!treeView.Exists) {
      Log.Error("TreeView not found.");
      return;
    }
    
    let targetItem = Device
    treeView.Refresh()
    treeView.ClickItem(targetItem);
    Log.Message("Clicked item: " + targetItem);
    treeView.ClickItemR(targetItem);
    Log.Message("Right-clicked item for context menu.");
    Delay(1000)
    treeView.StripPopupMenu.Click("Device Documentation");
    treeView.StripPopupMenu.Click("Device Documentation|Attach Document");
    Log.Message("Selected 'Attach Document' from menu.");
    
  } catch (e) {
    Log.Error("Exception occurred in clickOnAttachDocument: " + e.message);
  } finally {
    Log.PopLogFolder();
  }
}


function clickOnDeviceDetachDocument(Device) {
  Log.AppendFolder("clickOnDeviceDetachDocument - Initiating Document Detachment");

  try {
    let treeView = Aliases.HCMClient.ClientMainWindow.panelLeftPanMain.tabControlLeftPanMain.tabPageOnlineView.panelOnlineView.panelTabControlOnlineView.tabControlOnlineView.tabConnected.treeView;

    if (!treeView.Exists) {
      Log.Error("TreeView not found.");
      return;
    }

    let targetItem = Device;

    treeView.ClickItem(targetItem);
    Log.Message("Clicked item: " + targetItem);

    treeView.ClickItemR(targetItem);
    Log.Message("Right-clicked item for context menu.");
    Delay(1000)
  
    treeView.StripPopupMenu.Click("Device Documentation")
    treeView.StripPopupMenu.Click("Device Documentation|Detach Document");
    Log.Message("Selected 'Attach Document' from menu.");
    
  } catch (e) {
    Log.Error("Exception occurred in clickOnAttachDocument: " + e.message);
  } finally {
    Log.PopLogFolder();
  }
}



// =====================================================================
// Author:        Bharath
// Function:      DetachDocumentFromResourceDlg
// Description:   Verifies the resource dialog label, interacts with the grid,
//                and confirms document detachment.
// Created On:    21-Jul-2025
// Modified On:   21-Jul-2025
// =====================================================================

function DetachDocumentFromResourceDlg() {
  Log.AppendFolder("DetachDocumentFromResourceDlg - Detaching Document Flow");

  try {
    Delay(1000)
    let resourceSelectionDlg = Aliases.HCMClient.ResourceSelectionDlg;
    
    if(resourceSelectionDlg.Exists)
    resourceSelectionDlg.SetFocus()
    // Click on the grid and confirm detachment
    resourceSelectionDlg.fpSpread1.Click(226, 31);
    Log.Message("Clicked document entry in grid.");

    resourceSelectionDlg.OKButton.Click();
    Log.Message("Clicked OK to confirm detachment.");

  } catch (e) {
    Log.Error("Exception in DetachDocumentFromResourceDlg: " + e.message);
  } finally {
    Log.PopLogFolder();
  }
}

function clickOnSystemDetachDocument()
{
  let HCMClient = Aliases.HCMClient;
  let frmHCMClientMain = HCMClient.ClientMainWindow;
  OCR.Recognize(frmHCMClientMain.mainMenu).BlockByText("Tools").Click();
  OCR.Recognize(HCMClient.DropDownForm.SubSmartControl).BlockByText("System Documents").Click();
  frmHCMClientMain.panelLeftPanMain.tabControlLeftPanMain.tabPageOnlineView.panelOnlineView.panelTabControlOnlineView.tabControlOnlineView.tabConnected.treeView.Keys("[Right][Down][Enter]");
}



// =====================================================================
// Author:        Bharath
// Function:      DetachDocument
// Description:   Navigates through the Document menu using OCR to detach
//                a connected Document node from the tree view.
// =====================================================================
function DetachSystemDocumentInTools() {
  try {
    Log.AppendFolder("DetachDocument - Navigates through the Document menu using OCR to detach\n a connected Document node from the tree view.")
    let HCMClient = Aliases.HCMClient;
    clickOnSystemDetachDocument()
    
    var dlgFDM = Aliases.HCMClient.dlgFDMConfiguration;
    var dlgFDMConfiguration = Aliases.HCMClient.dlgFDMConfiguration
    var staticText = dlgFDM.Static;

    if (staticText.Exists && staticText.WndCaption === "There are no items for selection") {
      Log.Message("Warning detected: 'There are no items for selection'");
    
      if (dlgFDMConfiguration.btnOK.Exists && dlgFDMConfiguration.btnOK.Enabled) {
        dlgFDMConfiguration.btnOK.Click();
        Log.Message("'OK' button clicked to dismiss the warning.");
        return false
      } else {
        Log.Error("'OK' button not found or not enabled.");
      }
    } else {
      Log.Message("No warning message displayed.");
    }

    // === Step 4: Handle Resource Selection dialog ===
    let resourceSelectionDlg = HCMClient.WaitAliasChild("ResourceSelectionDlg", 5000);

    if (resourceSelectionDlg.Exists) {
      resourceSelectionDlg.fpSpread1.Click(229, 33);
      Log.Message("Clicked device selection grid.");

      if (resourceSelectionDlg.OKButton.Exists && resourceSelectionDlg.OKButton.Enabled) {
        resourceSelectionDlg.OKButton.Click();
        Log.Message("Clicked 'OK' on Resource Selection dialog.");
      } else {
        Log.Error("'OK' button is not available or enabled.");
        return;
      }

      if (HCMClient.dlgFDMConfiguration.btnYes.Exists) {
        let WndCaption = HCMClient.dlgFDMConfiguration.Static.WndCaption;
        HCMClient.dlgFDMConfiguration.btnYes.Click();
        Log.Message("Confirmation dialog caption: " + WndCaption);
      } else {
        Log.Warning("'Yes' button not found in FDM Configuration dialog.");
      }

    } else {
      Log.Error("Resource Selection dialog not found.");
      return;
    }

    // === Step 5: Final FDM Configuration confirmation ===
    let configDlg = HCMClient.WaitAliasChild("dlgFDMConfiguration", 10000);

    if (configDlg.Exists && configDlg.btnOK.Exists) {
      let caption = configDlg.Window("Static", "*", 1).WndCaption;
      configDlg.btnOK.ClickButton();
      Log.Message("Final confirmation: " + caption);
    } else {
      Log.Error("FDM Configuration confirmation dialog not found.");
    }

  } catch (error) {
    Log.Error("Failed to detach application: " + error.message);
  } finally {
    Log.PopLogFolder();
  } 
}


