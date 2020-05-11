import Controller from '@ember/controller';
import { action } from '@ember/object';
import { bind } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

export default class JsonEditorController extends Controller {
  @tracked dragging = false;

  minPercentage = 30;

  @action
  createDragable() {
    const dragmove = bind(this, this.dragmove);
    const dragend = bind(this, this.dragend);

    window.addEventListener("mousemove", dragmove);
    window.addEventListener("touchmove", dragmove);
    window.addEventListener("mouseup", dragend);
    window.addEventListener("touchend", dragend);
  }

  @action
  destroyDragable() {
    const dragmove = bind(this, this.dragmove);
    const dragend = bind(this, this.dragend);

    window.removeEventListener("mousemove", dragmove);
    window.removeEventListener("touchmove", dragmove);
    window.removeEventListener("mouseup", dragend);
    window.removeEventListener("touchend", dragend);
  }

  @action
  dragstart(event) {
    event.preventDefault();
    this.dragging = true;
  }

  @action
  dragmove(event) {
    if (this.dragging) {

      var percentage = (event.pageX / window.innerWidth) * 100;

      if (percentage > this.minPercentage && percentage < (100 - this.minPercentage)) {
        var rightPercentage = 100 - 0.2 - percentage;

        document.getElementById("left").style.width = percentage + "vw";
        document.getElementById("right").style.width = rightPercentage + "vw";
      }
    }
  }

  @action
  dragend() {
    this.dragging = false;
  }
}
