import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | visual-editor', function(hooks) {
  setupApplicationTest(hooks);

  hooks.afterEach(async function() {
    localStorage.clear();
  });

  test('visiting /visual-editor', async function(assert) {
    await visit('/visual-editor');

    assert.equal(currentURL(), '/visual-editor');
  });

  test('it should render the ModelVisualizer in edit mode', async function(assert) {
    await visit('/visual-editor');

    assert.dom('.mv-editmode .mv-visualizer').exists();
    assert.dom('.mv-editmode .mv-editor').exists();
  });

  test('it should change the view to /json-editor and back', async function(assert) {
    await visit('/visual-editor');

    await click('[data-test-json-editor-button]');
    assert.equal(currentURL(), '/json-editor');

    await click('[data-test-json-editor-button]');
    assert.equal(currentURL(), '/visual-editor');
  });

  test('it should update the localStoare when adding a new model', async function(assert) {
    await visit('/visual-editor');
    await click('.mv-button-new-model');

    const models = JSON.parse(localStorage.getItem('model'))['models']
    assert.equal(models.length, 2)
  })

  test('it should update the ModelVisualizer when adding a new model', async function(assert) {
    await visit('/visual-editor');
    await click('.mv-button-new-model');

    const vertex = JSON.parse(localStorage.getItem('model'))['models'][1]['vertices'][0]
    assert.dom(`#${vertex.id}`).exists()
  })
});
