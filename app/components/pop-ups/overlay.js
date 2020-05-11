import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class PopUpsOverlayComponent extends Component {
  @action
  overlayCallback(event) {
    event.stopPropagation();

    if (this.args.overlayCallback) {
      this.args.overlayCallback()
    }
  }

  @action
  stopPropagation(event) {
    event.stopPropagation();
  }
}
