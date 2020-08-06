'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'model-editor',
    environment,
    rootURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created

      // Fathom Goal IDs
      fantomGoalIDs: {
        toggleJson: "JYR7RSH2",
        help: "3OAJVCKD",
        viewModels: "KARLXKOV",
        exportImport: "ZQGJFQP9",
        settings: "FCDPSB7Y",
        altWalkerDocumentation: "IMKV4ZFX",
        graphWalkerDocumentation: "T7NFXPIH",
        gitter: "N0GD6ENO"
      }
    }
  };

  if (environment === 'development') {
    ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
    ENV.rootURL = process.env.CI_PROJECT_PATH ? `/${process.env.CI_PROJECT_PATH.split("/").slice(1).join("/")}` : '/';
    ENV.locationType = 'hash';
  }

  return ENV;
};
