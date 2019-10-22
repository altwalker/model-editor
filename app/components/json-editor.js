import Component from '@ember/component';
import { bind, once } from '@ember/runloop';
import { inject as service } from '@ember/service';

const modelSnippet = `{
  "name": "",
  "generator": "random(vertex_coverage(100) && edge_coverage(100))",
  "vertices": [
  ],
  "edges": [
  ]
}`

const vertexSnippet = `{
  "id": "",
  "name": ""
}`

const edgeSnippet = `{
  "id": "",
  "name": "",
  "sourceVertexId": "",
  "targetVertexId": ""
}`

const snippets = [
  { text: modelSnippet, displayText: 'Model Snippet' },
  { text: vertexSnippet, displayText: 'Vertex Snippet' },
  { text: edgeSnippet, displayText: 'Edge Snippet' }
]

function indentSnippet(snippet, indent) {
  let lines = snippet.text.split("\n")
  lines = lines.map((item) => " ".repeat(indent) + item)

  return {
    "text": "\n" + lines.join("\n"),
    "displayText": snippet.displayText
  }
}

function indentSnippets(snippets, indent) {
  return snippets.map((item) => indentSnippet(item, indent))
}

export default Component.extend({
  modelStorage : service('model-storage'),
  settings : service('settings'),

  error: null,
  onError: null,

  onUpdate: null,

  init() {
    this._super(...arguments);

    this.setValue(this.modelStorage.loadModel());
  },

  didInsertElement() {
    this._super(...arguments);

    this.editor = CodeMirror.fromTextArea(document.getElementById("json-editor"), {
      theme: this.settings.getTheme(),
      viewportMargin: Infinity,
      lineNumbers: true,
      indentUnit: 4,
      indentSize: 4,
      indentWithTabs: false,
      tabSize: 4,
      lineWiseCopyCut: true,
      mode: "application/json",
      gutters: ["CodeMirror-lint-markers"],
      styleActiveLine: true,
      lint: true,
    });

    this.setupCodeMirrorEventHandler('change', this, this.scheduleValueUpdatedAction);

    this.setFontSize(this.settings.getFontSize());
    this.setTheme(this.settings.getTheme());

    let setFontSize = bind(this, this.get("setFontSize"));
    let setTheme = bind(this, this.get("setTheme"));

    this.settings.setOnFontSizeChange(setFontSize);
    this.settings.setOnThemeChange(setTheme);

    this.onUpdate = bind(this.modelStorage, this.modelStorage.saveModel);

    let snippets = bind(this, this.get("snippets"));
    let replaceTabsWithSpaces = bind(this, this.get("replaceTabsWithSpaces"));

    this.editor.setOption("extraKeys", {
      "Ctrl-Space": "autocomplete",
      "Ctrl-E": snippets,
      "Tab": replaceTabsWithSpaces
    });
  },

  willDestroyElement() {
    this._super(...arguments);

    // remove the editor and restore the original textarea.
    this.editor.toTextArea();
    delete this.editor;

    this.settings.setOnFontSizeChange(null);
    this.settings.setOnThemeChange(null);
  },

  snippets() {
    const editor = this.get("editor");

    CodeMirror.showHint(editor, function() {
      const cursor = editor.getCursor();
      const token = editor.getTokenAt(cursor);
      const start = token.start;
      const end = cursor.ch;
      const line = cursor.line;
      const currentWord = token.string;

      const indentStart = start == 0 ? end : start;
      const indent = currentWord == "," ? indentStart - 1 : indentStart;
      const list = indentSnippets(snippets, indent);

      return {
          list: list.length ? list : snippets,
          from: CodeMirror.Pos(line, end),
          to: CodeMirror.Pos(line, end)
        }
      }, { completeSingle: false })
  },

  replaceTabsWithSpaces(codeMirror) {
    let spaces = Array(codeMirror.getOption("indentUnit") + 1).join(" ");
    codeMirror.replaceSelection(spaces);
  },

  setupCodeMirrorEventHandler(event, target, method) {
    const callback = bind(target, method);

    this.editor.on(event, callback);

    this.one('willDestroyElement', this, function() {
      this.editor.off(event, callback);
    });
  },

  scheduleValueUpdatedAction(codeMirror) {
    once(this, this.updateValue, codeMirror.getValue());
  },

  setError(error) {
    this.set("error", error);

    const onErorr = this.get("onError");
    if (onErorr) {
      this.onError(error);
    }
  },

  setValue(value) {
    try {
      this.set("value", value);
      this.setError(null);
      ModelVisualizer.validate(JSON.parse(value));
    } catch (error) {
      this.setError(error);
    }
  },

  updateValue(newValue) {
    this.onUpdate(newValue);
    this.setValue(newValue);
  },

  setOption(key, value) {
    this.editor.setOption(key, value);
  },

  setTheme(value) {
    this.setOption("theme", value);
  },

  setFontSize(value) {
    const editor = this.get("editor");

    editor.getWrapperElement().style["font-size"] = value;
    editor.refresh();
  }
});
