var trex, trex_running, edges;
var groundImage;
var ground;
var invisibleGround;
var obstacle, obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var claudsGroup;
var obstaclesGroup;
var PLAY=1;
var END=2;
var score=0;
var gameState=PLAY;
var trexCollided;
var gameOver,gameOverimg;
var restart,restartimg;
var checkpointSound;
var dieSound;
var jumpSound;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage =loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle3.png");
  obstacle5 = loadImage("obstacle1.png");
  obstacle6 = loadImage("obstacle6.png");
  trexCollided=loadImage("trex_collided.png");
  gameOverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
  checkpointSound=loadSound("checkpoint.mp3");
  dieSound=loadSound("die.mp3");
  jumpSound=loadSound("jump.mp3");
}

function setup(){
  createCanvas(1000,200);
  
  //crear sprite de Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collied",trexCollided);
  edges = createEdgeSprites();
  
  ground=createSprite(200,180,400,20);
  ground.addImage(groundImage);
  //agregar tamaño y posición al Trex
  trex.scale = 0.5;
  trex.x = 50

  invisibleGround=createSprite(200,185,400,10);
  invisibleGround.visible=false;
  obstaclesGroup=new Group();
  claudsGroup=new Group();
  trex.setCollider("circle",0,0,40);
  trex.debug=false;
  gameOver = createSprite(500,100);
  gameOver.addImage(gameOverimg);
  gameOver.visible=false;
  restart = createSprite(500,150);
  restart.addImage(restartimg);
  restart.visible=false;
}


function draw(){
  //establecer color de fondo.
  background(500);
  text(score,500,20);
  if(gameState===PLAY){
  score=score+Math.round(getFrameRate()/60);  
  ground.velocityX=-2-score/100;
  if(ground.x<0){
    ground.x=ground.width/2;
      }
      if(keyDown("space")&&trex.y>150){
        trex.velocityY = -10;
        jumpSound.play();
      }  
      trex.velocityY = trex.velocityY + 0.5;
      spawnCloud();
      spawnObstacle();
      if(obstaclesGroup.isTouching(trex)){
      gameState=END;   
      dieSound.play();
      }
      if(score>0&&score%100===0){
      checkpointSound.play();
      }
  }else if(gameState===END){
  trex.velocityY=0;
  ground.velocityX=0; 
  obstaclesGroup.setVelocityEach(0);
  claudsGroup.setVelocityEach(0);
  obstaclesGroup.setLifetimeEach(-1);
  claudsGroup.setLifetimeEach(-1);
  trex.changeAnimation("collied",trexCollided);
  gameOver.visible=true;
  restart.visible=true;
  if(mousePressedOver(restart)){
  reset();
  }
  }
  
  
  //cargar la posición Y del Trex
 // console.log(ground.x)
  
  
 
  //hacer que el Trex salte al presionar la barra espaciadora
 
  
 
  //evitar que el Trex caiga
  trex.collide(invisibleGround);
  drawSprites();
}
  function reset(){
    gameState = PLAY;
    obstaclesGroup.destroyEach(0);
    claudsGroup.destroyEach(0);
    restart.visible=false;
    gameOver.visible=false;
    score=0;
  }
  function spawnObstacle(){
  if(frameCount%80===0){
  obstacle=createSprite(1000,160,10,40)
  obstacle.velocityX = -3-score/100;
  obstacle.scale=0.1;
  rand = Math.round(random(1,6));
  switch(rand){
  case 1:obstacle.addImage(obstacle1);
  break;
  case 2:obstacle.addImage(obstacle2);
  break;
  case 3:obstacle.addImage(obstacle3);
  break;
  case 4:obstacle.addImage(obstacle4);
  break;
  case 5:obstacle.addImage(obstacle5);
  break;
  case 6:obstacle.addImage(obstacle6);
  break;
  default:break;
  }
  obstaclesGroup.add(obstacle);
  obstacle.depth=trex.depth;
  trex.depth=trex.depth+1;
  obstacle.lifetime=450;
  }  
  }
  function spawnCloud(){
  if(frameCount%60===0){
  
  
  claud=createSprite(1000,100,40,20);  
  claud.addImage(cloudImage);
  claud.velocityX = -3-score/100;
  claud.scale = 0.5;
  claud.y = Math.round(random(20,120));
  trex.depth = claud.depth+1
  claud.lifetime=500;
  }
  }




