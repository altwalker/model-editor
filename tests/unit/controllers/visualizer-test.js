import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | visualizer', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:visualizer');
    assert.ok(controller);
  });

  test('it should update error on setError action', async function(assert) {
    let controller = this.owner.lookup('controller:visualizer');

    assert.equal(controller.get('error'), null);

    const error = {"name": "ValidationError", "message": "Invalid models."};
    controller.send('setError', error);

    assert.equal(controller.get('error'), error);
  });

  test('it should set editMode to false on setError action', async function(assert) {
    let controller = this.owner.lookup('controller:visualizer');
    controller.set("editMode", true);

    const error = {"name": "ValidationError", "message": "Invalid models."};
    controller.send('setError', error);

    assert.equal(controller.get('editMode'), false);
  });

  test('it should not set editMode to false when setError action is called with null', async function(assert) {
    let controller = this.owner.lookup('controller:visualizer');
    controller.set("editMode", true);

    controller.send('setError', null);

    assert.equal(controller.get('editMode'), true);
  });

  test('it should toogle editMode on toggleEditMode action', async function(assert) {
    let controller = this.owner.lookup('controller:visualizer');
    controller.set("editMode", true);

    controller.send('toggleEditMode');
    assert.equal(controller.get('editMode'), false);

    controller.send('toggleEditMode');
    assert.equal(controller.get('editMode'), true);
  });

  test('it should not toggle editMode on toggleEditMode action if error is set', async function(assert) {
    let controller = this.owner.lookup('controller:visualizer');
    controller.set("editMode", false);
    controller.set("error", {"name": "ValidationError", "message": "Invalid models."});

    controller.send('toggleEditMode');
    assert.equal(controller.get('editMode'), false);

    controller.send('toggleEditMode');
    assert.equal(controller.get('editMode'), false);
  })
});
