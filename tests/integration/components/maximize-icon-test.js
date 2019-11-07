import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | maximize-icon', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<MaximizeIcon />`);

    assert.equal(this.element.textContent.trim(), '');
  });

  test('it renders an svg tag', async function(assert) {
    await render(hbs`<MaximizeIcon />`);

    assert.equal(this.element.querySelector('svg').textContent.trim(), '');
  });

  test('it should sets the default size', async function(assert) {
    await render(hbs`<MaximizeIcon />`);

    assert.equal(this.element.querySelector('svg').getAttribute("width"), 24);
  });

  test('it should sets size', async function(assert) {
    this.set("size", 18);

    await render(hbs`<MaximizeIcon @size={{this.size}} />`);

    assert.equal(this.element.querySelector('svg').getAttribute("width"), this.get("size"));
  });

  test('it should sets the default color', async function(assert) {
    await render(hbs`<MaximizeIcon />`);

    assert.equal(this.element.querySelector('svg').getAttribute("stroke"), "black");
  });

  test('it should sets the color', async function(assert) {
    this.set("color", "red");

    await render(hbs`<MaximizeIcon @color={{this.color}} />`);

    assert.equal(this.element.querySelector('svg').getAttribute("stroke"), this.get("color"));
  });

  test('it should sets the default stroke-width', async function(assert) {
    await render(hbs`<MaximizeIcon />`);

    assert.equal(this.element.querySelector('svg').getAttribute("stroke-width"), 2);
  });

  test('it should sets the stroke-width', async function(assert) {
    this.set("strokeWidth", 1.5);

    await render(hbs`<MaximizeIcon @strokeWidth={{this.strokeWidth}} />`);

    assert.equal(this.element.querySelector('svg').getAttribute("stroke-width"), this.get("strokeWidth"));
  });
});
