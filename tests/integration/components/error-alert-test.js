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

    assert.equal(this.element.querySelector('.error-alert').getAttribute('role'), 'alert')
  });

  test('it renders the error name', async function(assert) {
    await render(hbs`<ErrorAlert @error={{this.error}} />`);

    assert.equal(this.element.querySelector('.error-alert > strong').textContent.trim(), `${this.get("error").name}:`);
  });

  test('it renders the error message', async function(assert) {
    await render(hbs`<ErrorAlert @error={{this.error}} />`);

    assert.equal(this.element.querySelector('.error-alert > span').textContent.trim(), this.get("error").message);
  });
});
