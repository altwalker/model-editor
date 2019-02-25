var defaultModels = {
    "name": "Default model",
    "models": [
        {
            "name": "ModelName",
            "generator": "random(edge_coverage(100) && vertex_coverage(100))",
            "startElementId": "v0",
            "vertices": [
                {
                    "id": "v0",
                    "name": "vertex_A"
                },
                {
                    "id": "v1",
                    "name": "vertex_B"
                }
            ],
            "edges": [
                {
                    "id": "e0",
                    "name": "edge_A",
                    "sourceVertexId": "v0",
                    "targetVertexId": "v1"
                }
            ]
        }
    ]
}

var fakeNodesCount = 0;

const commonLegendDommain = ["Start Vertex", "Blocked Vertex", "Fake Vertex"]
const commonLegendRange = ["#27ae60", "#7f8c8d", "#3498db"]

var legendDomain = [];
var legendRange = [];


function createVertexLabel(vertex, startElementsIds) {
    const nodeLabelClass = "node-label";
    const startNodeLabelClass = "node-start";
    const fakeNodeLabelClass = "node-fake";

    let label = {
        id: vertex.id,
        label: vertex.name,
        class: nodeLabelClass
    }

    if (vertex.sharedState) {
        label.sharedState = vertex.sharedState;
    }

    if (vertex.properties && vertex.properties.blocked) {
        label.class += " " + "node-blocked";
        label.blocked = true;
    }

    if (vertex.description) {
        label.description = vertex.description;
    }

    if (vertex.properties) {
        label.properties = vertex.properties;
    }

    if (startElementsIds.includes(vertex.id)) {
        label.class += " " + startNodeLabelClass;
    }

    if (vertex.name === "fake_vertex") {
        label.class += " " + fakeNodeLabelClass;
    }

    return label;
}


function createEdgeLable(edge) {
    const edgeLabelClass = "edge-label";

    let label = {
        id: edge.id,
        targetVertexId: edge.targetVertexId,
        label: edge.name,
        class: edgeLabelClass
    }

    if (edge.sourceVertexId) {
        label.sourceVertexId = edge.sourceVertexId;
    }

    if (edge.guard) {
        label.guard = edge.guard;
    }

    if (edge.actions) {
        label.actions = edge.actions;
    }

    return label;
}


function createFakeVertex() {
    fakeNodesCount += 1;

    let fakeVertex = {
        id: "fake_vertex" + fakeNodesCount,
        name: "fake_vertex",
        description: "Fake vertex created for starting edge."
    }

    return fakeVertex;
}


function setStartingEdge(graph, edge, startElementsIds) {
    let fakeVertex = createFakeVertex()

    console.log("Edge", edge);
    console.log("Vertex", fakeVertex);

    graph.setNode(fakeVertex.id, createVertexLabel(fakeVertex, startElementsIds));
    graph.setEdge(fakeVertex.id, edge.targetVertexId, createEdgeLable(edge), edge.id);
}


function createGraph(models) {
    fakeNodesCount = 0;

    // Create a new directed graph
    var graph = new dagreD3.graphlib.Graph({ multigraph: true }).setGraph({});

    var vertices = models.reduce((acc, cur) => acc.concat(cur.vertices), []);
    var edges =  models.reduce((acc, cur) => acc.concat(cur.edges), []);

    var startElementsIds = models.map((x) => x.startElementId)
    var sharedStates = vertices.reduce((acc, cur) => {
        if (cur.sharedState) {
            if (acc.hasOwnProperty(cur.sharedState)) {
                acc[cur.sharedState].push(cur.id)
            } else {
                acc[cur.sharedState] = [cur.id]
            }
        }

        return acc;
    }, {});

    var sharedStatesNames = Object.keys(sharedStates)

    console.log("Vertices", vertices);
    console.log("Edeges", edges);
    console.log("SharedStates", sharedStates)

    // Automatically label each of the nodes
    vertices.forEach(function(vertex) {
        graph.setNode(vertex.id, createVertexLabel(vertex, startElementsIds));
    });

    edges.forEach(function(edge) {
        console.log("Edge-Source", edge.sourceVertexId);

        if (edge.sourceVertexId) {
            graph.setEdge(edge.sourceVertexId, edge.targetVertexId, createEdgeLable(edge), edge.id)
        } else {
            console.log("HERE");
            setStartingEdge(graph, edge, startElementsIds);
        }
    });

    // Set some general styles
    const color = d3.scaleOrdinal()
        .domain(sharedStatesNames)
        .range(d3.quantize(t => d3.interpolateWarm(t * 0.4 + 0.3), Math.max(sharedStatesNames.length, 2)))

    legendDomain = sharedStatesNames;
    legendRange = sharedStatesNames.map((name) => color(name));

    graph.nodes().forEach(function(v) {
        var node = graph.node(v);
        node.rx = node.ry = 5;

        sharedStatesNames.forEach((key) => {
            if (sharedStates[key].includes(v)) {
                node.style = "fill: " + color(key)
            }
        })
    });

    return graph;
}


function generateNodeTooltipHTML(graph, d) {
    let node = graph.node(d);
    let html = "";

    if (node.blocked) {
        html += "<span class='font-weight-bolder'>BLOCKED</span>" + "<br/>";
    }

    html += "Id: " + "<span class='font-weight-bolder'>" + node.id + "</span>" + "<br/>";

    if (node.description) {
        html += "Description: " +  "<span class='font-weight-bolder'>" + node.description + "</span>" + "<br/>";
    }

    if (node.sharedState) {
        html += "Shared State: " +  "<span class='font-weight-bolder'>" + node.sharedState + "</span>" + "<br/>";
    }

    if (node.properties) {
        html += "<br/>Properties: <br/>";
        Object.keys(node.properties).forEach((key) => {
            html += key + ": <span class='font-weight-bolder'>" + node.properties[key] + "</span>" + "<br/>";
        })
    }

    return html;
}


function generateEdgeTootipHtml(graph, d) {
    let edge = graph.edge(d.v, d.w, d.name);
    console.log("Edge", edge);
    let html = "";

    html += "Id: <span class='font-weight-bolder'>" + edge.id + "</span><br/>";

    if (edge.sourceVertexId) {
        html += "Source Vertex Id: <span class='font-weight-bolder'>" + edge.sourceVertexId + "</span><br/>";
    }

    html += "Target Vertex Id: <span class='font-weight-bolder'>" + edge.targetVertexId + "</span><br/>";

    if (edge.guard) {
        html += "<br/>Guard: <span class='code'>" + edge.guard + "</span><br/>";;
    }

    if (edge.actions) {
        html += "<br/>Actions: <br/>";
        edge.actions.forEach((action) => {
            html += "<span class='code'>" + action + "</span><br/>";;
        })
    }

    return html;
}


function addTootips(svg, tooltip, cssSelector, htlmFunction, graph) {
    const tooltipOffset = {
        "x": 12,
        "y": 12,
    }

    svg.selectAll(cssSelector)
        .on("mouseover", (d) => {
            tooltip.transition()
                .style("opacity", 1);

            tooltip.html(htlmFunction(graph, d))
                .style("left", (d3.event.pageX + tooltipOffset.x) + "px")
                .style("top", (d3.event.pageY + tooltipOffset.y) + "px")
                .style("cursor", "pointer")
            })
        .on("mouseout", (d) => {
            tooltip.transition()
                .style("opacity", 0)
                .style("cursor", "auto");
        })
}


function renderTooltips(svg, graph) {
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    addTootips(svg, tooltip, ".node", generateNodeTooltipHTML, graph);
    addTootips(svg, tooltip, ".edgePath, .edgeLabel", generateEdgeTootipHtml, graph);
}


function renderLegend() {
    var svg = d3.select("#legend")
        .attr("height", (commonLegendDommain.length + legendDomain.length) * 30);

    svg.append("g")
        .attr("class", "legendQuant")
        .attr("transform", "translate(20,20)");

    var ordinal = d3.scaleOrdinal()
        .domain(commonLegendDommain.concat(legendDomain))
        .range(commonLegendRange.concat(legendRange));

    var legend = d3.legendColor()
        .title("Graph Legend")
        .scale(ordinal);

    svg.select(".legendQuant")
        .call(legend);
}


function renderGraph(graph) {
    const width = document.getElementById("graph-container").offsetWidth;
    const height = document.getElementById("graph-container").offsetHeight;

    var svg = d3.select("#svg")
                .attr("width", width)
                .attr("height", height);

    var inner = svg.select("g");

    // Set up zoom support
    var zoom = d3.zoom().on("zoom", function() {
      inner.attr("transform", d3.event.transform);
    });

    svg.call(zoom);

    // Create the renderer
    var render = new dagreD3.render();

    // Run the renderer. This is what draws the final graph.
    render(inner, graph);

    // Center the graph
    var initialScale = 1;
    svg.call(zoom.transform, d3.zoomIdentity.translate((svg.attr("width") - graph.graph().width * initialScale) / 2, 20).scale(initialScale));

    renderTooltips(svg, graph);
    renderLegend();
}


function displayModels(models) {
    var graph = createGraph(models["models"])
    renderGraph(graph);
}


function resizeSvg() {
    var svg = d3.select("svg")
        .attr("width", document.getElementById("graph-container").offsetWidth)
}
