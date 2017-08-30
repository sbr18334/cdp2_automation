'use strict';
//var paths = require('./.yo-rc.json')['generator-gulp-angular'].props.paths;
// An example configuration file.
exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',
  //seleniumServerJar: deprecated, this should be set on node_modules/protractor/config.json
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },
  // Spec patterns are relative to the current working directly when protractor is called.
  // specs: ['src/main/webapp/scripts/**/*.spec.js'],
  baseUrl: 'http://localhost:8080/',
  onPrepare: function() {
    browser.driver.manage().window().maximize();
  },
  suites: {
    regression: 
    [
      'src/main/webapp/scripts/overview/performance/performance.spec.js',
      'src/main/webapp/scripts/overview/recommendation/recommendation.spec.js',
      'src/main/webapp/scripts/overview/mau/mau.spec.js',
      'src/main/webapp/scripts/overview/scale/scale.spec.js',
    ]
  },
  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
