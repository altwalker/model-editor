import { module, test } from 'qunit';
import { click, visit, fillIn, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | json-editor', function(hooks) {
  setupApplicationTest(hooks);

  hooks.afterEach(async function() {
    localStorage.clear();
  });

  test('visiting /json-editor', async function(assert) {
    await visit('/json-editor');

    assert.equal(currentURL(), '/json-editor');
  });

  test('it should render the CodeMirror editor', async function(assert) {
    await visit('/json-editor');

    assert.dom('.CodeMirror').exists();
  });

  test('it should render the ModelVisualizer in view mode', async function(assert) {
    await visit('/json-editor');

    assert.dom('.mv-visualizer').exists();
    assert.dom('.mv-editmode').doesNotExist();
  })

  test('it should change the view to /visual-editor and back', async function(assert) {
    await visit('/json-editor');
    assert.equal(currentURL(), '/json-editor');

    await click('[data-test-json-editor-button]');
    assert.equal(currentURL(), '/visual-editor');

    await click('[data-test-json-editor-button]');
    assert.equal(currentURL(), '/json-editor');
  });

  test('it should save the models to localStorage', async function(assert) {
    const text = 'HELLO WORLD';

    await visit('/json-editor');
    await fillIn('[data-test-json-editor]', text);

    assert.equal(localStorage.getItem('model'), text)
  });

  test('it should update the ModelVisualizer if the models change', async function(assert) {
    const vertexId = 'test_vertex';
    const edgeId = 'test_edge';

    const models = {
      name: "Test Models",
      models: [
        {
          name: "TestModel",
          generator: "random(never)",
          startElementId: vertexId,
          vertices: [
            {
              id: vertexId,
              name: "test_vertex"
            }
          ],
          edges: [
            {
              id: edgeId,
              name: "text_edge",
              sourceVertexId: vertexId,
              targetVertexId: vertexId,
            }
          ]
        }
      ]
    }

    await visit('/json-editor');

    assert.dom(`#${vertexId}`).doesNotExist();
    assert.dom(`#${edgeId}`).doesNotExist();

    await fillIn('[data-test-json-editor]', JSON.stringify(models));

    assert.dom(`#${vertexId}`).exists();
    assert.dom(`#${edgeId}`).exists();
  });
});
