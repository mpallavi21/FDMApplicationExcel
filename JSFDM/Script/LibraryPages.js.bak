//USEUNIT GenericMethods 

// =====================================================================
// Author:        Bharath
// Function:      openManageDDPackagesSection
// Description:   Navigates through the HCM Client UI to access the 
//                "Manage DD/Packages" section via the "Library" menu.
// Created On:    23-06-2025
// Modified On:   
// =====================================================================

function openManageDDPackagesSection() {
  try {
    Log.AppendFolder("openManageDDPackagesSection - Navigates through the HCM Client UI to access the \n 'Manage DD/Packages' section via the 'Library' menu.")
    
    let HCMClient = Aliases.HCMClient;
    let smartMenuBar = HCMClient.ClientMainWindow.mainMenu;
    OCR.Recognize(smartMenuBar).BlockByText("Library").Click();
    Delay(1183);
    Aliases.HCMClient.DropDownForm.SubSmartControl.Click(68, 55);
    
    let ManagePackagesWindow = HCMClient.ManagePackagesWindow;
    // Wait for the window to become visible (timeout: 10 seconds)
    if (ManagePackagesWindow.WaitProperty("Exists", true, 10000)) {
      Log.Message("'ManagePackagesWindow' is visible.");
    } else {
      Log.Error("'ManagePackagesWindow' did not appear within the expected time.");
    }
    
    Log.Message("Navigation completed successfully.");
  } catch (error) {
    Log.Error("Navigation failed: " + error.message);
  } finally{
    Log.PopLogFolder()
  }  
  
  
  

}





// =====================================================================
// Author:        Bharath
// Function:      clickAddDDPackageButton
// Description:   Clicks the 'Add DD Package' button in the Manage Packages window.
// Created On:    23-June-2025
// Modified On:   
// =====================================================================
function clickAddDDPackageButton() {
  try {
    Log.AppendFolder("clickAddDDPackageButton - Clicks the 'Add DD Package' button in the Manage Packages window.")
    let addButton = Aliases.HCMClient.ManagePackagesWindow.ManagePackageMainWindow.ButtonAddDdPackage;
    addButton.ClickButton();
    Log.Message("Clicked 'Add DD Package' button successfully.");
  } catch (error) {
    Log.Error("Failed to click 'Add DD Package' button: " + error.message);
  } finally{
    Log.PopLogFolder()
  }
}


// =====================================================================
// Author:        Bharath
// Function:      selectDDFileTypeFromDropdown
// Description:   Selects a specified file type from the 'FileType' dropdown
//                in the 'Add DD Package File' popup.
// Created On:    23-June-2025
// Modified On:   
// =====================================================================
function selectDDFileTypeFromDropdown(fileType) {
  try {
    Log.AppendFolder("selectDDFileTypeFromDropdown - Selects a specified file type from the 'FileType' dropdown \n in the 'Add DD Package File' popup.")
    let comboBox = Aliases.HCMClient.Add_DDPackageFilePopUp.Add_DDPackage.FileTypeDropDown;
    comboBox.ClickItem(fileType);
    Log.Message("Selected file type: " + fileType);
  } catch (error) {
    Log.Error("Failed to select file type '" + fileType + "': " + error.message);
  } finally{
    Log.PopLogFolder()
  }
}


// =====================================================================
// Author:        Bharath
// Function:      uploadDDPackageFile
// Description:   Opens the 'Add DD Package File' dialog, navigates to a specified folder,
//                and uploads the desired type file.
// Created On:    23-June-2025
// Modified On:   
// =====================================================================
function uploadDDPackageFile(folderPath, fileName) {
  try {
    Log.AppendFolder("uploadDDPackageFile - Opens the 'Add DD Package File' dialog, navigates to a specified folder,\n and uploads the desired type file.")
    let HCMClient = Aliases.HCMClient;
    
    // Open the file dialog
    HCMClient.Add_DDPackageFilePopUp.Add_DDPackage.btn_BrowseFile.Rectangle.Click();

    let dlgOpen = HCMClient.dlgOpen;
    let progress = dlgOpen.WorkerW.ReBarWindow32.AddressBandRoot.progress;

    // Navigate to the folder path
    progress.BreadcrumbParent.toolbar.ClickItem("All locations");
    progress.comboBox.SetText(folderPath);
    
    // Select the desired file to upload
    dlgOpen.OpenFile(folderPath + fileName);

    Log.Message("File '" + fileName + "' uploaded successfully from: " + folderPath);
  } catch (error) {
    Log.Error("Failed to upload DD Package file: " + error.message);
  } finally{
    Log.PopLogFolder()
  }
}


// =====================================================================
// Author:        Bharath
// Function:      clickAddToLibraryButton
// Description:   Clicks the 'Add To Library' button on the Add DD Package File popup.
// Created On:    23-June-2025
// Modified On:   
// =====================================================================
function clickAddToLibraryButton() {
  try {
  Log.AppendFolder("clickAddToLibraryButton - Clicks the 'Add To Library' button on the Add DD Package File popup.")
  let addToLibraryButton = Aliases.HCMClient.Add_DDPackageFilePopUp.Add_DDPackage.ButtonAddToLibrary;

    if (addToLibraryButton && addToLibraryButton.Enabled) {
      addToLibraryButton.ClickButton();
      Log.Message("Clicked 'Add To Library' button successfully.");
    } else {
      Log.Warning("'Add To Library' button is not available or not enabled.");
    }
    
    let CustomErrorMessage =  Aliases.HCMClient.CustomErrorMessage
     if (CustomErrorMessage.Exists) {
       if(CustomErrorMessage.panelOK.btnOK)
       {
         Log.Error("Error message popup present due to added invalid or occured failure")
         CustomErrorMessage.panelOK.btnOK.Click()
         
       }
      
      let InformationWindowPopUp = Aliases.HCMClient.InformationWindowPopUp;
      if (InformationWindowPopUp.Exists){
        let Message = InformationWindowPopUp.InformationWindow.InformationTextView.WPFControlText;
        if(Message.includes("Failure")) {
        Log.Error("Failure while adding DD Package: Message - " + Message);
        InformationWindowPopUp.InformationWindow.ButtonOk.Click();
        }
      }
       
    }
    
    // Check for and respond to Information popup
    Delay(500)
    InformationWindowPopUp = Aliases.HCMClient.InformationWindowPopUp;
    if (InformationWindowPopUp.Exists && InformationWindowPopUp.Enabled){
      let Message = InformationWindowPopUp.InformationWindow.InformationTextView.WPFControlText;
      if(Message.includes("successfully")) {
      Log.Message("Successfully added DD Package: Message - " + Message);
      InformationWindowPopUp.InformationWindow.ButtonOk.ClickButton();
      }
    }
      

    // Handle package validation confirmation prompt, if it appears
    let PkgValidationStatusViewPopUp = Aliases.HCMClient.PkgValidationStatusViewPopUp;
    if (PkgValidationStatusViewPopUp.Exists) {
      Log.Message("Package validation prompt detected. Confirming with 'Yes' button.");
      PkgValidationStatusViewPopUp.PkgValidationStatusView.btn_Yes.Click();
    }

    if (InformationWindowPopUp.Exists){
      let Message = InformationWindowPopUp.InformationWindow.InformationTextView.WPFControlText;
      if(Message.includes("failure")) {
      let Message = InformationWindowPopUp.InformationWindow.InformationTextView.WPFControlText;
      Log.Error("Failed to add DD Package: Message - " + Message);
      InformationWindowPopUp.InformationWindow.ButtonOk.ClickButton();
      }
    }
     
    return true;
  } catch (error) {
    Log.Error("Unexpected error in clickAddToLibraryButton: " + error.message);
    return false;
  } finally {
    Log.PopLogFolder()
  }
}


// =====================================================================
// Author:        Bharath
// Function:      clickAdd_DDPackagePopUpCloseButton
// Description:   Clicks the 'Close' button on the Add DD Package File popup.
// Created On:    23-June-2025
// Modified On:   
// =====================================================================
function clickAdd_DDPackagePopUpCloseButton() {
  try {
    Log.AppendFolder("clickAdd_DDPackagePopUpCloseButton - Clicks the 'Close' button on the Add DD Package File popup.")
    let closeButton = Aliases.HCMClient.Add_DDPackageFilePopUp.Add_DDPackage.CloseButton
                     
    if (closeButton && closeButton.Enabled) {
      closeButton.Click();
      Log.Message("Clicked 'Close' button successfully.");
    } else {
      Log.Error("'Close' button is not available or not enabled.");
    }
  } catch (error) {
    Log.Error("Failed to click 'Close' button: " + error.message);
  }
}


// =====================================================================
// Author:        Bharath
// Function:      clickManage_DDPackagePopUpCloseButton
// Description:   Clicks the 'Close' button on the Add DD Package File popup.
// Created On:    23-June-2025
// Modified On:   
// =====================================================================
function clickManage_DDPackagePopUpCloseButton() {
  try {
    Log.AppendFolder("clickManage_DDPackagePopUpCloseButton - Clicks the 'Close' button on the Add DD Package File popup.")
    let closeButton = Aliases.HCMClient.ManagePackagesWindow.ManagePackageMainWindow.ManagePackages.ButtonManageDdPackage.Rectangle;
                      
    if (closeButton && closeButton.Enabled) {
      closeButton.Click();
      Log.Message("Clicked 'Close' button successfully.");
    } else {
      Log.Error("'Close' button is not available or not enabled.");
    }
  } catch (error) {
    Log.Error("Failed to click 'Close' button: " + error.message);
  } finally {
    Log.PopLogFolder()
  }
}

// =====================================================================
// Author:        Bharath
// Function:      deleteDDPackageByDeviceType
// Description:   Deletes a DD Package matching the given device type, and 
//                verifies success message based on provided input.
// Created On:    23-June-2025
// Modified On:   
// =====================================================================
function deleteDDPackageByDeviceType(deviceType) {
  try {
    Log.AppendFolder("deleteDDPackageByDeviceType - Deletes a DD Package matching the given device type, and \n verifies success message based on provided input.")
    let HCMClient = Aliases.HCMClient;
    let dataGrid = HCMClient.ManagePackagesWindow.ManagePackageMainWindow.dataGrid;

    aqObject.CheckProperty(dataGrid.Datagridcell, "WPFControlText", cmpEqual, deviceType);
    dataGrid.ButtonDelete.ClickButton();

    let confirmationWindow = HCMClient.ConfirmationWindow;
    aqObject.CheckProperty(confirmationWindow.TextblockDeletePackage, "WPFControlText", cmpEqual, "Delete Package");
    confirmationWindow.ButtonOk.ClickButton();

    aqObject.CheckProperty(HCMClient.HwndSource_ProgressBar.ProgressBar.Border, "Enabled", cmpEqual, true);

    let dlgDeleteDDFile = HCMClient.dlgDeleteDDFile;
    aqObject.CheckProperty(dlgDeleteDDFile, "Enabled", cmpEqual, true);
    let btnYes = dlgDeleteDDFile.btnYes;
    aqObject.CheckProperty(btnYes, "WndCaption", cmpEqual, "&Yes");
    btnYes.ClickButton();

    let hwndSource = HCMClient.InformationWindowPopUp;
    hwndSource.ButtonOk.ClickButton();

    Log.Message("DD Package '" + deviceType + "' deleted successfully.");

  } catch (error) {
    Log.Error("Error while deleting DD Package '" + deviceType + "': " + error.message);
  } finally {
    Log.PopLogFolder()
  }
}


function Test(){
  deleteDDPackageByDeviceType("APV400 (E66C)")
  

  var comboBoxDeviceType = managePackages.ComboboxDeviceType
  Runner.CallMethod("GenericScript.selectComboBoxItemByName",comboBoxDeviceType, "ST3000 (1701)");
  //Clicks the 'Rectangle' object.
  Aliases.HCMClient.HwndSource_Shell.Close();
  aqUtils.Delay(1000)
}

function Test1()
{
  selectProtocol("HART")
  selectManufacturer("Honeywell (17)");
  selectDeviceType("ST3000 (1701)");
}

/*
selectProtocol("HART")
*/

// =====================================================================
// Author:        Bharath
// Function:      selectProtocol
// Description:   Selects a given protocol from the Protocol combobox in the 
//                Manage Packages window using a reusable method.
// Created On:    25-06-2025
// Modified On:   
// =====================================================================
function selectProtocol(protocolName) {
  try {
    Log.AppendFolder("selectProtocol - Selects a given protocol from the Protocol combobox in the \n Manage Packages window using a reusable method.")
    let managePackages = Aliases.HCMClient.ManagePackagesWindow.ManagePackageMainWindow.ManagePackages;
    let comboBoxProtocol = managePackages.ComboboxProtocol;

    if (comboBoxProtocol.Exists && comboBoxProtocol.Enabled) {
      selectComboBoxItemByNameDD(comboBoxProtocol, protocolName);
      Log.Message(`'${protocolName}' protocol selected successfully from the combo box.`);
    } else {
      Log.Warning("Protocol combobox is not available or not enabled.");
    }
  } catch (error) {
    Log.Error("Failed to select protocol: " + error.message);
  } finally {
    Log.PopLogFolder()
  }
}

/*
selectManufacturer("Honeywell (17)");
*/


// =====================================================================
// Author:        Bharath
// Function:      selectManufacturer
// Description:   Selects a given manufacturer from the combobox in the 
//                Manage Packages window using a reusable method.
// Created On:    25-06-2025
// Modified On:   
// =====================================================================
function selectManufacturer(manufacturerName) {
  try {
    Log.AppendFolder("selectManufacturer - Selects a given manufacturer from the combobox in the \n  Manage Packages window using a reusable method.")
    let managePackages = Aliases.HCMClient.ManagePackagesWindow.ManagePackageMainWindow.ManagePackages;
    let comboBoxManufacturer = managePackages.ComboboxManufacturer;

    if (comboBoxManufacturer.Exists && comboBoxManufacturer.Enabled) {
      selectComboBoxItemByNameDD(comboBoxManufacturer, manufacturerName);
      Log.Message(`'${manufacturerName}' selected successfully from the Manufacturer combobox.`);
    } else {
      Log.Warning("Manufacturer combobox is not available or not enabled.");
    }
  } catch (error) {
    Log.Error("Failed to select manufacturer: " + error.message);
  } finally{
    Log.PopLogFolder()
  }
}

/*
selectDeviceType("ST3000 (1701)");
*/

// =====================================================================
// Author:        Bharath
// Function:      selectDeviceType
// Description:   Selects a given device type from the combobox in the 
//                Manage Packages window using a reusable method.
// Created On:    25-06-2025
// Modified On:   
// =====================================================================
function selectDeviceType(deviceTypeName) {
  try {
    Log.AppendFolder("selectDeviceType - Selects a given device type from the combobox in the \n Manage Packages window using a reusable method.")
    let managePackages = Aliases.HCMClient.ManagePackagesWindow.ManagePackageMainWindow.ManagePackages;
    let comboBoxDeviceType = managePackages.ComboboxDeviceType;

    if (comboBoxDeviceType.Exists && comboBoxDeviceType.Enabled) {
      selectComboBoxItemByNameDD(comboBoxDeviceType, deviceTypeName);
      Log.Message(`'${deviceTypeName}' selected successfully from the Device Type combobox.`);
    } else {
      Log.Warning("Device Type combobox is not available or not enabled.");
    }
  } catch (error) {
    Log.Error("Failed to select device type: " + error.message);
  } finally{
    Log.PopLogFolder()
  }
}



function findDDAndClickDeleteRow(targetName, targetdeviceRevision, targetDDpackageVersion) {
  Log.AppendFolder("findDDAndClickDeleteRow")
  var HCMClient = Aliases.HCMClient
  var grid = HCMClient.ManagePackagesWindow.ManagePackageMainWindow.dataGrid;
  var rowCount = grid.wRowCount;
  var deleted = false;

  for (var row = 0; row < rowCount; row++) {
    var name = grid.wValue(row, 2);   
    name = name.OleValue// Honeywell (00)
    var deviceRevision = grid.wValue(row, 3);   // 1
    deviceRevision = deviceRevision.OleValue
    var DDpackageVersion = grid.wValue(row, 4);  // 01.01.04
    DDpackageVersion = DDpackageVersion.OleValue

    if (name === targetName && deviceRevision === targetdeviceRevision && DDpackageVersion === targetDDpackageVersion) {
      Log.Message("Match found at row " + row + ". Deleting...");
      clickDeleteButtonInRow(row+1);
      deleted = true;
      break;  // Exit loop after deletion
    }
  }

  if (!deleted) {
    Log.Warning("No matching row found to delete.");
    return false
  }
  
   let confirmationWindow = HCMClient.ConfirmationWindow;
    aqObject.CheckProperty(confirmationWindow.TextblockDeletePackage, "WPFControlText", cmpContains, "Delete");
    confirmationWindow.ButtonOk.ClickButton();

    let dlgDeleteDDFile = HCMClient.dlgDeleteDDFile;
    aqObject.CheckProperty(dlgDeleteDDFile, "Enabled", cmpEqual, true);
    let btnYes = dlgDeleteDDFile.btnYes;
    aqObject.CheckProperty(btnYes, "WndCaption", cmpContains, "&Yes");
    btnYes.ClickButton();
               
    let hwndSource = HCMClient.InformationWindowPopUp;
    hwndSource.InformationWindow.ButtonOk.Click();

    Log.Message("DD Package '" + name + "' deleted successfully.");
    Log.PopLogFolder()
}

function clickDeleteButtonInRow(rowIndex) {
  var grid = Aliases.HCMClient.ManagePackagesWindow.ManagePackageMainWindow.dataGrid;
  var row = grid.WPFObject("DataGridRow", "", rowIndex);

  var deleteButton = row.FindChild("WPFControlText","DELETE",100)
    
  deleteButton.Click();
}

