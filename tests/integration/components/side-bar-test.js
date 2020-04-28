import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | side-bar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set("hideSideBar", function() {})

    await render(hbs`<SideBar @hideSideBarCallback={{this.hideSideBar}} />`);

    assert.ok(this.element.textContent.trim())
  });
});
