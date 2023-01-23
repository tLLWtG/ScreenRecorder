// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

// run this as early in the main process as possible
// to Handling startup events of electron-winstaller
if (require("electron-squirrel-startup")) app.quit();

// Menu
const template = [
  {
    label: "Menu",
    submenu: [
      {
        label: "Quit",
        accelerator: "Ctrl+Q",
        click: () => {
          app.quit();
        },
      },
    ],
  },
  {
    label: "About",
    submenu: [
      {
        label: "About",
        click: () => {
          const aboutWindow = new BrowserWindow({
            width: 400,
            height: 250,
            resizable: false,
          });
          aboutWindow.loadFile(path.join(__dirname, "Menu", "about.html"));
        },
      },
      {
        type: "separator",
      },
      {
        label: "License",
        click: () => {
          const licenseWindow = new BrowserWindow({
            width: 400,
            height: 250,
            resizable: false,
          });
          licenseWindow.loadFile(path.join(__dirname, "Menu", "license.html"));
        },
      },
    ],
  },
  {
    label: "Help",
    click: () => {
      const helpWindow = new BrowserWindow({
        width: 400,
        height: 250,
        resizable: false,
      });
      helpWindow.loadFile(path.join(__dirname, "Menu", "help.html"));
    },
  },
];
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Bugs:
// 1. fix "[203649:0120/184258.228913:ERROR:gl_surface_presentation_helper.cc(260)] GetVSyncParametersIfAvailable() failed"
app.disableHardwareAcceleration();
// 2. fix "[330839:0120/204202.471989:ERROR:ssl_client_socket_impl.cc(982)] handshake failed; returned -1, SSL error code 1, net_error -100"
// solved after installing Electron Forge
// didnt figure out why

// TO Fix:
// 1. fix "libva error: vaGetDriverNameByIndex() failed with unknown libva error, driver_name = (null)"
