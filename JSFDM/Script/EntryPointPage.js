//USEUNIT GenericMethods

function FdmDeviceStatus() {
  Log.AppendFolder("FdmDeviceStatus");

  try {
    let statusGrid = Aliases.HCMClient.ClientMainWindow
      .MdiClient.EntryPointTabPage.EntryPointsTabPage
      .HwndSource_AdornerDecorator.AdornerDecorator
      .FDMDeviceStatusGrid;

    let contentControl = statusGrid.WPFObject("ContentControl", "", "1");
    if (!contentControl.Exists) {
      throw new Error("ContentControl with 'FDM Device Status' not found.");
    }

    let tagValue = aqString.Trim(contentControl.Tag);
    if (tagValue === "FDM Device Status") {
      Log.Message("🖼️ Found FDM Device Status component. Preparing to print..." );
      Log.Picture(contentControl,"FDM Device Status")
      // Replace with actual print/snapshot logic if applicable
      
      Log.Checkpoint("✅ FDM Device Status image saved.");
    } else {
      Log.Warning("⚠️ ContentControl tag mismatch. Expected 'FDM Device Status', found: " + tagValue);
    }

  } catch (error) {
    Log.Error("❌ Failed to print FDM Device Status picture: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}

// =====================================================================
// Author:        Bharath
// Function:      DeviceTitleText
// Description:   Logs the title text of the selected device from panelTitle
// Created On:    17-July-2025
// Modified On:   
// =====================================================================
function DeviceTitleText() {
  Log.AppendFolder("logDeviceTitleText");

  try {
    let deviceTitle = Aliases.HCMClient.ClientMainWindow
      .MdiClient.panelFullTop.panelTitle.DeviceTitle;

    if (!deviceTitle.Exists) throw new Error("DeviceTitle object not found.");

    let titleText = aqString.Trim(deviceTitle.Text);
    Log.Message("🪪 Device Title: " + titleText);
    return titleText
  } catch (error) {
    Log.Error("❌ Failed to read device title: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}

// =====================================================================
// Author:        Bharath
// Function:      validateActiveDevicesTabExists
// Description:   Checks if tabControlActiveDevices exists inside panelActiveDevices
// Created On:    17-July-2025
// Modified On:   
// =====================================================================
function validateActiveDevicesTabExists() {
  Log.AppendFolder("validateActiveDevicesTabExists");

  try {
    let tabControl = Aliases.HCMClient.ClientMainWindow
      .panelDeviceTabCtrl.panelInCurrentDevice.panelActiveDevices.tabControlActiveDevices;

    if (tabControl.Exists) {
      Log.Checkpoint("✅ Active Devices tab is present.");
    } else {
      Log.Error("❌ Active Devices tab is missing.");
    }

  } catch (error) {
    Log.Error("❌ Error validating Active Devices tab: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      DeviceInformation
// Description:   Captures of the ContentControl with Tag "Device Information"
// Created On:    17-07-2025
// Modified On:   
// =====================================================================
function DeviceInformation() {
  Log.AppendFolder("DeviceInformation");

  try {
    let scrollViewer = Aliases.HCMClient.ClientMainWindow
      .MdiClient.CDeviceHomePage.panelBase.panelForDerivedForms.Panel.MagicTabControlEx.EntryPointTabPage
      .CDeviceScreen.m_pnlDeviceScreen.TabControl.EntryPointsTabPage.ElementHost
      .HwndSource_AdornerDecorator.AdornerDecorator.ScrollViewer;

    let statusGrid = scrollViewer.Grid;
    let contentControl = statusGrid.WPFObject("ContentControl", "", "3"); // wildcard match

    if (!contentControl.Exists) throw new Error("ContentControl not found.");

    if (aqString.Trim(contentControl.Tag) === "Device Information") {
      Log.Picture(contentControl,"Device Information")
      Log.Checkpoint("✅ Device Information image saved.");
    } else {
      Log.Warning("⚠️ Tag did not match 'Device Information'. Found: " + contentControl.Tag);
    }

  } catch (error) {
    Log.Error("❌ Failed to capture Device Information image: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}



// =====================================================================
// Author:        Bharath
// Function:      DeviceStateInformation
// Description:   Captures of the ContentControl with Tag "Device State Information"
// Created On:    17-07-2025
// Modified On:   
// =====================================================================
function DeviceStateInformation() {
  Log.AppendFolder("DeviceStateInformation");

  try {
    let scrollViewer = Aliases.HCMClient.ClientMainWindow.MdiClient.CDeviceHomePage.panelBase.panelForDerivedForms.Panel.MagicTabControlEx.EntryPointTabPage.CDeviceScreen.m_pnlDeviceScreen.TabControl.EntryPointsTabPage.ElementHost.HwndSource_AdornerDecorator.AdornerDecorator.ScrollViewer;

    let statusGrid = scrollViewer.Grid;
    let contentControl = statusGrid.WPFObject("ContentControl", "", "2"); // wildcard match

    if (!contentControl.Exists) throw new Error("ContentControl not found.");

    if (aqString.Trim(contentControl.Tag) === "Device State Information") {
      Log.Picture(contentControl,"Device State Information")
      Log.Checkpoint("✅ Device Information image saved.");
    } else {
      Log.Warning("⚠️ Tag did not match 'Device State Information'. Found: " + contentControl.Tag);
    }

  } catch (error) {
    Log.Error("❌ Failed to capture Device State Information image: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      validateFdmDeviceStatusText
// Description:   Reads status text from FDMDeviceStatusGrid and logs severity.
//                "Good" → normal message
//                "Maintanace" → warning
//                "Failure" → error
// Created On:    17-07-2025
// Modified On:   
// =====================================================================
function validateFdmDeviceStatusText() {
  Log.AppendFolder("validateFdmDeviceStatusText");

  try {
    let statusText = Aliases.HCMClient.ClientMainWindow
      .MdiClient.EntryPointTabPage.EntryPointsTabPage
      .HwndSource_AdornerDecorator.AdornerDecorator.FDMDeviceStatusGrid
      .Textblock.Text;

    Log.Message("📋 FDM Device Status Text: " + statusText);
    
    switch (aqString.Trim(statusText).toLowerCase()) {
      case "good":
        Log.Checkpoint("✅ Status indicates good device.");
        break;
      case "maintenance required":
        Log.Warning("⚠️ Status indicates maintenance warning.");
        break;
      case "failure":
        Log.Error("❌ Status indicates device failure.");
        break;
      default:
        Log.Warning("❓ Unknown status: " + statusText);
        break;
    }

  } catch (error) {
    Log.Error("❌ Failed to validate FDM device status text: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      clickSaveHistoryHyperlink
// Description:   Clicks the 'Save History Record' hyperlink in Entry Point screen
// Created On:    17-07-2025
// Modified On:   
// =====================================================================
function clickSaveHistoryHyperlink() {
  Log.AppendFolder("clickSaveHistoryHyperlink");

  try {
    let hyperlink = Aliases.HCMClient.ClientMainWindow.MdiClient.CDeviceHomePage.panelBase.panelForDerivedForms.Panel.MagicTabControlEx.EntryPointTabPage.CDeviceScreen.m_pnlDeviceScreen.TabControl.EntryPointsTabPage.ElementHost.HwndSource_AdornerDecorator.AdornerDecorator.ScrollViewer.HyperlinkSaveHistoryRecord
    if (hyperlink.Exists && hyperlink.Enabled) {
      hyperlink.Click();
      Log.Checkpoint("✅ 'Save History Record' hyperlink clicked successfully.");
    } else {
      throw new Error("HyperlinkSaveHistoryRecord is not available or not enabled.");
    }

  } catch (error) {
    Log.Error("❌ Failed to click Save History hyperlink: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      clickAdvancedConfigurationHyperlink
// Description:   Clicks the 'Advanced Configuration' hyperlink.
// Created On:    17-07-2025
// =====================================================================
function clickAdvancedConfigurationHyperlink() {
  Log.AppendFolder("clickAdvancedConfigurationHyperlink");

  try {
    let hyperlink = Aliases.HCMClient.ClientMainWindow
      .MdiClient.EntryPointTabPage.EntryPointsTabPage
      .HwndSource_AdornerDecorator.AdornerDecorator.HyperlinkAdvancedConfiguration;

    if (hyperlink.Exists && hyperlink.Enabled) {
      hyperlink.Click();
      Log.Checkpoint("✅ 'Advanced Configuration' hyperlink clicked.");
    } else {
      throw new Error("HyperlinkAdvancedConfiguration not found or disabled.");
    }

  } catch (error) {
    Log.Error("❌ Error clicking Advanced Configuration: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}



// =====================================================================
// Author:        Bharath
// Function:      clickExportHyperlink
// Description:   Clicks the 'Export' hyperlink.
// Created On:    17-07-2025
// =====================================================================
function clickExportHyperlink() {
  Log.AppendFolder("clickExportHyperlink");

  try {
    let hyperlink = Aliases.HCMClient.ClientMainWindow
      .MdiClient.EntryPointTabPage.EntryPointsTabPage
      .HwndSource_AdornerDecorator.AdornerDecorator.HyperlinkExport;

    if (hyperlink.Exists && hyperlink.Enabled) {
      hyperlink.Click();
      Log.Checkpoint("✅ 'Export' hyperlink clicked.");
    } else {
      throw new Error("HyperlinkExport not found or disabled.");
    }

  } catch (error) {
    Log.Error("❌ Error clicking Export: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}

// =====================================================================
// Author:        Bharath
// Function:      clickFdmDevicePropertiesHyperlink
// Description:   Clicks the 'Fdm Device Properties' hyperlink.
// Created On:    17-07-2025
// =====================================================================
function clickFdmDevicePropertiesHyperlink() {
  Log.AppendFolder("clickFdmDevicePropertiesHyperlink");

  try {
    let hyperlink = Aliases.HCMClient.ClientMainWindow
      .MdiClient.EntryPointTabPage.EntryPointsTabPage
      .HwndSource_AdornerDecorator.AdornerDecorator.HyperlinkFdmDeviceProperties;

    if (hyperlink.Exists && hyperlink.Enabled) {
      hyperlink.Click();
      Log.Checkpoint("✅ 'FDM Device Properties' hyperlink clicked.");
    } else {
      throw new Error("HyperlinkFdmDeviceProperties not found or disabled.");
    }

  } catch (error) {
    Log.Error("❌ Error clicking FDM Device Properties: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}

// =====================================================================
// Author:        Bharath
// Function:      clickFdmDeviceStatusHyperlink
// Description:   Clicks the 'Fdm Device Status' hyperlink.
// Created On:    17-07-2025
// =====================================================================
function clickFdmDeviceStatusHyperlink() {
  Log.AppendFolder("clickFdmDeviceStatusHyperlink");

  try {
    let hyperlink = Aliases.HCMClient.ClientMainWindow
      .MdiClient.EntryPointTabPage.EntryPointsTabPage
      .HwndSource_AdornerDecorator.AdornerDecorator.HyperlinkFdmDeviceStatus;

    if (hyperlink.Exists && hyperlink.Enabled) {
      hyperlink.Click();
      Log.Checkpoint("✅ 'FDM Device Status' hyperlink clicked.");
    } else {
      throw new Error("HyperlinkFdmDeviceStatus not found or disabled.");
    }

  } catch (error) {
    Log.Error("❌ Error clicking FDM Device Status: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}

// =====================================================================
// Author:        Bharath
// Function:      clickMethodListHyperlink
// Description:   Clicks the 'Method List' hyperlink.
// Created On:    17-07-2025
// =====================================================================
function clickMethodListHyperlink() {
  Log.AppendFolder("clickMethodListHyperlink");

  try {
    let hyperlink = Aliases.HCMClient.ClientMainWindow
      .MdiClient.EntryPointTabPage.EntryPointsTabPage
      .HwndSource_AdornerDecorator.AdornerDecorator.HyperlinkMethodList;

    if (hyperlink.Exists && hyperlink.Enabled) {
      hyperlink.Click();
      Log.Checkpoint("✅ 'Method List' hyperlink clicked.");
    } else {
      throw new Error("HyperlinkMethodList not found or disabled.");
    }

  } catch (error) {
    Log.Error("❌ Error clicking Method List: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}

// =====================================================================
// Author:        Bharath
// Function:      clickNotificationsHyperlink
// Description:   Clicks the 'Notifications' hyperlink.
// Created On:    17-07-2025
// =====================================================================
function clickNotificationsHyperlink() {
  Log.AppendFolder("clickNotificationsHyperlink");

  try {
    let hyperlink = Aliases.HCMClient.ClientMainWindow
      .MdiClient.EntryPointTabPage.EntryPointsTabPage
      .HwndSource_AdornerDecorator.AdornerDecorator.HyperlinkNotifications;

    if (hyperlink.Exists && hyperlink.Enabled) {
      hyperlink.Click();
      Log.Checkpoint("✅ 'Notifications' hyperlink clicked.");
    } else {
      throw new Error("HyperlinkNotifications not found or disabled.");
    }

  } catch (error) {
    Log.Error("❌ Error clicking Notifications: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}

// =====================================================================
// Author:        Bharath
// Function:      clickPrintHyperlink
// Description:   Clicks the 'Print' hyperlink.
// Created On:    17-07-2025
// =====================================================================
function clickPrintHyperlink() {
  Log.AppendFolder("clickPrintHyperlink");

  try {
    let hyperlink = Aliases.HCMClient.ClientMainWindow
      .MdiClient.EntryPointTabPage.EntryPointsTabPage
      .HwndSource_AdornerDecorator.AdornerDecorator.HyperlinkPrint;

    if (hyperlink.Exists && hyperlink.Enabled) {
      hyperlink.Click();
      Log.Checkpoint("✅ 'Print' hyperlink clicked.");
    } else {
      throw new Error("HyperlinkPrint not found or disabled.");
    }

  } catch (error) {
    Log.Error("❌ Error clicking Print: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}

// =====================================================================
// Author:        Bharath
// Function:      clickSaveAsOfflineTemplateHyperlink
// Description:   Clicks the 'Save As OfflineTemplate' hyperlink.
// Created On:    17-07-2025
// =====================================================================
function clickSaveAsOfflineTemplateHyperlink() {
  Log.AppendFolder("clickSaveAsOfflineTemplateHyperlink");

  try {
    let hyperlink = Aliases.HCMClient.ClientMainWindow
      .MdiClient.EntryPointTabPage.EntryPointsTabPage
      .HwndSource_AdornerDecorator.AdornerDecorator.HyperlinkSaveAsOfflineTemplate;

    if (hyperlink.Exists && hyperlink.Enabled) {
      hyperlink.Click();
      Log.Checkpoint("✅ 'Save As Offline Template' hyperlink clicked.");
    } else {
      throw new Error("HyperlinkSaveAsOfflineTemplate not found or disabled.");
    }

  } catch (error) {
    Log.Error("❌ Error clicking Save As Offline Template: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}

function test(){
  fillSaveHistoryPopup("644")
}

// =====================================================================
// Author:        Bharath
// Function:      fillSaveHistoryPopup
// Description:   Completes the Save History dialog using FindChild for controls.
// Created On:    17-July-2025
// Modified On:   
// =====================================================================
function fillSaveHistoryPopup(saveName, timeoutValue) {
  Log.AppendFolder("fillSaveHistoryPopup");
  
  try {
    let saveDlg = Aliases.HCMClient.FindChild("Name", 'WinFormsObject("SaveFileDlg")', 100, true);
    if (!saveDlg.Exists) {
      Log.Warning("⚠️ SaveFileDlg not found.");
      return;
    }

    // File name input
    let fileNameBox = saveDlg.FindChild("Name", 'WinFormsObject("textBoxFileName")', 100, true)
                             .FindChild("Name", 'WinFormsObject("TextBoxArea")', 100, true);
    if (fileNameBox.Exists) {
      fileNameBox.SetText(saveName);
      Log.Message("📁 File name set to: " + saveName);
    }

    // Timeout input
    let timeoutBox = saveDlg.FindChild("Name", 'WinFormsObject("_lblhistorySettings")', 100, true)
                            .FindChild("Name", 'WinFormsObject("_histTimoutOptn")', 100, true)
                            .FindChild("Name", 'WinFormsObject("_tbTimeOutInterval")', 100, true)
                            .FindChild("Name", 'WinFormsObject("TextBoxArea")', 100, true);
    if (timeoutBox.Exists) {
      let value = timeoutValue || "10";
      timeoutBox.SetText(value);
      Log.Message("⏱️ Timeout set to: " + value);
    }

    // Click OK button
    let okBtn = saveDlg.FindChild("Name", 'WinFormsObject("buttonOK")', 100, true);
    if (okBtn.Exists && okBtn.Enabled) {
      okBtn.Click();
      Log.Checkpoint("✅ Save dialog confirmed.");
    } else {
      Log.Error("❌ OK button not found or not enabled.");
    }

  } catch (error) {
    Log.Error("❌ Error in fillSaveHistoryPopup: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}


// =====================================================================
// Author:        Bharath
// Function:      handleSaveHistoryCompletion
// Description:   Waits until Save History completes, prints the dialog title, and clicks Close.
// Created On:    17-July-2025
// Modified On:   
// =====================================================================
function handleSaveHistoryCompletion() {
  Log.AppendFolder("handleSaveHistoryCompletion");

  try {
    let statusBarDevice = Aliases.HCMClient.ClientMainWindow.MdiClient.CDeviceHomePage.panelBase.statusBarDevice
    let statusItem = statusBarDevice.Items.Item_2(1);
    let timeout = 600000;
    let startTime = new Date().getTime();
    Delay(1000)
    while (aqString.Trim(statusItem.Text) === "Save History is in progress. Please wait...") {
      Delay(500);
      if (new Date().getTime() - startTime > timeout) {
        throw new Error("⏳ Timeout: Save History still in progress.");
      }
    }

    // Step 3: Locate dialog root
    let hwndSource = Aliases.HCMClient.HwndSource_SaveHistoryDialogView;
    let saveHistoryDialogView = hwndSource.SaveHistoryDialogView
    // Step 4: Read and log dialog title
    let titleObj = saveHistoryDialogView.FindChild("Name", 'WPFObject("txt_Title")', 100, true);
    if (titleObj.Exists) {
      let titleText = aqString.Trim(titleObj.Text);
      Log.Message("📋 Save History Dialog Title: " + titleText);
    } else {
      Log.Warning("⚠️ Title object not found.");
    }
    
    // Step 5: Click Close
    let closeButton = saveHistoryDialogView.FindChild("Name", 'WPFObject("btn_Close")', 100, true);
    if (closeButton.Exists && closeButton.Enabled) {
      closeButton.Click();
      Log.Checkpoint("✅ Save History dialog closed.");
    } else {
      Log.Error("❌ Close button not found or not enabled.");
    }

  } catch (error) {
    Log.Error("❌ Failed during Save History handling: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}
function test12(){
  ReadAndConfigureDeviceProperties({DeviceUsage:"Spare",Calibrationstatus:"Calibrated",DeviceHealth:"Good"});
}

function ReadAndConfigureDeviceProperties({DeviceUsage,Calibrationstatus,DeviceHealth}) {
  Log.AppendFolder("ReadAndConfigureDeviceProperties");

  try {
    let scrollViewer = Aliases.HCMClient.ClientMainWindow.MdiClient.CDeviceHomePage.panelBase.panelForDerivedForms.Panel.MagicTabControlEx.EntryPointTabPage.CDeviceScreen.m_pnlDeviceScreen.TabControl.FDM_Device_Properties.ElementHost.HwndSource_AdornerDecorator.AdornerDecorator.ScrollViewer

    // 🧾 Read TextBox values
    let textBox1 = scrollViewer.FindChild("Name",'WPFObject("Grid", "", 1)',50).FindChild("Name",'WPFObject("TextBox", "", 1)',50);
    let textBox2 = scrollViewer.FindChild("Name",'WPFObject("Grid", "", 2)',50).FindChild("Name",'WPFObject("TextBox", "", 1)',50);
    let textBox4 = scrollViewer.FindChild("Name",'WPFObject("Grid", "", 4)',50).FindChild("Name",'WPFObject("TextBox", "", 1)',50);

    Log.Message("Manufacture Value: " + textBox1.Text.OleValue);
    Log.Message("Model Value: " + textBox2.Text.OleValue);
    Log.Message("DD Revison Value: " + textBox4.Text.OleValue);

    // 📅 Set current date in Calibration due Date
    let textBox8 = scrollViewer.FindChild("Name",'WPFObject("Grid", "", 10)',50).FindChild("Name",'WPFObject("TextBox", "", 1)',50);
    let currentDate = aqConvert.DateTimeToFormatStr(aqDateTime.Now(), "%m/%d/%Y %I:%M:%S %p");
    textBox8.SetText(currentDate);
    Log.Message("Calibration due Date set to current date: " + currentDate);

    // 🎛 Select ComboBox items
    let comboBox1 = scrollViewer.FindChild("Name",'WPFObject("Grid", "", 8)',50).FindChild("Name",'WPFObject("ComboBox", "", 1)',50); // Device Usage
    let comboBox2 = scrollViewer.FindChild("Name",'WPFObject("Grid", "", 9)',50).FindChild("Name",'WPFObject("ComboBox", "", 1)',50); // Calibration Status
    let comboBox3 = scrollViewer.FindChild("Name",'WPFObject("Grid", "", 11)',50).FindChild("Name",'WPFObject("ComboBox", "", 1)',50); // Device Health
    
    if (DeviceUsage) selectComboBoxItemByName(comboBox1, DeviceUsage);
    if (Calibrationstatus) selectComboBoxItemByName(comboBox2, Calibrationstatus);
    if (DeviceHealth) selectComboBoxItemByName(comboBox3, DeviceHealth);
    Log.Message("ComboBox selections completed.");

  } catch (error) {
    Log.Error("Error in ReadAndConfigureDeviceProperties: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}


