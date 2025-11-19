//USEUNIT SMToolControlInfo
//USEUNIT STDLib




function launchApplication() {
  Log.AppendFolder("launchApplication");

  try {
    TestedApps.ServerMgmtTool.Run();
    Log.Message("Application launched successfully");
    
  } catch (e) {
    Log.Error("Failed to launch application: " + e.message);
  } finally {
    Log.PopLogFolder();
  }
}

function obj_loginFormPage() {
  Log.AppendFolder("obj_loginFormPage");

  try {
    const controls = SMToolControlInfo.ControlRepository["obj_loginFormPage"];

    let loginForm = Aliases.ServerMgmtTool.WaitWinFormsObject(
      controls.loginForm["Name"],
      controls.loginForm["WndCaption"],
      1,
      10000
    );

    if (loginForm && loginForm.Exists) {
      Log.Message("✅ Login form found successfully.");
      return loginForm;
    } else {
      Log.Error("❌ Login form not found.");
      return null;
    }

  } catch (e) {
    Log.Error("❌ Exception while locating login form: " + e.message);
    return null;
  } finally {
    Log.PopLogFolder();
  }
}
 
function enterCredentials(username, password) {
  Log.AppendFolder("enterCredentials");

  try {
    let loginForm = obj_loginFormPage();
    if (!loginForm || !loginForm.Exists) {
      Log.Error("Login form not available. Cannot enter credentials.");
      return;
    }

    var controls = SMToolControlInfo.ControlRepository.enterCredentials;
     
    let loginNameField = loginForm.FindChild("Name", controls.loginNameField["Name"],100)
                          .FindChild("ClrFullClassName", controls.loginNameField["Class"], 100);

    let passwordField = loginForm.FindChild("Name", controls.passwordField["Name"],100)
                          .FindChild("ClrFullClassName", controls.loginNameField["Class"], 100);

    if (!loginNameField || !loginNameField.Exists) {
      Log.Error("Login name field not found.");
      return;
    }

    if (!passwordField || !passwordField.Exists) {
      Log.Error("Password field not found.");
      return;
    }

    loginNameField.SetText(username);
    passwordField.SetText(password);

    Log.Checkpoint("✅ Entered username and password successfully.");

  } catch (e) {
    Log.Error("❌ Error entering credentials: " + e.message);
  } finally {
    Log.PopLogFolder();
  }
}


function setDomainValue(domainValue) {
  Log.AppendFolder("setDomainValue");

  try {
    let loginForm = obj_loginFormPage();
    if (!loginForm || !loginForm.Exists) {
      Log.Error("Login form not available. Cannot set domain value.");
      return;
    }

    var controls = SMToolControlInfo.ControlRepository.setDomainValue;

    let cbDomain = FindChildName(loginForm, controls.cbDomain["Name"]);
    if (!cbDomain || !cbDomain.Exists) {
      Log.Error("Domain combo box not found.");
      return;
    }

    let textBoxArea = FindChildName(cbDomain, controls.cbTextBoxArea["Name"]);
    if (!textBoxArea || !textBoxArea.Exists) {
      Log.Error("Editable area of domain combo box not found.");
      return;
    }

    textBoxArea.SetText(domainValue);
    Log.Checkpoint("✅ Domain value typed: " + domainValue);

  } catch (e) {
    Log.Error("❌ Error setting domain value: " + e.message);
  } finally {
    Log.PopLogFolder();
  }
}

function obj_btnLogin() {
  Log.AppendFolder("obj_btnLogin");

  try {
    let loginForm = obj_loginFormPage();
    if (!loginForm || !loginForm.Exists) {
      Log.Error("Login form not available. Cannot locate Login button.");
      return null;
    }
    
    var controls = SMToolControlInfo.ControlRepository.obj_btnLogin;

    let loginButton = FindChildName(loginForm, controls.btnLogin["Name"]);

    if (loginButton && loginButton.Exists) {
      Log.Message("✅ Login button found and ready for interaction.");
      return loginButton;
    } else {
      Log.Error("❌ Login button not found within the expected timeout.");
      return null;
    }

  } catch (e) {
    Log.Error("❌ Error locating Login button: " + e.message);
    return null;
  } finally {
    Log.PopLogFolder();
  }
}

 function obj_btnCancel() {
  Log.AppendFolder("obj_btnCancel");

  try {
    let loginForm = obj_loginFormPage();
    if (!loginForm || !loginForm.Exists) {
      Log.Error("❌ Login form not available. Cannot locate Cancel button.");
      return null;
    }
    var controls = SMToolControlInfo.ControlRepository.obj_btnCancel;
    
    let cb_cancelButton = loginForm.FindChild("Name", controls.cancelButton["Name"], 100);
    
    if (cb_cancelButton && cb_cancelButton.Exists) {
      Log.Checkpoint("✅ Cancel button found. Ready for interaction.");
      return cb_cancelButton;
    } else {
      Log.Error("❌ Cancel button not found or not visible.");
      return null;
    }

  } catch (e) {
    Log.Error("❌ Exception while locating Cancel button: " + e.message);
    return null;
  } finally {
    Log.PopLogFolder();
  }
}



function obj_ServerManagerMainForm() {
  Log.AppendFolder("obj_ServerManagerMainForm");

  try {
    
    var controls = SMToolControlInfo.ControlRepository.obj_ServerManagerMainForm;

    var form = Aliases.ServerMgmtTool.FindChild("Name", controls.serverManagerMainForm["Name"],100);
    if (form && form.Exists) {
      Log.Message("✅ ServerManagerMainForm found.");
      return form;
    } else {
      Log.Warning("⚠️ ServerManagerMainForm not found.");
      return null;
    }

  } catch (e) {
    Log.Error("❌ Exception in ServerManagerMainForm: " + e.message);
    return null;
  } finally {
    Log.PopLogFolder();
  }
}



function waitForServerManagerMainForm(timeoutMs) {
  Log.AppendFolder("waitForServerManagerMainForm");

  try {
    var controls = SMToolControlInfo.ControlRepository.waitForServerManagerMainForm; 

    var appProcess = Aliases.ServerMgmtTool;
    var mainForm = appProcess.WaitWinFormsObject(
      controls.mainForm["Name"],
      controls.mainForm["WndCaption"],
      1,
      timeoutMs
    );

    if (mainForm && mainForm.Exists) {
      Log.Checkpoint("✅ ServerManagerMainForm is available.");
      return mainForm;
    } else {
      Log.Error("⚠️ ServerManagerMainForm not found within " + timeoutMs + " ms.");
      return null;
    }

  } catch (e) {
    Log.Error("❌ Exception while waiting for ServerManagerMainForm: " + e.message);
    return null;
  } finally {
    Log.PopLogFolder();
  }
}


function captureInvalidLoginPopupCaption() {
  Log.AppendFolder("captureInvalidLoginPopupCaption");

  try {
    var timeout = 10000;
    var process = Aliases.ServerMgmtTool;

    var controls = SMToolControlInfo.ControlRepository.captureInvalidLoginPopupCaption; 

    var popupWindow = process.WaitWindow(
      controls.popupWindow["WndClass"],
      controls.popupWindow["WndCaption"],
      1,
      timeout
    );

    if (popupWindow && popupWindow.Exists) {
      var popupWindowStatic = popupWindow.FindChild("WndClass", controls.popupStatic["WndClass"], 1);

      if (popupWindowStatic && popupWindowStatic.Exists) {
        var captionText = popupWindowStatic.WndCaption;
        Log.Message("❗ Popup appeared with caption: " + captionText);
      } else {
        Log.Warning("⚠️ Static control not found inside popup.");
      }

      var okButton = popupWindow.Window(
        controls.okButton["WndClass"],
        controls.okButton["WndCaption"],
        1
      );

      if (okButton && okButton.Exists && okButton.Enabled) {
        okButton.Click();
        Log.Checkpoint("✅ OK button clicked to dismiss popup.");
      } else {
        Log.Warning("⚠️ OK button not found or not enabled.");
      }

    } else {
      Log.Error("⏱️ Popup window not found within timeout.");
    }

  } catch (e) {
    Log.Error("❌ Exception while handling popup: " + e.message);
    return null;
  } finally {
    Log.PopLogFolder();
  }
}



function TerminateServerMgmtTool() {
  const processName = "ServerMgmtTool";
  const process = Sys.WaitProcess(processName, 5000);

  if (process.Exists) {
    Log.Message(processName + " process found. Terminating...");
    process.Terminate();
    Log.Message(processName + " process terminated successfully.");
  } else {
    Log.Message(processName + " process not running. No action required.");
  }
  
}



function validateCopyrightLabel(expectedText) {
  Log.AppendFolder("validateCopyrightLabel");

  try {
    let loginForm = obj_loginFormPage();
    if (!loginForm || !loginForm.Exists) {
      Log.Error("Login form not available. Cannot validate label.");
      return;
    }

    var controls = SMToolControlInfo.ControlRepository.validateCopyrightLabel; 

    let labelObj = FindChildName(loginForm, controls.copyrightLabel["Name"]);

    if (labelObj && labelObj.Exists) {
      let actualText = labelObj.WndCaption;

      if (actualText === expectedText) {
        Log.Checkpoint("✅ Label text matches expected: '" + actualText + "'");
      } else {
        Log.Error("❌ Label text mismatch. Expected: '" + expectedText + "', Found: '" + actualText + "'");
      }
    } else {
      Log.Error("⚠️ Label not found or not visible.");
    }

  } catch (e) {
    Log.Error("❌ Exception during label validation: " + e.message);
  } finally {
    Log.PopLogFolder();
  }
}


function submitAuditTrailReason(reasonText) {
  Log.AppendFolder("submitAuditTrailReason");

  try {
    var controls = SMToolControlInfo.ControlRepository.submitAuditTrailReason;   
             
    var auditBox = Aliases.ServerMgmtTool.WaitWinFormsObject(
      controls.auditBox["Name"],
      controls.auditBox["WndCaption"],
      controls.auditBox["Index"],
      20000
    );

    if (!auditBox || !auditBox.Exists) {
      Log.Error("❌ AuditTrailReasonBox not found.");
      return false;
    }

    var reasonField = FindChildName(auditBox, controls.reasonField["Name"]);
    var okButton = FindChildName(auditBox, controls.okButton["Name"]);

    // Validate and enter reason
    if (reasonField && reasonField.Exists && reasonField.Enabled) {
      reasonField.SetText(reasonText);
      Log.Message("📝 Entered reason: '" + reasonText + "'");
    } else {
      Log.Error("❌ ReasonTextBox not available for input.");
      return false;
    }

    // Click OK if enabled
    if (okButton && okButton.Exists && okButton.Enabled) {
      okButton.Click();
      Log.Checkpoint("✅ OK button clicked to submit reason.");
      return true;
    } else {
      Log.Error("❌ OK button not clickable.");
      return false;
    }

  } catch (e) {
    Log.Error("❌ Exception during audit trail submission: " + e.message);
    return false;
  } finally {
    Log.PopLogFolder();
  }
}



function handleCustomMessageBoxOfOk() {
  Log.AppendFolder("handleCustomMessageBoxOfOk");

  try {
    var controls = SMToolControlInfo.ControlRepository.handleCustomMessageBoxOfOk;   

    var messageBox = Aliases.ServerMgmtTool.CustomMessageBox
    
      if(messageBox.Exists){
        var messageText = FindChildName(messageBox, controls.messageText["Name"]);
      var okButton = FindChildName(messageBox, controls.okButton["Name"]);

      // Print message caption
      if (messageText && messageText.Exists) {
        var caption = messageText.WndCaption;
        Log.Message("📢 Message Box Text: '" + caption + "'");
      } else {
        Log.Error("❌ Message text box not found or not visible.");
      }

      // Click OK button if enabled
      if (okButton && okButton.Exists && okButton.Enabled) {
        okButton.Click();
        Log.Checkpoint("✅ 'OK' button clicked.");
      } else {
        Log.Error("❌ 'OK' button not clickable.");
      }
    }
    

  } catch (e) {
    Log.Error("❌ Exception while handling CustomMessageBox: " + e.message);
  } finally {
    Log.PopLogFolder();
  }
}                        

function handleCustomMessageBoxOfYes() {
  Log.AppendFolder("handleCustomMessageBoxOfYes");

  try {
    var controls = SMToolControlInfo.ControlRepository.handleCustomMessageBoxOfYes;   

    var messageBox = Aliases.ServerMgmtTool.FindChild("Name",controls.messageBox["Name"],100);
    if (!messageBox || !messageBox.Exists) {
      Log.Error("❌ CustomMessageBox not found.");
      return;
    }
                                          
    var messageText = FindChildName(messageBox, controls.messageText["Name"]);
    var yesButton = FindChildName(messageBox, controls.yesButton["Name"]);

    // Print message caption
    if (messageText && messageText.Exists) {
      var caption = messageText.WndCaption;
      Log.Message("📢 Message Box Text: '" + caption + "'");
    } else {
      Log.Error("❌ Message text box not found or not visible.");
    }

    // Click Yes button if enabled
    if (yesButton && yesButton.Exists && yesButton.Enabled) {
      yesButton.Click();
      Log.Checkpoint("✅ 'Yes' button clicked.");
    } else {
      Log.Error("❌ 'Yes' button not clickable.");
    }

  } catch (e) {
    Log.Error("❌ Exception while handling CustomMessageBox: " + e.message);
  } finally {
    Log.PopLogFolder();
  }
}
function select_ComboBoxItem(comboBoxObj, itemText) {
  Log.AppendFolder("select_ComboBoxItem");

  try {
    if (!comboBoxObj || !comboBoxObj.Exists) {
      Log.Error("❌ Combo box object not found or not available.");
      return false;
    }

    if (!comboBoxObj.Enabled) {
      Log.Error("⚠️ Combo box is disabled. Cannot select item.");
      return false;
    }

    comboBoxObj.ClickItem(itemText);
    Log.Checkpoint("✅ Selected item '" + itemText + "' from combo box.");
    return true;

  } catch (e) {
    Log.Error("❌ Exception while selecting item from combo box: " + e.message);
    return false;
  } finally {
    Log.PopLogFolder();
  }
}


function select_ComboBoxItem1(comboBoxObj, itemText) {
  Log.AppendFolder("select_ComboBoxItem");

  try {
    if (!comboBoxObj || !comboBoxObj.Exists) {
      Log.Error("❌ Combo box object not found or not available.");
      return false;
    }

    if (!comboBoxObj.Enabled) {
      Log.Error("⚠️ Combo box is disabled. Cannot select item.");
      return false;
    }

    comboBoxObj.SetFocus();
    comboBoxObj.Click(); // Expand dropdown
    Delay(500);

    let itemCount = comboBoxObj.wItemCount;
    for (let i = 0; i < itemCount; i++) {
      comboBoxObj.Keys("[Home]"); // Reset to top
      for (let j = 0; j < i; j++) {
        comboBoxObj.Keys("[Down]");
        Delay(100);
      }

      let currentItem = comboBoxObj.wItem(i);
      if (currentItem && currentItem.toLowerCase() === itemText.toLowerCase()) {
        comboBoxObj.Keys("[Enter]");
        Log.Checkpoint("✅ Selected item '" + itemText + "' using keyboard navigation.");
        return true;
      }
    }

    Log.Warning("⚠️ Item '" + itemText + "' not found in combo box.");
    return false;

  } catch (e) {
    Log.Error("❌ Exception while selecting item from combo box: " + e.message);
    return false;
  } finally {
    Log.PopLogFolder();
  }
}



function SearchCombo(szobject, szitem) {
  Log.AppendFolder("SearchCombo");

  try {
    if (!szobject || !szobject.Exists) {
      Log.Error("❌ Combo box object not found.");
      return 0;
    }

    if (!szobject.Enabled) {
      Log.Warning("⚠️ Combo box is disabled. Cannot search items.");
      return 0;
    }

    let nItems = szobject.wItemCount;
    let normalizedTarget = szitem.trim().toUpperCase();

    for (let i = 0; i < nItems; i++) {
      let currentItem = szobject.wItem(i).trim().toUpperCase();
      if (currentItem === normalizedTarget) {
        Log.Checkpoint("✅ Item '" + szitem + "' found at index " + i);
        return 1;
      }
    }

    Log.Warning("🔍 Item '" + szitem + "' not found in combo box.");
    return 0;

  } catch (e) {
    Log.Error("❌ Exception during combo box search: " + e.message);
    return 0;
  } finally {
    Log.PopLogFolder();
  }
}

