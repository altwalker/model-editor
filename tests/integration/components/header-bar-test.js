import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | header-bar', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.helpCallbackCalled = false;
    this.exportImportCallbackCalled = false;
    this.settingsCallbackCalled = false;
    this.resetModelsCallbackCalled = false;

    this.helpCallback = () => { this.set("helpCallbackCalled", true); }
    this.exportImportCallback = () => { this.set("exportImportCallbackCalled", true); }
    this.settingsCallback = () => { this.set("settingsCallbackCalled", true); }
    this.resetModelsCallback = () => { this.set("resetModelsCallbackCalled", true); }
  });

  test('it renders', async function(assert) {
    await render(hbs`
      <HeaderBar
        @helpCallback={{action this.helpCallback}}
        @exportImportCallback={{action this.exportImportCallback}}
        @settingsCallback={{action this.settingsCallback}}
        @resetModelsCallback={{action this.resetModelsCallback}}
      />
    `);

    assert.ok(this.element.textContent.trim());
  });

  test('it should call the helpCallback', async function(assert) {
    await render(hbs`
      <HeaderBar
        @helpCallback={{action this.helpCallback}}
        @exportImportCallback={{action this.exportImportCallback}}
        @settingsCallback={{action this.settingsCallback}}
        @resetModelsCallback={{action this.resetModelsCallback}}
      />
    `);

    assert.notOk(this.helpCallbackCalled);
    await click('[data-test-help-button]');
    assert.ok(this.helpCallbackCalled);
  });

  test('it should call the exportImportCallback', async function(assert) {
    await render(hbs`
      <HeaderBar
        @helpCallback={{action this.helpCallback}}
        @exportImportCallback={{action this.exportImportCallback}}
        @settingsCallback={{action this.settingsCallback}}
        @resetModelsCallback={{action this.resetModelsCallback}}
      />
    `);

    assert.notOk(this.exportImportCallbackCalled);
    await click('[data-test-export-import-button]');
    assert.ok(this.exportImportCallbackCalled);
  });

  test('it should call the settingsCallback', async function(assert) {
    await render(hbs`
      <HeaderBar
        @helpCallback={{action this.helpCallback}}
        @exportImportCallback={{action this.exportImportCallback}}
        @settingsCallback={{action this.settingsCallback}}
        @resetModelsCallback={{action this.resetModelsCallback}}
      />
    `);

    assert.notOk(this.settingsCallbackCalled);
    await click('[data-test-settings-button]');
    assert.ok(this.settingsCallbackCalled);
  });

  test('it should call the resetModelsCallback', async function(assert) {
    await render(hbs`
      <HeaderBar
        @helpCallback={{action this.helpCallback}}
        @exportImportCallback={{action this.exportImportCallback}}
        @settingsCallback={{action this.settingsCallback}}
        @resetModelsCallback={{action this.resetModelsCallback}}
      />
    `);

    assert.notOk(this.resetModelsCallbackCalled);
    await click('[data-test-reset-models-button]');
    assert.ok(this.resetModelsCallbackCalled);
  });
});
