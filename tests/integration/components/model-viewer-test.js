import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | model-viewer', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<ModelViewer />`);
    assert.ok(this.element.querySelector(".mv-visualizer"));
  });

  test('it should not render in edit mode as default', async function(assert) {
    await render(hbs`<ModelViewer />`);
    assert.notOk(this.element.querySelector(".mv-editor"));
  });

  test('it should not render in edit mode', async function(assert) {
    await render(hbs`<ModelViewer @editMode={{false}} />`);
    assert.notOk(this.element.querySelector(".mv-editor"));
  });

  test('it should render in edit mode', async function(assert) {
    await render(hbs`<ModelViewer @editMode={{true}} />`);
    assert.ok(this.element.querySelector(".mv-editor"));
  });
});
