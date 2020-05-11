import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | json editor', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /json-editor', async function(assert) {
    await visit('/json-editor');

    assert.equal(currentURL(), '/json-editor');
  });

  test('it should render the CodeMirror editor', async function(assert) {
    await visit('/json-editor');

    assert.dom('.CodeMirror').exists();
  });

  test('it should change the view to /visual-editor and back', async function(assert) {
    await visit('/json-editor');
    assert.equal(currentURL(), '/json-editor');

    await click('[data-test-json-editor-button]');
    assert.equal(currentURL(), '/visual-editor');

    await click('[data-test-json-editor-button]');
    assert.equal(currentURL(), '/json-editor');
  });
});
