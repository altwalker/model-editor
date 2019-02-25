
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
        console.log("Min")
        element.textContent = "Maximize"
    } else {
        console.log("Max")
        element.textContent = "Minimize"
    }
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
