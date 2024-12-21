const DEF_SHEET = "シート1";

/**
 * データをスプレッドシートに追加する関数
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet スプレッドシート
 * @param {number} time タイムスタンプ
 * @param {Object} data 入力データ
 */
function createData(sheet, timestamp, data) {
  if (!data.name || !data.comment) {
    throw new Error("Missing required fields: name or comment");
  }

  sheet.appendRow([data.name, data.comment, timestamp, data.base64]);
  return ContentService.createTextOutput(
    JSON.stringify({ success: true })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * スプレッドシートからデータを読み取る関数
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet スプレッドシート
 */
function readData(sheet) {
  const rows = sheet.getDataRange().getValues();
  const data = rows.map((row) => ({
    name: row[0], // 1列目: 名前
    comment: row[1], // 2列目: コメント
    timestamp: row[2], // 3行目: タイムスタンプ
    base64: row[3], // 4行目: 画像データ
  }));

  return ContentService.createTextOutput(
    JSON.stringify({ success: true, items: data })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * POSTリクエストハンドラ
 * @param {GoogleAppsScript.Events.DoPost} e リクエストデータ
 */
function doPost(e) {
  try {
    const sheetName = e.parameter.name || DEF_SHEET;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

    if (!sheet) {
      throw new Error("Sheet not found");
    }

    const data = JSON.parse(e.postData.contents); // POSTされたデータをJSONとして解析
    return createData(sheet, Date.now(), data); // データを作成
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GETリクエストハンドラ
 * @param {GoogleAppsScript.Events.DoGet} e リクエストデータ
 */
function doGet(e) {
  try {
    const sheetName = e.parameter.name || DEF_SHEET;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

    if (!sheet) {
      throw new Error("Sheet not found");
    }

    return readData(sheet); // データを取得
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
