import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | visual-editor', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:visual-editor');
    assert.ok(controller);
  });
});
