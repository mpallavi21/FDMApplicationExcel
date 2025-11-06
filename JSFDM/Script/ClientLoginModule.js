
let HCMClient = Aliases.HCMClient
let ClientLogin = HCMClient.CLogin //WinFormsObject("CLogin")
let UserNameTextBox = ClientLogin.UserNameTextBox
let PasswordTextBox = ClientLogin.PasswordTextBox

function EnterClientUserName(UserName){
  UserNameTextBox.TextBoxArea.SetFocus()
  UserNameTextBox.TextBoxArea.SetText(UserName)
}

function EnterClientPassword(Password){
  PasswordTextBox.TextBoxArea.SetFocus()
  PasswordTextBox.TextBoxArea.SetText(Password)
}

function test(){
  launchFDMClient()
}

// =====================================================================
// Author:        Bharath
// Function:      launchFDMClient
// Description:   Launches the FDM Client using specified credentials,
//                selects server and domain, and navigates to the main window.
// Created On:    2025-06-20
// Modified On:   None
// =====================================================================
function launchFDMClient(ServerName,Username,Password ) {
  Log.AppendFolder("launchFDMClient - Launches the FDM Client using specified credentials")
  Log.Checkpoint("Launching FDM Client...");
  
  // Terminate HCMClient if already running
  if (Sys.WaitProcess("HCMClient", 5000).Exists) {
    Log.Message("HCMClient process found. Terminating...");
    Sys.Process("HCMClient").Terminate();
  }

  // Launch the HCMClient tested application
  Log.Message("Running TestedApps.HCMClient...");
  TestedApps.HCMClient.Run(1,true)
  
  // Select server from dropdown
  Log.Message("Setting server...");
  let server = ClientLogin.FdmServerNameField
  let ServerDDbox = server.ComboBoxTextBoxArea
  ServerDDbox.SetFocus()
  ServerDDbox.SetText(ServerName);
  Log.Message("Server set to: " + ServerName);
  clickOnLoginBtn()
  Delay(1500)
  ClientLogin.WaitProperty("Exists", true, 180000);
  
  if(ClientLogin.Exists){
    // Set Username
    EnterClientUserName(Username);

    // Set Password
    EnterClientPassword(Password)

    // Select Domain
    Log.Message("Selecting domain...");
    ClientLogin.DomainTextBox.Click();
    Log.Message("Domain selected via keyboard input.");

    clickOnLoginBtn()
  }else{
    Log.Message("Here used single sign On")
    Project.Variables.SignOnToggle = cbUnchecked
  }
  dlg = Aliases.HCMClient.dlgFDMConfiguration;
    if (dlg.Exists) {
      let messageText = dlg.Window("Static", "*", 2).WndCaption

      if (messageText.includes("Login Failed")) {
        Log.Message("Login failure message detected: " + messageText);
        dlg.btnOK.Click();
        ClientLogin.buttonCancel.Click()
        Log.Message("Clicked OK button to dismiss login failure dialog.");
        return false
      } else {
        Log.Message("Dialog exists but message is not 'Login Failed': " + messageText);
      }

    } else {
      Log.Message("Login failure dialog not present.");
    }          
  
  // Wait for main application window
  Log.Message("Waiting for main application window...");
  mainWindow = HCMClient.ClientMainWindow;
  mainWindow.WaitProperty("Exists", true, 120000);
  Log.Checkpoint("FDM Client launched and main window detected.");
  aqUtils.Delay(1000);
  Log.PopLogFolder()
}


// =====================================================================
// Author:        Bharath
// Function:      handleLoginFailureDialog
// Description:   Detects the FDM Configuration dialog and clicks OK if
//                the login failure message is displayed.
// Created On:    23-Jul-2025
// Modified On:   23-Jul-2025
// =====================================================================

function handleLoginFailureDialog() {
  Log.AppendFolder("handleLoginFailureDialog - Login Failure Check");

  try {
    

  } catch (error) {
    Log.Error("Exception in handleLoginFailureDialog: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}



// =====================================================================
// Author:        Bharath
// Function:      terminateFMDClient
// Description:   Terminates the HCMClient process via Sys.Process.
// Created On:    30-Jul-2025
// Modified On:   30-Jul-2025
// =====================================================================

function terminateFMDClient() {
  Log.AppendFolder("terminateFMD - Terminate HCMClient via Sys.Process");

  try {
    
    const processName = "HCMClient";
  const process = Sys.WaitProcess(processName, 5000);

  if (process.Exists) {
    Log.Message(processName + " process found. Terminating...");
    process.Terminate();
    Log.Message(processName + " process terminated successfully.");
  } else {
    Log.Message(processName + " process not running. No action required.");
  }
    
  } catch (error) {
    Log.Error("Exception during HCMClient termination: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}


function openFDMToolBarSwitchServer(serverName) {
  Log.AppendFolder("openFDMToolBarSwithcServer - Opens the FDM toolbar Switch server menu using OCR clicks")

  try {
    let HCMClient = Aliases.HCMClient;
    let mainMenu = HCMClient.ClientMainWindow.mainMenu
    OCR.Recognize(mainMenu).BlockByText("FDM").Click();
    Log.Message("Clicked on 'FDM' menu item.");
    OCR.Recognize(Aliases.HCMClient.DropDownForm.SubSmartControl).BlockByText("Switch").Click();
    Log.Message("Clicked on 'Switch' option.");
    
    // Select server from dropdown
    ClientLogin = Aliases.HCMClient.ClientLogin
    if(ClientLogin.Exists){
      Log.Message("Setting server...");
      let server = ClientLogin.FdmServerNameField
      let ServerDDbox = server.TextFieldArea
      ServerDDbox.SetText(serverName);
      Log.Message("Server set to: " + serverName);
      
      
    }
  } catch (error) {
    Log.Error("Failed to open FDM toolbar Switch Server.", error.message);
  } finally{
    Log.PopLogFolder()
  }
}

function clickOnLoginBtn(){
      // Click 'Login' to proceed to credentials
      let HCMClient = Aliases.HCMClient;
      Log.Message("Clicking login button...");
      let LoginBtn = HCMClient.CLogin.LoginButton
      LoginBtn.Click();
}

function clickOnLoginCancelBtn(){
      // Click 'Login' to proceed to credentials
      let HCMClient = Aliases.HCMClient;
      Log.Message("Clicking login button...");
      let CancelButton = HCMClient.ClientLogin.buttonCancel
      CancelButton.Click()
}

