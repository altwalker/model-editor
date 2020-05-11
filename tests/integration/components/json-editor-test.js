import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';

const modelStorageStub = Service.extend({
  model: "",

  setOnModelChange() {
  },

  removeOnModelChange() {
  },

  loadModel() {
    return this.get("model");
  },

  saveModel(caller, model) {
    this.set("model", model);
  }
});

module('Integration | Component | json-editor', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:model-storage', modelStorageStub);
  });

  test('it renders', async function(assert) {
    await render(hbs`<JsonEditor />`);
    assert.ok(this.element.querySelector(".CodeMirror"));
  });

  test('it should save the new model', async function(assert) {
    await render(hbs`<JsonEditor />`);

    const model = "{}"
    await fillIn(".CodeMirror textarea", model);

    let modelStorage = this.owner.lookup('service:model-storage');
    assert.equal(modelStorage.get("model"), model, `${modelStorage.get("model")}`);
  });
});
