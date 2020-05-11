import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class PopUpsConfirmationComponent extends Component {
  get acceptMessage() {
    return this.args.acceptMessage ?? "Accept";
  }

  get cancelMessage() {
    return this.args.cancelMessage ?? "Cancel";
  }

  @action
  acceptCallback() {
    this.args.acceptCallback();
    this.args.cancelCallback();
  }
}
