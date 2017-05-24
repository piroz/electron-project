import {app, autoUpdater, globalShortcut} from 'electron';
import {WindowManager} from "./windowmanager";
import {UpdateManager} from "./updatemanager";

/**
 * entry point
 * 
 * @class Main
 */
export class Main {

    /**
     * WindowManager
     * 
     * @protected
     * @type {WindowManager}
     * @memberof Main
     */
    protected windowManager: WindowManager;

    /**
     * UpdateManager
     * 
     * @protected
     * @type {UpdateManager}
     * @memberof Main
     */
    protected updateManager: UpdateManager;

    /**
     * Creates an instance of Main.
     * 
     * @memberof Main
     */
    constructor(feedUrl: string) {
        this.windowManager = new WindowManager();
        this.updateManager = new UpdateManager(app, autoUpdater, feedUrl);
    }

    /**
     * start electron app
     * 
     * @memberof Main
     */
    public run() {

        this.setupApplicationEventHandlers();

        if (this.updateManager.isRunningAppLatest()) {
            app.on("ready", () => {
                return this.windowManager.createMainWindow();
            });
        }

    }

    /**
     * setup electron app event handlers
     * 
     * @protected
     * 
     * @memberof Main
     */
    protected setupApplicationEventHandlers():void  {
        app.on("window-all-closed", () => {
            return this.onWindowAllClosed();
        });

        app.on("will-quit", () => {
            return this.onWillQuit();
        });

        app.on("activate", () => {
            // On OS X it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (!this.windowManager.isMainWindowCreated()) {
                this.windowManager.createMainWindow();
            }
        });
    }

    /**
     * electron event `window-all-closed` handler
     * 
     * @protected
     * 
     * @memberof Main
     */
    protected onWindowAllClosed() {
        if (process.platform != 'darwin') {
            app.quit();
        }
    }

    /**
     * electron event `will-quit` handler
     * 
     * @protected
     * 
     * @memberof Main
     */
    protected onWillQuit() {
        globalShortcut.unregisterAll();
    }
}