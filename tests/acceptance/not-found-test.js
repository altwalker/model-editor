import { module, test } from 'qunit';
import { visit, currentURL, currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | not found', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /not-found', async function(assert) {
    await visit('/not-found');

    assert.equal(currentURL(), '/not-found');
  });

  test('it should render the /not-found page for any path not defined', async function(assert) {
    await visit('/a/non-existent/path');

    assert.dom('[data-test-not-found-page]').exists();
    assert.equal(currentRouteName(), 'not-found');
  });
});
