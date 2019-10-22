import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | menu-icon', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<MenuIcon />`);

    assert.equal(this.element.textContent.trim(), '');
  });

  test('it renders an svg tag', async function(assert) {
    await render(hbs`<MenuIcon />`);

    assert.equal(this.element.querySelector('svg').textContent.trim(), '');
  });

  test('it should sets the default size', async function(assert) {
    await render(hbs`<MenuIcon />`);

    assert.equal(this.element.querySelector('svg').getAttribute("width"), 24);
  });

  test('it should sets size', async function(assert) {
    this.set("size", 18);

    await render(hbs`<MenuIcon @size={{this.size}} />`);

    assert.equal(this.element.querySelector('svg').getAttribute("width"), this.get("size"));
  });

  test('it should sets the default color', async function(assert) {
    await render(hbs`<MenuIcon />`);

    assert.equal(this.element.querySelector('svg').getAttribute("fill"), "black");
  });

  test('it should sets the color', async function(assert) {
    this.set("color", "red");

    await render(hbs`<MenuIcon @color={{this.color}} />`);

    assert.equal(this.element.querySelector('svg').getAttribute("fill"), this.get("color"));
  });
});
