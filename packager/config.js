const npmconfig = require("../package.json");

const config = {
  dir: __dirname + '/../',
  out: __dirname + '/out',
  name: npmconfig.name,
  platform: 'win32',
  arch: 'x64',
  appBundleId: 'com.example.' + npmconfig.name,
  appVersion: npmconfig.version,
  appCopyright: "© 2017 " + npmconfig.author.name,
  overwrite: true,
  win32metadata: {
    CompanyName: npmconfig.author.name,
    FileDescription: npmconfig.description,
    OriginalFilename: npmconfig.name + ".exe",
    ProductName: npmconfig.description
  },
  asar: true,
  prune: true,
  // 無視ファイル
  ignore: "node_modules/(electron-packager|electron-prebuilt|\.bin)|packager|src|Gruntfile.js|tsconfig.json",
};

module.exports = config;