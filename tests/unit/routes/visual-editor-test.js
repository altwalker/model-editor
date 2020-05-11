import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | visual-editor', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:visual-editor');
    assert.ok(route);
  });
});
