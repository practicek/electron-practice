//load electron module
const electron = require("electron");

//load app fron electron
const app = electron.app;

//create browser object from electron
const BrowserWindow = electron.BrowserWindow;
let mainWindow;
 
//set object for ipc
const {ipcMain} = require("electron");

//load javascript function
const func = require("./js/function.js");
 
//init event when process starts
//fork renderer process and load html
app.on("ready",function(){
  //create main window with width and height
  mainWindow = new BrowserWindow({"webPreferences": {"nodeIntegration":true},"width":800,"height":600});

  //load first html file from local
  mainWindow.loadURL("file://"+ __dirname +"/html/index.html");

  //behavior when window closed
  mainWindow.on("closed",function(){
    mainWindow = null;
    });
});

//when all window are closed
app.on('window-all-closed', function() {  
  app.quit();
});
 
//get message from renderer process
ipcMain.on("mul-sync",(event, arg) => {
  console.log(arg);

  //send result to renderer process sync
  event.returnValue = arg.a + arg.b;
});
 
//get message from renderer process
ipcMain.on('mul-async', (event, arg) => {
  console.log(arg);
  var result = arg.a + arg.b;

  //send result to renderer process async
  event.sender.send('mul-async-reply',result);
});

ipcMain.on("checkPrime",function(event,arg){
  console.log(arg);
  var flag=func.checkPrime(arg);
  event.returnValue = flag;
});

