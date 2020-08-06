'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const tailwindcss = require('tailwindcss');
const cssImport = require('postcss-import');

module.exports = function(defaults) {
  let config = defaults.project.config(EmberApp.env());

  let app = new EmberApp(defaults, {
    fingerprint: {
      exclude: [
        'assets/screenshots/'
      ]
    },
    postcssOptions: {
      compile: {
        path: ['app/styles'],
        root: 'app/styles',
        plugins: [
          { module: cssImport },
          tailwindcss('app/styles/tailwind.config.js'),
        ]
      }
    },
    'ember-cli-favicon': {
      iconPath: 'assets/icons/favicon.png',
      faviconsConfig: {
        path: config.rootURL
      }
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // CodeMirror
  app.import('node_modules/codemirror/lib/codemirror.css');
  app.import('node_modules/codemirror/lib/codemirror.js');

  app.import('node_modules/codemirror/mode/javascript/javascript.js');

  app.import('node_modules/codemirror/addon/scroll/scrollpastend.js');

  app.import('node_modules/codemirror/addon/lint/lint.css');
  app.import('node_modules/codemirror/addon/lint/lint.js');
  app.import('node_modules/codemirror/addon/lint/json-lint.js');

  app.import('node_modules/jsonlint/lib/jsonlint.js');

  app.import('node_modules/codemirror/addon/hint/anyword-hint.js');
  app.import('node_modules/codemirror/addon/hint/show-hint.js');
  app.import('node_modules/codemirror/addon/hint/show-hint.css');

  // CodeMirror Themes
  app.import('node_modules/codemirror/theme/base16-dark.css');
  app.import('node_modules/codemirror/theme/base16-light.css');
  app.import('node_modules/codemirror/theme/bespin.css');
  app.import('node_modules/codemirror/theme/blackboard.css');
  app.import('node_modules/codemirror/theme/colorforth.css');
  app.import('node_modules/codemirror/theme/dracula.css');
  app.import('node_modules/codemirror/theme/duotone-dark.css');
  app.import('node_modules/codemirror/theme/duotone-light.css');
  app.import('node_modules/codemirror/theme/eclipse.css');
  app.import('node_modules/codemirror/theme/elegant.css');
  app.import('node_modules/codemirror/theme/hopscotch.css');
  app.import('node_modules/codemirror/theme/icecoder.css');
  app.import('node_modules/codemirror/theme/idea.css');
  app.import('node_modules/codemirror/theme/isotope.css');
  app.import('node_modules/codemirror/theme/lucario.css');
  app.import('node_modules/codemirror/theme/material.css');
  app.import('node_modules/codemirror/theme/monokai.css');
  app.import('node_modules/codemirror/theme/moxer.css');
  app.import('node_modules/codemirror/theme/neo.css');
  app.import('node_modules/codemirror/theme/nord.css');
  app.import('node_modules/codemirror/theme/oceanic-next.css');
  app.import('node_modules/codemirror/theme/panda-syntax.css');
  app.import('node_modules/codemirror/theme/pastel-on-dark.css');
  app.import('node_modules/codemirror/theme/railscasts.css');
  app.import('node_modules/codemirror/theme/seti.css');
  app.import('node_modules/codemirror/theme/solarized.css');
  app.import('node_modules/codemirror/theme/ttcn.css');
  app.import('node_modules/codemirror/theme/xq-dark.css');
  app.import('node_modules/codemirror/theme/xq-light.css');
  app.import('node_modules/codemirror/theme/yeti.css');
  app.import('node_modules/codemirror/theme/yonce.css');

  // FileSaver
  app.import('node_modules/file-saver/dist/FileSaver.min.js');

  // D3
  app.import('node_modules/d3/dist/d3.min.js');

  // Dagre-D3
  app.import('node_modules/dagre-d3/dist/dagre-d3.min.js');

  // Vue
  app.import('node_modules/vue/dist/vue.min.js');

  return app.toTree();
};
