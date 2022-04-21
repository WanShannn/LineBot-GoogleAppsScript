var CHANNEL_ACCESS_TOKEN = 'Your Channel access token';
	
function doPost(e) {
  if (typeof e !== 'undefined') {

    var msg = JSON.parse(e.postData.contents);

    try {

      var replyToken = msg.events[0].replyToken;
      var userMessage = msg.events[0].message.text;
      var userid = msg.events[0].source.userId;
	    
      var returnmessage = null;

      if (typeof replyToken === 'undefined') {
        return;
      }

      insert_excel_list(userMessage, userid);

      returnmessage = [{
        'type': 'text',
        'text': userMessage
      }];

      send_msg(CHANNEL_ACCESS_TOKEN, replyToken, returnmessage);
    }
    catch (err) {
      console.log(err);
    }

  }
}

function insert_excel_list(userMessage, userid) {
  var SpreadSheet = SpreadsheetApp.openById('雲端試算表ID');
  var Sheet = SpreadSheet.getSheetByName('工作表名稱');
  var creatTime = new Date();

  Sheet.appendRow([creatTime, userMessage, userid]);
}

function send_msg(token, replyToken, returnmessage) {
  var url = 'https://api.line.me/v2/bot/message/reply';

  UrlFetchApp.fetch(url, {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + token,
    },
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': returnmessage,
    }),
  });
}
