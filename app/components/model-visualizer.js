import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { bind } from '@ember/runloop';

export default Component.extend({
  modelStorage : service('model-storage'),
  visualizer: null,

  onError: null,
  ignoreErrors: false,

  init() {
    this._super(...arguments);
  },

  didInsertElement() {
    this._super(...arguments);

    const visualizer = new ModelVisualizer({"container": "visualizer"});
    this.set("visualizer", visualizer);

    this.setModels(this.modelStorage.loadModel());
    this.updateEditMode();

    const refresh = bind(this, this.get("refresh"));
    window.addEventListener("resize", refresh)
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this.updateEditMode();
  },

  willDestroyElement() {
    const refresh =  bind(this, this.get("refresh"));
    window.removeEventListener("resize", refresh)

    this.modelStorage.setOnModelChange(null);

    this._super(...arguments);
  },

  setModels(models) {
    const visualizer = this.get("visualizer");

    try {
      visualizer.setModels(JSON.parse(models));
      this.setError(null);
    } catch (error) {
      this.setError(error);
    }
  },

  updateEditMode() {
    const visualizer = this.get("visualizer");
    visualizer.setEditMode(this.editMode);

    if (this.editMode) {
      this.modelStorage.setOnModelChange(null);

      const handler = bind(this.modelStorage, this.modelStorage.get("saveModel"));
      visualizer.setOnModelsChange(handler);
    } else {
      const setModels = bind(this, this.get("setModels"));
      this.modelStorage.setOnModelChange(setModels);

      // this.setModels(this.modelStorage.loadModel());
      visualizer.setOnModelsChange(null);
    }
  },

  setError(error) {
    this.set("error", error);

    const handler = this.get("onError");
    if (handler) {
      handler(error);
    }
  },

  refresh() {
    const visualizer = this.get("visualizer");

    if (visualizer) {
      visualizer.repaint();
    }
  },
});
