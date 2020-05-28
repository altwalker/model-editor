import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default class ViewerRoute extends Route {
  @service modelStorage;
  @service headData

  beforeModel() {
    if (this.modelStorage.isPlottingError) {
      this.transitionTo('json-editor');
    }
  }

  afterModel() {
    set(this, 'headData.img', 'viewer.png');
    set(this, 'headData.url', this.routeName.replace(".", "/"));
  }
}
