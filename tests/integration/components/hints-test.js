import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hints', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.closeCallbackCalled = false;

    this.closeCallback = () => { this.set("closeCallbackCalled", true); }
  });

  test('it renders', async function(assert) {
    await render(hbs`<Hints @closeCallback={{this.closeCallback}} />`);
    assert.ok(this.element.textContent.trim());
  });

  test('it should call the closeCallback', async function(assert) {
    await render(hbs`<Hints @closeCallback={{this.closeCallback}} />`);

    assert.notOk(this.closeCallbackCalled);
    await click("[data-test-hints-close-button]")
    assert.ok(this.closeCallbackCalled);
  });
});
