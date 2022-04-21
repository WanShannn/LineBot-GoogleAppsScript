# **LineBot-GoogleAppsScript**
使用 GoogleAppsScript 建立下列 LineBot Reply Messages API 並將訊息寫入 Google Sheets。

## **前置作業**
至 [Line developers](https://account.line.biz/login?redirectUri=https%3A%2F%2Fdevelopers.line.biz%2Fconsole%2F)建立Channel並取得 **Channel secret** 及 **Channel access token** 。

## **發布流程**
1. GoogleAppsScript撰寫完成後，點選部屬。
2. 部屬後會有一組「Current web app URL」將這組URL放置LINE後台的「Webhook URL」當中。

## **寫入Google Sheet方法**
要讀取或寫入 Google Sheet，都要透過 SpreadsheetApp 所包含的屬性或方法來實現。

```javascript
  var SpreadSheet = SpreadsheetApp.openById('雲端試算表ID');
  var Sheet = SpreadSheet.getSheetByName('工作表名稱');
  var creatTime = new Date();

  Sheet.appendRow([creatTime, userMessage, userid]);
```

> - **openById**
>      - 透過文件的 id 來打開文件。  
>      - 假設Sheet的網址為 `https://docs.google.com/spreadsheets/d/123456789/edit#gid=0` ，id 則是 __***123456789***__。
> - **getSheetByName**
>      - Sheet中的工作表名稱。
> - **appendRow**
>      - 在指定的工作表中新增一列資料。
   
## **RequestBody結構**
當用戶發訊息至LineBot後，後端收到的RequestBody結構為：

```json
{
  "destination": "ID",
  "events": [
    {
      "type": "message",
      "message": {
        "type": "text",
        "id": "id",
        "text": "textmessage"
      },
      "timestamp": 1111111111111,
      "source": {
        "type": "user",
        "userId": "userId"
      },
      "replyToken": "replyToken",
      "mode": "active"
    }
  ]
}
```

* events
  > type `LineBot收到訊息的型態`  
  > message `訊息類型(Text、Sticker、Image、Video、Location)及內容`   
  > source `發送訊息的用戶類型(userId、groupId、roomId)及ID`   
  > replyToken `LineBot要Response訊息時用的token`

## **References**
* https://www.learncodewithmike.com/2020/06/python-line-bot.html
* https://developers.line.biz/en/docs/messaging-api/
* https://medium.com/cchenglo/js-linebot-%E4%BC%91%E5%81%87%E8%87%AA%E5%8B%95%E5%9B%9E%E5%A0%B1%E5%BD%99%E6%95%B4-272a9eb058c9
* https://www.oxxostudio.tw/articles/201706/google-spreadsheet-1.html
