// const {app, BrowserWindow} = require('electron')      
// function createWindow () {   
//   // Create the browser window.     
//   win = new BrowserWindow({}); 
//   win.maximize();
//   // and load the index.html of the app.     
//   win.loadURL('http://localhost:3000/');
//   win.webContents.openDevTools({mode:'detach'}); 
// }

// app.on('ready', createWindow);



const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  });
  mainWindow.maximize();
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});