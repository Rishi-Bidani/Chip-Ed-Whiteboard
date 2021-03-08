const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, ipcMain, webContents } = electron;

const io = require("socket.io-client");
const socket = io.connect("http://127.0.0.1:3000/firstNameSpace", {
  path: "/myapp/socket.io",
  secure: true,
  rejectUnauthorized: false,
});

let mainWindow;

app.on("ready", function () {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true, // for allowing require in html file
    },
  });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "templates/home.html"), // earlier mainWindow
      protocol: "file",
      slashes: true,
    })
  );
  mainWindow.maximize();
  // add custom  Menu here
});

//Send drawing data to server
ipcMain.on("mousePositions", function (e, item) {
  // console.log(Array.from(item)); // this was converting to normal array, but sending as base64 is fine.
  console.log(item);
  socket.emit("hello", item);
});

// Receive data for students - redraw the data
ipcMain.on("serverPing:getbackinfo", function (E, item) {
  const socket = io.connect("http://127.0.0.1:3000/firstNameSpace", {
    path: "/myapp/socket.io",
    secure: true,
    rejectUnauthorized: false,
  }); // Don't comment, this is required
  console.log(item);
  if (item == "returninfo") {
    socket.emit("givebackinfo", "sendinfo");
  } else {
    console.log("error");
  }
});

socket.on("datareturns", function (msg) {
  console.log(msg);
  mainWindow.webContents.send("RedrawData", msg);
});
