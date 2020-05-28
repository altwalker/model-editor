import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service router;
  @service modelStorage;
  @service settings;

  @tracked displayHelpPopUp = false;
  @tracked displayExportImportPopUp = false;
  @tracked displaySettingsPopUp = false;
  @tracked displayResetModelsPopUp = false;

  @action
  showHelpPopUp() {
    this.displayHelpPopUp = true;
  }

  @action
  hideHelpPopUp() {
    this.displayHelpPopUp = false;
  }

  @action
  showExportImportPopUp() {
    this.displayExportImportPopUp = true;
  }

  @action
  hideExportImportPopUp() {
    this.displayExportImportPopUp = false;
  }

  @action
  showSettingsPopUp() {
    this.displaySettingsPopUp = true;
  }

  @action
  hideSettingsPopUp() {
    this.displaySettingsPopUp = false;
  }

  @action
  showResetModelsPopUp() {
    this.displayResetModelsPopUp = true;
  }

  @action
  hideResetModelsPopUp() {
    this.displayResetModelsPopUp = false;
  }

  @action
  resetModels() {
    this.modelStorage.resetModel()
  }

  @action
  createStorageHandler() {
    this.modelStorage.createStorageHandler();
    this.settings.createStorageHandler();
  }

  @action
  destroyStorageHandler() {
    this.modelStorage.destroyStorageHandler();
    this.settings.destroyStorageHandler();
  }
}
