const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;
 
const {ipcMain} = require('electron');
 
// 準備ができたタイミングで呼ばれるイベント
app.on('ready',function(){
    // メインウィンドウを作成
    mainWindow = new BrowserWindow({"webPreferences": {"nodeIntegration":true},"width":800,"height":600});
    mainWindow.loadURL('file://' + __dirname + '/html/index.html');
    mainWindow.on('closed',function(){
        mainWindow = null;
    });
});
 
// 同期メッセージの受信
ipcMain.on('mul-sync', (event, arg) => {
    console.log(arg);
    // レンダラープロセスへ返信
    event.returnValue = arg.a + arg.b;
});
 
// 非同期メッセージの受信
ipcMain.on('mul-async', (event, arg) => {
    console.log(arg);
    // レンダラープロセスへ返信
    var result = arg.a + arg.b;
    event.sender.send('mul-async-reply',result);
});

function searchPrime(x){
        var flag=true;

  for (var i=2; i<x/2; i++){
    if (x%i==0){
      flag=false;
      break;

    }

  }
  console.log(flag);
  return flag
}

function shellSync(x){
  console.log(x);
  event.returnValue ="モック";
}

ipcMain.on("searchPrime",function(event,arg){
  console.log(arg);
  var flag=searchPrime(arg);
  event.returnValue = flag;
});


