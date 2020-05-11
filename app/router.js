import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('json-editor');
  this.route('visual-editor');
  this.route('viewer');
  this.route('not-found', { path: '/*path' });
});
