const {
  app,
  BrowserWindow,
  ipcMain
} = require("electron");
const path = require("path");
const fs = require("fs");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

async function createWindow() {

  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // nodeIntegration: false, // is default value after Electron v5
      // contextIsolation: true, // protect against prototype pollution
      // enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js") // use a preload script
    }
  });

  // Load app
  win.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  win.webContents.openDevTools()
}

app.on("ready", createWindow);

ipcMain.on("toMain", (event, response) => {
  fs.readFile(response.filename, (error, data) => {
    // Do something with file contents
    const responseObj = {
      contents: data.toString()
    }

    // Send result back to renderer process
    win.webContents.send("fromMain", responseObj);
  });
});
