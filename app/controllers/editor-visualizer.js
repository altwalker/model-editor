import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class EditorVisualizerController extends Controller {
  @tracked error = null;

  @action
  setError(error) {
    this.error = error;
  }
}
