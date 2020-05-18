import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class VisualEditorRoute extends Route {
  @service modelStorage;

  beforeModel() {
    if (this.modelStorage.isPlottingError) {
      this.transitionTo('json-editor');
    }
  }
}
