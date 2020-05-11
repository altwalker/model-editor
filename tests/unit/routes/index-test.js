import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { visit, currentURL } from '@ember/test-helpers';

module('Unit | Route | index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:index');
    assert.ok(route);
  });

  test('should show visual-editor as the home page', async function (assert) {
    await visit('/');
    assert.equal(currentURL(), '/visual-editor', 'Should redirect automatically');
  });
});
