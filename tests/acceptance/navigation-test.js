import { module, test } from 'qunit';
import { click, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

const pages = [
  'viewer',
  'json-editor',
  'visual-editor',
  'not-found'
];

pages.forEach((page) => {
  module(`Acceptance | ${page} > navigation`, function(hooks) {
    setupApplicationTest(hooks);

    hooks.beforeEach(async function() {
      await visit(page);
    });

    test('it should render the header bar', async function(assert) {
      assert.dom('[data-test-header-bar]').exists();
    });

    test('it should render the footer bar', async function(assert) {
      assert.dom('[data-test-footer-bar]').exists();
    });

    test('it should display the help pop-up', async function(assert) {
      assert.dom('[data-test-help-pop-up]').doesNotExist();
      assert.dom('[data-test-overlay-pop-up]').doesNotExist();
      await click('[data-test-help-button]');
      assert.dom('[data-test-help-pop-up]').exists();
      assert.dom('[data-test-overlay-pop-up]').exists();
      await click('[data-test-overlay-pop-up]');
      assert.dom('[data-test-help-pop-up]').doesNotExist();
      assert.dom('[data-test-overlay-pop-up]').doesNotExist();
    });

    test('it should display the export/import pop-up', async function(assert) {
      assert.dom('[data-test-export-import-pop-up]').doesNotExist();
      assert.dom('[data-test-overlay-pop-up]').doesNotExist();
      await click('[data-test-export-import-button]');
      assert.dom('[data-test-export-import-pop-up]').exists();
      assert.dom('[data-test-overlay-pop-up]').exists();
      await click('[data-test-overlay-pop-up]');
      assert.dom('[data-test-export-import-pop-up]').doesNotExist();
      assert.dom('[data-test-overlay-pop-up]').doesNotExist();
    });

    test('it should display the settings pop-up', async function(assert) {
      assert.dom('[data-test-settings-pop-up]').doesNotExist();
      assert.dom('[data-test-overlay-pop-up]').doesNotExist();
      await click('[data-test-settings-button]');
      assert.dom('[data-test-settings-pop-up]').exists();
      assert.dom('[data-test-overlay-pop-up]').exists();
      await click('[data-test-overlay-pop-up]');
      assert.dom('[data-test-settings-pop-up]').doesNotExist();
      assert.dom('[data-test-overlay-pop-up]').doesNotExist();
    });

    test('it should display the reset models pop-up', async function(assert) {
      assert.dom('[data-test-reset-models-pop-up]').doesNotExist();
      assert.dom('[data-test-overlay-pop-up]').doesNotExist();
      await click('[data-test-reset-models-button]');
      assert.dom('[data-test-reset-models-pop-up]').exists();
      assert.dom('[data-test-overlay-pop-up]').exists();
    });
  });
})
