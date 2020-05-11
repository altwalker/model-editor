import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | json-editor', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:json-editor');
    assert.ok(controller);
  });
});
