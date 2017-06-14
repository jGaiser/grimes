function CytoscapeObject(elementID){

  // Grab the actual 'style' object from JSON
  var cy;

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

  function updateEdgeColor(type, color, update){
    cy.style().selector('edge[type="'+ type +'"]').style({'line-color': color});
    if(update) cy.style().update();
  }

  function init(){
    cy = cytoscape({
            container: document.getElementById(elementID), 
            style: cx_style[0].style
          });

    cy.json( cx_data );
    cy.json( cx_style );

    cy.style().update();
  }

  init();

  // Interface for CytoscapeObject.
  return {
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

  viewport.style.height = windowHeight + 'px';
}  

window.onload = function(){ 
  formatViewport();
  window.cy = new CytoscapeObject("cyViewport");
  window.cyGUI = new CytoscapeGUI();
}
