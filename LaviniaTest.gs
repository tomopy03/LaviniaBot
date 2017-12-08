function setWorkTimeTest(){
  channelid = "#bottest";
  initialize();
  var op = setWorkTime("#bottest", "10:00")
  return postSlackMessage(op);
}

function selectWorkTest(){
  channelid = "#bottest";
  initialize();
  var testlist = "出勤時間 10:00";
  selectWork(testlist);
  testlist = "退勤時間 12:00";
  selectWork(testlist);
  testlist = "出勤 1 9:55";
  selectWork(testlist);
  testlist = "退勤 1 19:00";
  selectWork(testlist);
  testlist = "助けてくれ";
  selectWork(testlist);
}
