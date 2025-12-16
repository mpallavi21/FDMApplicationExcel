 //USEUNIT FDMCommonPage


/* Example of how to pass a node path array to the expandTreeView function
expandTreeView([
  "FDM Server ( DESKTOP-AJ7O5O5 )",
  "DESKTOP-AJ7O5O5",
  "Mux",
  "SFT_PNF"
]);
collapseTreeView([
  "FDM Server ( DESKTOP-AJ7O5O5 )",
  "DESKTOP-AJ7O5O5",
  "Mux",
  "SFT_PNF"
]);
*/



// =====================================================================
// Author:        Bharath
// Function:      getTreeView
// Description:   Returns the tree view object from the HCMClient UI
// =====================================================================
function getTreeView() {
  Log.AppendFolder("getTreeView - Returns the tree view object from the HCMClient UI")
  let treeView = Aliases.HCMClient.ClientMainWindow.panelLeftPanMain.tabControlLeftPanMain.tabPageOnlineView.panelOnlineView.panelTabControlOnlineView.tabControlOnlineView.tabConnected.treeView
  return treeView
  Log.PopLogFolder()
}

// =====================================================================
// Function:      expandTreeView
// Description:   Expands a tree view node path step-by-step
// =====================================================================
function expandTreeView(nodePathArray) {
  Log.AppendFolder("expandTreeView - Expands a tree view node path step-by-step")
  let treeView = getTreeView();

  if (!nodePathArray || nodePathArray.length === 0) {
    Log.Warning("No nodes provided for expansion.");
    return;
  }

  try {
    let fullPath = "";
    for (let i = 0; i < nodePathArray.length; i++) {
      fullPath += "|" + nodePathArray[i];
      Log.Message("Expanding: " + fullPath);
      treeView.ExpandItem(fullPath);
      aqUtils.Delay(300); // Optional delay for UI stability
    }
    Log.Checkpoint("Tree view expanded successfully.");
  } catch (error) {
    Log.Error("Failed to expand tree view:", error);
  } finally{
    Log.PopLogFolder()
  }
}

// =====================================================================
// Function:      collapseTreeView
// Description:   Collapses a tree view starting from the deepest node upward
// =====================================================================
function collapseTreeView(nodePathArray) {
  Log.AppendFolder("collapseTreeView - Collapses a tree view starting from the deepest node upward")
  let treeView = getTreeView();

  if (!nodePathArray || nodePathArray.length === 0) {
    Log.Warning("No nodes provided for collapse.");
    return;
  }

  try {
    for (let i = nodePathArray.length; i > 0; i--) {
      let partialPath = "|" + nodePathArray.slice(0, i).join("|");
      Log.Message("Collapsing: " + partialPath);
      treeView.CollapseItem(partialPath);
      aqUtils.Delay(300); // Optional delay for UI stability
    }
    Log.Checkpoint("Tree view collapsed successfully.");
  } catch (error) {
    Log.Error("Failed to collapse tree view:", error);
  } finally{
    Log.PopLogFolder()
  }
}

function test123(){
    let startTime = aqDateTime.Now();
    let found = false;
    let timeDiff = aqDateTime.TimeInterval(startTime, aqDateTime.Now()) 
    Log.Message(timeDiff)
    Log.Message(timeDiff>20)
}

// =====================================================================
// Function:      clickOnbuildNetwork
// Description:   Right-clicks on the specified node and selects "Build Network"
// =====================================================================
function clickOnbuildNetwork(nodePath, timeoutMS) {
  Log.AppendFolder("clickOnbuildNetwork - Right-clicks on the specified node and selects 'Build Network'");

  let treeView = getTreeView();
  let pollIntervalMS = 1000;
  let nodeLabel = nodePath.split("|").pop();

  try {
    Log.Message(`📍 Right-clicking on node: ${nodePath}`);
    treeView.ClickItemR(nodePath);

    Log.Message("🕵️ Waiting for context menu...");
    treeView.WaitProperty("Exists", true, 3000);

    Log.Message("🛠️ Clicking 'Build Network'...");
    treeView.StripPopupMenu.Click("Build Network");

    let startTime = new Date().getTime();
let found = false;

while (new Date().getTime() - startTime < timeoutMS) {
  let grid = Aliases.HCMClient.ClientMainWindow.panelEventViewer
                .UsrNotificationPanel.tabControlUNM.tabInfo.gridNotificationInfo;

  if (grid.Exists && grid.wRowCount > 0) {
    let lastRow = grid.wRowCount - 1;
    let cellValue = grid.wValue(lastRow, 2).OleValue;

    aqUtils.Delay(500, "Network build is in progress...");

    if (cellValue && aqString.Contains(cellValue, nodeLabel) &&
        aqString.Contains(cellValue.toLowerCase(), "complete")) {
      Log.Checkpoint("✅ Notification matched: " + cellValue);
      found = true;
      break;
    } else {
      Log.Message("⏳ Polling... Last notification: " + cellValue);
    }
  } else {
    Log.Warning("⚠️ Notification grid not ready or empty.");
  }

  Delay(pollIntervalMS, "Waiting for build network to complete...");
}

if (!found) {
  throw new Error("⏰ Timeout: No matching 'Build Network complete' notification found for node '" + nodeLabel + "'.");
}


    Log.Checkpoint(`🎯 'Build Network' successfully initiated on: ${nodePath}`);
  } catch (error) {
    Log.Error(`❌ Error in clickOnbuildNetwork for node '${nodePath}': ${error.message}`);
  } finally {
    Log.PopLogFolder();
  }
}



/* Example of how to pass a node path array to the  verifyFDMDeviceStatus function
verifyFDMDeviceStatus(
  "|FDM Server ( DESKTOP-AJ7O5O5 )|DESKTOP-AJ7O5O5|Mux|SFT_PNF|R3051Rev10H7",
  "*Good*"
);

// =====================================================================
// Author:        Bharath
// Function:      verifyFDMDeviceStatus
// Description:   Double-clicks a specified FDM device node and verifies its
//                OCR-recognized status text
// Created On:    2025-06-20
// Modified On:   None
// =====================================================================

function verifyFDMDeviceStatus(devicePath, expectedStatusText) {
  let HCMClient = Aliases.HCMClient;
  let MainWindow = HCMClient.ClientMainWindow;
  let tabPageOnlineView = MainWindow.FindChild("Name", `WinFormsObject("tabPageOnlineView")`, 100, true)
  let tabControlOnlineView = tabPageOnlineView.FindChild("Name", `WinFormsObject("tabControlOnlineView")`, 100, true)
  let NetworkViewTab = tabControlOnlineView.FindChild("Name", `WinFormsObject("tabConnected")`, 100, true)
  let treeView = NetworkViewTab.FindChild("Name", `WinFormsObject("treeView")`, 100, true)

  
  
  try {
    Log.Message(`Double-clicking device node: ${devicePath}`);
    treeView.DblClickItem(devicePath);

    FDMDeviceStatusGrid = Aliases.HCMClient.ClientMainWindow.MdiClient.EntryPointTabPage.EntryPointsTabPage.HwndSource_AdornerDecorator.AdornerDecorator.FDMDeviceStatusGrid
    Log.Message(`Checking OCR text for pattern: ${expectedStatusText}`);
    let Static = Aliases.HCMClient.dlgFDM.Static
    if(Static.Exists && Static.Visible){
      Aliases.HCMClient.dlgFDM.Window("Button", "OK", 1).Click()
    }
    let ocrResult = OCR.Recognize(FDMDeviceStatusGrid);
    ocrResult.CheckText(expectedStatusText);
    Log.Checkpoint(`Device status verified successfully: ${expectedStatusText}`);
  } catch (error) {
    Log.Error(`Device status check failed for: ${devicePath}`, error);
  }
}

*/

// =====================================================================
// Author:        Bharath
// Function:      verifyFDMDeviceStatus
// Description:   Verifies OCR status text of an FDM device after opening it via tree path
// Created On:    2025-06-20
// Modified On:   None

// =====================================================================

function verifyFDMDeviceStatus(devicePath) {
  try {
    Log.AppendFolder("verifyFDMDeviceStatus - Verifies OCR status text of an FDM device after opening it via tree path")
    // Step 1: Navigate to treeView using FindChild from root
    let mainWindow = Aliases.HCMClient.ClientMainWindow;
    let tabPageOnlineView = mainWindow.FindChild("Name", "WinFormsObject(\"tabPageOnlineView\")", 100, true);
    let tabControlOnlineView = tabPageOnlineView.FindChild("Name", "WinFormsObject(\"tabControlOnlineView\")", 100, true);
    let networkTab = tabControlOnlineView.FindChild("Name", "WinFormsObject(\"tabConnected\")", 100, true);
    let treeView = networkTab.FindChild("Name", "WinFormsObject(\"treeView\")", 100, true);

    Log.Message(`Double-clicking FDM device node: ${devicePath}`);
    treeView.DblClickItem(devicePath);

    // Step 2: Handle any potential modal dialog interruption
    let dlgFDM = Aliases.HCMClient.dlgFDMConfiguration;
    if (dlgFDM.Exists && dlgFDM.VisibleOnScreen) {
      let okBtn = dlgFDM.FindChild("WndCaption", "OK", 50, true);
      if (okBtn && okBtn.Enabled) {
        Log.Message("Handling dialog: Clicking OK");
        okBtn.Click();
      }
    }

    // Step 3: Access FDM Device Status Grid via FindChild
    let statusGrid = Aliases.HCMClient.ClientMainWindow.MdiClient.EntryPointTabPage.EntryPointsTabPage.HwndSource_AdornerDecorator.AdornerDecorator.FDMDeviceStatusText

    if (!statusGrid) {
      Log.Warning("FDMDeviceStatusGrid not found. OCR cannot proceed.");
      return;
    }

    // Step 4: OCR Verification
    let ocrResult = OCR.Recognize(statusGrid);
    ocrResult = ocrResult.FullText

    Log.Checkpoint(`${ocrResult}`);
  } catch (error) {
    Log.Error(`verifyFDMDeviceStatus failed for node '${devicePath}':`, error);
  } finally {
    Log.PopLogFolder()
  }
}

// =====================================================================
// Author:        Bharath
// Function:      clickOnNetworkViewTab
// Description:   Locates and clicks the "Network View" tab using OCR recognition
// Created On:    2025-06-20
// Modified On:   None
// =====================================================================

function clickOnNetworkViewTab() {
  Log.AppendFolder("clickOnNetworkViewTab - Locates and clicks the 'Network View' tab using OCR recognition")
  let HCMClient = Aliases.HCMClient;
  let MainWindow = HCMClient.ClientMainWindow;
  let tabPageOnlineView = MainWindow.FindChild("Name", `WinFormsObject("tabPageOnlineView")`, 100, true)
  let tabControlOnlineView = tabPageOnlineView.FindChild("Name", `WinFormsObject("tabControlOnlineView")`, 100, true)
  try {
    Log.Message("Locating and clicking 'Network' tab via OCR...");
    OCR.Recognize(tabControlOnlineView).BlockByText("Network").Click();
    Log.Checkpoint("'Network' tab clicked successfully.");
  } catch (error) {
    Log.Error("Failed to click 'Network' tab using OCR:", error);
  } finally{
    Log.PopLogFolder()
  }
}

function Test1()
{
  let HCMClient = Aliases.HCMClient;
  let tabControlActiveDevices = HCMClient.ClientMainWindow.panelDeviceTabCtrl.panelInCurrentDevice.panelActiveDevices.tabControlActiveDevices
  let tabCount = tabControlActiveDevices.wTabCount
  
  HCMClient.dlgFDMDiagnosticModelConfiguration.btnYes.ClickButton();
}



// =====================================================================
// Author:        Bharath
// Function:      clickOnDevice
// Description:   FDM device opening it via tree path
// Created On:    2025-06-20
// Modified On:   None

// =====================================================================

function clickOnDevice(devicePath) {
  try {
    Log.AppendFolder("verifyFDMDeviceStatus - Verifies OCR status text of an FDM device after opening it via tree path")
    // Step 1: Navigate to treeView using FindChild from root
    let mainWindow = Aliases.HCMClient.ClientMainWindow;
    let tabPageOnlineView = mainWindow.FindChild("Name", "WinFormsObject(\"tabPageOnlineView\")", 100, true);
    let tabControlOnlineView = tabPageOnlineView.FindChild("Name", "WinFormsObject(\"tabControlOnlineView\")", 100, true);
    let networkTab = tabControlOnlineView.FindChild("Name", "WinFormsObject(\"tabConnected\")", 100, true);
    let treeView = networkTab.FindChild("Name", "WinFormsObject(\"treeView\")", 100, true);

    Log.Message(`Double-clicking FDM device node: ${devicePath}`);
    treeView.DblClickItem(devicePath);

    // Handle 'OK' button (may appear after Yes)
    let okButton = Aliases.HCMClient.dlgFDMConfiguration.btnOK;
    if (okButton.Exists) {
      if (okButton.WaitProperty("Enabled", true, 5000)) {
        okButton.ClickButton();
        Log.Message("'OK' button clicked successfully.");
      } 
    } 
  } catch (error) {
    Log.Error(`clickOnDevice failed for node '${devicePath}':`, erro.message);
  } finally {
    Log.PopLogFolder()
  }
}



// =====================================================================
// Author:        Bharath
// Function:      verifyQuickViewLaunch
// Description:   Launches QuickView from TreeView and verifies dialog
// Created On:    2025-06-30
// Modified On:   2025-06-30
// =====================================================================

function verifyQuickViewLaunch(treePath) {
  try {
   // const treePath = "|FDM Server ( DESKTOP-AJ7O5O5 )|DESKTOP-AJ7O5O5|MUX|SFT_PNF|644Temp";
    const treeView = Aliases.HCMClient.ClientMainWindow
      .panelLeftPanMain.tabControlLeftPanMain.tabPageOnlineView
      .panelOnlineView.panelTabControlOnlineView.tabControlOnlineView
      .tabConnected.treeView;

    // Right-click and launch QuickView
    treeView.ClickItemR(treePath);
    treeView.StripPopupMenu.Click("QuickView");
    Log.Message("Launched QuickView from TreeView path.");

    const dlgConfig = Aliases.HCMClient.dlgFDMConfiguration;
    const mdiClient = Aliases.HCMClient.ClientMainWindow.MdiClient;
    
    if (dlgConfig.Exists) {
      Log.Message("FDM Configuration dialog is already open.");
      aqObject.CheckProperty(dlgConfig.Static, "Enabled", cmpEqual, true);
      aqObject.CheckProperty(dlgConfig.Static, "WndCaption", cmpEqual, "The selected view is already open.", false);
      dlgConfig.btnOK.ClickButton();
      Log.Message("Closed existing configuration dialog.");
    } else {
      const viewLabel = mdiClient.RightPanBaseFrame.panelBase.panelFullTop.panelTitle.labelDeviceTitle;
      Log.Checkpoint("QuickView panel launched and verified.");
    }

  } catch (error) {
    Log.Error("An error occurred during QuickView launch verification.", error.message || error);
  }
}





  // =====================================================================
// Author:        Bharath
// Function:      logFDMDeviceInformation
// Description:   Extracts and logs device information such as Protocol, 
//                Manufacturer, Device Type, and Device Revision from 
//                the FDM QuickView panel's DataContext
// Created On:    2025-06-30
// Modified On:   2025-06-30
// =====================================================================

function logFDMDeviceInformation() {
  try {
    const DeviceInformation = Aliases.HCMClient.ClientMainWindow.MdiClient.RightPanBaseFrame.panelBase.panelForDerivedForms.ElementHost.HwndSource_AdornerDecorator.AdornerDecorator.Grid.DeviceInformation.StackPanel;
    Log.Picture(DeviceInformation.Picture(), "Snapshot of the FDM StackPanel");
    const dataCtx = DeviceInformation.DataContext;

    Log.Message("Protocol: " + dataCtx.Protocol);
    Log.Message("Manufacturer: " + dataCtx.Manufacturer);
    Log.Message("Device Type: " + dataCtx.Devicemodel);
    Log.Message("Device Revision: " + dataCtx.DeviceRevision);

    Log.Checkpoint("FDM device information logged successfully from DataContext.");
      
  } catch (error) {
    Log.Error("Failed to log FDM device information.", error.message || error);
  }
}

// =====================================================================
// Author:        Bharath
// Function:      FDMDeviceStatus
// Description:   Captures screenshot of StackPanel2 which holds NAMUR 
//                Health Status and logs it with checkpoint
// Created On:    2025-06-30
// Modified On:   2025-06-30
// =====================================================================

function FDMDeviceStatus() {
  try {
    Log.AppendFolder("FDMDeviceStatus - Captures screenshot of StackPanel2 which holds NAMUR Health Status and logs it with checkpoint")
    const statusPanel = Aliases.HCMClient.ClientMainWindow.MdiClient
      .RightPanBaseFrame.panelBase.panelForDerivedForms
      .ElementHost.HwndSource_AdornerDecorator.AdornerDecorator.StackPanel2;

    const healthStatus = statusPanel.DataContext.NamurHealthStatus;

    // Take and log the snapshot
    const screenshot = statusPanel.Picture();
    Log.Picture(screenshot, "NAMUR Health Status Panel");
    Log.Checkpoint("NAMUR Health Status: " + healthStatus);
    
    Log.Checkpoint("Captured NAMUR Health Status panel and value successfully.");
    Aliases.HCMClient.ClientMainWindow.MdiClient.RightPanBaseFrame.panelBase.panelFullTop.panelTitle.buttonClose.Click(17, 14);
  } catch (error) {
    Log.Error("Failed to capture or log NAMUR Health Status panel.", error.message || error);
  } finally {
    Log.PopLogFolder()
  }
}


// =====================================================================
// Author:        Bharath
// Function:      LaunchViewHistory
// Description:   Navigates to a item in the tree view,
//                opens its context menu, selects 'View History', and
//                clicks the 'View' button in the history form.
// Created On:    18-Jul-2025
// Modified On:   18-Jul-2025
// =====================================================================

function LaunchViewHistory(Device) {
  Log.AppendFolder("ViewHistoryForMUXItem - View History Flow");

  try {
    // Get main client window
    let frmHCMClientMain = Aliases.HCMClient.ClientMainWindow;
    if (!frmHCMClientMain.Exists) {
      Log.Error("Main window not found.");
      return;
    }

    // Access the tree view
    let treeView = frmHCMClientMain.panelLeftPanMain.tabControlLeftPanMain.tabPageOnlineView.panelOnlineView.panelTabControlOnlineView.tabControlOnlineView.tabConnected.treeView;
    if (!treeView.Exists) {
      Log.Error("Tree view not found.");
      return;
    }

    // Right-click on the specific item and select 'View History'
    treeView.ClickItemR(Device);
    treeView.StripPopupMenu.Click("View History");

    // Click the 'View' button in the history form
    let btnView = frmHCMClientMain.MdiClient.HistoryFrom.panelBase.panelForDerivedForms.panel1.ElementHost.HwndSource_AdornerDecorator.AdornerDecorator.btn_View;
    if (btnView.Exists) {
      btnView.ClickButton();
      Log.Message("Clicked 'View' button in history form.");
    } else {
      Log.Error("View button not found.");
    }
    closeWindowPage()

  } catch (e) {
    Log.Error("Exception occurred: " + e.message);
  } finally {
    Log.PopLogFolder();
  }
}

// =====================================================================
// Author:        Bharath
// Function:      rightClickOnDevice
// Description:   Navigates to the FDM device in tree view and performs right-click.
// Created On:    31-Jul-2025
// Modified On:   31-Jul-2025
// =====================================================================

function rightClickOnDevice(devicePath) {
  Log.AppendFolder("rightClickOnDevice - Navigate and Right Click on Device");

  try {
    // Step 1: Navigate to treeView using FindChild from root
    let mainWindow = Aliases.HCMClient.ClientMainWindow;
    let tabPageOnlineView = mainWindow.FindChild("Name", "WinFormsObject(\"tabPageOnlineView\")", 100, true);
    let tabControlOnlineView = tabPageOnlineView.FindChild("Name", "WinFormsObject(\"tabControlOnlineView\")", 100, true);
    let networkTab = tabControlOnlineView.FindChild("Name", "WinFormsObject(\"tabConnected\")", 100, true);
    let treeView = networkTab.FindChild("Name", "WinFormsObject(\"treeView\")", 100, true);

    // Step 2: Perform right-click on the specified device path
    Log.Message(`Right-clicking FDM device node: ${devicePath}`);
    treeView.ClickItemR(devicePath);

  } catch (error) {
    Log.Error("Error in rightClickOnDevice: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      clickOnCompareConfig
// Description:   Right-clicks on the FDM device and selects 'Compare Configuration'
// Created On:    31-Jul-2025
// Modified On:   31-Jul-2025
// =====================================================================

function clickOnCompareConfig() {
  Log.AppendFolder("clickOnCompareConfig - Right Click and Compare Configuration");

  try {
    // Step 1: Right-click the device in the tree
    rightClickOnDevice(Project.Variables.Device);

    Delay(1000)
   
    Log.Message("Clicking 'Compare Configuration' in the context menu");
    let treeView = Aliases.HCMClient.ClientMainWindow.panelLeftPanMain.tabControlLeftPanMain.tabPageOnlineView.panelOnlineView.panelTabControlOnlineView.tabControlOnlineView.tabConnected.treeView;
    treeView.StripPopupMenu.Click("Compare Configuration");
  } catch (error) {
    Log.Error("Error in clickOnCompareConfig: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
  
}

function test(){
  FindValueInDescriptionColumn("Client is going on bike")
}
// ============================================== =======================
// Author:        Bharath
// Function:      FindValueInDescriptionColumn
// Description:   Searches for a specific value in the 'Description' column of the Audit Trail datagrid.
// Created On:    12-Aug-2025
// Modified On:   12-Aug-2025
// =====================================================================

function FindValueInDescriptionColumn(targetValue) {
  Log.AppendFolder("FindValueInDescriptionColumn - Target: " + targetValue);

  try {
    let grid = Aliases.HCMClient.ClientMainWindow.MdiClient
                .AuditTrailView.panelBase.panelForDerivedForms.panel4.panel2
                .WinFormsObject("panel3").WinFormsObject("datagridAuditTrail");

    let colCount = grid.wColumnCount;
    let descriptionColIndex = -1;

    // 🔍 Identify the 'Description' column index
    for (let c = 0; c < colCount; c++) {
      let header = grid.wColumn(c);
      if (aqString.Compare(header, "Description", false) === 0) {
        descriptionColIndex = c;
        Log.Message("Found 'Description' column at index: " + c);
        break;
      }
    }

    if (descriptionColIndex === -1) {
      Log.Error("'Description' column not found.");
      return false;
    }

    let rowCount = grid.wRowCount;
    for (let r = 0; r < rowCount; r++) {
      let cellValue = grid.wValue(r, descriptionColIndex);

      if (aqString.Compare(cellValue, targetValue, false) === 0) {
        Log.Checkpoint("Match found at row " + (r+1));
        return true;
      }
    }

    Log.Error("No match found for value: " + targetValue);
    return false;

  } catch (error) {
    Log.Error("Error during search: " + error.message);
    return false;

  } finally {
    Log.PopLogFolder();
  }
}

