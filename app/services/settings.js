import Service from '@ember/service';
import { A } from '@ember/array';
import { once } from '@ember/runloop';

const graphDirectionsMap = {
  "Top-Bottom": "TB",
  "Bottom-Top": "BT",
  "Left-Right": "LR",
  "Right-Left": "RL"
}

export default Service.extend({
  themes: A([
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
  ]),
  fontSizes: A([".75rem", ".875rem", "1rem", "1.125rem"]),

  graphDirectionsMap: graphDirectionsMap,
  graphDirections: A(Object.keys(graphDirectionsMap)),

  defaultTheme: "default",
  defaultFontSize: "1rem",

  defaultGraphDirection: "Top-Bottom",
  defaultVertexSeparation: 50,
  defaultEdgeSeparation: 50,
  defaultRankSeparation: 50,

  minVertexSeparation: 1,
  minEdgeSeparation: 1,
  minRankSeparation: 1,

  maxVertexSeparation: 500,
  maxEdgeSeparation: 500,
  maxRankSeparation: 500,

  theme: null,
  fontSize: null,

  graphDirection: null,
  vertexSeparation: null,
  edgeSeparation: null,
  rankSeparation: null,

  onThemeChange: null,
  onFontSizeChange: null,

  onGraphLayoutOptionsChange: null,

  init() {
    this._super(...arguments);

    this.set("theme", localStorage.getItem("editorTheme") || this.get("defaultTheme"));
    this.set("fontSize", localStorage.getItem("editorFontSize") || this.get("defaultFontSize"));

    this.set("graphDirection", localStorage.getItem("graphDirection") || this.get("defaultGraphDirection"));
    this.set("vertexSeparation", localStorage.getItem("vertexSeparation") || this.get("defaultVertexSeparation"));
    this.set("edgeSeparation", localStorage.getItem("edgeSeparation") || this.get("defaultEdgeSeparation"));
    this.set("rankSeparation", localStorage.getItem("rankSeparation") || this.get("defaultRankSeparation"));
  },

  callHandler(handlerName) {
    const handler = this.get(handlerName);

    if (handler) {
      once(this, handler, ...Array.prototype.slice.call(arguments, 1));
    }
  },

  setOnThemeChange(handler) {
    this.set("onThemeChange", handler)
  },

  setOnFontSizeChange(handler) {
    this.set("onFontSizeChange", handler)
  },

  setOnGraphLayoutOptionsChange(handler) {
    this.set("onGraphLayoutOptionsChange", handler)
  },

  setTheme(theme) {
    this.callHandler("onThemeChange", theme);

    this.set("theme", theme);
    localStorage.setItem("editorTheme", theme);
  },

  setFontSize(size) {
    this.callHandler("onFontSizeChange", size);

    this.set("fontSize", size);
    localStorage.setItem("editorFontSize", size);
  },

  convertGraphDirection(direction) {
    const graphDirectionsMap = this.get("graphDirectionsMap");
    return graphDirectionsMap[direction] || graphDirectionsMap[this.get("defaultGraphDirection")];
  },

  setGraphDirection(direction) {
    this.set("graphDirection", direction);
    localStorage.setItem("graphDirection", direction);

    this.callHandler("onGraphLayoutOptionsChange", this.getGraphLayoutOptions());
  },

  setVertexSeparation(separation) {
    this.set("vertexSeparation", separation);
    localStorage.setItem("vertexSeparation", separation);

    this.callHandler("onGraphLayoutOptionsChange", this.getGraphLayoutOptions());
  },

  setEdgeSeparation(separation) {
    this.set("edgeSeparation", separation);
    localStorage.setItem("edgeSeparation", separation);

    this.callHandler("onGraphLayoutOptionsChange", this.getGraphLayoutOptions());
  },

  setRankSeparation(separation) {
    this.set("rankSeparation", separation);
    localStorage.setItem("rankSeparation", separation);

    this.callHandler("onGraphLayoutOptionsChange", this.getGraphLayoutOptions());
  },

  getTheme() {
    return this.get("theme") || this.get("defaultTheme");
  },

  getFontSize() {
    return this.get("fontSize") || this.get("defaultFontSize");
  },

  getGraphDirection() {
    return this.get("graphDirection") || this.get("defaultGraphDirection");
  },

  getVertexSeparation() {
    return this.get("vertexSeparation") || this.get("defaultVertexSeparation");
  },

  getEdgeSeparation() {
    return this.get("edgeSeparation") || this.get("defaultEdgeSeparation");
  },

  getRankSeparation() {
    return this.get("rankSeparation") || this.get("defaultRankSeparation");
  },

  getGraphLayoutOptions() {
    return {
      "graphDirection": this.convertGraphDirection(this.getGraphDirection()),
      "vertexSeparation": this.getVertexSeparation(),
      "edgeSeparation": this.getEdgeSeparation(),
      "rankSeparation": this.getRankSeparation()
    }
  }
});
