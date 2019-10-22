import Component from '@ember/component';

export default Component.extend({
  onSelect: null,

  actions: {
    selectItem(value) {
      this.set("selectedItem", value);
      const onSelect = this.get("onSelect");

      if (onSelect) {
        onSelect(value);
      }
    }
  }
});
