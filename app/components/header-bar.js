import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class HeaderBarComponent extends Component {
  @service tracker;

  @action
  trackToggleJson() {
    this.tracker.trackToggleJson();
  }

  @action
  trackHelp() {
    this.tracker.trackHelp();
  }

  @action
  trackViewModels() {
    this.tracker.trackViewModels();
  }

  @action
  trackExportImport() {
    this.tracker.trackExportImport();
  }

  @action
  trackSettings() {
    this.tracker.trackSettings();
  }
}
