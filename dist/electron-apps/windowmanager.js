"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var WindowManager = (function () {
    function WindowManager() {
        this.startPagePath = "file://" + __dirname + "/../frontend/index.html";
    }
    WindowManager.prototype.isMainWindowCreated = function () {
        return this.mainWindow !== null;
    };
    WindowManager.prototype.createMainWindow = function () {
        var _this = this;
        this.mainWindow = new electron_1.BrowserWindow();
        this.mainWindow.maximize();
        this.mainWindow.loadURL(this.startPagePath);
        this.mainWindow.webContents.openDevTools();
        this.mainWindow.on("closed", function () {
            _this.mainWindow = null;
        });
        this.mainWindow.on("crashed", function () {
            _this.mainWindow.loadURL(_this.startPagePath);
        });
    };
    return WindowManager;
}());
exports.WindowManager = WindowManager;
//# sourceMappingURL=windowmanager.js.map