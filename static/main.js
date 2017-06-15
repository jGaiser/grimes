var cy, edgeCollection, nodeCollection, nodeSizeMapping;

function CytoscapeObject(elementID){

  function getNodeSize(node){
    nodeValue = node[node_mapping.mappingColumn];

    if(nodeValue <= node_mapping.points[0].value){
      return node_mapping.points[0].value.lesser;
    }

    if(nodeValue >= node_mapping.points[node_mapping.points.length - 1].value){
      return node_mapping.points[0].value.greater;
    }

    for(var i in node_mapping.points){
      if( nodeValue == node_mapping.points[i].value ){
        return node_mapping.points[i].equal;
      }

      if(nodeValue < node_mapping.points[i].value){
        return ((nodeValue - node_mapping.points[i-1].value) / (node_mapping.points[i].value - node_mapping.points[i-1].value)) *
               (parseFloat(node_mapping.points[i].equal) - parseFloat(node_mapping.points[i-1].equal)) + parseFloat(node_mapping.points[i-1].equal);
      }
    } 
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

  // If change should be affected immediately, pass boolean true as argument for 'update' parameter
  // Otherwise, pass boolean false
  function updateEdge(selector, style, update){
    cy.style().selector(selector).style({'line-color': color});
    if(update) cy.style().update();
  }

  function updateAllNodeSizes(){
    var node, widthHeight;

    for (var i in nodeCollection) {
      node = nodeCollection[i].data
      widthHeight = getNodeSize(node);
      console.log(widthHeight);

      cy.style()
        .selector('node[id="' + node.id + '"]')
        .style({'width': widthHeight,
                'height': widthHeight });
    }

    cy.style().update();
  }

  function updateAllEdgeWidths(){
    for (var i in edgeCollection) {

      calculatedWidth = ( edgeCollection[i].data.Weight < 0 ) ? 1 : Math.ceil(edgeCollection[i].data.Weight * 5);

      cy.style()
        .selector('edge[id="' + edgeCollection[i].data.id + '"]')
        .style({'width': calculatedWidth });
    }

     cy.style().update()
  }

  function init(){
    edgeCollection = cx_data.elements.edges;
    nodeCollection = cx_data.elements.nodes;

    cy = cytoscape({
            container: document.getElementById(elementID), 
            style: cx_style[0].style
          });

    updateAllEdgeWidths();
    updateAllNodeSizes();
    cy.json( cx_data );

    cy.style().update();
    cy.center();
  }

  init();

  // Interface for CytoscapeObject.
  return {
    updateEdge: updateEdge
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

  viewport.style.height = windowHeight + 'px';
}  

function displayErrors(){ 
  if(error_message.length){
    var message = $("#partialTemplates .errorMessage").clone()
    $('body').html('').prepend(message); 
    return true; 
  }

  return false;
}

window.onload = function(){ 
 
  if( displayErrors() ) return;

  formatViewport();
  window.cyt = new CytoscapeObject("cyViewport");
  // window.cyGUI = new CytoscapeGUI();
}
