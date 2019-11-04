import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | application', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:application');
    assert.ok(controller);
  });

  test('it should set isSideBarShown to false by default', function(assert) {
    let controller = this.owner.lookup('controller:application');

    assert.notOk(controller.get("isSideBarShown"));
  });

  test('it should set isSideBarShown to true', function(assert) {
    let controller = this.owner.lookup('controller:application');

    controller.send("showSideBar");

    assert.ok(controller.get("isSideBarShown"));
  });

  test('it should set isSideBarShown to false', function(assert) {
    let controller = this.owner.lookup('controller:application');

    controller.send("hideSideBar");

    assert.notOk(controller.get("isSideBarShown"));
  });
});
