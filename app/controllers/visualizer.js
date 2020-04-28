import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class VisualizerController extends Controller {
  queryParams = ['editMode'];

  @tracked error = null;
  @tracked editMode = false;

  get title() {
    return this.editMode ? "Graph Editor" : "Graph Visualizer";
  }

  @action
  toggleEditMode() {
    if (!this.error) {
      this.toggleProperty("editMode");
    }
  }

  @action
  setError(error) {
    this.error = error;

    if (error) {
      this.editMode = false;
    }
  }
}
