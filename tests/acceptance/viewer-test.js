import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | viewer', function(hooks) {
  setupApplicationTest(hooks);

  hooks.afterEach(async function() {
    localStorage.clear();
  });

  test('visiting /viewer', async function(assert) {
    await visit('/viewer');

    assert.equal(currentURL(), '/viewer');
  });

  test('it should render the ModelVisualizer in view mode', async function(assert) {
    await visit('/viewer');

    assert.dom('.mv-visualizer').exists();
    assert.dom('.mv-editmode').doesNotExist();
  });

  test('it should change the view to /visual-editor and back', async function(assert) {
    await visit('/viewer');

    await click('[data-test-view-button]')
    assert.equal(currentURL(), '/visual-editor');

    await click('[data-test-view-button]')
    assert.equal(currentURL(), '/viewer');
  });

  test('it should render the models from localStorage', async function(assert) {
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

    localStorage.setItem('model', JSON.stringify(models))
    await visit('/viewer');

    assert.dom(`#${vertexId}`).exists();
    assert.dom(`#${edgeId}`).exists();
  })
});
