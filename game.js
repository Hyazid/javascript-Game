const canvas= document.createElement("canvas");
const ctx= canvas.getContext("2d");
canvas.width= 512;
canvas.height=480;
document.body.appendChild(canvas)

//load background image
let bgReady= false
var bgImage= new Image();
bgImage.src = 'img/bg.png'
bgImage.onload=function(){
    ctx.drawImage(bgImage,0,0);
    ctx.fillRect(0,0,0,0)
    bgReady=true;
    console.log("here i am")
}
//load player image same as the background
var playerReady=false;
var playerImage= new Image()
playerImage.src= "img/player.png"
playerImage.onload = function(){
    playerReady=true
    ctx.drawImage(playerImage,0,0)
    ctx.fillRect(0,0,0,0)
} 
//load enemy image
var enemyImage=   new Image()
var enemyReady= false
enemyImage.src="img/enemy.png"
enemyImage.onload= function(){
    ctx.drawImage(enemyImage,100,10)
    enemyReady=true;
    ctx.fillRect(0,0,0,0)

}

var player={
    speed: 256
}
var enemy={};
var enemiesCaught= 0;
//
//handle keyboard arrows
var keysDown=[]
    addEventListener("keydown", function (event) {
    keysDown[event.key] = true;
  }, false);
  
  addEventListener("keyup", function (event) {
    delete keysDown[event.key];
  }, false);
  var reset = function () {
    // Reset player's position to centre of canvas
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
  
    // Place the enemy somewhere on the canvas randomly
    enemy.x = enemyImage.width + (Math.random() * (canvas.width - (enemyImage.width*2)));
    enemy.y = enemyImage.height + (Math.random() * (canvas.height - (enemyImage.height*2)));
  };
  var update = function (modifier) {
    if ("ArrowUp" in keysDown || "w" in keysDown) { // Player is holding up key
      player.y -= player.speed * modifier;
    }
    if ("ArrowDown" in keysDown || "s" in keysDown) { // Player is holding down key
      player.y += player.speed * modifier;
    }
    if ("ArrowLeft" in keysDown || "a" in keysDown) { // Player is holding left key
      player.x -= player.speed * modifier;
    }
    if ("ArrowRight" in keysDown || "d" in keysDown) { // Player is holding right key
      player.x += player.speed * modifier;
    }
  
    // Check if player and enemy collide
    if (
      player.x <= (enemy.x + enemyImage.width)
      && enemy.x <= (player.x + playerImage.width)
      && player.y <= (enemy.y + enemyImage.height)
      && enemy.y <= (player.y + playerImage.height)
    ) {
      ++enemiesCaught;
      reset();
    }}
    var render = function () {
        if (bgReady) {
          ctx.drawImage(bgImage, 0, 0);
        }
      
        if (playerReady) {
          ctx.drawImage(playerImage, player.x, player.y);
        }
      
        if (enemyReady) {
          ctx.drawImage(enemyImage, enemy.x, enemy.y);
        }
      
        // Display score and time 
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Enemies caught: " + enemiesCaught, 20, 20);
        ctx.fillText("Time: " + count, 20, 50);
        // Display game over message when timer finished
        if(finished==true){
          ctx.fillText("Game over!", 200, 220);
        }
      
        
      };
      var count = 30; // how many seconds the game lasts for - default 30
var finished = false;
var counter =function(){
  count=count-1; // countown by 1 every second
  // when count reaches 0 clear the timer, hide enemy and player and finish the game
  	if (count <= 0)
  	{
  		// stop the timer
     	clearInterval(counter);
     	// set game to finished
     	finished = true;
     	count=0;
     	// hider enemy and player
     	enemyReady=false;
     	playerReady=false;
  	}

}
setInterval(counter, 1000);
var main = function () {
    // run the update function
    update(0.02); // do not change
    // run the render function
    render();
    // Request to do this again ASAP
    requestAnimationFrame(main);
  };
  var w = window;
  requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
  
  // Let's play this game!
  reset();
  main(); 