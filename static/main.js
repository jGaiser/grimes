function CytoscapeObject(){

  var edgeTypes = {};

  var cx_style = [ {
    "selector" : "node",
    "css" : {
      "shape" : "ellipse",
      "background-opacity" : 1.0,
      "color" : "rgb(0,0,0)",
      "border-width" : 1.8,
      "background-color" : "rgb(240,255,255)",
      "height" : 100.0,
      "text-opacity" : 1.0,
      "width" : 100.0,
      "border-opacity" : 1.0,
      "font-family" : "SansSerif",
      "font-weight" : "normal",
      "border-color" : "rgb(136,136,136)",
      "font-size" : 22,
      "text-valign" : "center",
      "text-halign" : "center",
      "content" : "data(name)"
    }
  }, {
    "selector" : "node[Median > 100]",
    "css" : {
      "background-color" : "rgb(255,204,0)"
    }
  }, {
    "selector" : "node[Median = 100]",
    "css" : {
      "background-color" : "rgb(255,215,0)"
    }
  }, {
    "selector" : "node[Median > 10][Median < 100]",
    "css" : {
      "background-color" : "mapData(Median,10,100,rgb(255,230,0),rgb(255,215,0))"
    }
  }, {
    "selector" : "node[Median > 5][Median < 10]",
    "css" : {
      "background-color" : "mapData(Median,5,10,rgb(255,255,0),rgb(255,230,0))"
    }
  }, {
    "selector" : "node[Median > 2.25][Median < 5]",
    "css" : {
      "background-color" : "mapData(Median,2.25,5,rgb(255,255,126),rgb(255,255,0))"
    }
  }, {
    "selector" : "node[Median > 0][Median < 2.25]",
    "css" : {
      "background-color" : "mapData(Median,0,2.25,rgb(0,238,0),rgb(255,255,126))"
    }
  }, {
    "selector" : "node[Median > -2.25][Median < 0]",
    "css" : {
      "background-color" : "mapData(Median,-2.25,0,rgb(0,255,255),rgb(0,238,0))"
    }
  }, {
    "selector" : "node[Median > -5][Median < -2.25]",
    "css" : {
      "background-color" : "mapData(Median,-5,-2.25,rgb(0,204,255),rgb(0,255,255))"
    }
  }, {
    "selector" : "node[Median > -10][Median < -5]",
    "css" : {
      "background-color" : "mapData(Median,-10,-5,rgb(0,191,255),rgb(0,204,255))"
    }
  }, {
    "selector" : "node[Median > -100][Median < -10]",
    "css" : {
      "background-color" : "mapData(Median,-100,-10,rgb(0,127,255),rgb(0,191,255))"
    }
  }, {
    "selector" : "node[Median = -100]",
    "css" : {
      "background-color" : "rgb(0,127,255)"
    }
  }, {
    "selector" : "node[Median < -100]",
    "css" : {
      "background-color" : "rgb(0,153,255)"
    }
  }, {
    "selector" : "node[nodeType = 'transcription factor']",
    "css" : {
      "shape" : "parallelogram"
    }
  }, {
    "selector" : "node[nodeType = 'kinase']",
    "css" : {
      "shape" : "octagon"
    }
  }, {
    "selector" : "node[nodeType = 'SH2 protein']",
    "css" : {
      "shape" : "v"
    }
  }, {
    "selector" : "node[nodeType = 'tyrosine kinase']",
    "css" : {
      "shape" : "hexagon"
    }
  }, {
    "selector" : "node[nodeType = 'RNA binding protein']",
    "css" : {
      "shape" : "rectangle"
    }
  }, {
    "selector" : "node[nodeType = 'SRC-family kinase']",
    "css" : {
      "shape" : "diamond"
    }
  }, {
    "selector" : "node[nodeType = 'receptor tyrosine kinase']",
    "css" : {
      "shape" : "roundrectangle"
    }
  }, {
    "selector" : "node[nodeType = 'phosphatase']",
    "css" : {
      "shape" : "octagon"
    }
  }, {
    "selector" : "node[nodeType = 'SH3 protein']",
    "css" : {
      "shape" : "triangle"
    }
  }, {
    "selector" : "node[nodeType = 'SH2-SH3 protein']",
    "css" : {
      "shape" : "v"
    }
  }, {
    "selector" : "node[nodeType = 'unknown']",
    "css" : {
      "shape" : "ellipse"
    }
  }, {
    "selector" : "node[nodeType = 'G protein-coupled receptor']",
    "css" : {
      "border-width" : 16.0
    }
  }, {
    "selector" : "node[nodeType = 'kinase']",
    "css" : {
      "border-width" : 12.0
    }
  }, {
    "selector" : "node[nodeType = 'methyltransferase']",
    "css" : {
      "border-width" : 12.0
    }
  }, {
    "selector" : "node[nodeType = 'tyrosine kinase']",
    "css" : {
      "border-width" : 12.0
    }
  }, {
    "selector" : "node[nodeType = 'membrane protein']",
    "css" : {
      "border-width" : 8.0
    }
  }, {
    "selector" : "node[nodeType = 'SRC-family kinase']",
    "css" : {
      "border-width" : 12.0
    }
  }, {
    "selector" : "node[nodeType = 'receptor tyrosine kinase']",
    "css" : {
      "border-width" : 16.0
    }
  }, {
    "selector" : "node[nodeType = 'phosphatase']",
    "css" : {
      "border-width" : 14.0
    }
  }, {
    "selector" : "node[nodeType = 'deacetylase']",
    "css" : {
      "border-width" : 4.0
    }
  }, {
    "selector" : "node[nodeType = 'demethylase']",
    "css" : {
      "border-width" : 4.0
    }
  }, {
    "selector" : "node[nodeType = 'acetyltransferase']",
    "css" : {
      "border-width" : 12.0
    }
  }, {
    "selector" : "node:selected",
    "css" : {
      "background-color" : "rgb(204,0,255)"
    }
  }, {
    "selector" : "edge",
    "css" : {
      "font-size" : 10,
      "target-arrow-shape" : "none",
      "target-arrow-color" : "rgb(0,0,0)",
      "opacity" : 1.0,
      "line-color" : "rgb(205,155,155)",
      "content" : "",
      "line-style" : "solid",
      "text-opacity" : 1.0,
      "color" : "rgb(0,0,0)",
      "width" : 3.0,
      "font-family" : "Dialog",
      "font-weight" : "normal",
      "source-arrow-color" : "rgb(0,0,0)",
      "source-arrow-shape" : "none"
    }
  }, {
    "selector" : "edge:selected",
    "css" : {
      "line-color" : "rgb(255,0,0)"
    }
  } ];

  function getEdges(){
    return edgeTypes;
  }

  function randomColor(){

    var letters = ['7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'],
        returnString = '#';

    function randomValue(){
      return letters[Math.floor(Math.random()*letters.length)]
    }

    for (var i = 0; i < 6; i++) { 
      returnString += randomValue();
    }

    return returnString;
  } 

  // Initialize cytoscape.js object 
  var cy = cytoscape({
    container: document.getElementById('cyViewport'), 
    style: cx_style
  });

  // function fetch_nodes(){

  //   // Iterates through cx_data and adds all nodes to cy's 'node' group 

  //   cx_data.forEach(function(elem){
  //     if(Object.keys(elem)[0] == 'nodes'){
  //       elem.nodes.forEach(function(node){
  //         cy.add({
  //           group: "nodes",
  //           data: {id: node["@id"], label: node.n},
  //           style: { backgroundColor: randomColor() }
  //         })
  //       })      
  //     }  
  //   })
  // }

  // function fetch_edges(){

  //   // Iterates through cx_data and adds all edges to cy's 'edges' group 

  //   cx_data.forEach(function(elem){
  //     if(Object.keys(elem)[0] == 'edges'){
  //       elem.edges.forEach(function(edge){

  //         if(!edgeTypes[edge.i]){
  //           edgeTypes[edge.i] = "";
  //         }

  //         cy.add({
  //           group: "edges",
  //           data: {
  //             id: edge["@id"],
  //             source: edge.s,
  //             target: edge.t,
  //             type: edge.i 
  //           }  
  //         })   
  //       })   
  //     }
  //   })
  // }

  function styleGraph(){
    var someColor;

    for(var type in edgeTypes){
      someColor = randomColor();
      edgeTypes[type] = someColor;
      updateEdgeColor(type, someColor, false);
    }

    cy.style().update();
  }

  function updateEdgeColor(type, color, update){
    cy.style().selector('edge[type="'+ type +'"]').style({'line-color': color});
    if(update) cy.style().update();
  }

  function init(){
    // fetch_nodes();
    // fetch_edges();

    cy.json( cx_data );
    cy.json( cx_style );

    cy.style().update();

    cy.layout({ 
      name: 'cose'
    }).run();

    // styleGraph();
  }

  init();

  return {
    getEdges: getEdges,
    updateEdgeColor: updateEdgeColor
  }
};


function CytoscapeGUI(){
  var $colorController = $("#partialTemplates .colorController").first(),
      $colorPanel      = $("#edgeColorControlPanel"),
      edgeCollection   = cy.getEdges();

  function generateEdgeColorController(edgeType, color){
    var $controller = $colorController.clone();
        $controllerInput = $controller.find('.jscolor');
        
    $controller.find('.edgeType').html(edgeType);
    $controllerInput.css('backgroundColor', color);
    $controllerInput.val(color);
    $controllerInput.data('type', edgeType);

    return $controller;
  }

  function populateEdgeColorControl(){
    for (var edge in edgeCollection) {
      $colorPanel.append( generateEdgeColorController(edge, edgeCollection[edge]) );
    }

    jscolor.installByClassName('jscolor');
    $('.jscolor').change(updateEdgeColor);
  }

  function updateEdgeColor(){
    var $this = $(this);
    cy.updateEdgeColor($this.data('type'), '#' + $this.val(), true);
  }
  
  function init(){
    populateEdgeColorControl();
  } 

  init();
}

function formatViewport(){
  // Sets cytoscape viewport element to appropriate height

  var viewport = document.getElementById('cyViewport'),
      windowHeight = window.innerHeight; 

  viewport.style.height = windowHeight - 200 + 'px';
}  

window.onload = function(){ 
  formatViewport();
  window.cy = new CytoscapeObject();
  window.cyGUI = new CytoscapeGUI();
}
