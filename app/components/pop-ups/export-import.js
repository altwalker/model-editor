import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class PopUpsExportImportComponent extends Component {
  @service modelStorage;

  @tracked fileName = 'models'
  @tracked loadedFileName = ''
  @tracked loading = false;
  @tracked error = ''

  @tracked displayConfirmationPopUp = false;

  models = ''

  @action
  saveModel() {
    let blob = new Blob([this.modelStorage.loadModel()], {type: "text/plain;charset=utf-8"});
    saveAs(blob, this.fileName + ".json");
  }

  @action
  readModelsFromFile(event) {
    var that = this;
    let file = event.target.files[0];

    if (file) {
      this.loadedFileName = file.name;

      let reader = new FileReader();
      reader.onloadstart = () => {
        that.loading = true;
      }
      reader.onload = (event) => {
        that.loading = false;
        that.models = event.target.result
      }
      reader.onerror = (event) => {
        that.loading = false;
        switch(event.target.error.code) {
          case event.target.error.NOT_FOUND_ERR:
            that.error = 'File Not Found.';
            break;
          case event.target.error.NOT_READABLE_ERR:
            that.error = 'File is not readable.';
            break;
          case event.target.error.ABORT_ERR:
            that.error = 'File read cancelled.';
            break;
          default:
            that.error = 'An error occurred reading this file.'
        }
      }

      reader.readAsText(file);
    }
  }

  @action
  loadModel() {
    this.modelStorage.saveModel("import", this.models);
  }

  @action
  showConfirmationPopUp() {
    this.displayConfirmationPopUp = true;
  }

  @action
  hideConfirmationPopUp() {
    this.displayConfirmationPopUp = false;
  }
}
