//USEUNIT ClientLoginModule
//USEUNIT STDLib
//USEUNIT NetworkTreeViewPage
//USEUNIT ClientLoginModule
//USEUNIT FDMCommonPage
//USEUNIT DeviceStateViewPage
//USEUNIT SettingsPage
//USEUNIT GenericMethods
//USEUNIT EntryPointPage
//USEUNIT offlineViewPage
//USEUNIT DashboardPages
//USEUNIT DiagnosticPage
//USEUNIT ImportAndExportPages


function launchFDMClientApplication(ServerName, Username, Password) {
  Log.AppendFolder("launchFDMClientApplication");

  let status = "Pass";

  try {
    launchFDMClient(ServerName, Username, Password);
  } catch (e) {
    Log.Error("launchFDMClientApplication failed: " + e.message);
    status = "Fail";
  }

  WriteResult("launchFDMClientApplication " + status, status, "Pass");

  Log.PopLogFolder();
}


function terminateFDMClientApplication() {
  Log.AppendFolder("terminateFDMClientApplication");

  let status = "Pass";

  try {
    terminateFMDClient();
  } catch (e) {
    Log.Error("terminateFDMClientApplication failed: " + e.message);
    status = "Fail";
  }

  WriteResult("terminateFDMClientApplication " + status, status, "Pass");

  Log.PopLogFolder();
}









// =====================================================================
// Author:        Bharath
// Function:      FDMGR5956
// Description:   validate FDM device property option in entry point screen
// Created On:    2025-06-20
// Modified On:   None
// =====================================================================

function CheckFDMDevicePropertyOption(DeviceName) {        
  Log.AppendFolder("CheckFDMDevicePropertyOption - Validate FDM Device Property Option in Entry Point Screen");

  let status = "Pass";

  try {
    // Step 1: Click on the specified device
    clickOnDevice(DeviceName);

    // Step 2: Access the adorner decorator and validate property option
    let adornerDecorator = Aliases.HCMClient.ClientMainWindow.MdiClient.CDeviceHomePage.panelBase
      .panelForDerivedForms.Panel.MagicTabControlEx.EntryPointTabPage.CDeviceScreen.m_pnlDeviceScreen
      .TabControl.EntryPointsTabPage.ElementHost.HwndSource_AdornerDecorator.AdornerDecorator.ScrollViewer;

    aqObject.CheckProperty(
      adornerDecorator.HyperlinkFdmDeviceProperties,
      "WPFControlText",
      cmpEqual,
      "FDM Device properties"
    );

    // Step 3: Close window and confirm
    CloseWindow();
    clickOnConfirmFDMButton();

    Log.Checkpoint("✅ CheckFDMDevicePropertyOption passed: Device property option verified successfully.");
  } catch (error) {
    Log.Error("❌ CheckFDMDevicePropertyOption failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("CheckFDMDevicePropertyOption " + status, status, "Pass");
    Log.PopLogFolder();
  }
}


function QuickViewOfDevice(Device) {
  Log.AppendFolder("QuickViewOfDevice - Verify Quick View Launch and Log Device Info");

  let status = "Pass";

  try {
    // Step 1: Verify Quick View launches for the device
    verifyQuickViewLaunch(Device);

    // Step 2: Log diagnostic/device information
    logFDMDeviceInformation();
    
    closeWindowPage()

    Log.Checkpoint("✅ QuickViewOfDevice passed: Quick View verified and device info logged.");
  } catch (error) {
    Log.Error("❌ QuickViewOfDevice failed during Quick View verification or logging: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("QuickViewOfDevice " + status, status, "Pass");
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      ValidateDeviceHistoryRecords
// Description:   Verify all created history for the device in "View history"
// =====================================================================

function ValidateDeviceHistoryRecords(DeviceName) {   
  Log.AppendFolder("ValidateDeviceHistoryRecords - Verify Device History Records");

  let status = "Pass";

  try {
    // Step 1: Launch and verify history view for the device
    LaunchViewHistory(DeviceName);

    Log.Checkpoint("✅ ValidateDeviceHistoryRecords passed: View History launched successfully.");
  } catch (error) {
    Log.Error("❌ ValidateDeviceHistoryRecords failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("ValidateDeviceHistoryRecords " + status, status, "Pass");
    Log.PopLogFolder();
  }
}




// =====================================================================
// Author:        Bharath
// Function:      AuditTrail
// Description:   Triggers audit trail view for a selected tooltip,
//                applies 'All' filters and clicks the 'View' button.
// Created On:    21-Jul-2025
// Modified On:   21-Jul-2025
// =====================================================================

function ViewAuditTrailForDevice(targetItem, ActionType) {
  Log.AppendFolder("ViewAuditTrailForDevice - Audit Trail Flow");

  let status = "Pass";

  try {
    let treeView = Aliases.HCMClient.ClientMainWindow.panelLeftPanMain.tabControlLeftPanMain.tabPageOnlineView.panelOnlineView.panelTabControlOnlineView.tabControlOnlineView.tabConnected.treeView;

    treeView.ClickItemR(targetItem);
    Log.Message("Right-clicked item for context menu.");
    Delay(1000);

    treeView.StripPopupMenu.Click("View Audit Trail");

    // Apply filters in Audit Trail view
    let groupBox = Aliases.HCMClient.ClientMainWindow.MdiClient.AuditTrailView.panelBase.panelForDerivedForms.panel4.panel2.groupBox1;

    if (groupBox.Exists) {
      let listBox = groupBox.ActionTypeListBox;
      listBox.ClickItem(ActionType);
      OCR.Recognize(groupBox.ViewButton).BlockByText("View").Click();
      Delay(1000);
      Log.Message("Applied filters and clicked View in Audit Trail.");
    } else {
      throw new Error("Audit Trail group box not found.");
    }

    closeWindowPage()

  } catch (e) {
    Log.Error("Exception in ViewAuditTrailForDevice: " + e.message);
    status = "Fail";
  }

  WriteResult("ViewAuditTrailForDevice " + status, status, "Pass");
  Log.PopLogFolder();
}



// =====================================================================
// Author:        Bharath
// Function:      BuildNetwork
// Description:   Executes the Build Network operation on the Mux node
//                as part of test cases FDMGR3890 and FDMGR3891
// Created On:    2025-06-20
// Modified On:   None
// =====================================================================

function BuildNetwork(NetworkName,timeOut) {
  Log.AppendFolder("BuildNetwork - Executes the Build Network operation on the Mux node as part of test cases BuildNetwork_HW Mux");

  let status = "Pass";

  try {
    ClickOnlineViewTab();
    clickOnNetworkViewTab();
    clickOnbuildNetwork(NetworkName,timeOut);

    Log.Checkpoint("BuildNetwork executed successfully.");
  } catch (error) {
    Log.Error("Error occurred in BuildNetwork: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("BuildNetwork " + status, status, "Pass");
    Log.PopLogFolder();
  }
}



// =====================================================================
// Author:        Bharath
// Function:      Device_Explicit_Lock
// Description:   Locks a device, attempts configuration, handles warning, unlocks, and retries configuration. 
// =====================================================================

function Device_Explicit_Lock(DeviceName) {
  Log.AppendFolder("Device_Explicit_Lock - Explicit Device Lock Workflow");

  let status = "Pass";

  try {
    // Step 1: Navigate to Online View
    ClickOnlineViewTab();

    // Step 2: Open Network View
    clickOnNetworkViewTab();

    // Step 3: Access the tree view
    let treeView = Aliases.HCMClient.ClientMainWindow.panelLeftPanMain
                     .tabControlLeftPanMain.tabPageOnlineView.panelOnlineView
                     .panelTabControlOnlineView.tabControlOnlineView.tabConnected.treeView;

    if (!treeView.Exists) {
      Log.Error("❌ TreeView not found.");
      status = "Fail";
      return;
    }

    // Step 4: Lock the device
    treeView.ClickItem(DeviceName);
    Log.Message("🔒 Clicking item: " + DeviceName);

    treeView.ClickItemR(DeviceName);
    Delay(1000);
    treeView.StripPopupMenu.Click("Lock");

    // Step 5: Configure device with DTM (Online)
    treeView.ClickItemR(DeviceName);
    treeView.StripPopupMenu.Click("Configure with|DTM (Online)");
    clickOnConfirmFDMButton();

    Log.Checkpoint("✅ Device_Explicit_Lock passed: Device locked and configured successfully.");
  } catch (error) {
    Log.Error("❌ Device_Explicit_Lock failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("Device_Explicit_Lock " + status, status, "Pass");
    Log.PopLogFolder();
  }
}


function Device_Explicit_UnLock(DeviceName) {
  Log.AppendFolder("Device_Explicit_UnLock - Explicit Device Unlock Workflow");

  let status = "Pass";

  try {
    // Step 1: Navigate to Online View
    ClickOnlineViewTab();

    // Step 2: Open Network View
    clickOnNetworkViewTab();

    // Step 3: Access the tree view
    let frmHCMClientMain = Aliases.HCMClient.ClientMainWindow;
    let treeView = frmHCMClientMain.panelLeftPanMain.tabControlLeftPanMain.tabPageOnlineView
                     .panelOnlineView.panelTabControlOnlineView.tabControlOnlineView.tabConnected.treeView;

    // Step 4: Unlock the device
    treeView.ClickItemR(DeviceName);
    treeView.StripPopupMenu.Click("Unlock");

    // Step 5: Retry configuration with DTM (Online)
    treeView.ClickItemR(DeviceName);
    treeView.StripPopupMenu.Click("Configure with|DTM (Online)");

    // Step 6: Handle manual DTM selector if cancel button exists
    let manualDtmSelector = Aliases.HCMClient.ManualDtmSelector;
    if (manualDtmSelector.panel1.btnCancel.Exists) {
      manualDtmSelector.panel1.btnCancel.Click();
    }

    Log.Checkpoint("✅ Device_Explicit_UnLock passed: Device successfully unlocked and configured with DTM.");
  } catch (error) {
    Log.Error("❌ Device_Explicit_UnLock failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("Device_Explicit_UnLock " + status, status, "Pass");
    Log.PopLogFolder();
  }
}

// =====================================================================
// Author:        Bharath
// Function:      LogUserAction
// Description:   Automates the process of logging a user action in the Audit Trail,
//                dynamically generates a unique description using the device name and timestamp,
//                and verifies the entry in the Audit Trail grid.

// =====================================================================
function LogUserAction(DeviceName) {
  Log.AppendFolder("LogUserAction");

  try {
    ClickOnlineViewTab();
    clickOnNetworkViewTab();
    
    let HCMClient = Aliases.HCMClient;
    let treeView = HCMClient.ClientMainWindow.panelLeftPanMain
                    .tabControlLeftPanMain.tabPageOnlineView.panelOnlineView
                    .panelTabControlOnlineView.tabControlOnlineView
                    .tabConnected.treeView;

    // 🌲 Right-click and log user action
    treeView.ClickItemR(DeviceName);
    treeView.StripPopupMenu.Click("Log User Action");
    
    let AuditDescription = "User able to enter the text in description field " + Math.floor(aqDateTime.Now() / 1000);

    // 📝 Fill in Description and Reason
    let auditTrailUserAction = HCMClient.AuditTrailUserAction;
    auditTrailUserAction.DescriptionTextBox.TextBoxArea.Keys(AuditDescription);

    let reasonBox = auditTrailUserAction.ReasonTextBox.TextBoxArea;
    reasonBox.Click(39, 32);
    reasonBox.Keys("Log User Action");

    // ✅ Confirm action
    OCR.Recognize(auditTrailUserAction.OKButton).BlockByText("OK").Click();

    // 🔍 View Audit Trail and verify entry
    treeView.ClickItemR(DeviceName);
    treeView.StripPopupMenu.Click("View Audit Trail");

    let isLogged = FindValueInDescriptionColumn(AuditDescription);
    Log.Message("Audit entry verification: " + isLogged);

    // 🧹 Cleanup
    CloseWindow();

  } catch (error) {
    Log.Error("Error in LogUserAction15798: " + error.message);

  } finally {
    Log.PopLogFolder();
  }
}

// =====================================================================
// Author:        Bharath
// Function:      MuxConfig_MTL15961
// Description:   Configures MUX device, updates text field, and sends review.
// Created On:    13-Aug-2025
// =====================================================================
function MuxConfig_MTL15961() {
  Log.AppendFolder("MuxConfig_MTL15961");

  try {
    // 🌐 Navigate to Online View and build network
    ClickOnlineViewTab();
    clickOnNetworkViewTab();
    BuildNetwork();
    clickOnDevice(Project.Variables.Device);
    Log.Message("Device selected: " + Project.Variables.Device);

    let HCMClient = Aliases.HCMClient;
    let tabPage = HCMClient.ClientMainWindow.MdiClient.EntryPointTabPage;

    // 🔍 Open FDM Device Properties
    tabPage.EntryPointsTabPage.HwndSource_AdornerDecorator.AdornerDecorator.HyperlinkFdmDeviceProperties.Click();
    Log.Message("FDM Device Properties opened.");

    let adornerDecorator = tabPage.FDM_Device_Properties.ElementHost.HwndSource_AdornerDecorator.AdornerDecorator;
    let scrollViewer = adornerDecorator.ScrollViewer;

    // 📝 Scroll to top and update text field
    scrollViewer.VScroll.Pos = 0;
    let textBox = scrollViewer.TextBox;
    textBox.Click(121, 16);
    let timestamp = Math.floor(aqDateTime.Now() / 1000);
    textBox.SetText(`No Data available ${timestamp}`);
    Log.Message("Text field updated with timestamp: " + timestamp);

    // 📤 Submit review
    adornerDecorator.ButtonReviewSend.ClickButton();
    let previewDialog = HCMClient.HwndSource_PreviewDialog.PreviewDialog;
    previewDialog.btn_Send.ClickButton();
    previewDialog.Rectangle.Click(6, 14);
    Log.Message("Review submitted.");

    // ❎ Close window and confirm
    CloseWindow();
    clickOnConfirmFDMButton();
    Log.Message("Window closed and confirmation clicked.");

  } catch (error) {
    Log.Error("Error in MuxConfig_MTL15961: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}

// =====================================================================
// Author:        Bharath
// Function:      muxconfig_pnf15962
// Description:   Configures MUX device, updates text field, and sends review.
// Created On:    13-Aug-2025
// =====================================================================
function muxconfig_pnf15962() {
  Log.AppendFolder("muxconfig_pnf15962");

  try {
    // 🌐 Navigate to Online View and build network
    ClickOnlineViewTab();
    clickOnNetworkViewTab();
    BuildNetwork();
    clickOnDevice(Project.Variables.Device);
    Log.Message("Device selected: " + Project.Variables.Device);

    let HCMClient = Aliases.HCMClient;
    let tabPage = HCMClient.ClientMainWindow.MdiClient.EntryPointTabPage;

    // 🔍 Open FDM Device Properties
    tabPage.EntryPointsTabPage.HwndSource_AdornerDecorator.AdornerDecorator.HyperlinkFdmDeviceProperties.Click();
    Log.Message("FDM Device Properties opened.");

    let adornerDecorator = tabPage.FDM_Device_Properties.ElementHost.HwndSource_AdornerDecorator.AdornerDecorator;
    let scrollViewer = adornerDecorator.ScrollViewer;

    // 📝 Scroll to top and update text field
    scrollViewer.VScroll.Pos = 0;
    let textBox = scrollViewer.TextBox;
    textBox.Click(121, 16);
    let timestamp = Math.floor(aqDateTime.Now() / 1000);
    textBox.SetText(`No Data available ${timestamp}`);
    Log.Message("Text field updated with timestamp: " + timestamp);

    // 📤 Submit review
    adornerDecorator.ButtonReviewSend.ClickButton();
    let previewDialog = HCMClient.HwndSource_PreviewDialog.PreviewDialog;
    previewDialog.btn_Send.ClickButton();
    previewDialog.Rectangle.Click(6, 14);
    Log.Message("Review submitted.");

    // ❎ Close window and confirm
    CloseWindow();
    clickOnConfirmFDMButton();
    Log.Message("Window closed and confirmation clicked.");

  } catch (error) {
    Log.Error("Error in muxconfig_pnf15962 " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      OptionsFunction15817
// Description:   Opens device options, selects a specific DTM package,
//                and configures the device with DTM (Online).

// =====================================================================

function OptionsFunction(DeviceName) {    
  Log.AppendFolder("OptionsFunction - Device Options Workflow");

  let status = "Pass";

  try {
    // === Step 1: Access tree view in Online View ===
    let HCMClient = Aliases.HCMClient;
    let treeView = HCMClient.ClientMainWindow.panelLeftPanMain.tabControlLeftPanMain.tabPageOnlineView.panelOnlineView.panelTabControlOnlineVie.tabControlOnlineView.tabConnected.treeView;

    // === Step 2: Open device options dialog ===
    treeView.ClickItemR(DeviceName);
    treeView.StripPopupMenu.Click("Options");

    let deviceOptionsDlg = HCMClient.DeviceOptionsDlg;

    // === Step 3: Open DTM Info link ===
    deviceOptionsDlg.groupBox2.linkLabel_DTMInfo.ClickLink(0);

    let manualDtm_PackageSelector = HCMClient.ManualDtm_PackageSelector;
    aqObject.CheckProperty(manualDtm_PackageSelector, "Enabled", cmpEqual, true);

    // === Step 4: Select DTM package ===
    let tabControl = manualDtm_PackageSelector.tabControl1;
    tabControl.ClickTab("DTM Selection Dialog");
    tabControl.tabPage1.ManualDtmSelectorPanel.groupBox1.lvwDtmList.ClickItem("644 V07.01 *", 0);

    OCR.Recognize(manualDtm_PackageSelector.btnOk).BlockByText("OK").Click();

    // === Step 5: Confirm device options ===
    deviceOptionsDlg.btnOK.Click(31, 17);

    // === Step 6: Configure device with DTM (Online) ===
    let frmHCMClientMain = HCMClient.ClientMainWindow;
    treeView = frmHCMClientMain.panelLeftPanMain.tabControlLeftPanMain.tabPageOnlineView.panelOnlineView.panelTabControlOnlineView.tabControlOnlineView.tabConnected.treeView;

    treeView.ClickItemR(DeviceName);
    treeView.StripPopupMenu.Click("Configure with|DTM (Online)");

    aqObject.CheckProperty(frmHCMClientMain.MdiClient.DtmForm.panelBase.panelForDerivedForms.DTMTabView.panelConfiguration.tabControl1.TabPage.panelDtmStartup,"Enabled",cmpEqual,true);

    // === Step 7: Final cleanup ===
    CloseWindow();
    clickOnConfirmFDMButton();

    Log.Checkpoint("✅ OptionsFunction passed: Device options configured successfully.");
  } catch (error) {
    Log.Error("❌ OptionsFunction failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("OptionsFunction " + status, status, "Pass");
    Log.PopLogFolder();
  }
}


//USEUNIT DrFDMPages

// =====================================================================
// Author:        Bharath
// Function:      startDRFDM
// Description:   Starts DR FDM services, executes workflow, and terminates app.

// =====================================================================

function startServicesDRFDM() {
  Log.AppendFolder("startDRFDM - Full DR FDM Cycle");

  let status = "Pass";

  try {
    // Step 1: Start services and workflow
    startServices();
    Log.Message("Services started and workflow triggered.");

    // Step 2: Terminate DR FDM
    terminateDRFDM();
    Log.Message("DR FDM terminated successfully.");

  } catch (error) {
    Log.Error("Error in startDRFDM: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("startServicesDRFDM " + status, status, "Pass");
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      stopDRFDM
// Description:   stops DR FDM services, executes workflow, and terminates app.
// =====================================================================

function stopServicesDRFDM() {
  Log.AppendFolder("stopDRFDM - Full DR FDM Cycle");

  let status = "Pass";

  try {
    // Step 1: Stop services and workflow
    stopServices();
    Log.Message("Services stopped and workflow triggered.");

    // Step 2: Terminate DR FDM
    terminateDRFDM();
    Log.Message("DR FDM terminated successfully.");

  } catch (error) {
    Log.Error("Error in stopDRFDM: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("stopServicesDRFDM " + status, status, "Pass");
    Log.PopLogFolder();
  }
}

function collectLogsFromDrFDM() {
  Log.AppendFolder("collectLogsFromDrFDM");

  let status = "Pass";

  try {
    checkCollectAndProceedToFinalForm();
    Log.Message("Log collection from DR FDM completed.");
  } catch (error) {
    Log.Error("Error during log collection from DR FDM: " + error.message);
    status = "Fail";
  }

  WriteResult("collectLogsFromDrFDM " + status, status, "Pass");
  Log.PopLogFolder();
}



function clickNetworkTab() {
  Log.AppendFolder("clickNetworkTab");

  let status = "Pass";

  try {
    clickOnNetworkViewTab()

  } catch (error) {
    Log.Error("Error in clickNetworkTab: " + error.message);
    status = "Fail";
  }

  WriteResult("clickNetworkTab " + status, status, "Pass");
  Log.PopLogFolder();
}

function ClickOnlineView() {
  Log.AppendFolder("ClickOnlineView");

  let status = "Pass";

  try {
    ClickOnlineViewTab()

  } catch (error) {
    Log.Error("Error in ClickOnlineView " + error.message);
    status = "Fail";
  }

  WriteResult("ClickOnlineView " + status, status, "Pass");
  Log.PopLogFolder();
}

//USEUNIT LibraryPages

function AddDD(filePath, fileType) {
  Log.AppendFolder("AddDD - Validate DD Package Addition UI");

  let status = "Pass";

  try {
    // Navigate and perform DD Package addition
    openManageDDPackagesSection();
    clickAddDDPackageButton();
    selectDDFileTypeFromDropdown(fileType);
    uploadDDPackageFile(Project.Path, filePath);
    clickAddToLibraryButton();

    // Close relevant popups and exit
    clickAdd_DDPackagePopUpCloseButton();
    clickManage_DDPackagePopUpCloseButton();

    Log.Message("DD package added and exited successfully.");
    
  } catch (error) {
    Log.Error("AddDD failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("AddDD " + status, status, "Pass");
    Log.PopLogFolder();
  }
}

// =====================================================================
// Author:        Bharath
// Function:      DeleteDD
// Description:   Deletes a DD package for the device  under HART protocol
//                by navigating the DD management section, selecting filters, deleting the entry,
//                and terminating the client application.

// =====================================================================

function DeleteDD(Protocol, Manufacturer, DeviceType, targetdeviceRevision, targetDDpackageVersion) {
  Log.AppendFolder("DeleteDD - Device Description Package Deletion");

  let status = "Pass";

  try {
    // Navigate to DD package section
    openManageDDPackagesSection();
    Log.Message("Opened Manage DD Packages section.");

    // Select filters for deletion
    selectProtocol(Protocol);
    Log.Message("Protocol selected: " + Protocol);

    selectManufacturer(Manufacturer);
    Log.Message("Manufacturer selected: " + Manufacturer);

    selectDeviceType(DeviceType);
    Log.Message("Device type selected: " + DeviceType);

    // Delete the target DD package using revision numbers
    findDDAndClickDeleteRow(DeviceType, targetdeviceRevision, targetDDpackageVersion);
    Log.Message("Requested DD deletion for " + DeviceType + ", Rev " + targetdeviceRevision + "." + targetDDpackageVersion);

    // Close DD Package popup
    clickManage_DDPackagePopUpCloseButton();
    Log.Message("Closed DD Package popup.");

  } catch (error) {
    Log.Error("Exception in DeleteDD: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("DeleteDD " + status, status, "Pass");
    Log.PopLogFolder();
  }
}




// =====================================================================
// Author:        Bharath
// Function:      UpdateDTMLibrary
// Description:   Navigates through the Library menu, updates DTM Library,
//                handles confirmation dialogs, and exits gracefully.
// Created On:    31-Jul-2025
// Modified On:   31-Jul-2025
// =====================================================================

function UpdateDTMLibrary() {   
  let HCMClient = Aliases.HCMClient;
  Log.AppendFolder("UpdateDTMLibrary");

  let status = "Pass";

  try {
    // Step 1: Click on 'Library' menu
    OCR.Recognize(HCMClient.ClientMainWindow.mainMenu).BlockByText("Library").Click();
    Log.Message("Clicked 'Library' menu");

    // Step 2: Select 'Manage DTM Library'
    let DropDownForm = HCMClient.DropDownForm
    if (DropDownForm.WaitProperty("VisibleOnScreen", true, 15000)) {
      let ctrl = DropDownForm.SubSmartControl;
      if (ctrl.WaitProperty("VisibleOnScreen", true, 15000)) {
        let block = OCR.Recognize(ctrl).BlockByText("Manage DTM Library");
        if (block != null) {
          block.Click();
          Log.Message("Clicked 'Manage DTM Library' via OCR.");
        } else {
          Log.Warning("OCR could not find 'Manage DTM Library'.");
        }
      }
    }

    Log.Message("Selected 'Manage DTM Library'");

    let manageDtmLibrary = HCMClient.ManageDtmLibrary;

    // Step 3: Click 'Update' button
    manageDtmLibrary.btnUpdate.Click();
    Log.Message("Clicked 'Update' button");

    // Step 4 & 5: Confirm dialog twice
    clickOnConfirmFDMButton();
    clickOnConfirmFDMButton();

    // Step 6: Wait for update process
    let lblWait = Aliases.HCMClient.ManageDtmLibrary.lblWait;
    lblWait.WaitProperty("Text", "*Please wait*", 25000);

    // Step 7: Cancel the dialog
    manageDtmLibrary.CancelBtn.WaitProperty("Enabled", true, 25000);
    manageDtmLibrary.CancelBtn.Click();

    // Step 8: Final confirm dialog
    clickOnConfirmFDMButton();

    Log.Checkpoint("✅ UpdateDTMLibrary passed: DTM Library update workflow completed successfully.");
  } catch (error) {
    Log.Error("❌ UpdateDTMLibrary failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("UpdateDTMLibrary " + status, status, "Pass");
    Log.PopLogFolder();
  }
}


//USEUNIT AttachDetachPages

// =====================================================================
// Author:        Bharath
// Function:      AttachApp
// Description:   Automates attaching an application package
// =====================================================================

function AttachApp(packagePath, packageName) {
  Log.AppendFolder("AttachApp - Attach Application Package");

  let status = "Pass";

  try {
    // Step 1: Click on the "Attach Application" button
    clickOnAttachApplication();

    // Step 2: Upload the application package file using provided parameters
    uploadAppAttachPackageFile(packagePath, packageName);

    Log.Checkpoint("✅ AttachApp passed: Application attached successfully.");
  } catch (error) {
    Log.Error("❌ AttachApp failed during attach process: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("AttachApp " + status, status, "Pass");
    Log.PopLogFolder();
  }
}

function DetachApp(packagePath, packageName) {
  Log.AppendFolder("DetachApp - Detach Application Package");

  let status = "Pass";

  try {
    // Step 1: Click on the "Detach Application" button
    DetachApplication();

    Log.Checkpoint("✅ DetachApp passed: Application detached successfully.");
  } catch (error) {
    Log.Error("❌ DetachApp failed during detach process: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("DetachApp " + status, status, "Pass");
    Log.PopLogFolder();
  }
}

// =====================================================================
// Author:        Bharath
// Function:      AttachSystemDocument
// Description:   Automates the process of attaching a system-level
//                document via menu navigation, file upload, and confirmation steps.
// =====================================================================

function AttachSystemDocument(FilName) {        
  Log.AppendFolder("AttachSystemDocument - System-Level Document Flow");

  let status = "Pass";

  try {
    // Step 1: Navigate via menu and select system document
    clickOnSystemAttachDocument();
    Log.Message("Navigated to system document attachment workflow.");

    // Step 2: Upload document
    uploadPackageFile(Project.Path + "Files", FilName);
    Log.Message("Uploaded system document: " + FilName);

    // Step 3: Confirm attachment
    clickOnConfirmFDMButton();
    Log.Message("Confirmed attachment in FDM dialog.");

    Log.Checkpoint("✅ AttachSystemDocument passed: System document attached successfully.");
  } catch (error) {
    Log.Error("❌ AttachSystemDocument failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("AttachSystemDocument " + status, status, "Pass");
    Log.PopLogFolder();
  }
}



function DetachSystemDocument() {        
  Log.AppendFolder("DetachSystemDocument - System-Level Document Flow");

  let status = "Pass";

  try {
    // Step 1: Initiate detachment of system document
    DetachSystemDocumentInTools();
    Log.Message("Initiated detachment of system document.");

    Log.Checkpoint("✅ DetachSystemDocument passed: System document detached successfully.");
  } catch (error) {
    Log.Error("❌ DetachSystemDocument failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("DetachSystemDocument " + status, status, "Pass");
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      AttachDeviceDocumentation
// Description:   Attaches a document to a device via context menu flow,
//                confirms the action, then initiates detachment and confirms.

// =====================================================================

function AttachDeviceDocumentation(DeviceName, packagePath, packageName) {
  Log.AppendFolder("AttachDeviceDocumentation - Document Attach Flow");

  let status = "Pass";

  try {
    // Step 1: Attach document for the device
    clickOnDeviceAttachDocument(DeviceName);

    // Step 2: Resolve path (prefer project-relative if available)
    let projectPath = Project.Path + packagePath;
    let finalPath = aqFileSystem.Exists(projectPath) ? projectPath : packagePath;

    // Step 3: Upload package file
    uploadPackageFile(finalPath, packageName);
    Log.Message("Uploaded document: " + packageName);

    // Step 4: Confirm attachment
    clickOnConfirmFDMButton();
    Log.Message("Confirmed attachment in FDM dialog.");

  } catch (error) {
    Log.Error("AttachDeviceDocumentation failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("AttachDeviceDocumentation " + status, status, "Pass");
    Log.PopLogFolder();
  }
}

function DetachDeviceDocumentation(DeviceName) {
  Log.AppendFolder("DetachDeviceDocumentation - Document Detach Flow");

  let status = "Pass";

  try {
    // Step 1: Detach document for the device
    clickOnDeviceDetachDocument(DeviceName);

    // Step 2: Handle resource dialog for detachment
    Delay(1000);
    DetachDocumentFromResourceDlg();

    // Step 3: Confirm detachment
    clickOnConfirmFDMButton();
    Log.Message("Confirmed detachment in FDM dialog.");
  } catch (error) {
    Log.Error("DetachDeviceDocumentation failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("DetachDeviceDocumentation " + status, status, "Pass");
    Log.PopLogFolder();
  }
}



function LoadDevice(Device) {
  Log.AppendFolder("ActivateDevice");

  let status = "Pass";

  try {
    clickOnDevice(Device);
    Log.Message("Clicked on device: " + Device);
  } catch (error) {
    Log.Error("Error in EnterIntoDevice: " + error.message);
    status = "Fail";
  }

  WriteResult("ActivateDevice " + status, status, "Pass");
  Log.PopLogFolder();
}

function SaveHistory() {
  Log.AppendFolder("SaveHistory");

  let status = "Pass";

  try {
    clickSaveHistoryHyperlink();
    saveName = "SaveHistory" + aqDateTime.Now() / 1000
    fillSaveHistoryPopup("SaveHistory" + aqDateTime.Now() / 1000);
    handleFdmConfigurationPopup();
    handleSaveHistoryCompletion();
    CloseWindow();
    clickOnConfirmFDMButton();
    Log.Message("SaveHistory flow completed successfully.");
  } catch (error) {
    Log.Error("SaveHistory failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("Save history Id:-"+saveName+" SaveHistory " + status, status, "Pass");
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      DeviceParam
// Description:   Validates existence and text of various WPF hyperlinks 
//                under a selected device context.
// =====================================================================

function DeviceParam(DeviceName) {
  Log.AppendFolder("DeviceParam - Validate Device Hyperlink Controls");

  let status = "Pass";

  try {
    // Step 1: Click on the specified device
    clickOnDevice(DeviceName);
    Delay(1000);

    // Step 2: Validate hyperlink controls on the device screen
    let scrollViewer = Aliases.HCMClient.ClientMainWindow.MdiClient.CDeviceHomePage.panelBase.panelForDerivedForms.Panel.MagicTabControlEx.EntryPointTabPage.CDeviceScreen.m_pnlDeviceScreen.TabControl.EntryPointsTabPage.ElementHost.HwndSource_AdornerDecorator.AdornerDecorator.ScrollViewer;

    aqObject.CheckProperty(scrollViewer.HyperlinkAdvancedConfiguration, "WPFControlText", cmpEqual, "Advanced Configuration");
    aqObject.CheckProperty(scrollViewer.HyperlinkFdmDeviceStatus, "WPFControlText", cmpEqual, "FDM Device Status");
    aqObject.CheckProperty(scrollViewer.HyperlinkFdmDeviceProperties, "WPFControlText", cmpEqual, "FDM Device properties");
    aqObject.CheckProperty(scrollViewer.HyperlinkMethodList, "WPFControlText", cmpEqual, "Method List");
    aqObject.CheckProperty(scrollViewer.HyperlinkSaveHistoryRecord, "WPFControlText", cmpEqual, "Save History Record");
    aqObject.CheckProperty(scrollViewer.HyperlinkSaveAsOfflineTemplate, "WPFControlText", cmpEqual, "Save as Offline Template");
    aqObject.CheckProperty(scrollViewer.HyperlinkExport, "WPFControlText", cmpEqual, "Export");
    aqObject.CheckProperty(scrollViewer.HyperlinkPrint, "WPFControlText", cmpEqual, "Print");
    aqObject.CheckProperty(scrollViewer.HyperlinkNotifications, "WPFControlText", cmpEqual, "Notifications");
    
    // Step 3: Close window and confirm
    CloseWindow();
    clickOnConfirmFDMButton();

    Log.Checkpoint("✅ DeviceParam passed: All hyperlink controls validated.");
  } catch (error) {
    Log.Error("❌ DeviceParam failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("DeviceParam " + status, status, "Pass");
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      DeviceStateView
// Description:   Clicks on specified device, waits for load, and retrieves its state info.
// =====================================================================

function GetDeviceStateView(DeviceName) {     
  Log.AppendFolder("test - Device Selection and State Capture");

  try {
    // Step 1: Select device from variable
    clickOnDevice(DeviceName);
    Log.Message("Clicked on device: " + DeviceName);

    // Step 2: Delay to allow device to load
    Delay(1000, "Waiting for device UI to load");

    // Step 3: Collect and log device state information
    DeviceStateInformation();
    Log.Message("Device state information retrieved.");
    
    CloseWindow()
    clickOnConfirmFDMButton()
  } catch (error) {
    Log.Error("Error in test function: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}



function PrintTheDevice(DeviceName) {
  Log.AppendFolder("PrintTheDevice - Print Workflow");

  let status = "Pass";

  try {
    // Step 1: Click on the specified device
    clickOnDevice(DeviceName);

    // Step 2: Trigger Print hyperlink
    Aliases.HCMClient.ClientMainWindow.MdiClient.CDeviceHomePage.panelBase.panelForDerivedForms.Panel.MagicTabControlEx.EntryPointTabPage.CDeviceScreen.m_pnlDeviceScreen.TabControl.EntryPointsTabPage.ElementHost.HwndSource_AdornerDecorator.AdornerDecorator.ScrollViewer.HyperlinkPrint.Click(13, 10);

    // Step 3: Wait for status bar confirmation
    waitForStatusBarText("Loading online device data for print is performed successfully...");

    // Step 4: Validate Print Preview is enabled
    let HCMClient = Aliases.HCMClient;
    let printPreview = HCMClient.PrintPreview;
    aqObject.CheckProperty(printPreview, "Enabled", cmpEqual, true);

    // Step 5: Perform print action
    let panel = printPreview.ButtonsPanel;
    OCR.Recognize(panel.PrintButton).BlockByText("Print").Click();

    // Step 6: Handle dialogs and close preview
    HCMClient.dlgFDMConfiguration.Close();
    OCR.Recognize(panel.CloseButton).BlockByText("Close").Click();

    // Step 7: Final cleanup
    closeWindowPage();
    clickOnConfirmFDMButton();

    Log.Checkpoint("✅ PrintTheDevice passed: Device print workflow completed successfully.");
  } catch (error) {
    Log.Error("❌ PrintTheDevice failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("PrintTheDevice " + status, status, "Pass");
    Log.PopLogFolder(); 
  }
}



// =====================================================================
// Author:        Bharath
// Function:      ReadAndWriteDeviceProperties
// Description:   Opens FDM device properties and configures usage, calibration status, and health.

// =====================================================================

function ReadAndWriteDeviceProperties(DeviceName,ChangeDeviceUsage,ChangeCalibrationstatus,ChangeDeviceHealth) {
  Log.AppendFolder("SettingDeviceProperties");

  try {
    // === Step 1: Build network and select target device ===
    clickOnDevice(DeviceName);

    // === Step 2: Open device properties via OCR hyperlink ===
    Aliases.HCMClient.ClientMainWindow.MdiClient.CDeviceHomePage.panelBase.panelForDerivedForms.Panel.MagicTabControlEx.EntryPointTabPage.CDeviceScreen.m_pnlDeviceScreen.TabControl.EntryPointsTabPage.ElementHost.HwndSource_AdornerDecorator.AdornerDecorator.ScrollViewer.HyperlinkFdmDeviceProperties.Click();

    // === Step 3: Configure device properties ===
    ReadAndConfigureDeviceProperties({
      DeviceUsage: ChangeDeviceUsage,
      Calibrationstatus: ChangeCalibrationstatus,
      DeviceHealth: ChangeDeviceHealth
    });
    
    CloseWindow()
    clickOnConfirmFDMButton()
    Log.Message("Device properties configured successfully.");

  } catch (error) {
    Log.Error("Error in SettingDeviceProperties" + error.message);

  } finally {
    Log.PopLogFolder();
  }
}




// =====================================================================
// Author:        Bharath
// Function:      Deivce_ICONS_Create_DD_Offlineconfig15865
// Description:   Launches FDM client, navigates to Offline Configurations, and creates DD config
// Created On:    05-Aug-2025
// =====================================================================

function Deivce_ICONS_Create_DD_Offlineconfig15865() {

  // 🌐 Navigates to the Offline View section
  goToOfflineView();

  // 🗂 Clicks on the Offline tab to access available configurations
  ClickOfflineTab();

  // ⚙️ Opens the DD Offline Configuration screen
  OpenDDOfflineConfigurations();

  // 🛠 Creates a DD Offline Configuration using fixed input values
  createDDOfflineConfiguration("HART", "Rosemount_38", "644 Temperature(9752)", "9", "1");
  
  EnterOfflineDeviceConfigurationDetails() 
}


// =====================================================================
// Author:        Bharath
// Function:      DeviceIcons_Create_DisplayFilter
// Description:   Launches the FDM client, navigates to Offline View, and creates Display Filter configuration.

// =====================================================================
function DeviceIconsCreateDisplayFilter(filterName) {
  Log.AppendFolder("DeviceIconsCreateDisplayFilter - Create Display Filter Workflow");

  let status = "Pass";

  try {
    // Step 1: Confirm FDM Client launch
    Log.Message("FDM Client launched successfully.");

    // Step 2: Navigate to Offline View
    goToOfflineView();
    Log.Message("Navigated to Offline View.");

    // Step 3: Select Display Filter option via OCR
    OCR.Recognize(
      Aliases.HCMClient.ClientMainWindow.panelLeftPanMain.tabControlLeftPanMain
        .tabPageOfflineView.panelOfflineView.tabControlOfflineView
    ).BlockByText("*Displ*").Click();

    // Step 4: Create Display Filter configuration
    CreateDisplayFilterConfiguration(filterName);
    Log.Message("Display Filter configuration created.");

    Log.Checkpoint("✅ DeviceIconsCreateDisplayFilter passed: Display Filter created successfully.");
  } catch (error) {
    Log.Error("❌ DeviceIconsCreateDisplayFilter failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("DeviceIconsCreateDisplayFilter " + status, status, "Pass");
    Log.PopLogFolder();
  }
}

function DeleteDisplayFilterItem(filterName ) {  
  Log.AppendFolder("DeleteDisplayfilterlist - Display Filter Deletion Workflow");

  let status = "Pass";

  try {
    // Step 1: Navigate to Offline View
    goToOfflineView();
    Log.Message("Navigated to Offline View.");

    // Step 2: Select Display Filter option via OCR
    OCR.Recognize(
      Aliases.HCMClient.ClientMainWindow.panelLeftPanMain.tabControlLeftPanMain
        .tabPageOfflineView.panelOfflineView.tabControlOfflineView
    ).BlockByText("*Displ*").Click();

    // Step 3: Access tree view and delete target filter
    let HCMClient = Aliases.HCMClient;
    let treeView = HCMClient.ClientMainWindow.panelLeftPanMain.tabControlLeftPanMain
                     .tabPageOfflineView.panelOfflineView.tabControlOfflineView
                     .tabPageDisplayFilters.treeView;
    if (filterName != null && filterName != undefined && filterName != "") {
        itemName = filterName;
    } else {
        itemName = Project.Variables.FilterName
    }
    treeView.ClickItemR('| Display Filter|' + itemName);
    treeView.StripPopupMenu.Click("Delete");
    HCMClient.dlgFDMConfiguration.btnYes.ClickButton();

    Log.Checkpoint("✅ DeleteDisplayfilterlist passed: Display filter deleted successfully.");
  } catch (error) {
    Log.Error("❌ DeleteDisplayfilterlist failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("DeleteDisplayfilterlist " + status, status, "Pass");
    Log.PopLogFolder();
  }
}



                                          
// =====================================================================
// Author:        Bharath
// Function:      DeviceICONS_Create_DTM_OfflineConfig15875
// Description:   Launches FDM client, navigates to Offline View, and creates a DTM offline config
// =====================================================================
function DeviceICONSCreateDTMOfflineConfig() {
  Log.AppendFolder("DeviceICONSCreateDTMOfflineConfig - Offline DTM Configuration Workflow");
  let status = "Pass";

  try {
    
    // Step 2: Navigate to Offline View
    goToOfflineView();
    Log.Message("Navigated to Offline View successfully.");

    // Step 3: Open Offline tab
    ClickOfflineTab();
    Log.Message("Offline tab clicked.");

    // Step 4: Create Offline DTM Configuration
    CreateOfflineDTMConfig();
    Log.Message("Offline DTM configuration created.");

    // Step 5: Clean up the window
    let HCMClient = Aliases.HCMClient;
    HCMClient.ClientMainWindow.MdiClient.DtmForm.panelBase.panelFullTop.panelTitle.buttonClose.Click(7, 7);
    Log.Message("Window closed post configuration.");

    // Step 6: Confirm operations twice if required
    let btnYes = HCMClient.dlgFDMConfiguration.btnYes;
    if (btnYes.Exists) {
      btnYes.ClickButton();
      btnYes.ClickButton();
      Log.Message("Confirmation buttons clicked.");
    }

    Log.Checkpoint("✅ DeviceICONSCreateDTMOfflineConfig passed: Offline DTM configuration workflow completed successfully.");
  } catch (error) {
    Log.Error("❌ DeviceICONSCreateDTMOfflineConfig failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("DeviceICONSCreateDTMOfflineConfig " + status, status, "Pass");
    Log.PopLogFolder();
  }
}



// =====================================================================
// Author:        Bharath
// Function:      DeviceIcons_DD_OfflineView15878
// Description:   Launches FDM client, builds network, navigates to Offline View, and selects DD configuration.

// =====================================================================
function DeviceIconsDDOfflineView() {
  Log.AppendFolder("DeviceIconsDDOfflineView - DD Offline Configuration Workflow");

  let status = "Pass";

  try {
    // Step 1: Navigate to Offline View
    goToOfflineView();
    Log.Message("Navigated to Offline View.");

    // Step 2: Click on the Offline tab
    ClickOfflineTab();
    Log.Message("Offline tab clicked.");

    // Step 3: Open DD Offline Configurations
    OpenDDOfflineConfigurations();
    Log.Message("DD Offline Configurations opened.");

    // Step 4: Select the specific DD configuration node
    let treeView = Aliases.HCMClient.ClientMainWindow.panelLeftPanMain
                    .tabControlLeftPanMain.tabPageOfflineView.panelOfflineView
                    .tabControlOfflineView.tabPageOfflineTemplates.treeView;

    let targetNode = `|DD Offline Configurations|HART|Rosemount(38)|644 Temperature(9752)|9|${Project.Variables.OfflineDDSaveFileName}`;
    treeView.ClickItem(targetNode);
    Log.Message("Clicked DD configuration node: " + targetNode);

    Log.Checkpoint("✅ DeviceIconsDDOfflineView passed: DD Offline configuration node accessed successfully.");
  } catch (error) {
    Log.Error("❌ DeviceIconsDDOfflineView failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("DeviceIconsDDOfflineView " + status, status, "Pass");
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      Device_ICONS_DTM_OfflineConfig15881
// Description:   Launches FDM client, builds network, navigates to Offline View, and selects DTM configuration.
// Created On:    06-Aug-2025
// =====================================================================
function Device_ICONS_DTM_OfflineConfig15881() {
  Log.AppendFolder("Device_ICONS_DTM_OfflineConfig15881");

  try {

    // 📂 Navigates to Offline View
    goToOfflineView();
    Log.Message("Navigated to Offline View.");

    // 🗂 Clicks on the Offline tab
    ClickOfflineTab();
    Log.Message("Offline tab clicked.");

    // 🎯 Selects the specific DTM configuration node
    let treeView = Aliases.HCMClient.ClientMainWindow.panelLeftPanMain
                    .tabControlLeftPanMain.tabPageOfflineView.panelOfflineView
                    .tabControlOfflineView.tabPageOfflineTemplates.treeView;

    let targetNode = `|DTM Offline Configurations|ROSEMOUNT|644 V07.01 Ver [1.4.124.3]|${Project.Variables.OfflineDTMSavedFileName}`;
    treeView.ClickItem(targetNode);
    Log.Message("Clicked DTM configuration node: " + targetNode);

  } catch (error) {
    Log.Error("Error in Device_ICONS_DTM_OfflineConfig: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}

function DeviceIconsLibraryView() {
  Log.AppendFolder("DeviceIconsLibraryView - Device Library Workflow");

  let status = "Pass";

  try {
    // Step 1: Navigate to Offline View
    goToOfflineView();
    Log.Message("Navigated to Offline View.");

    // Step 2: Open Device Library
    OpenDeviceLibrary();
    Log.Message("Device Library opened.");

    // Step 3: Validate region check for DD/DTM tab control
    Regions.tabControlOfflineViewDD_DTM.Check(
      Regions.CreateRegionInfo(
        Aliases.HCMClient.ClientMainWindow.panelLeftPanMain.tabControlLeftPanMain
          .tabPageOfflineView.panelOfflineView.tabControlOfflineView,
        26, 24, 100, 52, false
      ),
      false,
      false,
      2946,
      144
    );
    Log.Message("Region check completed for DD/DTM tab control.");

    Log.Checkpoint("✅ DeviceIconsLibraryView passed: Device library workflow executed successfully.");
  } catch (error) {
    Log.Error("❌ DeviceIconsLibraryView failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("DeviceIconsLibraryView " + status, status, "Pass");
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      OfflineCreateConfiguration_1_15840
// Description:   Creates a DD Offline Configuration using fixed input values and validates save.

// =====================================================================
function OfflineDDCreateConfiguration(Protocol, Manufacturer, DeviceType, DeviceRevision, DDRevision, sensorType, connectionType) {
  Log.AppendFolder("OfflineDDCreateConfiguration - DD Offline Configuration Workflow");

  let status = "Pass";

  try {
    // Step 1: Navigate to Offline View and open configuration screen
    goToOfflineView();
    ClickOfflineTab();
    OpenDDOfflineConfigurations();
    Log.Message("DD Offline Configuration screen opened.");

    // Step 2: Create configuration using provided parameters
    createDDOfflineConfiguration(Protocol, Manufacturer, DeviceType, DeviceRevision, DDRevision);
    Log.Message("DD Offline Configuration initiated.");

    // Step 3: Access AdornerDecorator and configure sensor type & connection type
    let HCMClient = Aliases.HCMClient;
    let AdornerDecorator = HCMClient.ClientMainWindow.MdiClient.HCMOfflineConfigForm.panelBase
      .panelForDerivedForms.panelOfflineBase.groupBoxConfigView.pnlConfiguration.Panel
      .MagicTabControlEx.TabPage.CDeviceScreen.m_pnlDeviceScreen.ElementHost.HwndSource_AdornerDecorator.AdornerDecorator;

    let UidLayoutView = AdornerDecorator.FindChild("Name", `WPFObject("UidLayoutView", "", 1)`, 100, true);

    let SensorType = UidLayoutView.FindChild("Name", `WPFObject("ParameterView", "", 1)`, 100, true);
    let SensorTypeComboBox = SensorType.FindChild("Name", `WPFObject("cmb_Enum")`, 100, true);
    selectComboBoxItemByNameDD(SensorTypeComboBox, sensorType);

    let Connection = UidLayoutView.FindChild("Name", `WPFObject("ParameterView", "", 2)`, 100, true);
    let ConnectionTypeComboBox = Connection.FindChild("Name", `WPFObject("cmb_Enum")`, 100, true);
    selectComboBoxItemByNameDD(ConnectionTypeComboBox, connectionType);

    // Step 4: Save configuration preview
    let ButtonPreviewSave = HCMClient.ClientMainWindow.MdiClient.HCMOfflineConfigForm.panelBase
      .panelForDerivedForms.panelOfflineBase.groupBoxConfigView.pnlConfiguration.ActionControlView
      .HwndSource_AdornerDecorator.AdornerDecorator.ButtonPreviewSave;

    if (ButtonPreviewSave.Enabled) {
      ButtonPreviewSave.Click();
    } else {
      status = "Fail";
      return false;
    }

    // Step 5: Handle Save dialog
    AdornerDecorator = HCMClient.ClientMainWindow.MdiClient.HCMOfflineConfigForm.panelBase
      .panelForDerivedForms.panelOfflineBase.OfflineReviewDialogElementHost.ehReviewDialog
      .HwndSource_AdornerDecorator.AdornerDecorator;

    let SaveButton = AdornerDecorator.Grid.Rectangle;
    if (SaveButton.Enabled) {
      SaveButton.Click();
    } else {
      status = "Fail";
      return false;
    }

    // Step 6: Verify configuration saved successfully
    aqObject.CheckProperty(
      AdornerDecorator.Grid.TextblockConfigurationSavedSuccessfully,
      "WPFControlText",
      cmpEqual,
      "Configuration Saved successfully"
    );

    // Step 7: Close dialog and cleanup
    let close = AdornerDecorator.Grid2.Grid.Rectangle;
    close.Click();
    CloseWindow();

    Log.Checkpoint("✅ OfflineDDCreateConfiguration passed: DD Offline configuration created and saved successfully.");
  } catch (error) {
    Log.Error("❌ OfflineDDCreateConfiguration failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("OfflineDDCreateConfiguration " + status, status, "Pass");
    Log.PopLogFolder();
  }
}




// =====================================================================
// Author:        Bharath
// Function:      OfflineCreateConfiguration_2_15849
// Description:   Creates a DTM Offline Configuration for ROSEMOUNT 644 device.
// Created On:    19-Aug-2025
// =====================================================================
function OfflineDTMCreateConfiguration_2_15849() {
  Log.AppendFolder("OfflineCreateConfiguration_2_15849");

  try {

    // 📂 Navigate to Offline View
    goToOfflineView();
    Log.Message("Navigated to Offline View.");

    // 🗂 Click Offline tab
    ClickOfflineTab();
    Log.Message("Offline tab clicked.");

    // ⚙️ Create DTM Offline Configuration
    let HCMClient = Aliases.HCMClient;
    let frmHCMClientMain = HCMClient.ClientMainWindow;
    let treeView = frmHCMClientMain.panelLeftPanMain
                    .tabControlLeftPanMain.tabPageOfflineView.panelOfflineView
                    .tabControlOfflineView.tabPageOfflineTemplates.treeView;

    treeView.ClickItemR("|DTM Offline Configurations");
    treeView.StripPopupMenu.Click("Create Configuration");
    Log.Message("Initiated DTM Offline Configuration creation.");

    let hostPanel = frmHCMClientMain.MdiClient.DtmForm.panelBase;
    let DTMTabView = hostPanel.panelForDerivedForms.DTMTabView;
    let groupBox = DTMTabView.panelOfflineConfig.groupBoxTemplate;

    groupBox.cboVendor.ClickItem("ROSEMOUNT (38)");
    groupBox.cboDevType.ClickItem("644 V07.01 Ver [1.4.124.3] ");
    groupBox.buttonOfflineCreate.ClickButton();
    Log.Message("Device type selected and configuration triggered.");

    // ✅ Validate configuration panel loaded
    aqObject.CheckProperty(DTMTabView.panelConfiguration.tabControl1.TabPage.panelDtmStartup, "Enabled", cmpEqual, true);
    Log.Message("DTM Startup panel verified.");

    // ❎ Close configuration window
    hostPanel.panelFullTop.panelTitle.buttonClose.Click(6, 5);
    Log.Message("Configuration window closed.");

    // ✅ Confirm overwrite/save prompts
    let btnYes = HCMClient.dlgFDMConfiguration.btnYes;
    btnYes.ClickButton();
    btnYes.ClickButton();
    Log.Message("Confirmation dialogs handled.");

    // ❌ Cancel Save File dialog via OCR
    OCR.Recognize(HCMClient.SaveFileDlg.buttonCancel).BlockByText("Cancel").Click();
    Log.Message("Save File dialog cancelled via OCR.");

  } catch (error) {
    Log.Error("Error in OfflineCreateConfiguration_2_15849: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      OptionForCreatingDisplayFilter15819
// Description:   Launches the FDM client, navigates to Offline View, and creates Display Filter configuration.
// Created On:    05-Aug-2025
// =====================================================================
function OptionForCreatingDisplayFilter() {
  Log.AppendFolder("OptionForCreatingDisplayFilter");

  try {
    // 🔐 Launches the FDM client using predefined credentials
   // launchFDMClient(Project.Variables.FDMClientUserName, Project.Variables.FDMClientPassword);
    Log.Message("FDM Client launched successfully.");
    
    // 🌐 Navigates to the Offline View section
    goToOfflineView();
    Log.Message("Navigated to Offline View.");
    
    OCR.Recognize(Aliases.HCMClient.ClientMainWindow.panelLeftPanMain.tabControlLeftPanMain.tabPageOfflineView.panelOfflineView.tabControlOfflineView).BlockByText("DisplayF*").Click();

    // 🧩 Creates Display Filter configuration
    CreateDisplayFilterConfiguration();
    Log.Message("Display Filter configuration created.");

  } catch (error) {
    Log.Error("Error in DeviceIcons_Create_DisplayFilter: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}




// =====================================================================
// Author:        Bharath
// Function:      LaunchPAVDashboard
// Description:   Validate to Launch PAV Dashboard
   
// =====================================================================
function LaunchPAVDashboard() {
  Log.AppendFolder("LaunchPAVDashboard - Validate Launch of Plant Area View Dashboard");

  let status = "Pass";

  try {
    // Step 1: Launch Plant Area View
    clickOnPlantAreaView();
    Log.Message("Plant Area View launched successfully.");

    // Step 2: Close Plant Area View
    closePlantAreaView();
    Log.Message("Plant Area View closed successfully.");

    Log.Checkpoint("✅ LaunchPAVDashboard passed: PAV Dashboard launched and closed successfully.");
  } catch (error) {
    Log.Error("❌ LaunchPAVDashboard failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("LaunchPAVDashboard " + status, status, "Pass");
    Log.PopLogFolder();
  }
}



// =====================================================================
// Author:        Bharath
// Function:      LaunchAlertMonitoring
// Description:   Validate to Launch Alert Monitoring Dashboard
  
// =====================================================================
function LaunchAlertMonitoring() {
  Log.AppendFolder("LaunchAlertMonitoring - Validate Launch of Alert Monitoring Dashboard");

  let status = "Pass";

  try {
    // Step 1: Launch Alert Monitoring Dashboard
    clickOnAlertMonitoringDashboard();
    Log.Message("Alert Monitoring Dashboard launched successfully.");

    // Step 2: Close Alert Monitoring View
    closeAlertMonitorView();
    Log.Message("Alert Monitoring Dashboard closed successfully.");

    Log.Checkpoint("✅ LaunchAlertMonitoring passed: Alert Monitoring Dashboard launched and closed successfully.");
  } catch (error) {
    Log.Error("❌ LaunchAlertMonitoring failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("LaunchAlertMonitoring " + status, status, "Pass");
    Log.PopLogFolder();
  }
}



function Dashboard(){
  path = Project.Variables.Device
  let parts = path.split("|").filter(p => p.trim() !== "");
  let firstName = parts.length > 0 ? parts[0] : "";
  openDashboardFromTreeItem(firstName)
}


  


// =====================================================================
// Author:        Bharath
// Function:      DiagnosticModelTabFDMView
// Description:   Validate Daignostic model Tab in FDM View
   
// =====================================================================
function DiagnosticModelTabFDMView() {
  Log.AppendFolder("DiagnosticModelTabFDMView - Validate Diagnostic Model Tab in FDM View");

  let status = "Pass";

  try {
    // Step 1: Navigate to Offline Diagnostics
    navigateToOfflineDiagnostics();
    Log.Message("Navigated to Offline Diagnostics successfully.");

    Log.Checkpoint("✅ DiagnosticModelTabFDMView passed: Diagnostic Model Tab validated successfully.");
  } catch (error) {
    Log.Error("❌ DiagnosticModelTabFDMView failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("DiagnosticModelTabFDMView " + status, status, "Pass");
    Log.PopLogFolder();
  }
}




// =====================================================================
// Author:        Bharath
// Function:      validateCreateDiagnosticModel()
// Description:   Validate Create Diagnostic model
   
// =====================================================================
function validateCreateDiagnosticModel(treePath, ManufactureName, DeviceType, DeviceRevision, CheckParam) {
  Log.AppendFolder("validateCreateDiagnosticModel - Validate Create Diagnostic Model Workflow");

  let status = "Pass";

  try {
    // Step 1: Navigate to Offline Diagnostics
    navigateToOfflineDiagnostics();
    Log.Message("Navigated to Offline Diagnostics successfully.");

    // Step 2: Create Diagnostic Model with provided parameters
    createDiagnosticModel(treePath, ManufactureName, DeviceType, DeviceRevision, CheckParam);
    Log.Message("Diagnostic Model created successfully with parameters.");

    // Step 3: Close the configuration window
    CloseWindow();
    Log.Message("Configuration window closed successfully.");

    Log.Checkpoint("✅ validateCreateDiagnosticModel passed: Diagnostic Model created and validated successfully.");
  } catch (error) {
    Log.Error("❌ validateCreateDiagnosticModel failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("validateCreateDiagnosticModel " + status, status, "Pass");
    Log.PopLogFolder();
  }
}

  function validateDeleteDiagnosticModelHART() {
  Log.AppendFolder("validateDeleteDiagnosticModel - Diagnostic Model Deletion Workflow");

  let status = "Pass";

  try {
    // Step 1: Navigate to Offline Diagnostics
    navigateToOfflineDiagnostics();
    Log.Message("Navigated to Offline Diagnostics successfully.");

    // Step 2: Access Fault Model tree and delete target diagnostic model
    let HCMClient = Aliases.HCMClient;
    let treeView = HCMClient.ClientMainWindow.panelLeftPanMain.tabControlLeftPanMain
                     .tabPageOfflineView.panelOfflineView.tabControlOfflineView
                     .tabPageFaultModel.treeView;

    treeView.ClickItemR("|HART|ABB(26)|KSX(6657)|5|001A1A010502");
    Log.Message("Right-clicked target diagnostic model node.");

    treeView.StripPopupMenu.Click(" Delete");
    Log.Message("Selected 'Delete' from context menu.");

    HCMClient.dlgFDMConfiguration.btnOK.ClickButton();
    Log.Message("Confirmed deletion in dialog.");

    Log.Checkpoint("✅ validateDeleteDiagnosticModel passed: Diagnostic Model deleted successfully.");
  } catch (error) {
    Log.Error("❌ validateDeleteDiagnosticModel failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("validateDeleteDiagnosticModel " + status, status, "Pass");
    Log.PopLogFolder();
  }
}

function validateDeleteDiagnosticModelFF() {
  Log.AppendFolder("validateDeleteDiagnosticModel - Diagnostic Model Deletion Workflow");

  let status = "Pass";

  try {
    // Step 1: Navigate to Offline Diagnostics
    navigateToOfflineDiagnostics();
    Log.Message("Navigated to Offline Diagnostics successfully.");

    // Step 2: Access Fault Model tree and delete target diagnostic model
    let HCMClient = Aliases.HCMClient;
    let treeView = HCMClient.ClientMainWindow.panelLeftPanMain.tabControlLeftPanMain
                     .tabPageOfflineView.panelOfflineView.tabControlOfflineView
                     .tabPageFaultModel.treeView;

    treeView.ClickItemR("|FF|Fuji Electric(777)|FFX-T series(3)|1|00030900030102");
    Log.Message("Right-clicked target diagnostic model node.");

    treeView.StripPopupMenu.Click(" Delete");
    Log.Message("Selected 'Delete' from context menu.");

    HCMClient.dlgFDMConfiguration.btnOK.ClickButton();
    Log.Message("Confirmed deletion in dialog.");

    Log.Checkpoint("✅ validateDeleteDiagnosticModel passed: Diagnostic Model deleted successfully.");
  } catch (error) {
    Log.Error("❌ validateDeleteDiagnosticModel failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("validateDeleteDiagnosticModel " + status, status, "Pass");
    Log.PopLogFolder();
  }

}


// =====================================================================
// Author:        Bharath
// Function:      FDMGR4279
// Description:   verify that offline configuration can be saved for FF devices
   
// =====================================================================
function verifyOfflineConfigurationSaveForFFDevices() {
  Log.AppendFolder("verifyOfflineConfigurationSaveForFFDevices - Verify Offline Configuration Save for FF Devices");

  let status = "Pass";

  try {
    // Step 1: Navigate to Offline Diagnostics
    navigateToOfflineDiagnostics();
    Log.Message("Navigated to Offline Diagnostics successfully.");

    // Step 2: Create Diagnostic Model for FF devices
    createDiagnosticModel("|FF");
    Log.Message("Diagnostic Model created for FF devices.");

    // Step 3: Close configuration window
    CloseWindow();
    Log.Message("Configuration window closed successfully.");

    Log.Checkpoint("✅ verifyOfflineConfigurationSaveForFFDevices passed: Offline configuration saved successfully for FF devices.");
  } catch (error) {
    Log.Error("❌ verifyOfflineConfigurationSaveForFFDevices failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("verifyOfflineConfigurationSaveForFFDevices " + status, status, "Pass");
    Log.PopLogFolder();
  }
}


function Test1()
{
  let HCMClient = Aliases.HCMClient;
  let adornerDecorator = HCMClient.ClientMainWindow.MdiClient.RightPanBaseFrame.panelBase.panelForDerivedForms.ElementHost.HwndSource_AdornerDecorator.AdornerDecorator;
  let comboBox = adornerDecorator.ComboboxManufacturer;
  comboBox.Click(195, 16);
  comboBox.ClickItem("Hart");
  adornerDecorator.ListBox.CheckBox.ClickButton(cbChecked);
  let dataGrid = adornerDecorator.ParamBits;
  dataGrid.ClickCell(0, 0);
  dataGrid.ClickCell(0, 0);
  dataGrid.combo1.ClickItem("Maintenance Required");
  adornerDecorator.ButtonAddToSummary.ClickButton();
  adornerDecorator.ButtonSave.ClickButton();
  let dlgDiagnosticModel = HCMClient.dlgFDMConfiguration;
  dlgDiagnosticModel.btnYes.ClickButton();
  dlgDiagnosticModel.btnOK.ClickButton();
}



// =====================================================================
// Author:        Bharath
// Function:      ExportAndImportDeviceTags
// Description:   Performs export and import of Device Tags using static values.
// =====================================================================

function ExportAndImportDeviceTags() {
  Log.AppendFolder("ExportAndImportDeviceTags - Workflow for Exporting and Importing Device Tags");

  let status = "Pass";

  try {
    // === Export Section ===
    ClickItemImportAndExport();
    ClickExportDataButton();
    ClickItemInTabList("Device Tags");
    ClickNextIfEnabled();
    FilterDeviceTags();
    ClickNextIfEnabled();
    SelectAvailableDeviceTag("644Temp");
    ClickNextIfEnabled();
    SelectFileFormat("xml");

    let filePath = GetFilePathFromTextbox();
    Log.Message("Export file path captured: " + filePath);

    ClickNextIfEnabled();
    WaitForCompletion();
    ClickNextIfEnabled();
    ClickCancelButton(); // Finish Export
    CheckIfFileExists(filePath);
    Log.Message("Export completed and file verified.");

    // === Import Section ===
    ClickItemImportAndExport();
    ClickImportDataButton();
    ClickItemInTabList("Device Tags");
    ClickNextIfEnabled();
    SetSelectFilePath(filePath);
    Log.Message("Import file path set: " + filePath);

    ClickNextIfEnabled();
    WaitForCompletion();
    ClickNextIfEnabled();
    ClickCancelButton(); // Finish Import
    Log.Message("Import completed successfully.");

    Log.Checkpoint("✅ ExportAndImportDeviceTags passed: Device Tags exported and imported successfully.");
  } catch (error) {
    Log.Error("❌ ExportAndImportDeviceTags failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("ExportAndImportDeviceTags " + status, status, "Pass");
    Log.PopLogFolder();
  }
}



function ExportAndImportAuditTrail() {
  Log.AppendFolder("ExportAndImportAuditTrail - Workflow for Exporting and Importing Audit Trail");

  let status = "Pass";

  try {
    // === Export Section ===
    ClickItemImportAndExport();
    ClickExportDataButton();
    ClickItemInTabList("Audit Trail");
    ClickNextIfEnabled();
    FilterDeviceTags();
    ClickNextIfEnabled();
    ConfigureAuditTrailExport();
    ClickNextIfEnabled();
    SelectFileFormat("xml");

    let filePath = GetFilePathFromTextbox();
    Log.Message("Export file path captured: " + filePath);

    ClickNextIfEnabled();
    WaitForCompletion();
    ClickNextIfEnabled();
    ClickCancelButton(); // Finish Export
    CheckIfFileExists(filePath);
    Log.Message("Audit Trail export completed and file verified.");

    // === Import Section ===
    ClickItemImportAndExport();
    ClickImportDataButton();
    ClickItemInTabList("Audit Trail");
    ClickNextIfEnabled();
    SetSelectFilePath(filePath);
    Log.Message("Import file path set: " + filePath);

    ClickNextIfEnabled();
    WaitForCompletion();
    ClickNextIfEnabled();
    ClickCancelButton(); // Finish Import
    Log.Message("Audit Trail import completed successfully.");

    Log.Checkpoint("✅ ExportAndImportAuditTrail passed: Audit Trail exported and imported successfully.");
  } catch (error) {
    Log.Error("❌ ExportAndImportAuditTrail failed: " + error.message);
    status = "Fail";
  } finally {
    WriteResult("ExportAndImportAuditTrail " + status, status, "Pass");
    Log.PopLogFolder();
  }
}

function auditTrailViaMenuTab()
{
  
}




