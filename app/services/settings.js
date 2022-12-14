import Service from '@ember/service';
import { A } from '@ember/array';
import { bind } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';
import { once } from '@ember/runloop';

const graphDirectionsMap = {
  "Top-Bottom": "TB",
  "Bottom-Top": "BT",
  "Left-Right": "LR",
  "Right-Left": "RL"
}
const graphRankersMap = {
  "Longest Path": "longest-path",
  "Tight Tree": "tight-tree",
  "Network Simplex": "network-simplex",
}

export default class SettingsService extends Service {
  themes = A([
    "default",
    "base16-dark",
    "base16-light",
    "bespin",
    "blackboard",
    "dracula",
    "duotone-dark",
    "duotone-light",
    "eclipse",
    "elegant",
    "hopscotch",
    "icecoder",
    "idea",
    "isotope",
    "lucario",
    "material",
    "monokai",
    "moxer",
    "neo",
    "nord",
    "oceanic-next",
    "panda-syntax",
    "pastel-on-dark",
    "railscasts",
    "seti",
    "solarized dark",
    "solarized light",
    "ttcn",
    "xq-dark",
    "xq-light",
    "yeti",
    "yonce",
  ]);
  fontSizes = A([".75rem", ".875rem", "1rem", "1.125rem"]);

  graphRankersMap = graphRankersMap;
  graphRankers = A(Object.keys(graphRankersMap));
  graphDirectionsMap = graphDirectionsMap;
  graphDirections = A(Object.keys(graphDirectionsMap));

  defaultTheme = "default";
  defaultFontSize = "1rem";

  defaultDisplayHints = true;

  defaultGraphRanker = "Network Simplex"
  defaultGraphDirection = "Top-Bottom";
  defaultVertexSeparation = 50;
  defaultEdgeSeparation = 50;
  defaultRankSeparation = 50;

  minVertexSeparation = 1;
  minEdgeSeparation = 1;
  minRankSeparation = 1;

  maxVertexSeparation = 500;
  maxEdgeSeparation = 500;
  maxRankSeparation = 500;

  @tracked theme = null;
  @tracked fontSize = null;

  @tracked graphRanker = null
  @tracked graphDirection = null;
  @tracked vertexSeparation = null;
  @tracked edgeSeparation = null;
  @tracked rankSeparation = null;

  onThemeChange = null;
  onFontSizeChange = null;

  onDisplayHintsChange = null;

  onGraphLayoutOptionsChange = null;

  constructor() {
    super(...arguments);

    this.theme = localStorage.getItem("editorTheme") || this.defaultTheme;
    this.fontSize = localStorage.getItem("editorFontSize") || this.defaultFontSize;

    this.graphRanker = localStorage.getItem("graphRanker") || this.defaultGraphRanker;
    this.graphDirection = localStorage.getItem("graphDirection") || this.defaultGraphDirection;
    this.vertexSeparation = localStorage.getItem("vertexSeparation") || this.defaultVertexSeparation;
    this.edgeSeparation = localStorage.getItem("edgeSeparation") || this.defaultEdgeSeparation;
    this.rankSeparation = localStorage.getItem("rankSeparation") || this.defaultRankSeparation;

    this.displayHints = localStorage.getItem("displayHints") ? localStorage.getItem("displayHints") === 'true' : this.defaultDisplayHints;
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

  setOnDisplayHintsChange(handler) {
    this.onDisplayHintsChange = handler;
  }

  setOnGraphLayoutOptionsChange(handler) {
    this.onGraphLayoutOptionsChange = handler;
  }

  setTheme(theme, saveToLocalStorage = true) {
    this.callHandler("onThemeChange", theme);

    this.theme = theme;

    if (saveToLocalStorage) {
      localStorage.setItem("editorTheme", theme);
    }
  }

  setFontSize(size, saveToLocalStorage = true) {
    this.callHandler("onFontSizeChange", size);

    this.fontSize = size;

    if (saveToLocalStorage) {
      localStorage.setItem("editorFontSize", size);
    }
  }

  convertGraphRanker(ranker) {
    const graphRankersMap = this.graphRankersMap
    return graphRankersMap[ranker] || graphRankersMap[this.defaultGraphRanker]
  }

  setGraphRanker(ranker, saveToLocalStorage = true) {
    this.graphRanker = ranker

    if (saveToLocalStorage) {
      localStorage.setItem("graphRanker", ranker)
    }

    this.callHandler("onGraphLayoutOptionsChange", this.getGraphLayoutOptions())
  }

  convertGraphDirection(direction) {
    const graphDirectionsMap = this.graphDirectionsMap;
    return graphDirectionsMap[direction] || graphDirectionsMap[this.defaultGraphDirection];
  }

  setGraphDirection(direction, saveToLocalStorage = true) {
    this.graphDirection = direction;

    if (saveToLocalStorage) {
      localStorage.setItem("graphDirection", direction);
    }

    this.callHandler("onGraphLayoutOptionsChange", this.getGraphLayoutOptions());
  }

  setVertexSeparation(separation, saveToLocalStorage = true) {
    this.vertexSeparation = separation || this.defaultVertexSeparation;

    if (saveToLocalStorage) {
      localStorage.setItem("vertexSeparation", separation);
    }

    this.callHandler("onGraphLayoutOptionsChange", this.getGraphLayoutOptions());
  }

  setEdgeSeparation(separation, saveToLocalStorage = true) {
    this.edgeSeparation = separation;

    if (saveToLocalStorage) {
      localStorage.setItem("edgeSeparation", separation);
    }

    this.callHandler("onGraphLayoutOptionsChange", this.getGraphLayoutOptions());
  }

  setRankSeparation(separation, saveToLocalStorage = true) {
    this.rankSeparation = separation;

    if (saveToLocalStorage) {
      localStorage.setItem("rankSeparation", separation);
    }

    this.callHandler("onGraphLayoutOptionsChange", this.getGraphLayoutOptions());
  }

  setGraphLayoutOptions(graphLayoutOptions, saveToLocalStorage = true) {
    this.graphRanker = graphLayoutOptions["graphRanker"] || this.defaultGraphRanker;
    this.graphDirection = graphLayoutOptions["graphDirection"] || this.defaultGraphDirection;
    this.vertexSeparation = graphLayoutOptions["vertexSeparation"] || this.defaultVertexSeparation;
    this.edgeSeparation = graphLayoutOptions["edgeSeparation"] || this.defaultEdgeSeparation;
    this.rankSeparation = graphLayoutOptions["rankSeparation"] || this.defaultRankSeparation;

    if (saveToLocalStorage) {
      localStorage.setItem("graphRanker", this.graphRanker);
      localStorage.setItem("graphDirection", this.graphDirection);
      localStorage.setItem("vertexSeparation", this.vertexSeparation);
      localStorage.setItem("edgeSeparation", this.edgeSeparation);
      localStorage.setItem("rankSeparation", this.rankSeparation);
    }

    this.callHandler("onGraphLayoutOptionsChange", this.getGraphLayoutOptions());
  }

  setDisplayHints(displayHints, saveToLocalStorage = true) {
    this.callHandler("onDisplayHintsChange", displayHints);

    this.displayHints = displayHints;

    if (saveToLocalStorage) {
      localStorage.setItem("displayHints", displayHints);
    }
  }

  getTheme() {
    return this.theme || this.defaultTheme;
  }

  getFontSize() {
    return this.fontSize || this.defaultFontSize;
  }
  getGraphRanker() {
    return this.graphRanker || this.defaultGraphRanker
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
      "graphRanker": this.convertGraphRanker(this.getGraphRanker()),
      "graphDirection": this.convertGraphDirection(this.getGraphDirection()),
      "vertexSeparation": this.getVertexSeparation(),
      "edgeSeparation": this.getEdgeSeparation(),
      "rankSeparation": this.getRankSeparation()
    }
  }

  getDisplayHints() {
    return this.displayHints;
  }

  resetEditorSettings() {
    this.setTheme(this.defaultTheme);
    this.setFontSize(this.defaultFontSize);
  }

  resetVisualizerSettings() {
    this.setGraphRanker(this.defaultGraphRanker);
    this.setGraphDirection(this.defaultGraphDirection);
    this.setVertexSeparation(this.defaultVertexSeparation);
    this.setEdgeSeparation(this.defaultEdgeSeparation);
    this.setRankSeparation(this.defaultRankSeparation);
  }

  updateEditorSettings(saveToLocalStorage) {
    this.setTheme(localStorage.getItem("editorTheme"), saveToLocalStorage);
    this.setFontSize(localStorage.getItem("editorFontSize"), saveToLocalStorage);
  }

  updateVisualizerSettings(saveToLocalStorage) {
    this.setGraphLayoutOptions({
      "graphRanker": localStorage.getItem("graphRanker"),
      "graphDirection": localStorage.getItem("graphDirection"),
      "vertexSeparation": localStorage.getItem("vertexSeparation"),
      "edgeSeparation": localStorage.getItem("edgeSeparation"),
      "rankSeparation": localStorage.getItem("rankSeparation")
    }, saveToLocalStorage);
  }

  createStorageHandler() {
    this.storageHandler = bind(this, function(event) {
      if (event.key === "editorTheme" || event.key === "editorFontSize") {
        this.updateEditorSettings(false)
      } else if (event.key === "graphDirection" || event.key === "vertexSeparation" || event.key === "edgeSeparation" || event.key === "rankSeparation") {
        this.updateVisualizerSettings(false)
      }
    })

    window.addEventListener('storage', this.storageHandler);
  }

  destroyStorageHandler() {
    window.removeEventListener('storage', this.storageHandler)
  }
}
