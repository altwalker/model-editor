import Component from '@glimmer/component';

export default class IconComponent extends Component {
  get size() {
    return this.args.size ?? 24;
  }

  get strokeWidth() {
    return this.args.strokeWidth ?? 2;
  }

  get color() {
    return this.args.color ?? "black";
  }
}
