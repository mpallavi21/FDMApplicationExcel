
//USEUNIT serverKeywords

function obj_ServerControlGroupBox() {
  Log.AppendFolder("ServerControlGroupBox");

  try { 
    managerMainForm = serverKeywords.obj_ServerManagerMainForm()
    var controls = SMToolControlInfo.ControlRepository.obj_ServerControlGroupBox
    
    var groupBox = managerMainForm.FindChild("Name",controls.groupBox["Name"],100);

    if (groupBox.Exists) {
      Log.Checkpoint("✅ Server Control group box found and visible.");
      return groupBox;
    } else {
      Log.Error("❌ Server Control group box not found or not visible.");
      return null;
    }

  } catch (e) {
    Log.Error("❌ Exception while retrieving Server Control group box: " + e.message);
    return null;
  } finally {
    Log.PopLogFolder();
  }
}


function obj_ServerControlLabel() {
  Log.AppendFolder("getServerControlLabel");

  try {
    let ObjServerControl = obj_ServerControlGroupBox()
    var controls = SMToolControlInfo.ControlRepository.obj_ServerControlLabel
    
    var labelObj = ObjServerControl.FindChild("Name",controls.labelObj["Name"],100);

    if (labelObj.Exists ) {
      Log.Checkpoint(" Server Control lable found or visible")
      return labelObj;
    } else {
      Log.Error("❌ Server Control label not found or not visible.");
      return null;
    }

  } catch (e) {
    Log.Error("❌ Exception while retrieving Server Control label: " + e.message);
    return null;
  } finally {
    Log.PopLogFolder();
  }
}


function obj_StartStopButton() {
  Log.AppendFolder("clickStartStopButton");

  try {
    let ObjServerControl = obj_ServerControlGroupBox()
    
    var controls = SMToolControlInfo.ControlRepository.obj_StartStopButton
    
    var buttonObj = ObjServerControl.FindChild("Name",controls.btnStartStop["Name"],100)

    if (buttonObj.Exists && buttonObj.Enabled) {
      Log.Checkpoint("✅ Start/Stop button clicked successfully.");
      return buttonObj;
    } else {
      Log.Error("❌ Start/Stop button not found, not enabled, or not visible.");
      return null;
    }

  } catch (e) {
    Log.Error("❌ Exception while clicking Start/Stop button: " + e.message);
    return null;
  } finally {
    Log.PopLogFolder();
  }
}

// =====================================================================
// Function:      toggleServerStartStop
// Description:   Starts or stops the server and waits until state changes
// =====================================================================
function toggleServerStartStop(action, timeoutMs) {
  Log.AppendFolder("toggleServerStartStop - Server Control");

  try {
    
    let statusLabel = obj_ServerControlLabel()
    let startStopBtn = obj_StartStopButton()
    if (!statusLabel.Exists || !startStopBtn.Exists) throw new Error("Controls not found.");

    let statusText = aqString.Trim(statusLabel.WndCaption);
    let actionLower = aqString.ToLower(action);
    let timeout = timeoutMs || 120000; // default to 10 seconds

    if (actionLower === "stop") {
      if (statusText === "Server is currently STARTED") {
        startStopBtn.Click();
        Log.Message("🛑 Clicked to STOP the server...");
        serverKeywords.submitAuditTrailReason(actionLower)
        serverKeywords.handleCustomMessageBoxOfYes()
        let success = statusLabel.WaitProperty("WndCaption", "Server is currently STOPPED", timeout);
        if (success) {
          Log.Checkpoint("✅ Server successfully stopped.");
        } else {
          Log.Warning("⏳ Timeout waiting for server to stop.");
        }
      } else {
        Log.Message("✅ Server already stopped.");
      }

    } else if (actionLower === "start") {
      if (statusText === "Server is currently STOPPED") {
        startStopBtn.Click();
        Log.Message("🚀 Clicked to START the server...");
        serverKeywords.submitAuditTrailReason(actionLower)
        serverKeywords.handleCustomMessageBoxOfYes()
        let success = statusLabel.WaitProperty("WndCaption", "Server is currently STARTED", timeout);
        if (success) {
          Log.Checkpoint("✅ Server successfully started.");
        } else {
          Log.Warning("⏳ Timeout waiting for server to start.");
        }
      } else {
        Log.Message("✅ Server already running.");
      }

    } else {
      Log.Warning("⚠️ Invalid action: " + action);
    }
    
  } catch (error) {
    Log.Error("❌ Error in toggleServerStartStop: " + error.message);
  } finally {
    Log.PopLogFolder();
  }
}




function test(){
  toggleServerStartStop("stop")
}

