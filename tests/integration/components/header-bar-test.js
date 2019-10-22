import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | header-bar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<HeaderBar />`);

    assert.ok(this.element.textContent.trim());
  });

  test('it renders the header', async function(assert) {
    await render(hbs`<HeaderBar />`);

    assert.equal(this.element.querySelector("h1").textContent.trim(), "Model-Editor");
  });

  test(`it should call the showSideBar callback`, async function(assert) {
    let called = false;
    this.set("showSideBar", function() {
      called = true;
    });

    await render(hbs`<HeaderBar @showSideBar={{this.showSideBar}} />`);

    assert.notOk(called);

    await click('a')

    assert.ok(called);
  });
});
