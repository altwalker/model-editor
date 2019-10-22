import Component from '@ember/component';
import { oneWay } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  settings: service('settings'),
  modelStorage: service('model-storage'),

  fontSizes: oneWay('settings.fontSizes'),
  themes: oneWay('settings.themes'),
  graphDirections: oneWay('settings.graphDirections'),

  fontSize: oneWay('settings.fontSize'),
  theme: oneWay('settings.theme'),
  graphDirection: oneWay('settings.graphDirection'),

  fileName: "models",

  actions: {
    hideSideBar() {
      this.hideSideBar();
    },

    selectTheme(selected) {
      this.settings.setTheme(selected);
    },

    selectFontSize(selected) {
      this.settings.setFontSize(selected);
    },

    selectGraphDirection(selected) {
      this.settings.setGraphDirection(selected);
    },

    saveModel() {
      var blob = new Blob([this.modelStorage.loadModel()], {type: "text/plain;charset=utf-8"});
      saveAs(blob, this.fileName + ".json");
    }
  }
});
