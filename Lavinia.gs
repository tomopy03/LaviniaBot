function doPost(e) {
  var verify_token = PropertiesService.getScriptProperties().getProperty('VERIFY_TOKEN');
  if (verify_token != e.parameter.token) {
    throw new Error("invalid token.");
  }

  channelid = e.parameter.channel_id;

  initialize();

  var text = e.parameter.text.substr(6);

  selectWork(text);
}

function initialize(){
  botname = "Lavinia";
  workstart_column = 10;
  workend_column = 11;
}

function postSlackMessage(options) {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');

  var slackApp = SlackApp.create(token); //SlackApp インスタンスの取得

  return slackApp.postMessage(options.channelId, options.message, {username: options.userName});
}

function setWorkTime(date, time, column) {
  var ss = SpreadsheetApp.openByUrl(PropertiesService.getScriptProperties().getProperty('SPREADSHEET_URL'));
  var sheet = ss.getSheets()[0];
  var attendance = sheet.getRange(1,column).getValue();
  sheet.getRange(parseInt(date) + 1,column).setValue(time);

  return {
    channelId: channelid, //チャンネル名
    userName: botname, //投稿するbotの名前
    message: date + " 日の " + attendance + " に " + time + " を記録しました。" //投稿するメッセージ
  };
}

function selectWork(text){
  var cmdlist = text.split(' ');
  if (cmdlist.length == 0) return "";
  if (cmdlist.length == 1){
    switch (cmdlist[0]) {
      case "助けてくれ":
        var options = {
          channelId: channelid, //チャンネル名
          userName: botname, //投稿するbotの名前
          message: getHelpMessage() //投稿するメッセージ
        };
        return postSlackMessage(options);
      default:
        var options = {
          channelId: channelid, //チャンネル名
          userName: botname, //投稿するbotの名前
          message: text + "ですか。" //投稿するメッセージ
        };
        return postSlackMessage(options);
    }
  }

  switch(cmdlist[0]){
    case "出勤":
    case "出勤時間":
      if(cmdlist.length == 2){
        var today = new Date();
        var options = setWorkTime(today.getDate(), cmdlist[1], workstart_column);
      } else if (cmdlist.length == 3){
        var options = setWorkTime(cmdlist[1], cmdlist[2], workstart_column);
      }
      return postSlackMessage(options);
    case "退勤":
    case "退勤時間":
      if(cmdlist.length == 2){
        var today = new Date();
        var options = setWorkTime(today.getDate(), cmdlist[1], workend_column);
      } else if (cmdlist.length == 3){
        var options = setWorkTime(cmdlist[1], cmdlist[2], workend_column);
      }
      return postSlackMessage(options);
    default:
      var options = {
        channelId: channelid, //チャンネル名
        userName: botname, //投稿するbotの名前
        message: "仰る意味がよくわかりません。\n言葉は正確にお願いします。\n\n" + getHelpMessage() //投稿するメッセージ
      };
      return postSlackMessage(options);
  }
}

function getHelpMessage(){
  var message = "アゾリウス評議会は正確な言葉遣いを求めます。\n";
  message += "「ラヴィニア、」で始まる言葉で私は働きます。\n";
  message += "「ラヴィニア、{仕事名} {日付} {時間}」と呼びかけるることであなた勤怠を管理します。\n"
  message += "例：「ラヴィニア、出勤時間 8 10:00」 => 8日の出勤時間(1)に10:00が入力されます。\n";
  message += "現状、私に許されている仕事は「出勤時間」と「退勤時間」のみです。「出勤」「退勤」と短くすることは可能です。\n";
  message += "日付を指定しない場合、本日の該当箇所に独断で記載いたします。\n";
  message += "例：「ラヴィニア、退勤時間 19:00」 => 今日の退勤時間(1)に19:00が入力されます。\n";
  message += "勤怠は私に任せて仕事に専念してください、ギルドパクト。";
  return message;
}
