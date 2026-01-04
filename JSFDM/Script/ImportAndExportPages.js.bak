// =====================================================================
// Author:        Bharath
// Function:      ClickItemImportAndExport
// Description:   Scans toolbar items and clicks the one with tooltip 'Import And Export'.
// Created On:    01-Aug-2025
// =====================================================================

function ClickItemImportAndExport()
{
  let HCMClient = Aliases.HCMClient;
  let mainWindow = HCMClient.ClientMainWindow;
  let expectedDialog = HCMClient.IXPFdmWizard.ztabControl
  
  // Click the toolbar button by coordinates
  mainWindow.tbarHCM.Click(63, 14);
  
  // Optional: log action
  Log.Message("Clicked Import/Export button at coordinates (63, 14)");
  
  // Wait for dialog to appear
  if (expectedDialog.WaitProperty("Exists", true, 10000)) {
    Log.Message("Import/Export dialog appeared successfully.");
  } else {
    Log.Error("Import/Export dialog did not appear after clicking.");
  }
}



//  listBox.ClickItem("Device Tags");
//  listBox.ClickItem("Audit Trail");
//  listBox.ClickItem("Offline Device Configuration");
//  listBox.ClickItem("Device History");
//  listBox.ClickItem("Plant Area View");
//  listBox.ClickItem("Diagnostic Model");


// =====================================================================
// Author:        Bharath
// Function:      ClickItemInTabList
// Description:   Navigates to the specified tab and clicks a targeted item in the list box.
// Created On:    01-Aug-2025
// Modified On:   01-Aug-2025
// =====================================================================

function ClickItemInTabList(itemName) {
  Log.AppendFolder("ClickItemInTabList - Item: " + itemName);

  try {
    let tabControl = Aliases.HCMClient.IXPFdmWizard.ztabControl;

    // Step 1: Switch to the specified tab
    tabControl.ClickTab("CHOOSE_ACTION");
    Log.Message("Switched to tab: " + "CHOOSE_ACTION");

    // Step 2: Access the list box on the tab
    let listBox = tabControl.tpChooseAction.listBoxChooseAction;
    let itemCount = listBox.wItemCount;

    Log.Message("Total items in list box: " + itemCount);

    // Step 3: Loop through items to find and click the target
    for (let i = 0; i < itemCount; i++) {
      let currentItem = listBox.wItem(i);
      if (currentItem == itemName) {
        listBox.ClickItem(itemName);
        Log.Checkpoint("Successfully clicked item: " + itemName);
        break;
      }
    }

  } catch (error) {
    Log.Error("Error in ClickItemInTabList: " + error.message);

  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      ClickImportDataButton
// Description:   Clicks the 'Import Data' button in the wizard interface.
// Created On:    01-Aug-2025
// Modified On:   01-Aug-2025
// =====================================================================

function ClickImportDataButton() {
  Log.AppendFolder("ClickImportDataButton - Trigger Import Data");

  try {
    let tabControl = Aliases.HCMClient.IXPFdmWizard.ztabControl;
    tabControl.ClickTab("CHOOSE_ACTION");

    // Step: Click the Export button
    let tabPage = tabControl.tpChooseAction;
    tabPage.rbImportData.ClickButton();
    Log.Checkpoint("Clicked the 'Import Data' button successfully.");

  } catch (error) {
    Log.Error("Error in ClickImportDataButton " + error.message);

  } finally {
    Log.PopLogFolder();
  }
}

// =====================================================================
// Author:        Bharath
// Function:      ClickExportDataButton
// Description:   Clicks the 'Export Data' button in the wizard interface.
// Created On:    01-Aug-2025
// Modified On:   01-Aug-2025
// =====================================================================

function ClickExportDataButton() {
  Log.AppendFolder("ClickExportDataButton - Trigger Export Data");

  try {
    let tabControl = Aliases.HCMClient.IXPFdmWizard.ztabControl;
    tabControl.ClickTab("CHOOSE_ACTION");

    // Step: Click the Export button
    let tabPage = tabControl.tpChooseAction;
    tabPage.rbExportData.ClickButton();
    Log.Checkpoint("Clicked the 'Export' button successfully.");

  } catch (error) {
    Log.Error("Error in ClickExportButton: " + error.message);

  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      ClickNextIfEnabled
// Description:   Clicks the 'Next' button if it's enabled.
// Created On:    01-Aug-2025
// Modified On:   01-Aug-2025
// =====================================================================

function ClickNextIfEnabled() {
  Log.AppendFolder("ClickNextIfEnabled - Conditional Navigation");

  try {
    let nextButton = Aliases.HCMClient.IXPFdmWizard.WinFormsObject("_panelBottom").WinFormsObject("_buttonNext");

    // Check if Next button is both present and enabled
    if (nextButton.Exists && nextButton.Enabled) {
      nextButton.ClickButton();
      Log.Checkpoint("Clicked 'Next' button successfully.");
    } else {
      Log.Warning("'Next' button is either disabled or not present.");
    }

  } catch (error) {
    Log.Error("Error in ClickNextIfEnabled: " + error.message);

  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      ClickCancelButton
// Description:   Clicks the 'Cancel' button if it's enabled.
// Created On:    01-Aug-2025
// Modified On:   01-Aug-2025
// =====================================================================

function ClickCancelButton() {
  Log.AppendFolder("ClickCancelButton - Exit Workflow");

  try {
    let cancelBtn = Aliases.HCMClient.IXPFdmWizard.WinFormsObject("_panelBottom").WinFormsObject("_buttonCancel");

    if (cancelBtn.Exists && cancelBtn.Enabled) {
      cancelBtn.ClickButton();
      Log.Checkpoint("'Cancel' button clicked successfully.");
    } else {
      Log.Warning("'Cancel' button is either disabled or not present.");
    }

  } catch (error) {
    Log.Error("Error in ClickCancelButton: " + error.message);

  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      FilterDeviceTags
// Description:   Selects device tag filters with wildcard support.
// Created On:    01-Aug-2025
// Modified On:   01-Aug-2025
// =====================================================================

function FilterDeviceTags(network = " ---All---", configured = " ---All---", protocol = " ---All---", manufacturer = " ---All---", deviceType = " ---All---") {
  Log.AppendFolder("FilterDeviceTags - Parameterized Filtering");

  try {
    let IXPFdmWizard = Aliases.HCMClient.IXPFdmWizard;
    let tabControl = IXPFdmWizard.ztabControl;
    let groupBox = tabControl.tpQueryFrm.fdmIXPQueryView.groupBox1;

    groupBox.NetworkListBox.ClickItem(network);
    groupBox.ConfiguredNetworksListBox.ClickItem(configured);
    groupBox.ProtocolListBox.ClickItem(protocol);
    groupBox.ManufacturersListBox.ClickItem(manufacturer);
    groupBox.DeviceTypesListBox.ClickItem(deviceType);

    Log.Checkpoint("Device tag filters applied successfully.");

  } catch (error) {
    Log.Error("Error in FilterDeviceTags: " + error.message);

  } finally {
    Log.PopLogFolder();
  }
}

function test(){
  SelectAvailableDeviceTag("644")
}
// =====================================================================
// Author:        Bharath
// Function:      SelectAvailableDeviceTag
// Description:   Selects a device tag from Available List and moves it to Selected.
// Created On:    01-Aug-2025
// Modified On:   01-Aug-2025
// =====================================================================

function SelectAvailableDeviceTag(tagName) {
  Log.AppendFolder("SelectAvailableDeviceTag - Tag: " + tagName);

  try {
    let tabControl = Aliases.HCMClient.IXPFdmWizard.ztabControl;
    let FDMSelectItems = tabControl.tpSelDevTags.fdmSelectItems1;

    // Step 1: Select the tag from Available List
    FDMSelectItems.listBoxAvaliableList.ClickItem(tagName);
    Log.Message("Selected device tag from Available List: " + tagName);

    // Step 2: Click the button to move the tag to Selected List
    FDMSelectItems.groupBox1.MoveToSelected.Click(15, 13);
    Log.Checkpoint("Moved tag to Selected List successfully.");

  } catch (error) {
    Log.Error("Error in SelectAvailableDeviceTag: " + error.message);

  } finally {
    Log.PopLogFolder();
  }

}

// =====================================================================
// Author:        Bharath
// Function:      MoveOfflineConfigNode
// Description:   Selects and moves a node from Offline Library to Selected Config.
// Created On:    04-Aug-2025
// Modified On:   04-Aug-2025
// =====================================================================

function MoveOfflineConfigNode(nodePath) {
  Log.AppendFolder("MoveOfflineConfigNode - Node: " + nodePath);

  try {
    let tabControl = Aliases.HCMClient.IXPFdmWizard.ztabControl;
    let groupBox = tabControl.tpSelOfflineConfig.selOfflineTemplates1.groupBox1;

    // Step 1: Select the node from Offline Library
    groupBox.treeViewOfflineLibrary.ClickItem(nodePath);
    Log.Message("Selected node from Offline Library: " + nodePath);

    // Step 2: Move selected node to Selected Config
    groupBox.buttonMoveSelectedNode.ClickButton();
    Log.Checkpoint("Moved node to Selected Config successfully.");

    return true;

  } catch (error) {
    Log.Error("Error in MoveOfflineConfigNode: " + error.message);
    return false;

  } finally {
    Log.PopLogFolder();
  }
}

// =====================================================================
// Author:        Bharath
// Function:      SelectFileFormat
// Description:   Selects the specified file format (HTML/CSV/XML) radio button.
// Created On:    01-Aug-2025
// Modified On:   01-Aug-2025
// =====================================================================

function SelectFileFormat(format) {
  Log.AppendFolder("SelectFileFormat - Format: " + format);

  try {
    let tabControl = Aliases.HCMClient.IXPFdmWizard.ztabControl;
    let panel = tabControl.tpSpecifyFile.panelFileFormat;

    switch (format.toLowerCase()) {
      case "html":
        panel.rbHTMLFileFormat.ClickButton();
        Log.Message("Selected HTML file format.");
        break;

      case "csv":
        panel.rbCSVFileFormat.ClickButton();
        Log.Message("Selected CSV file format.");
        break;

      case "xml":
        panel.rbXMLFileFormat.ClickButton();
        Log.Message("Selected XML file format.");
        break;

      default:
        Log.Warning("Unsupported file format: " + format);
        break;
    }

  } catch (error) {
    Log.Error("Error in SelectFileFormat: " + error.message);

  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      GetFilePathFromTextbox
// Description:   Retrieves and returns the current value in Specify File textbox.
// Created On:    01-Aug-2025
// Modified On:   01-Aug-2025
// =====================================================================

function GetFilePathFromTextbox() {
  Log.AppendFolder("GetFilePathFromTextbox");

  let filePath = "";

  try {
    let tabControl = Aliases.HCMClient.IXPFdmWizard.ztabControl;
    let fileTextbox = tabControl.tpSpecifyFile.WinFormsObject("textBoxSpecifyFile");

    filePath = fileTextbox.wText;
    Log.Message("Retrieved file path: " + filePath);

  } catch (error) {
    Log.Error("Error retrieving text from Specify File textbox: " + error.message);

  } finally {
    Log.PopLogFolder();
  }

  return filePath;
}

function ClickStatusCellSafely(dataGrid, rowIndex, columnName) {
  let rowCount = dataGrid.wRowCount;
  let columnCount = dataGrid.wColumnCount;

  if (rowIndex < rowCount && columnName !== "" && columnName !== null) {
    // Optionally wait until the grid is visible and enabled
    if (dataGrid.WaitProperty("VisibleOnScreen", true, 5000) &&
        dataGrid.WaitProperty("Enabled", true, 5000)) {
      
      try {
        let columnIndex = -1;
        for (let i = 0; i < columnCount; i++) {
          if (dataGrid.wColumn[i].Name == columnName) {
            columnIndex = i;
            break;
          }
        }

        if (columnIndex !== -1) {
          dataGrid.ClickCell(rowIndex, columnName);
          Log.Message(`Clicked cell at row ${rowIndex}, column '${columnName}'`);
        } else {
          Log.Warning(`Column '${columnName}' not found.`);
        }
      } catch (error) {
        Log.Error(`Error during ClickCell operation: ${error.message}`);
      }
    } else {
      Log.Warning("Data grid is not visible or enabled.");
    }
  } else {
    Log.Warning("Invalid row index or column name.");
  }
}


// =====================================================================
// Author:        Bharath
// Function:      WaitForCompletion
// Description:   Verifies completion status from grid and label in the wizard.
// Created On:    01-Aug-2025
// Modified On:   01-Aug-2025
// =====================================================================

function WaitForCompletion() {
  Log.AppendFolder("WaitForCompletion");

  let timeoutMs = 30000;

  try {
    let tabControl = Aliases.HCMClient.IXPFdmWizard.ztabControl;
    let dataGrid = tabControl.tpDXProgress.FDMIXPDXProgress.dgDXElement;

    // Wait for label that confirms completion
    let labelPath = tabControl
                     .WinFormsObject("tpDXProgress")
                     .WinFormsObject("FDMIXPDXProgress")
                     .WinFormsObject("lDXPath");

    if (!labelPath.WaitProperty("Exists", true, timeoutMs)) {
      Log.Error("Progress label 'lDXPath' did not appear within timeout.");
    }

    let message = String(labelPath.Text);
    Log.Message("Progress label text: " + message);

    if (message.indexOf("Operation completed") !== -1) {
      Log.Checkpoint("Export operation completed successfully.");
    } else {
      Log.Warning("Export may be incomplete: " + message);
    }

  } catch (error) {
    Log.Error("Error in WaitForCompletion: " + error.message);
    return false;

  } finally {
    Log.PopLogFolder();
  }
}



// =====================================================================
// Author:        Bharath
// Function:      SetSelectFilePath
// Description:   Enters the provided file path into the Select File textbox.
// Created On:    01-Aug-2025
// Modified On:   01-Aug-2025
// =====================================================================

function SetSelectFilePath(filePath) {
  Log.AppendFolder("SetSelectFilePath - Path: " + filePath);

  try {
    let selectFileBox = Aliases.HCMClient.IXPFdmWizard.ztabControl
                         .WinFormsObject("tpSelectFile")
                         .WinFormsObject("textBoxSelectFile");

    selectFileBox.SetText(filePath);
    Log.Checkpoint("File path set in Select File textbox: " + filePath);

  } catch (error) {
    Log.Error("Error in SetSelectFilePath: " + error.message);

  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      ConfigureAuditTrailExport
// Description:   Sets audit trail export filters with optional parameters and defaults.
// Created On:    01-Aug-2025
// Modified On:   01-Aug-2025
// =====================================================================

function ConfigureAuditTrailExport(
  deviceName = "---All---",
  actionType = "---All---",
  userName = "Administrator",
  exportNonDeviceSpecific = true
) {
  Log.AppendFolder("ConfigureAuditTrailExport - Device: " + deviceName + ", Action: " + actionType + ", User: " + userName);

  try {
    let tabControl = Aliases.HCMClient.IXPFdmWizard.ztabControl;
    tabControl.ClickTab("SEL_AT_DATA");

    let FDMSelectAT = tabControl.tpSelATData.fdmSelectAT1;
    let groupBox = FDMSelectAT.groupBox1;

    groupBox.DeviceListBox.ClickItem(deviceName);
    groupBox.ActionTypeListBox.ClickItem(actionType);
    groupBox.UserListBox.ClickItem(userName);
    FDMSelectAT.checkBox1.wState = exportNonDeviceSpecific ? cbChecked : cbUnchecked;

    Log.Message("Audit Trail export filters configured successfully.");

  } catch (error) {
    Log.Error("Error in ConfigureAuditTrailExport: " + error.message);

  } finally {
    Log.PopLogFolder();
  }
}
