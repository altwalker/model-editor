import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | error-alert', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('error', {"name": "ValidationError", "message": "Invalid models."});
  });

  test('it renders', async function(assert) {
    await render(hbs`<ErrorAlert @error={{this.error}} />`);
    assert.equal(this.element.querySelector('[data-test-error]').getAttribute('role'), 'alert')
  });

  test('it should renders the error name', async function(assert) {
    await render(hbs`<ErrorAlert @error={{this.error}} />`);
    assert.equal(this.element.querySelector('[data-test-error-name]').textContent.trim(), `${this.error.name}:`);
  });

  test('it should renders the error message', async function(assert) {
    await render(hbs`<ErrorAlert @error={{this.error}} />`);
    assert.equal(this.element.querySelector('[data-test-error-message]').textContent.trim(), this.error.message);
  });
});
