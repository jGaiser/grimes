function cyMain(){

  function randomColor(){
    var backgroundColors = ['red', 'blue', 'green', 'purple', 'yellow', 'pink', 'black', 'orange'];
    return backgroundColors[Math.floor(Math.random()*backgroundColors.length)]
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

  function get_nodes(){

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

  function get_edges(){

    // Iterates through cx_data and adds all edges to cy's 'edges' group 

    cx_data.forEach(function(elem){
      if(Object.keys(elem)[0] == 'edges'){
        elem.edges.forEach(function(edge){
          cy.add({
            group: "edges",
            data: {
              id: edge["@id"],
              source: edge.s,
              target: edge.t 
            }  
          })   
        })   
      }
    })
  }

  get_nodes();
  get_edges();

  cy.layout({ 
    name: 'concentric'
  }).run();
};

window.onload = function(){ 
  cyMain(); 
}
