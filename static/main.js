function CytoscapeObject(){

  var edgeTypes = [];

  function randomColor(){

    function randomValue(){
      return Math.floor(Math.random()*155 + 100);
    }

    var returnString = "rgb("

    for (var i = 0; i < 3; i++) { 
      returnString += randomValue() + ",";
    }

    return returnString.slice(0, -1) + ")";
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

          if(edgeTypes.indexOf(edge.i) == -1){
            edgeTypes.push(edge.i);
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

    edgeTypes.forEach(function(type){
      cy.style().selector('edge[type="'+ type +'"]').style({'line-color': randomColor()});
    })

    cy.style().update();
  }

  function init(){
    fetch_nodes();
    fetch_edges();

    cy.layout({ 
      name: 'cose'
    }).run();

    styleGraph();
  }

  init();
};

function formatViewport(){
  // Sets cytoscape viewport element to appropriate height

  var viewport = document.getElementById('cyViewport'),
      windowHeight = window.innerHeight;

  viewport.style.height = windowHeight - 250 + 'px';
}  

window.onload = function(){ 
  formatViewport();
  var cy = new CytoscapeObject();
}
