/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    '@angular':                   'node_modules/@angular',
    '@angular-router':            'node_modules/',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs',
    'firebase':                   'node_modules/firebase',
    "materialize-css": "node-modules/materialize-css",
    "materialize": "node_modules/angular2-materialize",
    "angular2-materialize": "node_modules/angular2-materialize",
    "models": "app/models" 
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'bin/main.js',  defaultExtension: 'js' },
     'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
    "materialize-css": {
          "main": "dist/js/materialize"
    },
    "materialize": {
        "main": "dist/materialize-directive",
        "defaultExtension": "js"
    },
    "models": { defaultExtension: 'ts' }
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];
  // Add package entries for angular packages
  ngPackageNames.forEach(function(pkgName) {
    packages['@angular/'+pkgName] = { main: pkgName + '.umd.js', defaultExtension: 'js' };
  });
  var config = {
    map: map,
    packages: packages
  }
  System.config(config);
})(this);
