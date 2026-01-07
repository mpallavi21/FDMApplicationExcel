


// =====================================================================
// Author:        Bharath
// Function:      ClickOnlineViewTab
// Description:   Uses OCR to locate and click the "Online View" tab.
// Created On:    04-Aug-2025
// Modified On:   04-Aug-2025
// =====================================================================

function ClickOnlineViewTab() {
  Log.AppendFolder("ClickOnlineViewTab");

  try {
    let tabControl = Aliases.HCMClient.ClientMainWindow.panelLeftPanMain.tabControlLeftPanMain;
    let ocrResult = OCR.Recognize(tabControl);
    let tabBlock = ocrResult.BlockByText("Online View");

    if (tabBlock != null) {
      tabBlock.Click();
      Log.Checkpoint("Clicked 'Online View' tab successfully.");
      return true;
    } else {
      Log.Warning("'Online View' tab not found via OCR.");
      return false;
    }

  } catch (error) {
    Log.Error("Error in ClickOnlineViewTab: " + error.message);
    return false;

  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      ClickDeviceStateViewTab
// Description:   Locates and clicks "Device State View" tab using OCR.
// Created On:    04-Aug-2025
// Modified On:   04-Aug-2025
// =====================================================================

function ClickDeviceStateViewTab() {
  Log.AppendFolder("ClickDeviceStateViewTab");

  try {
    let tabControl = Aliases.HCMClient.ClientMainWindow.panelLeftPanMain.tabControlLeftPanMain.tabPageOnlineView.panelOnlineView.panelTabControlOnlineView.tabControlOnlineView;

    let ocrResult = OCR.Recognize(tabControl);
    let tabBlock = ocrResult.BlockByText("*State*");

    if (tabBlock != null) {
      tabBlock.Click();
      Log.Checkpoint("Clicked 'Device State View' tab successfully.");
      return true;
    } else {
      Log.Warning("'Device State View' tab not found via OCR.");
      return false;
    }

  } catch (error) {
    Log.Error("Error in ClickDeviceStateViewTab: " + error.message);
    return false;

  } finally {
    Log.PopLogFolder();
  }
}

// =====================================================================
// Author:        Bharath
// Function:      ExpandDeviceStatusNodes
// Description:   Expands key status nodes in the Online View tree.
// Created On:    04-Aug-2025
// Modified On:   04-Aug-2025
// =====================================================================

function ExpandDeviceStatusNodes() {
  Log.AppendFolder("ExpandDeviceStatusNodes");

  try {
    let treeView = Aliases.HCMClient.ClientMainWindow.panelLeftPanMain.tabControlLeftPanMain
                     .tabPageOnlineView.panelOnlineView.panelTabControlOnlineView
                     .tabControlOnlineView.tabSpare.treeView;

    let nodesToExpand = ["|Device Usage", "|Calibration Status", "|Device Health"];
    for (let node of nodesToExpand) {
      treeView.ExpandItem(node);
      Log.Checkpoint("Expanded node: " + node);
    }

    return true;

  } catch (error) {
    Log.Error("Error in ExpandDeviceStatusNodes: " + error.message);
    return false;

  } finally {
    Log.PopLogFolder();
  }
}

function ClickCalibrationStatusChange()
{
  let HCMClient = Aliases.HCMClient;
  let frmHCMClientMain = HCMClient.ClientMainWindow;
  frmHCMClientMain.panelLeftPanMain.tabControlLeftPanMain.tabPageOnlineView.panelOnlineView.panelTabControlOnlineView.tabControlOnlineView.tabSpare.treeView.DblClickItem("|Calibration Status|Not set");
  frmHCMClientMain.MdiClient.DetailedViewForm.panelBase.panelForDerivedForms.fpSpread1.Click(1598, 48);
  HCMClient.Form.ListBox.ClickItem("Good");
}

