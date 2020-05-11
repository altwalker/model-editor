import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | pop-ups/overlay', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<PopUps::Overlay />`);

    assert.equal(this.element.textContent.trim(), '');

    await render(hbs`
      <PopUps::Overlay>
        template block text
      </PopUps::Overlay>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
