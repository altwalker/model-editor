var codeMirror = CodeMirror(document.getElementById("edditor-container"), {
    value: JSON.stringify(defaultModels, null, "\t"),
    lineNumbers: true,
    mode: { name: "javascript", json: true }
  });


codeMirror.on("change", function() {
    try {
        json = codeMirror.getValue()
        var models = JSON.parse(json);

        validateModels(models);
        displayModels(models);

        hideErrors()
    } catch (error) {
        showErrors(getErrorLine(error, json))
    }
});

// Smippets

const modelSnippet = `{
    "name": "",
    "generator": "random(vertex_coverage(100))",
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
    { text: modelSnippet, displayText: 'model snippet' },
    { text: vertexSnippet, displayText: 'vertex snippet' },
    { text: edgeSnippet, displayText: 'edge snippet' }
]

function indentSnippet(snippet, indent) {
    let lines = snippet.text.split("\n")
    lines = lines.map((item) => " ".repeat(indent) + item)

    return {
        "text": lines.join("\n"),
        "displayText": snippet.displayText
    }
}

function indentSnippets(snippets, indent) {
    let newSnippets = snippets.map((item) => indentSnippet(item, indent))
    return newSnippets
}

function snippet() {
    CodeMirror.showHint(codeMirror, function() {
        const cursor = codeMirror.getCursor()
        const token = codeMirror.getTokenAt(cursor)
        const start = token.start
        const end = cursor.ch
        const line = cursor.line
        const currentWord = token.string

        const list = indentSnippets(snippets, end)

        return {
            list: list.length ? list : snippets,
            from: CodeMirror.Pos(line, start),
            to: CodeMirror.Pos(line, end)
        }
    }, { completeSingle: false })
}

// Add extra keys

codeMirror.setOption('extraKeys', {
    "Ctrl-Space": "autocomplete",
    "Ctrl-E": function() {
        snippet()
    },
})

// Save file onclick handler
button = document.getElementById("btn-save");
button.onclick = function() {
    try {
        var text = codeMirror.getValue();
        var filename = document.getElementById("input-filename").value;

        if (filename === "") {
        filename = "models";
        }


        var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
        saveAs(blob, filename + ".json");
    } catch(error) {}
}
