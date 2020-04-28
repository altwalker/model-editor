import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SelectDropdownComponent extends Component {
  @tracked selectedItem = null;
  onSelect = null;

  constructor() {
    super(...arguments);

    this.selectedItem = this.args.selectedItem;
    this.onSelect = this.args.onSelectCallback;
  }

  @action
  selectItem(event) {
    this.selectedItem = event.target.value;
    const onSelect = this.onSelect;

    if (onSelect) {
      onSelect(this.selectedItem);
    }
  }
}
