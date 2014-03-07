var width = 960;
var height = 500;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var enemies = d3.range(10);


var move = function(data){
  var bad = svg.selectAll("circle")
    .data(data, function(d){return d;});

  bad.enter().append('circle')
    .attr('r', function (){
      return Math.random() * 20 +10;
    })
    .attr('cx', function(){
      return Math.random() * width;
    })
    .attr('cy', function(){
      return Math.random() * height;
    });

  //UPDATE
  bad.transition()
    .duration(1000)
    .attr('r', function (){
      return Math.random() * 20 +10;
    })
    .attr('cx', function(){
      return Math.random() * width;
    })
    .attr('cy', function(){
      return Math.random() * height;
    });



};

setInterval(function(){
  move(enemies);
},1500);