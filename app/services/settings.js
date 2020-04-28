import Service from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { once } from '@ember/runloop';

const graphDirectionsMap = {
  "Top-Bottom": "TB",
  "Bottom-Top": "BT",
  "Left-Right": "LR",
  "Right-Left": "RL"
}

export default class SettingsService extends Service {
  themes = A([
    "default",
    "3024-night",
    "abcdef",
    "ambiance",
    "base16-dark",
    "base16-light",
    "bespin",
    "blackboard",
    "cobalt",
    "colorforth",
    "darcula",
    "dracula",
    "duotone-dark",
    "duotone-light",
    "eclipse",
    "elegant",
    "erlang-dark",
    "gruvbox-dark",
    "hopscotch",
    "icecoder",
    "idea",
    "isotope",
    "lesser-dark",
    "liquibyte",
    "lucario",
    "material",
    "mbo",
    "mdn-like",
    "midnight",
    "monokai",
    "moxer",
    "neat",
    "neo",
    "night",
    "nord",
    "oceanic-next",
    "panda-syntax",
    "paraiso-dark",
    "paraiso-light",
    "pastel-on-dark",
    "railscasts",
    "rubyblue",
    "seti",
    "shadowfox",
    "solarized dark",
    "solarized light",
    "the-matrix",
    "tomorrow-night-bright",
    "tomorrow-night-eighties",
    "ttcn",
    "twilight",
    "vibrant-ink",
    "xq-dark",
    "xq-light",
    "yeti",
    "yonce",
    "zenburn"
  ]);
  fontSizes = A([".75rem", ".875rem", "1rem", "1.125rem"]);

  graphDirectionsMap = graphDirectionsMap;
  graphDirections = A(Object.keys(graphDirectionsMap));

  defaultTheme = "default";
  defaultFontSize = "1rem";

  defaultGraphDirection = "Top-Bottom";
  defaultVertexSeparation = 50;
  defaultEdgeSeparation = 50;
  defaultRankSeparation=  50;

  minVertexSeparation = 1;
  minEdgeSeparation = 1;
  minRankSeparation = 1;

  maxVertexSeparation = 500;
  maxEdgeSeparation = 500;
  maxRankSeparation = 500;

  @tracked theme = null;
  @tracked fontSize = null;

  @tracked graphDirection = null;
  @tracked vertexSeparation = null;
  @tracked edgeSeparation = null;
  @tracked rankSeparation = null;

  onThemeChange = null;
  onFontSizeChange = null;

  onGraphLayoutOptionsChange = null;

  constructor() {
    super(...arguments);

    this.theme = localStorage.getItem("editorTheme") || this.defaultTheme;
    this.fontSize = localStorage.getItem("editorFontSize") || this.defaultFontSize;

    this.graphDirection = localStorage.getItem("graphDirection") || this.defaultGraphDirection;
    this.vertexSeparation = localStorage.getItem("vertexSeparation") || this.defaultVertexSeparation;
    this.edgeSeparation = localStorage.getItem("edgeSeparation") || this.defaultEdgeSeparation;
    this.rankSeparation = localStorage.getItem("rankSeparation") || this.defaultRankSeparation;
  }

  callHandler(handlerName) {
    const handler = this.get(handlerName);

    if (handler) {
      once(this, handler, ...Array.prototype.slice.call(arguments, 1));
    }
  }

  setOnThemeChange(handler) {
    this.onThemeChange = handler;
  }

  setOnFontSizeChange(handler) {
    this.onFontSizeChange = handler;
  }

  setOnGraphLayoutOptionsChange(handler) {
    this.onGraphLayoutOptionsChange = handler;
  }

  setTheme(theme) {
    this.callHandler("onThemeChange", theme);

    this.theme = theme;
    localStorage.setItem("editorTheme", theme);
  }

  setFontSize(size) {
    this.callHandler("onFontSizeChange", size);

    this.fontSize = size;
    localStorage.setItem("editorFontSize", size);
  }

  convertGraphDirection(direction) {
    const graphDirectionsMap = this.graphDirectionsMap;
    return graphDirectionsMap[direction] || graphDirectionsMap[this.defaultGraphDirection];
  }

  setGraphDirection(direction) {
    this.graphDirection = direction;
    localStorage.setItem("graphDirection", direction);

    this.callHandler("onGraphLayoutOptionsChange", this.getGraphLayoutOptions());
  }

  setVertexSeparation(separation) {
    this.vertexSeparation = separation;
    localStorage.setItem("vertexSeparation", separation);

    this.callHandler("onGraphLayoutOptionsChange", this.getGraphLayoutOptions());
  }

  setEdgeSeparation(separation) {
    this.edgeSeparation = separation;
    localStorage.setItem("edgeSeparation", separation);

    this.callHandler("onGraphLayoutOptionsChange", this.getGraphLayoutOptions());
  }

  setRankSeparation(separation) {
    this.rankSeparation = separation;
    localStorage.setItem("rankSeparation", separation);

    this.callHandler("onGraphLayoutOptionsChange", this.getGraphLayoutOptions());
  }

  getTheme() {
    return this.theme || this.defaultTheme;
  }

  getFontSize() {
    return this.fontSize || this.defaultFontSize;
  }

  getGraphDirection() {
    return this.graphDirection || this.defaultGraphDirection;
  }

  getVertexSeparation() {
    return this.vertexSeparation || this.defaultVertexSeparation;
  }

  getEdgeSeparation() {
    return this.edgeSeparation || this.defaultEdgeSeparation;
  }

  getRankSeparation() {
    return this.rankSeparation || this.defaultRankSeparation;
  }

  getGraphLayoutOptions() {
    return {
      "graphDirection": this.convertGraphDirection(this.getGraphDirection()),
      "vertexSeparation": this.getVertexSeparation(),
      "edgeSeparation": this.getEdgeSeparation(),
      "rankSeparation": this.getRankSeparation()
    }
  }
}
