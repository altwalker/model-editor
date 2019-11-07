import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('editor');
  this.route('visualizer');
  this.route('editor-visualizer');
});

export default Router;
