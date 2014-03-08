var width = window.innerWidth;
var height = window.innerHeight;
var collisions = 0;
var currentScore = 0;
var highScore = 0;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var numEnemies = 10;
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

var gotHit = function(){
  if(collisions === 3){
    collisions = 0;
    d3.select('.collisions span').text(collisions);
    if(currentScore > highScore){
      highScore = currentScore;
      d3.select('.highScore span').text(highScore);
    }
    currentScore = 0;
    d3.select('.currentScore span').text(currentScore);
  }else{
    currentScore = Math.round(currentScore * 0.7);
    d3.select('.currentScore span').text(currentScore);
  }
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
        collisions ++;
        d3.select('.collisions span').text(collisions);
        d.t = true;
        gotHit();       
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
  currentScore++;
  d3.select('.currentScore span').text(currentScore);
},10);

setInterval(function(){
  move(enemies);
},1500);