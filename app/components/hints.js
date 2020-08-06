import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { bind } from '@ember/runloop';
import { htmlSafe } from '@ember/template';

export default class HintsComponent extends Component {
  @service os;
  @tracked currentIndex = 0;

  interval = null;

  hints = [
    'Double click to create a new vertex.',
    'Click and drag from two vertices to create a new edge.',
    `Press <span class="key">${this.os.isMacOs ? "⌘" : "Ctrl"}</span> - <span class="key">Z</span> to undo the last change, and <span class="key">${this.os.isMacOs ? "⌘" : "Ctrl"}</span> - <span class="key">Shift</span> - <span class="key">Z</span> for redo.`,
    `Press <span class="key">Delete</span> or <span class="key">Backspace</span> to remove the selected element.`
  ];

  get hint() {
    return htmlSafe(this.hints[this.currentIndex]);
  }

  @action
  nextHint() {
    this.currentIndex += 1;

    if (this.currentIndex === this.hints.length) {
      this.currentIndex = 0;
    }
  }

  @action
  createLoop() {
    const nextHint = bind(this, this.nextHint);
    this.interval = setInterval(nextHint, 6000);
  }

  @action
  destroyLoop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
