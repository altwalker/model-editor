import Component from '@ember/component';
import { action } from '@ember/object';
import { bind, once } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';
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

export default class JsonEditorComponent extends Component {
  @service modelStorage;
  @service settings;

  @tracked value = "";

  constructor() {
    super(...arguments);

    this.value = this.modelStorage.loadModel();
  }

  @action
  createEditor() {
    this.editor = CodeMirror.fromTextArea(document.getElementById("json-editor"), {
      theme: this.settings.getTheme(),
      viewportMargin: Infinity,
      lineNumbers: true,
      indentUnit: 4,
      indentSize: 4,
      indentWithTabs: false,
      tabSize: 4,
      lineWiseCopyCut: true,
      scrollPastEnd: true,
      mode: "application/json",
      gutters: ["CodeMirror-lint-markers"],
      styleActiveLine: true,
      lint: true,
    });

    this.setupCodeMirrorEventHandler('change', this, this.scheduleValueUpdatedAction);

    this.setFontSize(this.settings.getFontSize());
    this.setTheme(this.settings.getTheme());

    const setValue = bind(this, this.setValue);
    const setFontSize = bind(this, this.setFontSize);
    const setTheme = bind(this, this.setTheme);

    this.modelStorage.setOnModelChange("json", setValue);
    this.settings.setOnFontSizeChange(setFontSize);
    this.settings.setOnThemeChange(setTheme);

    let createCodeMirrorSnippets = bind(this, this.createCodeMirrorSnippets);
    let replaceTabsWithSpaces = bind(this, this.replaceTabsWithSpaces);

    this.editor.setOption("extraKeys", {
      "Ctrl-Space": "autocomplete",
      "Ctrl-E": createCodeMirrorSnippets,
      "Tab": replaceTabsWithSpaces
    });
  }

  @action
  updateEditor() {
    this.updateCodeMirrorValue();
  }

  @action
  destroyEditor() {
    // remove the editor and restore the original textarea.
    this.editor.toTextArea();
    this.editor = null;

    this.modelStorage.removeOnModelChange("json");
    this.settings.setOnFontSizeChange(null);
    this.settings.setOnThemeChange(null);
  }

  @action
  setValue(value) {
    this.value = value;
  }

  updateModels(models) {
    this.modelStorage.saveModel("json", models);
  }

  setOption(key, value) {
    this.editor.setOption(key, value);
  }

  setTheme(value) {
    this.setOption("theme", value);
  }

  setFontSize(value) {
    const editor = this.get("editor");

    editor.getWrapperElement().style["font-size"] = value;
    editor.refresh();
  }

  setupCodeMirrorEventHandler(event, target, method) {
    const callback = bind(target, method);

    this.editor.on(event, callback);

    this.one('destroyEditor', this, function() {
      this.editor.off(event, callback);
    });
  }

  scheduleValueUpdatedAction(codeMirror) {
    once(this, this.updateModels, codeMirror.getValue());
  }

  updateCodeMirrorValue() {
    const value = this.value;

    if (value !== this.editor.getValue()) {
      this.editor.setValue(value || '');
    }
  }

  createCodeMirrorSnippets() {
    const editor = this.editor;

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
  }

  replaceTabsWithSpaces(codeMirror) {
    let spaces = Array(codeMirror.getOption("indentUnit") + 1).join(" ");
    codeMirror.replaceSelection(spaces);
  }
}
