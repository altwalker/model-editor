import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PopUpsHelpComponent extends Component {
  @service os;
  @service tracker;

  @action
  trackAltWalkerDocumentation() {
    this.tracker.trackAltWalkerDocumentation();
  }

  @action
  trackGraphWalkerDocumentation() {
    this.tracker.trackGraphWalkerDocumentation();
  }

  @action
  trackGitter() {
    this.tracker.trackGitter();
  }
}
