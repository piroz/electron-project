import * as fs from "fs-extra";
import * as path from "path";
import * as cp from "child_process";

/**
 * autoUpdater manager
 * 
 * @export
 * @class UpdateManager
 */
export class UpdateManager {

    /**
     * update.exe saved path
     * 
     * @protected
     * @type {string}
     * @memberof UpdateManager
     */
    protected updateDotExePath: string;

    /**
     * Creates an instance of UpdateManager.
     * @param {Electron.App} app 
     * @param {Electron.AutoUpdater} autoUpdater 
     * @param {string} feedUrl 
     * 
     * @memberof UpdateManager
     */
    constructor(
        protected app: Electron.App,
        protected autoUpdater: Electron.AutoUpdater,
        protected feedUrl: string) {
            this.updateDotExePath = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
            this.autoUpdater.setFeedURL(this.feedUrl);
    }
    
    /**
     * isRunningAppLatest
     * 
     * @returns {boolean} 
     * 
     * @memberof UpdateManager
     */
    public isRunningAppLatest(): boolean {
        if (!fs.existsSync(this.updateDotExePath)) {
            return true;
        }

        this.setupUpdateEventHandlers();

        switch (process.argv[1]) {
            case '--squirrel-firstrun':
                var target = path.basename(process.execPath);
                cp.spawn(this.updateDotExePath, ["--createShortcut", target], { detached: true });
                setTimeout(()=> {
                    this.autoUpdater.checkForUpdates();
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
    }

    /**
     * setupUpdateEventHandlers
     * 
     * @protected
     * 
     * @memberof UpdateManager
     */
    protected setupUpdateEventHandlers(): void {

        this.autoUpdater.on("error", (error) => {
            this.onError(error);
        });
        this.autoUpdater.on("checking-for-update", () => {
            this.onCheckForUpdate();
        });
        this.autoUpdater.on("update-available", () => {
            this.onUpdateAvailable();
        });
        this.autoUpdater.on("update-downloaded", () => {
            this.onUpdateDownloaded();
        });
        this.autoUpdater.on("update-not-available", () => {
            this.onUpdateNotAvailable();
        });
    }

    /**
     * autoUpdater error handler
     * @param error 
     */
    protected onError(error: Error): void {
        throw error;
    }

    /**
     * autoUpdater checking-for-update handler
     * @param error 
     */
    protected onCheckForUpdate(): void {

    }

    /**
     * autoUpdater update-available handler
     * @param error 
     */
    protected onUpdateAvailable(): void {

    }

    /**
     * autoUpdater update-downloaded handler
     * @param error 
     */
    protected onUpdateDownloaded(): void {
        this.autoUpdater.quitAndInstall();
    }

    /**
     * autoUpdater update-not-available handler
     * @param error 
     */
    protected onUpdateNotAvailable(): void {

    }
}