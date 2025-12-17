//USEUNIT GenericMethods            
//USEUNIT STDLib


// =====================================================================
// Author:        Bharath
// Function:      navigateToOfflineDiagnostics
// Description:   Opens the 'Offline' tab and selects the '*Diag*' view from the sub-tab.
// Created On:    24-06-2025
// Modified On:   
// =====================================================================
function navigateToOfflineDiagnostics() {
  try {
    Log.AppendFolder("navigateToOfflineDiagnostics - Opens the 'Offline' tab and selects the '*Diag*' view from the sub-tab.")
    let tabControl = Aliases.HCMClient.ClientMainWindow.panelLeftPanMain.tabControlLeftPanMain;

    OCR.Recognize(tabControl).BlockByText("Offline", spNearestToCenter).Click();
    OCR.Recognize(tabControl.tabPageOfflineView.panelOfflineView.tabControlOfflineView)
      .BlockByText("*Diag*")
      .Click();

    Log.Message("Navigated to Offline Diagnostics tab successfully.");
  } catch (error) {
    Log.Error("Failed to navigate to Offline Diagnostics: " + error.message);
  } finally{
    Log.PopLogFolder()
  }
}


// =====================================================================
// Author:        Bharath
// Function:      createDiagnosticModel
// Description:   Right-clicks the specified node in the Fault Model tree 
//                and selects 'Create Diagnostic Model' from the context menu.
  
// =====================================================================
function createDiagnosticModel(treePath, ManufactureName, DeviceType, DeviceRevision, CheckParam) {
  Log.AppendFolder("createDiagnosticModel - Diagnostic Model Creation Workflow");

  let status = "Pass";

  try {
    // Step 1: Right-click target node in Fault Model tree
    let treeView = Aliases.HCMClient.ClientMainWindow.panelLeftPanMain
      .tabControlLeftPanMain.tabPageOfflineView.panelOfflineView
      .tabControlOfflineView.tabPageFaultModel.treeView;

    treeView.ClickItemR(treePath);
    Log.Message("Right-clicked on node: '" + treePath + "'");

    treeView.StripPopupMenu.Click(" Create Diagnostic Model");
    Log.Message("Selected 'Create Diagnostic Model' from the context menu.");

    // Step 2: Handle Diagnostic Model Configuration dialog
    let dlgFDMDiagnosticModelConfiguration = Aliases.HCMClient.dlgFDMConfiguration;
    if (dlgFDMDiagnosticModelConfiguration.btnOK.Exists) {
      dlgFDMDiagnosticModelConfiguration.btnOK.ClickButton();
      Log.Message("Clicked 'OK' on Diagnostic Model Configuration dialog.");
    }

    // Step 3: Wait for Diagnostic Model window
    let labelDeviceTitle = Aliases.HCMClient.ClientMainWindow.MdiClient.RightPanBaseFrame.panelBase.panelFullTop.panelTitle.labelDeviceTitle;
    labelDeviceTitle.WaitWFCObject("Diagnostic Model", "WndCaption", 5000);

    // Step 4: Configure Manufacturer, Device Type, Revision
    let adornerDecorator = Aliases.HCMClient.ClientMainWindow.MdiClient.RightPanBaseFrame.panelBase.panelForDerivedForms.ElementHost.HwndSource_AdornerDecorator.AdornerDecorator;

    let ComboboxManufacturer = adornerDecorator.Grid.ComboboxManufacturer;
    if (ComboboxManufacturer.Exists) selectComboBoxItemByNameDD(ComboboxManufacturer, ManufactureName);

    let ComboboxDeviceType = adornerDecorator.ComboboxDeviceType;
    if (ComboboxDeviceType.Exists) selectComboBoxItemByNameDD(ComboboxDeviceType, DeviceType);

    let ComboboxDeviceRevision = adornerDecorator.ComboboxDeviceRevision;
    if (ComboboxDeviceRevision.Exists) selectComboBoxItemByNameDD(ComboboxDeviceRevision, DeviceRevision);

    // Step 5: Validate parameter checkbox
    let listBox = adornerDecorator.Grid.ListBox;
    let rowCount = listBox.wItemCount;

    for (let i = 0; i < rowCount; i++) {
      let textBlock = listBox.WPFObject("ListBoxItem", "", i+1)
        .WPFObject("StackPanel", "", 1)
        .WPFObject("TextBlock", "*", 1);

      let itemText = textBlock.WPFControlText;

      if (itemText == CheckParam) {
        let checkBox = listBox.WPFObject("ListBoxItem", "", i+1)
          .WPFObject("StackPanel", "", 1)
          .WPFObject("CheckBox", "", 1);

        if (checkBox.wState != 1) {
          checkBox.ClickButton(cbChecked);
          Log.Message("Checked parameter: " + CheckParam);
        }
      }
    }

    // Step 6: Configure diagnostic rule
    adornerDecorator.ParamBits.ClickCell(0, 0);
    let DataGridRow = adornerDecorator.FindChild("Name", `WPFObject("DataGridRow", "", 1)`, 50);
    let combo1 = DataGridRow.FindChild("Name", 'WPFObject("combo1")', 50);
    combo1.ClickItem("Maintenance Required");

    let button = adornerDecorator.grid.ButtonAddToSummary;
    aqObject.CheckProperty(button, "Enabled", cmpEqual, true);
    button.Click();
    Log.Message("Diagnostic rule added to summary.");

    // Step 7: Save and confirm
    let dlgDiagnosticModel = Aliases.HCMClient.dlgFDMConfiguration;
    if (dlgDiagnosticModel.btnYes.Exists) dlgDiagnosticModel.btnYes.ClickButton();
    if (adornerDecorator.ButtonSave.Exists) adornerDecorator.ButtonSave.ClickButton();
    if (dlgDiagnosticModel.btnOK.Exists) dlgDiagnosticModel.btnOK.ClickButton();

    Log.Checkpoint("✅ createDiagnosticModel passed: Diagnostic Model created and saved successfully.");
  } catch (error) {
    Log.Error("❌ createDiagnosticModel failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("createDiagnosticModel " + status, status, "Pass");
    Log.PopLogFolder();
  }
}

function test(){
  ConfigureDiagnosticModel("Rosemount_38","Maintenance Required")
}

// =====================================================================
// Author:        Bharath
// Function:      ConfigureDiagnosticModel
// Description:   Selects manufacturer and diagnostic status, adds to summary,
//                saves configuration, and confirms dialogs.
// Created On:    18-Jul-2025
// Modified On:   18-Jul-2025
// =====================================================================

function ConfigureDiagnosticModel(manufacturer, diagnosticStatus) {
  Log.AppendFolder("ConfigureDiagnosticModel - Diagnostic Configuration Flow");

  try {
    let HCMClient = Aliases.HCMClient;
    let adornerDecorator = HCMClient.ClientMainWindow.MdiClient.RightPanBaseFrame.panelBase.panelForDerivedForms.ElementHost.HwndSource_AdornerDecorator.AdornerDecorator;

    // Select manufacturer from combo box
    let comboBox = adornerDecorator.ComboboxManufacturer;
    if (comboBox.Exists) {
      comboBox.Click(195, 16);
      comboBox.ClickItem(manufacturer);
      Log.Message("Selected manufacturer: " + manufacturer);
    } else {
      Log.Error("Manufacturer combo box not found.");
      return;
    }

    // Check the checkbox
    let checkBox = adornerDecorator.ListBox.CheckBox;
    if (checkBox.Exists) {
      checkBox.ClickButton(cbChecked);
      Log.Message("Checked the checkbox.");
    } else {
      Log.Error("Checkbox not found.");
      return;
    }

    // Select diagnostic status from data grid combo
    let dataGrid = adornerDecorator.ParamBits;
    if (dataGrid.Exists) {
      dataGrid.ClickCell(0, 0);
      dataGrid.ClickCell(0, 0);
      dataGrid.combo1.ClickItem(diagnosticStatus);
      Log.Message("Selected diagnostic status: " + diagnosticStatus);
    } else {
      Log.Error("Data grid not found.");
      return;
    }

    // Click Add to Summary and Save
    if (adornerDecorator.ButtonAddToSummary.Exists) {
      adornerDecorator.ButtonAddToSummary.ClickButton();
      Log.Message("Clicked 'Add to Summary'.");
    }

    if (adornerDecorator.ButtonSave.Exists) {
      adornerDecorator.ButtonSave.ClickButton();
      Log.Message("Clicked 'Save'.");
    }

    // Handle confirmation dialogs
    let dlgDiagnosticModel = HCMClient.dlgFDMConfiguration;
    if (dlgDiagnosticModel.btnYes.Exists) {
      dlgDiagnosticModel.btnYes.ClickButton();
      Log.Message("Confirmed 'Yes' on dialog.");
    }

    if (dlgDiagnosticModel.btnOK.Exists) {
      dlgDiagnosticModel.btnOK.ClickButton();
      Log.Message("Confirmed 'OK' on dialog.");
    }

  } catch (e) {
    Log.Error("Exception occurred: " + e.message);
  } finally {
    Log.PopLogFolder();
  }
}
