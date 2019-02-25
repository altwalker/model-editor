
var codeMirror = CodeMirror(document.getElementById("edditor-container"), {
    value: JSON.stringify(defaultModels, null, "\t"),
    lineNumbers: true,
    mode: { name: "javascript", json: true }
  });


codeMirror.on("change", function() {
    try {
        var models = JSON.parse(codeMirror.getValue());

        console.log("Display models on change.")
        validateModels(models);
        displayModels(models);

        hideErrors()
    } catch (error) {
        console.log(error);
        showErrors(error);
}
});


// Save file onclick handler
button = document.getElementById("btn-save");
button.onclick = function() {
    try {
        var text = codeMirror.getValue();
        var filename = document.getElementById("input-filename").value;

        if (filename === "") {
        filename = "models";
        }

        console.log(filename);

        var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
        saveAs(blob, filename + ".json");
    } catch(error) {
        console.log(error);
}
}
