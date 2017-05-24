const packager = require("electron-packager");  
const p_config = require("./config.js");

packager(p_config, function done (err, appPath) {
  if(err) {
    throw new Error(err);
  }
  console.log("Done!!");
});
