import Service from '@ember/service';
import { A } from '@ember/array';

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
  graphDirections: A(["TB", "BT", "LR", "RL"]),

  defaultTheme: "default",
  defaultFontSize: "1rem",
  defaultGraphDirection: "TB",

  theme: localStorage.getItem("editorTheme"),
  fontSize: localStorage.getItem("editorFontSize"),
  graphDirection: localStorage.getItem("graphDirection"),

  onThemeChange: null,
  onFontSizeChange: null,
  onGraphDirectionChange: null,

  setOnThemeChange(handler) {
    this.set("onThemeChange", handler)
  },

  setOnFontSizeChange(handler) {
    this.set("onFontSizeChange", handler)
  },

  setTheme(theme) {
    this.set("theme", theme);
    localStorage.setItem("editorTheme", theme);

    let handler = this.get("onThemeChange");
    if (handler) {
      handler(theme)
    }
  },

  setFontSize(size) {
    this.set("fontSize", size);
    localStorage.setItem("editorFontSize", size);

    let handler = this.get("onFontSizeChange");

    if (handler) {
      handler(size)
    }
  },

  setGraphDirection(direction) {
    this.set("graphDirection", direction);
    localStorage.setItem("graphDirection", direction);

    let handler = this.get("onGraphDirectionChange");

    if (handler) {
      handler(direction)
    }
  },

  getTheme() {
    return this.get("theme") || this.get("defaultTheme");
  },

  getFontSize() {
    return this.get("fontSize") || this.get("defaultFontSize");
  },

  getGraphDirection() {
    return this.get("graphDirection") || this.get("defaultGraphDirection");
  }
});
