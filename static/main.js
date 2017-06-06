function CytoscapeObject(){

  var edgeTypes = {};

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
    style: [
      {
        selector: 'node',
        style: {
          label: 'data(label)'  
        }  
      }
    ]
  });

  function fetch_nodes(){

    // Iterates through cx_data and adds all nodes to cy's 'node' group 

    cx_data.forEach(function(elem){
      if(Object.keys(elem)[0] == 'nodes'){
        elem.nodes.forEach(function(node){
          cy.add({
            group: "nodes",
            data: {id: node["@id"], label: node.n},
            style: { backgroundColor: randomColor() }
          })
        })      
      }  
    })
  }

  function fetch_edges(){

    // Iterates through cx_data and adds all edges to cy's 'edges' group 

    cx_data.forEach(function(elem){
      if(Object.keys(elem)[0] == 'edges'){
        elem.edges.forEach(function(edge){

          if(!edgeTypes[edge.i]){
            edgeTypes[edge.i] = "";
          }

          cy.add({
            group: "edges",
            data: {
              id: edge["@id"],
              source: edge.s,
              target: edge.t,
              type: edge.i 
            }  
          })   
        })   
      }
    })
  }

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
    fetch_nodes();
    fetch_edges();

    cy.layout({ 
      name: 'concentric'
    }).run();

    styleGraph();
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
