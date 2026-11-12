/**
 * 紅茶媽媽三重神農店：訂單後端（Google Apps Script）
 * 網站送出訂單 → 寫進這份 Google 試算表的「訂單」分頁 → 推播到店長的 LINE
 * 部署成「網頁應用程式」後，把 …/exec 網址填到網站 data.js 的 orderEndpoint
 *
 * 要設定的值放在「專案設定 → 指令碼屬性」，不要寫在程式裡：
 *   LINE_TOKEN   LINE Messaging API 的 Channel access token（長期）
 *   NOTIFY_TO    要收通知的 LINE userId（U 開頭）或群組 groupId（C 開頭），可用逗號隔開放多個
 *   BIND_CODE    （選填）想把通知改送到群組時用的暗號，例如 shennong-2026
 */

var SHEET_NAME = '訂單';
var HEADERS = ['訂單編號', '下單時間', '取餐方式', '日期', '時間', '姓名', '電話', '公司', '地址', '距離',
               '品項', '杯數', '金額', '備註', 'LINE 通知', '處理狀態'];

function doGet() {
  return json_({ ok: true, service: '神農店訂單' });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** 網站按「送出訂單」時呼叫 */
function submitOrder(o) {
  if (!o || o.website) return { ok: false, error: '訂單格式不正確' }; // 機器人填了隱藏欄位
  var err = checkOrder_(o);
  if (err) return { ok: false, error: err };

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sheet = getSheet_();
    var tz = 'Asia/Taipei';
    var now = new Date();
    var prefix = Utilities.formatDate(now, tz, 'MMdd') + '-';
    var todayCount = sheet.getLastRow() < 2 ? 0 : sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues()
      .filter(function (r) { return String(r[0]).indexOf(prefix) === 0; }).length;
    var orderNo = prefix + ('00' + (todayCount + 1)).slice(-3);

    var cups = o.items.reduce(function (s, l) { return s + l.qty; }, 0);
    var itemsTxt = o.items.map(function (l) { return l.name + ' ×' + l.qty + '（' + l.opts + '）單價 $' + l.unit; }).join('\n');
    var notified = pushLine_(formatOrder_(o, orderNo));

    sheet.appendRow([orderNo, now, o.mode, o.day, o.time, o.name, "'" + o.tel, o.company, o.addr, o.dist,
                     itemsTxt, cups, o.total, (o.discount ? (o.promo || '優惠') + ' −' + o.discount + '　' : '') + (o.code ? '碼:' + o.code + '　' : '') + (o.note || ''), notified ? '已通知' : '未通知', '']);
    return { ok: true, orderNo: orderNo, notified: notified };
  } finally {
    lock.releaseLock();
  }
}

function checkOrder_(o) {
  if (!o.items || !o.items.length) return '沒有品項';
  if (o.items.length > 60) return '品項太多，請直接打電話訂購';
  if (!o.name || !o.tel) return '請填姓名和電話';
  if (String(o.tel).length > 60 || String(o.tel).replace(/\D/g, '').length < 8) return '電話格式不對';
  if (o.mode !== '自取' && !o.addr) return '外送要填地址';
  var sum = o.items.reduce(function (s, l) {
    return s + Math.max(0, Number(l.unit) || 0) * Math.max(0, Math.min(99, Number(l.qty) || 0));
  }, 0);
  var disc = Number(o.discount) || 0;
  if (sum !== Number(o.subtotal) || disc < 0 || disc > Math.floor(sum / 2) || sum - disc !== Number(o.total))
    return '金額計算有誤，請重新整理網頁再下單';
  return '';
}

function formatOrder_(o, no) {
  var L = ['🧋 新訂單 ' + no, o.mode + '｜' + o.dayLabel + ' ' + o.time];
  if (o.company) L.push('公司：' + o.company);
  L.push('姓名：' + o.name, '電話：' + o.tel);
  if (o.addr) L.push('地址：' + o.addr + '（' + o.dist + '）');
  L.push('────────');
  o.items.forEach(function (l) { L.push(l.name + ' ×' + l.qty + '\n　' + l.opts + '\n　單價 $' + l.unit + ' × ' + l.qty + ' = $' + l.unit * l.qty); });
  L.push('────────');
  if (o.discount) L.push('小計 $' + o.subtotal + '　' + (o.promo || '優惠') + ' −$' + o.discount);
  if (o.code) L.push('優惠碼：' + o.code);
  L.push('共 ' + o.items.reduce(function (s, l) { return s + l.qty; }, 0) + ' 杯　合計 $' + o.total);
  if (o.note) L.push('備註：' + o.note);
  return L.join('\n').slice(0, 4900);
}

/** 推播到 LINE；沒設定或失敗回傳 false（訂單照樣存進試算表） */
function pushLine_(text) {
  var p = PropertiesService.getScriptProperties();
  var token = p.getProperty('LINE_TOKEN');
  var to = (p.getProperty('NOTIFY_TO') || '').split(',').map(function (s) { return s.trim(); }).filter(String);
  if (!token || !to.length) return false;
  var ok = false;
  to.forEach(function (id) {
    try {
      var res = UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', {
        method: 'post', contentType: 'application/json', muteHttpExceptions: true,
        headers: { Authorization: 'Bearer ' + token },
        payload: JSON.stringify({ to: id, messages: [{ type: 'text', text: text }] })
      });
      if (res.getResponseCode() === 200) ok = true;
      else console.error('LINE push ' + res.getResponseCode() + ' ' + res.getContentText());
    } catch (e) { console.error(e); }
  });
  return ok;
}

/**
 * 所有 POST 都進這裡：
 * - 網站送出的訂單（type: 'order'）
 * - （選填）LINE Webhook：把官方帳號拉進店裡的 LINE 群組後，在群組裡打「綁定 暗號」，
 *   通知就會改送到這個群組，店員都看得到。
 */
function doPost(e) {
  var body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false, error: '格式不正確' }); }
  if (body.type === 'order') {
    try { return json_(submitOrder(body)); }
    catch (err) { console.error(err); return json_({ ok: false, error: '系統忙碌中' }); }
  }
  try {
    var p = PropertiesService.getScriptProperties();
    var code = p.getProperty('BIND_CODE');
    (body.events || []).forEach(function (ev) {
      if (ev.type !== 'message' || ev.message.type !== 'text' || !code) return;
      if (ev.message.text.trim() !== '綁定 ' + code) return;
      var id = ev.source.groupId || ev.source.roomId || ev.source.userId;
      p.setProperty('NOTIFY_TO', id);
      reply_(ev.replyToken, '綁定完成，之後的線上訂單會傳到這裡。');
    });
  } catch (err) { console.error(err); }
  return ContentService.createTextOutput('OK');
}

function reply_(replyToken, text) {
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', {
    method: 'post', contentType: 'application/json', muteHttpExceptions: true,
    headers: { Authorization: 'Bearer ' + PropertiesService.getScriptProperties().getProperty('LINE_TOKEN') },
    payload: JSON.stringify({ replyToken: replyToken, messages: [{ type: 'text', text: text }] })
  });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sh;
}

/** 設定完在編輯器裡按「執行」跑這個，店長的 LINE 應該會收到一則測試訊息 */
function testLine() {
  var ok = pushLine_('✅ 線上訂購通知測試：設定成功');
  Logger.log(ok ? '成功，請看 LINE' : '失敗，請檢查 LINE_TOKEN 和 NOTIFY_TO');
}
