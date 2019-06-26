
function showErrors(errorMessage) {
    var element = document.getElementById("error-box");
    element.classList.remove("d-none");
    element.textContent = errorMessage;
}


function hideErrors() {
    var element = document.getElementById("error-box");
    element.classList.add("d-none");
}


function maximize() {
    var element = document.getElementById("visualizer");
    element.classList.toggle("col-md-7");
}


function toogleDisplay() {
    var element = document.getElementById("editor");
    element.classList.toggle("d-none");
}


function toogleText() {
    var element = document.getElementById("maximize-button")
    var text = element.textContent

    if (text == "Minimize") {
        element.textContent = "Maximize";
    } else {
        element.textContent = "Minimize";
    }
}

function getErrorLine(error, json)
{
    var re =/at position (\d+)/
    var match = error.toString().match(re)
    if ( !match )
        return error
    error_index =parseInt (match[1])
    line_index = 0
    i=0
    for(line of json.split("\n") )
    {
        if ( i + line.length + 1 > error_index)
            break;
        i+= line.length + 1
        line_index++
    }
    return [error, "line " + line_index]
}

window.onload = () => {
    displayModels(defaultModels);

    var element = document.getElementById("maximize-button")
    element.onclick = function(event) {
        toogleDisplay();
        maximize();
        toogleText();

        resizeSvg();
    }
}
