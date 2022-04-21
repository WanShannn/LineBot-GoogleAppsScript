# **LineBot-ReplyMessages-GoogleAppsScript**
使用 GoogleAppsScript 建立下列 LineBot Reply Messages API 並將訊息寫入 Google Sheets。

## **前置作業**
至 [Line developers](https://account.line.biz/login?redirectUri=https%3A%2F%2Fdevelopers.line.biz%2Fconsole%2F)建立Channel並取得 **Channel secret** 及 **Channel access token** 。

## **部屬流程**
下列步驟為GoogleAppsScript撰寫完成後，如何部屬上線。

> 1. 點選部屬，並選擇「 **新增部屬作業**」，類型選擇「 **網頁應用程式**」。</br>
>       ![image](https://github.com/WanShannn/LineBot-GoogleAppsScript/blob/main/result/%E9%83%A8%E5%B1%AC%E4%BD%9C%E6%A5%AD_1.jpg)</br>
> 2. 存取權限選擇「**所有人**」，點選「**部屬**」。</br>
>       ![image](https://github.com/WanShannn/LineBot-GoogleAppsScript/blob/main/result/%E9%83%A8%E5%B1%AC%E4%BD%9C%E6%A5%AD_2.jpg)</br>
> 3. 部屬時須受予權限，就一律按允許。</br>
>       ![image](https://github.com/WanShannn/LineBot-GoogleAppsScript/blob/main/result/%E9%83%A8%E5%B1%AC%E4%BD%9C%E6%A5%AD_3.jpg)</br>
> 4. 建立完成後會出現一組「**網頁應用程式的網址**」。</br>
>       ![image](https://github.com/WanShannn/LineBot-GoogleAppsScript/blob/main/result/%E9%83%A8%E5%B1%AC%E4%BD%9C%E6%A5%AD_4.jpg)</br>
> 5. 將「**網頁應用程式的網址**」貼到LINE 後台的「**Webhook URL**」中，並將下方的「**Use webhook**」設為「**啟用**」。</br>
>       ![image](https://github.com/WanShannn/LineBot-GoogleAppsScript/blob/main/result/%E9%83%A8%E5%B1%AC%E4%BD%9C%E6%A5%AD_5.jpg)</br>
> 6. 於LINE 後台的 「**回應設定**」的「**進階設定**」設定中，查詢「**Webhook**」是否設為「**啟用**」。</br>
>       ![image](https://github.com/WanShannn/LineBot-GoogleAppsScript/blob/main/result/%E9%83%A8%E5%B1%AC%E4%BD%9C%E6%A5%AD_6.jpg)</br>

## **寫入Google Sheet方法**
要讀取或寫入 Google Sheet，都要透過 SpreadsheetApp 所包含的屬性或方法來實現。

```javascript
  var SpreadSheet = SpreadsheetApp.openById('雲端試算表ID');
  var Sheet = SpreadSheet.getSheetByName('工作表名稱');
  var creatTime = new Date();

  Sheet.appendRow([creatTime, userMessage, userid]);
```

 - **openById**
      - 透過文件的 id 來打開文件。  
      - 假設Sheet的網址為 `https://docs.google.com/spreadsheets/d/123456789/edit#gid=0` ，id 則是 __***123456789***__。
 - **getSheetByName**
      - Sheet中的工作表名稱。
 - **appendRow**
      - 在指定的工作表中新增一列資料。
   
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
  - type `LineBot收到訊息的型態`  
  - message `訊息類型(Text、Sticker、Image、Video、Location)及內容`   
  - source `發送訊息的用戶類型(userId、groupId、roomId)及ID`   
  - replyToken `LineBot要Response訊息時用的token`

## **回送訊息方法**
分析LineBot回送訊息給用戶的方法。

```javascript
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
```

 - Line Reply API 的 URL 為 `https://api.line.me/v2/bot/message/reply`。
 - 利用 UrlFetchApp 方法發 POST 請求。
 - Authorization 授權方式為 OAuth 2.0，寫法為 ` Bearer + token `，這裡的token是Line後台給的token。
 - payload，回傳的訊息內容，需要帶下列兩個參數：
   - `replyToken` ：RequestBody中的replyToken。
   - `messages` ：訊息內容。

## **References**
* https://www.learncodewithmike.com/2020/06/python-line-bot.html
* https://developers.line.biz/en/docs/messaging-api/
* https://medium.com/cchenglo/js-linebot-%E4%BC%91%E5%81%87%E8%87%AA%E5%8B%95%E5%9B%9E%E5%A0%B1%E5%BD%99%E6%95%B4-272a9eb058c9
* https://www.oxxostudio.tw/articles/201706/google-spreadsheet-1.html
