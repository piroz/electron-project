"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var windowmanager_1 = require("./windowmanager");
var updatemanager_1 = require("./updatemanager");
var Main = (function () {
    function Main(feedUrl) {
        this.windowManager = new windowmanager_1.WindowManager();
        this.updateManager = new updatemanager_1.UpdateManager(electron_1.app, electron_1.autoUpdater, feedUrl);
    }
    Main.prototype.run = function () {
        var _this = this;
        this.setupApplicationEventHandlers();
        if (this.updateManager.isRunningAppLatest()) {
            electron_1.app.on("ready", function () {
                return _this.windowManager.createMainWindow();
            });
        }
    };
    Main.prototype.setupApplicationEventHandlers = function () {
        var _this = this;
        electron_1.app.on("window-all-closed", function () {
            return _this.onWindowAllClosed();
        });
        electron_1.app.on("will-quit", function () {
            return _this.onWillQuit();
        });
        electron_1.app.on("activate", function () {
            if (!_this.windowManager.isMainWindowCreated()) {
                _this.windowManager.createMainWindow();
            }
        });
    };
    Main.prototype.onWindowAllClosed = function () {
        if (process.platform != 'darwin') {
            electron_1.app.quit();
        }
    };
    Main.prototype.onWillQuit = function () {
        electron_1.globalShortcut.unregisterAll();
    };
    return Main;
}());
exports.Main = Main;
//# sourceMappingURL=main.js.map