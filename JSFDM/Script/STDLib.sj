//USEUNIT Main
//USEUNIT SMToolFunctionsLibrary

function openExcelFile(filename,cboolean = false) { 
  var excelApp = Sys.OleObject("Excel.Application");
    excelApp.Visible = cboolean; // Show Excel window
    var workbook = excelApp.Workbooks.Open(filename, false)  
  return workbook;
}



function Get_date_time() {
  // Getting the Current Time
  var now = new Date();
  var nHour = now.getHours();
  var nMin = now.getMinutes();
  var nSec = now.getSeconds();
  var nTime = "Time_" + nHour + "_" + nMin + "_" + nSec;

  // Getting the Current Date
  var nDay = now.getDate();
  var nMonth = now.getMonth() + 1; // Months are 0-based in JS
  var nYear = now.getFullYear();
  var ndate = "Date_" + nDay + "_" + nMonth + "_" + nYear;

  // Combining both Date and Time
  var szOut = ndate + "_" + nTime;
  return szOut;
}

function ExcelExample(Filename,SheetName)
{
  // Get the sheet of the Excel file
  var excelFile = Excel.Open(Filename, false, false, null, null, null, true)
  var excelSheet = excelFile.SheetByTitle(SheetName);
  
  // Read data from the Excel file
  var valueA = excelSheet.Cell("A", 3).Value;
  var valueB = excelSheet.Cell(2, 3).Value;
  var valueC = excelSheet.CellByName("C3").Value;
  
  // Write the obtained data into a new row of the file
  var rowIndex = excelSheet.RowCount + 1;
  excelSheet.Cell("A", rowIndex).Value = valueA;
  excelSheet.Cell(2, rowIndex).Value = valueB;
  excelSheet.Cell("C", rowIndex).Value = valueC;
  
  // Save the file to apply the changes
  excelFile.Save();
  
  // Save the file with another name
  // excelFile.SaveAs("C:\\temp\\DataStorageExcel_new.xlsx");
}
function ReadExcelData(excelApp, sheetName, nRow, nCol)
 {
   //sheet.cells.Item(1).Item(1)
  var sheet = excelApp.Sheets.Item(sheetName);
  var cell = sheet.Cells.Item(nCol).Item(nRow);
  var cellText = cell.Text;
  var colorIndex = cell.Interior.ColorIndex;
  // You can use colorIndex as needed
  return cellText;
}



function SetValueToLogfile(MsExcel, SheetLog, nRow, nCol, szData) {
  var sheet = MsExcel.Sheets.Item(SheetLog);
  sheet.Activate();
  var cell = sheet.Cells.Item(nCol).Item(nRow);

  // Set font properties
  cell.Font.Size = 10;
  cell.Font.Name = "Arial";

  // Set cell value
  cell.Value = szData;

  // Set color for first column
  if (nCol === 1) {
    cell.Interior.ColorIndex = 6;
  }

  // Override with blue if szData contains "TC"
  if (szData.toUpperCase().includes("TC") && nCol === 1) {
    cell.Interior.ColorIndex = 5; // Blue
    cell.font.ColorIndex = 2;
  }
  // Set color based on data value
  if (szData.toUpperCase() == "PASS") {
    cell.Interior.ColorIndex = 4;
  } else if (szData.toUpperCase() == "FAIL") {
    cell.Interior.ColorIndex = 3;
  }

  // Autofit column
  sheet.Columns.Item(nCol).AutoFit();
}
function SetValueToExcel(MsExcel, SheetName, nRow, nCol, szData, szTestCaseName, szKeywordName) {
  var sheet = MsExcel.Sheets.Item(SheetName);
  sheet.Activate();
  var cell = sheet.Cells.Item(nCol).Item(nRow);

  // Set font properties
  cell.Font.Size = 10;
  cell.Font.Name = "Arial";

  // Set cell value
  cell.Value = szData;

  // Autofit column
  sheet.Columns.Item(nCol).AutoFit();

  // If szData contains "FAIL" (case-insensitive)
  if (szData.toUpperCase().indexOf("FAIL") > -1) {
    //var szFail_Flie_Path = CaptureScreenShot(szTestCaseName + "_" + szKeywordName);
    //sheet.Cells.Item(nCol + 2).Item(nRow).Value = szFail_Flie_Path;
    cell.Font.Bold = true;
    cell.Interior.ColorIndex = 3;
  }

  // If szData is "PASS" (case-insensitive)
  if (szData.toUpperCase().indexOf("PASS") > -1) {
    cell.Font.Bold = true;
    cell.Interior.ColorIndex = 4;
  }
}
function WriteLLResultToExcel(MsExcel, SheetName, nRow, szData, szTestCaseName, szKeywordName) {
  var nCol = 4;
  // Split szData by '%'
  var szOutputStringArray = szData.split("%");
  var nItem = szOutputStringArray.length;

  for (var nCounter = 0; nCounter < nItem; nCounter++) {
    // Write the result
    SetValueToExcel(
      MsExcel,
      SheetName,
      nRow,
      nCol,
      szOutputStringArray[nCounter],
      szTestCaseName,
      szKeywordName
    );
    nCol = nCol + 1;
  }
}
function WriteResultToExcel(MsExcel, SheetName, nRow, szData, szTestCaseName, szKeywordName) {
  var nCol = 1;
  // Split szData by '%'
  var szOutputStringArray = szData.split("%");
  var nItem = szOutputStringArray.length;

  for (var nCounter = 0; nCounter < nItem; nCounter++) {
    // writing the Result
    SetValueToExcel(
      MsExcel,
      SheetName,
      nRow,
      nCol,
      szOutputStringArray[nCounter],
      szTestCaseName,
      szKeywordName
    );
    nCol = nCol + 1;
  }

  // incrementing the output row to write the next result
  outputrow = outputrow + 1;
}
function SplitString(szString, szToken, szOutputStringArray) 
{
  // Initialize variables
  var nCount = 1;
  var npos = 0;
  var nIndex = 0;
  var nStartPos = 0; // JavaScript uses 0-based indexing
  var nlen = szString.length;
  var nTokenLen = szToken.length;

  npos = szString.indexOf(szToken, nStartPos);

  while (npos !== -1) {
    // Push substring to output array
    szOutputStringArray.push(szString.substring(nStartPos, npos));
    nCount++;
    nIndex++;
    nStartPos = npos + nTokenLen;
    npos = szString.indexOf(szToken, nStartPos);
  }

  // Push the last segment
  szOutputStringArray.push(szString.substring(nStartPos, nlen));
  return nIndex + 1;
}
function WriteLogs(Sz_Desc, sz_Status) {
  // Assumes these variables are defined in the outer scope:
  // szPreviousSheetName, SheetTC, InputxlApp, SheetName, logsrow,
  // szPreviousTestCaseName, szTestCaseName, szPreviousKeywordName, szKeywordName

  if (szPreviousSheetName !== SheetTC) {
    SetValueToLogfile(InputxlApp, SheetLog, logsrow, 1, SheetTC);
  }

  if (szPreviousTestCaseName !== szTestCaseName) {
    logsrow = logsrow + 1;
    SetValueToLogfile(InputxlApp, SheetLog, logsrow, 1, szTestCaseName);
  }

  if (szPreviousKeywordName !== szKeywordName) {
    logsrow = logsrow + 1;
    SetValueToLogfile(InputxlApp, SheetLog, logsrow, 1, szKeywordName);
    logsrow = logsrow + 1;
  }

  var sztempTC = szTestCaseName + "_" + szKeywordName;
  // You can call AppendLogRow(SheetTC, sztempTC, Sz_Desc, sz_Status) here if needed

  SetValueToLogfile(InputxlApp, SheetLog, logsrow, 2, Sz_Desc);
  SetValueToLogfile(InputxlApp, SheetLog, logsrow, 3, sz_Status);

  szPreviousTestCaseName = szTestCaseName;
  szPreviousKeywordName = szKeywordName;
  szPreviousSheetName = SheetTC;
  logsrow = logsrow + 1;
}
function WriteLowLevelResult(Sz_Desc, sz_Status) {
  // If status is "FAIL", set szTCStatus
  if (sz_Status.toUpperCase() === "FAIL") {
    szTCStatus = "Fail";
  }
 
   Main.inputrow =  Main.inputrow + 1;
  WriteLogs(Sz_Desc, sz_Status);
  WriteLLResultToExcel(InputxlApp, SheetIn,  Main.inputrow, sz_Status + "%" + Sz_Desc);
}

function WriteResult(Sz_Desc, ActualRes) {
  if ("PASS" === ActualRes.toUpperCase()) {
    WriteLowLevelResult(Sz_Desc, "PASS");
  } else {
    WriteLowLevelResult(Sz_Desc, "FAIL");
  }
}


function GetControlInformation(MsExcel, szControlInfoSheet, szPage, szControl) {
  var totalRows = TotalRowCount(MsExcel, szControlInfoSheet);
  var pageRange = "A1:A" + totalRows;

  // Step 1: Find the page tag (e.g., "SelectConsole")
  var pageCell = SearchTag(MsExcel, szControlInfoSheet, pageRange, szPage);
  if (pageCell !== null && pageCell !== undefined) {
    var startRow = pageCell.Row + 2;
    var endRow = FindEndTag(MsExcel, szControlInfoSheet, startRow, 1, "EndTable");

    // Step 2: Search for control name within that section
    var controlRange = "A" + startRow + ":A" + endRow;
    var controlCell = SearchTag(MsExcel, szControlInfoSheet, controlRange, szControl);

    if (controlCell !== null && controlCell !== undefined) {
      var controlRow = controlCell.Row;

      // Step 3: Read property from column B (index 2)
      result = ReadExcelData(MsExcel, szControlInfoSheet, controlRow, 2);
    }
  }

  return result;
}


function TotalRowCount(excelApp, sheetName) {
  var sheet = excelApp.Sheets.Item(sheetName);
  var usedRange = sheet.UsedRange;
  var lastRow = usedRange.Rows.Count + usedRange.Row - 1;
  return lastRow;
}



function SearchTag(excelApp, sheetName, rangeStr, searchText) {
  var sheet = excelApp.Sheets.Item(sheetName);
  var range = sheet.Range(rangeStr);
  var foundCell = range.Find(searchText);
  return foundCell !== null && foundCell !== undefined ? foundCell : null;
}


function FindEndTag(excelApp, sheetName, startRow, colIndex, endTag) {
  var sheet = excelApp.Sheets.Item(sheetName);
  var currentRow = startRow;

  while (currentRow <= sheet.Rows.Count) {
    var cellValue = sheet.Cells.Item(colIndex).Item(currentRow).Text;
    if (cellValue !== null && cellValue.toString().trim() === endTag) {
      return currentRow - 1;
    }
    currentRow++;
  }

  return sheet.Rows.Count;
}




function ParseControlProperties(propString) {
  var props = {};
  var pairs = propString.split(",");

  for (var i = 0; i < pairs.length; i++) {
    var kv = pairs[i].split("=");
    if (kv.length === 2) {
      var key = kv[0].trim();
      var value = kv[1].trim();
      props[key] = value;
    }
  }

  return props;
}

function FindChildName(obj, NameValue) {
  if (obj.Exists) {
    return obj.FindChild("Name", NameValue, 100);
  }
  return null;
}

function FindChildClassName(obj, NameValue) {
  if (obj.Exists) {
    return obj.FindChild("ClrFullClassName", NameValue, 100);
  }
  return null;
}


function ResolveControls(excelApp, sheetName, sectionName, controlList) {
  var result = {};
  for (var i = 0; i < controlList.length; i++) {
    var raw = GetControlInformation(excelApp, sheetName, sectionName, controlList[i]);
    result[controlList[i]] = ParseControlProperties(raw);
  }
  return result;
}


function test(){
var controlInfo = GetControlInformation(MsExcel, "ControlsInfo", "SelectConsole", "ConsoleDialog");
Log.Message(controlInfo)
}


