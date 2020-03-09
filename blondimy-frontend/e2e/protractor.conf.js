// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  // specs: [
  //   './src/**/*.e2e-spec.ts'
  // ],
  specs: ['./features/*.feature'],
  capabilities: {
    browserName: 'chrome',
    // Docker purpose
    'chromeOptions': {
      'args': [
        '--no-sandbox',
        '--headless',
        '--window-size=1024,768'
      ]
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: ['./steps/*.steps.ts']
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
     // Load chai assertions
    const chai = require('chai');
    const chaiAsPromised = require('chai-as-promised');

    // Load chai-as-promised support
    chai.use(chaiAsPromised);

    // Initialise should API (attaches as a property on Object)
    chai.should();
  }
};