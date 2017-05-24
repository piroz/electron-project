import {BrowserWindow} from "electron";

/**
 * electron browser window manager
 * 
 * @class WindowManager
 */
export class WindowManager {

    /**
     * file path
     * mainWindow will opened this on ready
     * 
     * @protected
     * @type {string}
     * @memberof Main
     */
    protected startPagePath: string;

    /**
     * electron app main window instance
     * 
     * @protected
     * @type {Electron.BrowserWindow}
     * @memberof Main
     */
    protected mainWindow: Electron.BrowserWindow;

    /**
     * Creates an instance of WindowManager.
     * 
     * @memberof WindowManager
     */
    constructor() {
        this.startPagePath = "file://" + __dirname + "/../frontend/index.html";
    }

    /**
     * mainWindow has aleady created?
     * 
     * @returns {boolean} 
     * 
     * @memberof WindowManager
     */
    public isMainWindowCreated(): boolean {
        return this.mainWindow !== null;
    }

    /**
     * create main browser window
     * 
     * @memberof WindowManager
     */
    public createMainWindow() {
        this.mainWindow = new BrowserWindow();

        this.mainWindow.maximize();

        this.mainWindow.loadURL(this.startPagePath);

        this.mainWindow.webContents.openDevTools();

        this.mainWindow.on("closed", () => {
            this.mainWindow = null;
        });

        this.mainWindow.on("crashed", () => {
            this.mainWindow.loadURL(this.startPagePath);
        });
    }
}