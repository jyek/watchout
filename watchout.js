var width = 960;
var height = 500;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var enemies = d3.range(10);

var player = [{
  x: width / 2,
  y: height / 2
}];

var init = function(data){
  var good = svg.selectAll("circle")
    .data(data, function(d){return d;});

  good.enter().append('circle')
    .attr('r', function (){
      return 15;
    })
    .attr('cx', function(d){
      return d.x;
    })
    .attr('cy', function(d){
      return d.y;
    })
    .style("fill", "red")
    .call(d3.behavior.drag()
      .origin(function(d) { return d; })
      .on("drag", function(d) {
        d.x = d3.event.x;
        d.y = d3.event.y;
        d3.select(this).attr("cx", d.x).attr("cy", d.y);
      }));
};

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

init(player);
move(enemies);

setInterval(function(){
  move(enemies);
},1500);