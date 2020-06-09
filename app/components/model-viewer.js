import Component from '@ember/component';
import { action } from '@ember/object';
import { bind } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ModelViewerComponent extends Component {
  @service modelStorage;
  @service settings;

  @tracked error = null;
  @tracked displayHints = this.settings.getDisplayHints();

  visualizer = null;

  @action
  createModelViewer() {
    const setModels = bind(this, this.get("setModels"));
    this.modelStorage.setOnModelChange("visualizer", setModels);

    this.visualizer = new ModelVisualizer({"container": "visualizer"});
    this.updateEditMode();

    this.setModels(this.modelStorage.loadModel());

    const refresh = bind(this, this.get("refresh"));
    window.addEventListener("resize", refresh);

    const setGraphLayoutOptions = bind(this, this.get("setGraphLayoutOptions"));
    this.settings.setOnGraphLayoutOptionsChange(setGraphLayoutOptions);

    this.setGraphLayoutOptions(this.settings.getGraphLayoutOptions());

    const setDisplayHints = bind(this, this.get("setDisplayHints"));
    this.settings.setOnDisplayHintsChange(setDisplayHints);
  }

  @action
  updateEditMode() {
    this.visualizer.setEditMode(this.editMode);

    if (this.editMode) {
      const handler = bind(this, this.updateHandler);
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

  updateHandler(models) {
    try {
      ModelVisualizer.validate(models)

      this.error = null;
      this.modelStorage.setError(null)
    } catch (error) {
      this.error = error;
      this.modelStorage.setError(error)
    }

    this.saveModels(models);
  }

  setModels(models) {
    const visualizer = this.get("visualizer");

    try {
      let jsonModels = JSON.parse(models);

      if (jsonModels !== visualizer.getModels()) {
        visualizer.setModels(jsonModels);
        ModelVisualizer.validate(jsonModels)

        this.error = null;
        this.modelStorage.setError(null)
      }
    } catch (error) {
      this.error = error;
      this.modelStorage.setError(error)
    }
  }

  saveModels(models) {
    this.modelStorage.saveModel("visualizer", models)
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

  @action
  setDisplayHints(value) {
    this.displayHints = value;
  }
}
