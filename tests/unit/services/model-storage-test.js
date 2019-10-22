import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | model-storage', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let service = this.owner.lookup('service:model-storage');
    assert.ok(service);
  });

  test('it should load the default model', function(assert) {
    let service = this.owner.lookup('service:model-storage');

    assert.equal(service.loadModel(), service.defaultModel)
  });

  test('it should load the models from local storage', function(assert) {
    let service = this.owner.lookup('service:model-storage');

    const model = "{}";
    localStorage.setItem("model", model);

    assert.equal(service.loadModel(), model)
  });

  test('it should save the models in local storage', function(assert) {
    let service = this.owner.lookup('service:model-storage');

    const model = "{}";
    service.saveModel(model)

    assert.equal(localStorage.getItem("model"), model);
  });
});
