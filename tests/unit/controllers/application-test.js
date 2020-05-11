import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | application', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:application');
    assert.ok(controller);
  });
});

module('Unit | Controller | application > displayHelpPopUp', function(hooks) {
  setupTest(hooks);

  test('it should set displayHelpPopUp to false by default', function(assert) {
    let controller = this.owner.lookup('controller:application');

    assert.notOk(controller.displayHelpPopUp);
  });

  test('showHelpPopUp should set displayHelpPopUp to true', function(assert) {
    let controller = this.owner.lookup('controller:application');
    controller.send('showHelpPopUp');

    assert.ok(controller.displayHelpPopUp);
  });

  test('hideHelpPopUp should set displayHelpPopUp to true', function(assert) {
    let controller = this.owner.lookup('controller:application');
    controller.send('showHelpPopUp');
    controller.send('hideHelpPopUp');

    assert.notOk(controller.displayHelpPopUp);
  });
});

module('Unit | Controller | application > displayExportImportPopUp', function(hooks) {
  setupTest(hooks);

  test('it should set displayExportImportPopUp to false by default', function(assert) {
    let controller = this.owner.lookup('controller:application');

    assert.notOk(controller.displayExportImportPopUp);
  });

  test('showExportImportPopUp should set displayExportImportPopUp to true', function(assert) {
    let controller = this.owner.lookup('controller:application');
    controller.send('showExportImportPopUp');

    assert.ok(controller.displayExportImportPopUp);
  });

  test('hideExportImportPopUp should set displayExportImportPopUp to true', function(assert) {
    let controller = this.owner.lookup('controller:application');
    controller.send('showExportImportPopUp');
    controller.send('hideExportImportPopUp');

    assert.notOk(controller.displayExportImportPopUp);
  });
});

module('Unit | Controller | application > displaySettingsPopUp', function(hooks) {
  setupTest(hooks);

  test('it should set displaySettingsPopUp to false by default', function(assert) {
    let controller = this.owner.lookup('controller:application');

    assert.notOk(controller.displaySettingsPopUp);
  });

  test('showSettingsPopUp should set displaySettingsPopUp to true', function(assert) {
    let controller = this.owner.lookup('controller:application');
    controller.send('showSettingsPopUp');

    assert.ok(controller.displaySettingsPopUp);
  });

  test('hideSettingsPopUp should set displaySettingsPopUp to true', function(assert) {
    let controller = this.owner.lookup('controller:application');
    controller.send('showSettingsPopUp');
    controller.send('hideSettingsPopUp');

    assert.notOk(controller.displaySettingsPopUp);
  });
});
