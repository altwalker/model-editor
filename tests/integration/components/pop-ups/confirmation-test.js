import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, tap } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | pop-ups/confirmation', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.acceptCallbackCalled = false;
    this.cancelCallbackCalled = false;

    this.acceptCallback = () => { this.set("acceptCallbackCalled", true); }
    this.cancelCallback = () => { this.set("cancelCallbackCalled", true); }
  });

  test('it renders', async function(assert) {
    await render(hbs`
      <PopUps::Confirmation
        @acceptCallback={{action this.acceptCallback}}
        @cancelCallback={{action this.cancelCallback}}
      />
    `);

    assert.ok(this.element.textContent.trim());

    await render(hbs`
      <PopUps::Confirmation
        @acceptCallback={{action this.acceptCallback}}
        @cancelCallback={{action this.cancelCallback}}
      >
        template block text
      </PopUps::Confirmation>
    `);
    assert.ok(this.element.textContent.trim());
  });

  test('it should render the default acceptMessage', async function(assert) {
    await render(hbs`
      <PopUps::Confirmation
        @acceptCallback={{action this.acceptCallback}}
        @cancelCallback={{action this.cancelCallback}}
      />
    `);

    assert.equal(this.element.querySelector('[data-test-accept-button]').textContent.trim(), "Accept");
  });

  test('it should render the acceptMessage', async function(assert) {
    this.acceptMessage = "Accept Message";

    await render(hbs`
      <PopUps::Confirmation
        @acceptCallback={{action this.acceptCallback}}
        @acceptMessage={{this.acceptMessage}}

        @cancelCallback={{action this.cancelCallback}}
      />
    `);

    assert.equal(this.element.querySelector('[data-test-accept-button]').textContent.trim(), this.acceptMessage);
  });

  test('it should call the acceptCallback on click', async function(assert) {
    await render(hbs`
      <PopUps::Confirmation
        @acceptCallback={{action this.acceptCallback}}
        @cancelCallback={{action this.cancelCallback}}
      />
    `);

    assert.notOk(this.acceptCallbackCalled);
    assert.notOk(this.cancelCallbackCalled);
    await click('[data-test-accept-button]');
    assert.ok(this.acceptCallbackCalled);
    assert.ok(this.cancelCallbackCalled);
  });

  test('it should call the acceptCallback on tap', async function(assert) {
    await render(hbs`
      <PopUps::Confirmation
        @acceptCallback={{action this.acceptCallback}}
        @cancelCallback={{action this.cancelCallback}}
      />
    `);

    assert.notOk(this.acceptCallbackCalled);
    assert.notOk(this.cancelCallbackCalled);
    await tap('[data-test-accept-button]');
    assert.ok(this.acceptCallbackCalled);
    assert.ok(this.cancelCallbackCalled);
  });

  test('it should render the default cancelMessage', async function(assert) {
    await render(hbs`
      <PopUps::Confirmation
        @acceptCallback={{action this.acceptCallback}}
        @cancelCallback={{action this.cancelCallback}}
      />
    `);

    assert.equal(this.element.querySelector('[data-test-cancel-button]').textContent.trim(), 'Cancel');
  });

  test('it should render the cancelMessage', async function(assert) {
    this.cancelMessage = "Cancel Message";

    await render(hbs`
      <PopUps::Confirmation
        @acceptCallback={{action this.acceptCallback}}

        @cancelCallback={{action this.cancelCallback}}
        @cancelMessage={{this.cancelMessage}}
      />
    `);

    assert.equal(this.element.querySelector('[data-test-cancel-button]').textContent.trim(), this.cancelMessage);
  });

  test('it should call the cancelCallback on click', async function(assert) {
    await render(hbs`
      <PopUps::Confirmation
        @acceptCallback={{action this.acceptCallback}}
        @cancelCallback={{action this.cancelCallback}}
      />
    `);

    assert.notOk(this.cancelCallbackCalled);
    await click('[data-test-cancel-button]');
    assert.ok(this.cancelCallbackCalled);
  });

  test('it should call the cancelCallback on tap', async function(assert) {
    await render(hbs`
      <PopUps::Confirmation
        @acceptCallback={{action this.acceptCallback}}
        @cancelCallback={{action this.cancelCallback}}
      />
    `);

    assert.notOk(this.cancelCallbackCalled);
    await tap('[data-test-cancel-button]');
    assert.ok(this.cancelCallbackCalled);
  });
});
