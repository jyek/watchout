var width = 960;
var height = 500;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var numEnemies = 4;
var enemies = [];

for(var i = 0; i < numEnemies; i++){
  enemies.push({
    t:false
  });
}

var player = [{
  x: width / 2,
  y: height / 2
}];

var init = function(data){
  var good = svg.selectAll(".hero")
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
    .attr('class', 'hero')
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
  var bad = svg.selectAll(".enemy")
    .data(data);

  bad.enter().append('circle')
    .attr('r', function (){
      return Math.random() * 20 +10;
    })
    .attr('cx', function(){
      return Math.random() * width;
    })
    .attr('cy', function(){
      return Math.random() * height;
    })
    .attr('class', 'enemy');

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

var distance = function(x1,y1,x2,y2){
  return Math.sqrt(Math.pow(x1 - x2,2) + Math.pow(y1 - y2, 2));
};

var checkCollision = function(){
  var hero = d3.select(".hero");
  var enemyPosition = d3.selectAll(".enemy");
  var x1 = hero.attr("cx");
  var y1 = hero.attr("cy");
  var r1 = parseInt(hero.attr("r"));
  enemyPosition.each(function(d){
    var x2 = d3.select(this).attr("cx");
    var y2 = d3.select(this).attr("cy");
    var r2 = parseInt(d3.select(this).attr("r"));
    if(r1 + r2 > distance(x1,y1,x2,y2)){
      // in contact

      if(d.t === false){
        //collisions +=1
        d.t = true;
      console.log("COLLISION!!");
      }

    }else{
      //not in contact
      d.t = false;
    }
  });
};

init(player);
move(enemies);


setInterval (function(){
  checkCollision();
},10);

setInterval(function(){
  move(enemies);
},1500);