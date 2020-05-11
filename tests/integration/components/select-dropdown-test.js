import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | select-dropdown', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('items', ['A', 'B', 'C']);
    this.set('selected', 'A')
  });

  test('it renders', async function(assert) {
    await render(hbs`<SelectDropdown />`);

    assert.equal(this.element.querySelector("select").textContent.trim(), '');
  });

  test('it renders all items', async function(assert) {
    await render(hbs`<SelectDropdown @items={{this.items}} />`);

    assert.equal(this.element.querySelectorAll("option").length, this.get('items').length);
  });

  test('it should maks the correct option as selected', async function(assert) {
    await render(hbs`<SelectDropdown @items={{this.items}} @selectedItem={{this.selected}} />`);

    const selectedItem = this.get("selecteItem");
    this.element.querySelectorAll("option").forEach(function(element) {
      const selected = element.getAttribute("selected") || false;
      const value = element.getAttribute("value");

      assert.equal(selected, value == selectedItem ? true : false);
    });
  });

  test('it should update the selected value', async function(assert) {
    const newSelectedItem = this.get("items")[2];
    this.set("onSelect", function(value) {
      assert.equal(value, newSelectedItem, `Should set the selected value to ${newSelectedItem} actual value ${value}`)
    });

    await render(hbs`<SelectDropdown @items={{this.items}} @selectedItem={{this.selected}} @onSelectCallback={{this.onSelect}} />`);
    await fillIn('select', newSelectedItem);
  });

  test('it should call the onSelect callback', async function(assert) {
    let callCount = 0;

    this.set("onSelect", function() {
      callCount += 1;
    });

    await render(hbs`<SelectDropdown @items={{this.items}} @selectedItem={{this.selected}} @onSelectCallback={{this.onSelect}} />`);

    const items = this.get("items");
    for (let i = 0; i < items.length; i++) {
      await fillIn('select', items[i]);
      assert.equal(callCount, i + 1)
    }
  });
});
