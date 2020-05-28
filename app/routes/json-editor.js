import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default class JsonEditorRoute extends Route {
  @service headData

  afterModel() {
    set(this, 'headData.img', 'json-editor.png');
    set(this, 'headData.url', this.routeName.replace(".", "/"));
  }
}
