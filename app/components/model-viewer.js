import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { bind } from '@ember/runloop';

export default class ModelViewerComponent extends Component {
  @service modelStorage;
  @service settings;

  visualizer = null;

  @action
  createModelViewer() {
    this.visualizer = new ModelVisualizer({"container": "visualizer"});
    this.updateEditMode();

    this.setModels(this.modelStorage.loadModel());

    const refresh = bind(this, this.get("refresh"));
    window.addEventListener("resize", refresh);

    const setGraphLayoutOptions = bind(this, this.get("setGraphLayoutOptions"));
    this.settings.setOnGraphLayoutOptionsChange(setGraphLayoutOptions);

    this.setGraphLayoutOptions(this.settings.getGraphLayoutOptions());
  }

  @action
  updateEditMode() {
    this.visualizer.setEditMode(this.editMode);

    const setModels = bind(this, this.get("setModels"));
    this.modelStorage.setOnModelChange("visualizer", setModels);

    if (this.editMode) {
      const handler = bind(this, this.saveModels);
      this.visualizer.setOnModelsChange(handler);
    } else {
      this.visualizer.setOnModelsChange(null);
    }
  }

  @action
  destroyModelViewer() {
    const refresh = bind(this, this.get("refresh"));
    window.removeEventListener("resize", refresh)

    this.modelStorage.removeOnModelChange("visualizer");
    this.settings.setOnGraphLayoutOptionsChange(null);
  }

  setModels(models) {
    const visualizer = this.get("visualizer");

    try {
      visualizer.setModels(JSON.parse(models));
      this.setError(null);
    } catch (error) {
      this.setError(error);
    }
  }

  saveModels(models) {
    this.modelStorage.saveModel("visualizer", models)
  }

  setError(error) {
    this.set("error", error);
  }

  refresh() {
    const visualizer = this.get("visualizer");

    if (visualizer) {
      visualizer.repaint();
    }
  }

  setGraphLayoutOptions(options) {
    const visualizer = this.get("visualizer");
    const layoutOptions = {
      "rankdir": options["graphDirection"],
      "nodesep": options["vertexSeparation"],
      "edgesep": options["edgeSeparation"],
      "ranksep": options["rankSeparation"]
    }

    visualizer.setGraphLayoutOptions(layoutOptions);
  }
}
