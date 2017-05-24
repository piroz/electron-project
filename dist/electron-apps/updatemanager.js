"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var path = require("path");
var cp = require("child_process");
var UpdateManager = (function () {
    function UpdateManager(app, autoUpdater, feedUrl) {
        this.app = app;
        this.autoUpdater = autoUpdater;
        this.feedUrl = feedUrl;
        this.updateDotExePath = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
    }
    UpdateManager.prototype.isRunningAppLatest = function () {
        var _this = this;
        if (!fs.existsSync(this.updateDotExePath)) {
            return true;
        }
        this.setupUpdateEventHandlers();
        this.autoUpdater.setFeedURL(this.feedUrl);
        switch (process.argv[1]) {
            case '--squirrel-firstrun':
                var target = path.basename(process.execPath);
                cp.spawn(this.updateDotExePath, ["--createShortcut", target], { detached: true });
                setTimeout(function () {
                    _this.autoUpdater.checkForUpdates();
                }, 5000);
                break;
            case '--squirrel-uninstall':
                var target = path.basename(process.execPath);
                cp.spawn(this.updateDotExePath, ["--removeShortcut", target], { detached: true });
                this.app.quit();
                break;
            case '--squirrel-install':
            case '--squirrel-updated':
            case '--squirrel-obsolete':
                this.app.quit();
                break;
            default:
                this.autoUpdater.checkForUpdates();
                return true;
        }
        return false;
    };
    UpdateManager.prototype.setupUpdateEventHandlers = function () {
        var _this = this;
        this.autoUpdater.on("error", function (error) {
            _this.onError(error);
        });
        this.autoUpdater.on("checking-for-update", function () {
            _this.onCheckForUpdate();
        });
        this.autoUpdater.on("update-available", function () {
            _this.onUpdateAvailable();
        });
        this.autoUpdater.on("update-downloaded", function () {
            _this.onUpdateDownloaded();
        });
        this.autoUpdater.on("update-not-available", function () {
            _this.onUpdateNotAvailable();
        });
    };
    UpdateManager.prototype.onError = function (error) {
        throw error;
    };
    UpdateManager.prototype.onCheckForUpdate = function () {
    };
    UpdateManager.prototype.onUpdateAvailable = function () {
    };
    UpdateManager.prototype.onUpdateDownloaded = function () {
        this.autoUpdater.quitAndInstall();
    };
    UpdateManager.prototype.onUpdateNotAvailable = function () {
    };
    return UpdateManager;
}());
exports.UpdateManager = UpdateManager;
//# sourceMappingURL=updatemanager.js.map