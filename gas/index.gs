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

  sheet.appendRow([data.name, data.comment, data.kanji, timestamp, data.base64, data.mail, data.designId]);
  return ContentService.createTextOutput(
    JSON.stringify({ success: true })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * スプレッドシートからデータを読み取る関数
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet スプレッドシート
 */
function readData(sheet) {
  const rows = sheet.getDataRange().getValues().reverse(); // データを反転
  const data = rows.map((row) => ({
    name: row[0], // 1列目: 名前
    comment: row[1], // 2列目: コメント
    kanji: row[2], // 3行目: 漢字
    timestamp: row[3], // 4行目: タイムスタンプ
    base64: row[4], // 5行目: 画像データ
    mail: row[5], // 6行目: メールアドレス
    designId: row[6], // 7行目: デザインID
  }));

  return ContentService.createTextOutput(
    JSON.stringify({ success: true, items: data })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * スプレッドシートから指定範囲のデータを読み取る関数
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet スプレッドシート
 * @param {number} start 開始インデックス
 * @param {number} count 取得する行数
 */
function readDataRange(sheet, start, count) {
  const rows = sheet.getDataRange().getValues().reverse(); // データを反転
  const data = rows.slice(start, start + count).map((row) => ({
    name: row[0], // 1列目: 名前
    comment: row[1], // 2列目: コメント
    kanji: row[2], // 3行目: 漢字
    timestamp: row[3], // 4行目: タイムスタンプ
    base64: row[4], // 5行目: 画像データ
    mail: row[5], // 6行目: メールアドレス
    designId: row[6], // 7行目: デザインID
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

    const start = parseInt(e.parameter.start, 10) || 0;
    const count = parseInt(e.parameter.count, 10) || 10;

    return readDataRange(sheet, start, count); // 指定範囲のデータを取得
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
