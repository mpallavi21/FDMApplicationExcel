//USEUNIT FDMCommonPage
//USEUNIT STDLib
// =====================================================================
// Author:        Bharath
// Function:      clickOnPlantAreaView
// Description:   Navigates to 'Plant Area View' via the 'View' menu and verifies the view is loaded.
// Created On:    23-June-2025
// Modified On:   
// =====================================================================
function clickOnPlantAreaView() {
  try {
    let HCMClient = Aliases.HCMClient;

    // Navigate to View > Plant Area View
    OCR.Recognize(HCMClient.ClientMainWindow.mainMenu).BlockByText("View").Click();
    OCR.Recognize(Aliases.HCMClient.DropDownForm.SubSmartControl).BlockByText("Plant Area View").Click();
    Log.Message("Clicked 'View > Plant Area View'.");

    // Wait until the shell title matches the expected view
    HCMClient.PlantAreaViewWindow.WaitProperty("WndCaption", "Plant Area View", 20000)
    let shellWindow = HCMClient.PlantAreaViewWindow.Shell;
    shellWindow.WaitProperty("WPFControlText", "Plant Area View", 20000);
    aqObject.CheckProperty(shellWindow, "WPFControlText", cmpEqual, "Plant Area View");
    HCMClient.HwndSource_ProgressView.ProgressView.WaitProperty("Exists",false,20000)
    Log.Message("'Plant Area View' loaded successfully.");

    
  } catch (error) {
    Log.Error("Failed to navigate to 'Plant Area View': " + error.message);
  }
}

// =====================================================================
// Author:        Bharath
// Function:      closePlantAreaView
// Description:   Waits for the 'Plant Area View' window's controls to be enabled 
//                and simulates a click to close the view.
// Created On:    23-June-2025
// Modified On:   
// =====================================================================
function closePlantAreaView() {
  try {
    Indicator.Hide()
    let HCMClient = Aliases.HCMClient;
    HCMClient.PlantAreaViewWindow.WaitProperty("Exists", true, 20000)

    let shellWindow = HCMClient.PlantAreaViewWindow.Shell;

    // Wait for the close control to be enabled
    if (shellWindow.WindowButtonCommands.WaitProperty("Enabled", true, 20000)) {
      shellWindow.Activate()
      window = shellWindow
      if (window.Exists && window.VisibleOnScreen) { 
          Aliases.HCMClient.PlantAreaViewWindow.Shell.WindowButtonCommands.Click(115, 28);
          
       } else {
          Log.Error("Window is not ready for interaction.");
        }

      Log.Message("Closed 'Plant Area View' successfully.");
    } else {
      Log.Error("'WindowButtonCommands' not enabled within timeout.");
    }
  } catch (error) {
    Log.Error("Failed to close 'Plant Area View': " + error.message);
  }
}



// =====================================================================
// Author:        Bharath
// Function:      clickOnAlertMonitoringDashboard
// Description:   Navigates to the 'Alert Monitoring Dashboard' via the 'View' menu
//                and confirms that the 'Alert Monitor' window is loaded.
// Created On:    23-June-2025
// Modified On:   
// =====================================================================
function clickOnAlertMonitoringDashboard() {
  try {
    let HCMClient = Aliases.HCMClient;

    // Navigate: View > Alert Monitoring Dashboard
    OCR.Recognize(HCMClient.ClientMainWindow.mainMenu).BlockByText("View").Click();
    OCR.Recognize(Aliases.HCMClient.DropDownForm.SubSmartControl).BlockByText("Alert Monitoring Dashboard").Click();
    Log.Message("Clicked 'View > Alert Monitoring Dashboard'.");

    // Wait for the Alert Monitor shell to appear
    HCMClient.AlertMonitorWindow.WaitProperty("Exists", true, 20000);
    let shell = HCMClient.AlertMonitorWindow.Shell;
    shell.WaitProperty("WPFControlText", "Alert Monitor", 20000);
    shell.Activate()
    shell.WaitProperty("WPFControlText", "Alert Monitor", 20000);
    aqObject.CheckProperty(shell, "WPFControlText", cmpEqual, "Alert Monitor");
    Log.Message("'Alert Monitor' view loaded successfully.");

    

  } catch (error) {
    Log.Error("Failed to open 'Alert Monitoring Dashboard': " + error.message);
  }
}


// =====================================================================
// Author:        Bharath
// Function:      closeAlertMonitorView
// Description:   Closes the 'Alert Monitor' view by interacting with its shell window.
// Created On:    23-June-2025
// Modified On:   
// =====================================================================
function closeAlertMonitorView() {
  try {
    Log.AppendFolder("closeAlertMonitorView - Closes the 'Alert Monitor' view by interacting with its shell window.")
    let HCMClient = Aliases.HCMClient;
    HCMClient.AlertMonitorWindow.WaitProperty("Exists", true, 20000);
    let shell = HCMClient.AlertMonitorWindow.Shell;
    if (shell.WindowButtonCommands.WaitProperty("Enabled", true, 20000)) {
      let x = shell.WindowButtonCommands.Width - 15; // Approximate X for the ❌ button
      let y = 10;                     // Approximate Y for the ❌ button
      shell.WindowButtonCommands.Click(x, y);
      Log.Message("'Alert Monitor' view closed successfully.");
    } else {
      Log.Warning("'Alert Monitor' window controls were not enabled in time.");
    }
  } catch (error) {
    Log.Error("Failed to close 'Alert Monitor' view: " + error.message);
  } finally {
    Log.PopLogFolder()
  }
}



function Test1()
{
  Aliases.HCMClient.AlertMonitorWindow.Shell.WindowButtonCommands.Click(154, 19);
}

// =====================================================================
// Author:        Bharath
// Function:      openDashboardFromTreeItem
// Description:   Opens Dashboard from specified tree view path, expands child views,
//                activates main form, and closes the window.
// Created On:    22-Jul-2025
// Modified On:   22-Jul-2025
// =====================================================================

function openDashboardFromTreeItem(treePath) {
  Log.AppendFolder("openDashboardFromTreeItem - Navigate Tree & Open Dashboard");

  try {
    let frmHCMClientMain = Aliases.HCMClient.ClientMainWindow;
    let treeView = frmHCMClientMain.panelLeftPanMain
      .tabControlLeftPanMain.tabPageOnlineView.panelOnlineView
      .panelTabControlOnlineView.tabControlOnlineView.tabConnected.treeView;

    // 🌲 Right-click the specified tree item and select 'Dashboard'
    treeView.ClickItemR(`|${treePath}`);
    Log.Message("Right-clicked tree item: " + treePath);

    treeView.StripPopupMenu.Click("Dashboard");
    Log.Message("Selected 'Dashboard' from context menu.");

    // 🧩 Expand grid child views
    let gridControl = frmHCMClientMain.MdiClient.Dashboard.panelBase
      .panelForDerivedForms.panel1.tabControlDashboard.tabPageNetworkInfo.gridControlNetworkInfo;

    gridControl.ExpandChildView(0);
    gridControl.wChildView(0, 0).ExpandChildView(0);
    Log.Message("Expanded grid child views for network info.");

    // 🖥️ Activate window and close
    frmHCMClientMain.Activate();
    CloseWindow();
    Log.Message("Dashboard window closed.");

  } catch (error) {
    Log.Error("Exception in openDashboardFromTreeItem: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}
