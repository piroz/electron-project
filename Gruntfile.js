const config = require('./package.json');

module.exports = function(grunt){
  grunt.initConfig({
    'create-windows-installer': {
        x64: {
            appDirectory: 'packager/out/' + config.name + '-win32-x64',
            productName: config.description,
            outputDirectory: 'packager/installer',
            authors: config.author.name,
            description: config.description,
            productDescription: "",
            //certificateFile: "my_signing_key.pfx",
            //certificatePassword: "password",
            exe: config.name + '.exe',
            noMsi: true,
            setupExe: 'Setup.exe'
        }
    }
  });

  grunt.loadNpmTasks('grunt-electron-installer');
}
