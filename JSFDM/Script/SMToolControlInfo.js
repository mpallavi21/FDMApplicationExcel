 ControlRepository = {
  obj_loginFormPage: {
    loginForm: {
      Name: "LoginForm",
      WndCaption: "LoginForm",
      Index: 1
    }
  },
	

  enterCredentials: {
    loginNameField: {
      Name: "WinFormsObject('m_txtLoginName')",
      Class: "Xceed.Editors.TextBoxArea"
    },
    passwordField: {
      Name: "WinFormsObject('m_txtPassword')",
      Class: "Xceed.Editors.TextBoxArea"
    }
  },
 
  setDomainValue: {
    cbDomain: {
      Name: "WinFormsObject('m_cbDomain')"
    },
    cbTextBoxArea: {
      Name: "WinFormsObject('ComboBoxTextBoxArea')"
    }
  },

  obj_btnLogin: {
    btnLogin: {
      Name: "WinFormsObject('m_btnLogin')"
    }
  },

  obj_btnCancel: {
    cancelButton :{
      Name : "WinFormsObject('m_btnCancel')"
    }
  },
  
  obj_LicenseForm: {
    LicenseForm: {
      Name: "WinFormsObject('LicenseForm')"
    }
  },

  obj_ServerManagerMainForm: {
    ServerManagerMainForm: {
      Name: "WinFormsObject('ServerManagerMainForm')"
    }
  },

  obj_FDMServerManagerMainForm: {
    FDMServerManagerMainForm: {
      Name: "ServerManagerMainForm",
      Caption: "FDM Server Management",
      Index: 1
    }
  },

  CaptureInvalidLoginPopupCaption: {
    InvalidLogin: {
      WndClass: "#32770",
      WndCaption: "Invalid Login"
    },
    OK: {
      WndClass: "Button",
      WndCaption: "OK",
      Index: 1
    }
  },

  validateCopyrightLabel: {
    CopyrightLabel: {
      WndCaption: "Copyright 2012"
    }
  },
  
  waitForServerManagerMainForm : {
     mainForm:{
          Name: "ServerManagerMainForm",
          WndCaption: "FDM Server Management",
          Index:1
	
     }
  },
  
  obj_ServerControlGroupBox : {
      groupBox : {
        Name : `WinFormsObject("m_gbGroupBox1")`
      }
    },
    
  obj_ServerControlLabel:{
      labelObj : {
        Name:  `WinFormsObject("m_lblServerControl")`
      }
    },
       
  obj_StartStopButton:{
      btnStartStop :{
         Name : `WinFormsObject("m_btnStartStop")`
      }
    },
    
    obj_ServerManagerMainForm:{
        serverManagerMainForm:{
            Name:`WinFormsObject('ServerManagerMainForm')`
        }
    },
    submitAuditTrailReason:{
               auditBox:{
                 Name:"AuditTrailReasonBox",
                 WndCaption:"*Reason*",
                 Index:"1"
               },
               reasonField:{
                 Name:"WinFormsObject('ReasonTextBox')"
               },
               okButton:{
                 Name:"WinFormsObject('OKButton')"
               }
             },
         	
      handleCustomMessageBoxOfYes:{
        messageBox:{Name:`WinFormsObject('CustomMessageBox')`},
        messageText:{
        	Name:`WinFormsObject('m_txtboxMsg')`
          },
        yesButton:{	
          Name:`WinFormsObject('m_button3')`
          }
      }
      ,
         	
      handleCustomMessageBoxOfOk:{ 
        messageBox:{Name:`WinFormsObject('CustomMessageBox')`}, 
        messageText:{	Name:`WinFormsObject('m_txtboxMsg')`},
        okButton:{	Name:`WinFormsObject('m_button2')`}
      },
      obj_DisplayForm:{
           displayForm:{
                 Name:   `WinFormsObject("DisplayForm")`
           }
              
        },
      obj_btnView:{  
       btnView:{
         Name:`WinFormsObject("m_btnView")`
       }  
    },
    obj_btnAddNew:{
          btnAddNew:{
            Name:`WinFormsObject("m_btnNew")`
          }
        },
    obj_btnEdit:{
          btnEdit:{
            Name: `WinFormsObject("m_btnEdit")`
          }
        },
    obj_btnDelete:{
         btnDelete:{
           Name:`WinFormsObject("m_btnDelete")`
         }
       },
    obj_btnExitDisp:{
        btnExitDisp:{
          Name: `WinFormsObject("m_btnExitDisp")`
        }
    },
    obj_LicenseForm:{
       licenseForm:{
         Name:`WinFormsObject("LicenseForm")`
       }
    },
    obj_SelectResource:{
      selectResourceForm:{
        Name:`WinFormsObject("SelectResource")`
      }
    },
    obj_ComPortComboBox:{
        comPortComboBox:{
          Name:`WinFormsObject("m_combComPort")` 
        }
    },
    obj_BaudRateComboBox:{
         baudRateComboBox:{
           Name:`WinFormsObject("m_combBaudRate")`
         }
      },
    obj_RetryCountTextBox:{
       retryCountTextBox:{
         Name: `WinFormsObject("m_txtRetryCount")`
       }
    },
    obj_MuxEndAddrTextBox:{
      muxEndAddrTextBox:{
        Name:`WinFormsObject("m_txtMuxEndAddr")`
      }
    },
    obj_OKButton:{
       okButton:{
         Name:`WinFormsObject("m_btnOK")`
       }
    },
    obj_CancelButton:{
        cancelButton:{
          Name:`WinFormsObject("m_btnCancel")`
        }
     },
     obj_StartAddrTextBox:{
        startAddrTextBox:{
          Name:`WinFormsObject("m_txtStartAddr")`
        }
    },
    obj_EnableMuxMonitorCheckbox:{
          enableMuxCheckbox:{
            Name: `WinFormsObject("m_ChkBoxMuxMonitoringLicense")`
          }
    },
    obj_ExperionServerTextBox:{
       serverTextBox:{
         Name: `WinFormsObject("m_txtboxServer")`
       }
    },
    obj_NonRedundantRadioButton:{
       nonRedundantRadioButton:{
         Name: `WinFormsObject("m_RadiobutnNonRedunt")`
       }
    },
    obj_RedundantRadioButton:{
       redundantRadioButton:{
         Name: `WinFormsObject("m_RadiobutnRedundant")`
       }
    },
    obj_EnableSafetyManagerCheckbox:{
       safetyManagerCheckbox:{
         Name:`WinFormsObject("m_ChkBoxSMAvailable")`
       }
    },
    obj_OneWirelessManagerCheckbox:{
      oneWirelessCheckbox:{
        Name: `WinFormsObject("m_chkboxWdmAvailable")`
      }
    },
    obj_SecondaryServerTextBox:{
         secondaryServerTextBox:{
            Name:`WinFormsObject("m_txtboxRedundant")`
         }
    },
    obj_ViewDetailsForm:{
        viewDetailsForm:{
          Name:`WinFormsObject("ViewDetailsForm")`
        }
    },
    obj_LicenseForm:{
       licenseForm:{
         Name: `WinFormsObject("LicenseForm")`
       }
    },
    updateLicense:{
       panLicensingInfo:{
         Name:'WinFormsObject("m_panLiceningInfo")'
       },
       gpUpgradeLicense:{
         Name:'WinFormsObject("m_gpUpgradeLicense")'
       },
       browseBtn:{
         Name:'WinFormsObject("m_btnBrowse")'
       },
       dialog:{
         Name:'WinFormsObject("CustomMessageBox")'
       },
       panel4:{
         Name:'WinFormsObject("m_panel4")'
       },
       msgText:{
         Name:'WinFormsObject("m_txtboxMsg")'
       },
       panel5:{
         Name:'WinFormsObject("m_panel5")'
       },
       okBtn:{
         Name:'WinFormsObject("m_button2")'
       },
       fileDialog:{
         WndClass: "#32770",
         WndCaption:"Select a License File",
         Index:1
       },
       comboBox:{
         WndClass: "ComboBox"
       },
       editBox:{
         WndClass: "Edit"
       }
    },
    clickOnLicenseTab:{
              btnLicening:{
                Name: `WinFormsObject("m_btnLicening")`
              }
          },
    clickOnImportTab:{
              btnImport:{
                Name: `WinFormsObject("m_btnImportResx")`
              }
          },
    obj_cbResxTypeComboBox: {
      selectResourceForm: {
        Name: "WinFormsObject('SelectResource')"
      },
      apnSelectResource: {
        Name: "WinFormsObject('m_apnSelectResource')"
      },
      gbSvrResxType: {
        Name: "WinFormsObject('gbSvrResxType')"
      },
      cbResxType: {
        Name: "WinFormsObject('cbResxType')"
      }
    }


};