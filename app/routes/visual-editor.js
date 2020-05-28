import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default class VisualEditorRoute extends Route {
  @service modelStorage;
  @service headData

  beforeModel() {
    if (this.modelStorage.isPlottingError) {
      this.transitionTo('json-editor');
    }
  }

  afterModel() {
    set(this, 'headData.img', 'visual-editor.png');
    set(this, 'headData.url', this.routeName.replace(".", "/"));
  }
}
