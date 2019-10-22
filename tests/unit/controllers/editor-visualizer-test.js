import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | editor-visualizer', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:editor-visualizer');
    assert.ok(controller);
  });

  test('it should update error on setError action', async function(assert) {
    let controller = this.owner.lookup('controller:editor-visualizer');

    assert.equal(controller.get('error'), null);

    const error = {"name": "ValidationError", "message": "Invalid models."};
    controller.send('setError', error);

    assert.equal(controller.get('error'), error);
  });
});
