import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @tracked isSideBarShown = false;

  @action
  showSideBar() {
    this.isSideBarShown = true;
  }

  @action
  hideSideBar() {
    this.isSideBarShown = false;
  }
}
