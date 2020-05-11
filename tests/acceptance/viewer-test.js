import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | viewer', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /viewer', async function(assert) {
    await visit('/viewer');

    assert.equal(currentURL(), '/viewer');
  });

  test('it should render the ModelVisualizer in view mode', async function(assert) {
    await visit('/viewer');

    assert.dom('.mv-visualizer').exists();
    assert.dom('.mv-editmode').doesNotExist();
  });

  test('it should change the view to /visual-editor and back', async function(assert) {
    await visit('/viewer');

    await click('[data-test-view-button]')
    assert.equal(currentURL(), '/visual-editor');

    await click('[data-test-view-button]')
    assert.equal(currentURL(), '/viewer');
  });
});
