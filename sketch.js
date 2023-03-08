var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstaclesGroup, cloudsGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score;
var gameOverimg;
var restartimg;
var jumpsound;
var checkpsound;
var deathsound;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
 cloudImage = loadImage("cloud.png");  
 c1 = loadImage("obstacle1.png");
 c2 = loadImage("obstacle2.png");
 c3 = loadImage("obstacle3.png");
 c4 = loadImage("obstacle4.png");
 c5 = loadImage("obstacle5.png");
 c6 = loadImage("obstacle6.png");
restartimg = loadImage("restart.png");
gameOverimg = loadImage("gameOver.png");
jumpsound = loadSound("jump.mp3");
checkpsound = loadSound("checkPoint.mp3");
deathsound = loadSound("die.mp3");
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collider", trex_collided);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100); 
  gameOver.addImage(gameOverimg); 
  restart = createSprite(300,140); 
  restart.addImage(restartimg); 
  gameOver.scale = 0.5; 
  restart.scale = 0.5;
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
trex.setCollider("rectangle",0,0,80, trex.height);
trex.debug = true;
score = 0;
cloudsGroup = createGroup();
obstaclesGroup = createGroup();
}

function draw() {
  //set background color
  background(200);
  text("Score: " + score, 500,25);

if (gameState === PLAY) {
   gameOver.visible = false;
   restart.visible = false;
 score = score + Math.round(getFrameRate()/60);
 ground.velocityX = -(6+3*score/100); 
 trex.changeAnimation("running",trex_running);

 // jump when the space key is pressed
 if(keyDown("space")&& trex.y >= 150) {
  trex.velocityY = -12;
  jumpsound.play();
}
trex.velocityY = trex.velocityY + 0.8

if(score>0 && score%100 === 0)
{ checkpsound.play(); 
}
 if (ground.x < 0){
    ground.x = ground.width/2;
  }
   //stop trex from falling down
   trex.collide(invisibleGround);
  
  console.log(trex.y)
  spawnClouds();
  spawnCacti();

  if (obstaclesGroup.isTouching(trex)) {
    gameState = END;
    deathsound.play();
  //trex.velocityY = -12;
  //jumpsound.play();
  }
}
else if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true;
  ground.velocityX = 0;
  trex.velocityY = 0;

trex.changeAnimation("Collided",trex_collided);
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  obstaclesGroup.setLifetimeEach(-10987643524);
  cloudsGroup.setLifetimeEach(-10987643524);
  if(mousePressedOver(restart) ){
reset();
  }
} 
  

  //Spawn Clouds

  drawSprites();
}

//function to spawn the clouds
function spawnClouds(){
 // write your code here 
 if (frameCount%60 === 0){
cloud = createSprite(600,100,40,10);
cloud.velocityX = -3;
cloud.lifetime = 200;
cloud.addImage(cloudImage);
cloud.y = Math.round(random(10,60));
cloud.scale = 0.5;
cloud.depth=trex.depth;
trex.depth=trex.depth+1;
cloudsGroup.add(cloud);
}
}
function spawnCacti(){
if (frameCount%60 === 0) {
cactus = createSprite(600,165,10,40);
cactus.velocityX = -4;

var rand = Math.round(random(1,6));
switch(rand){
  case 1: cactus.addImage(c1)
  break;
  case 2: cactus.addImage(c2)
  break;
  case 3: cactus.addImage(c3)
  break;
  case 4: cactus.addImage(c4)
  break;
  case 5: cactus.addImage(c5)
  break;
  case 6: cactus.addImage(c6)
  break;
 default: break
}
cactus.scale = 0.45;
cactus.lifetime = 150;
obstaclesGroup.add(cactus);
}
}


function reset(){
gamestate = PLAY;
gameOver.visible = false;
restart.visible = false;
obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
score = 0;
}