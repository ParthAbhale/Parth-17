
var monkey , monkey_running,ground,invisibleGround,monkey_Collided;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;

var score=0;

var PLAY=1;
var END=0;

var gameState=PLAY;


var score1=0;



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_Collided = loadAnimation("sprite_6.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(800,600);

  monkey = createSprite(100,500,10,10);
  monkey.addAnimation("running",monkey_running)
  monkey.addAnimation("collided",monkey_Collided)
  monkey.scale=0.1
  
  ground = createSprite(400,570,900,10)
  ground.velocityX=-7;
  
  invisibleGround = createSprite(400,580,900,10)
  invisibleGround.visible=false;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  
  background("lightblue")

  if (gameState===PLAY){
    
    spawnBanana();
    spawnObstacle();
    
    if(keyDown("space")&& monkey.y >= 528) {
        monkey.velocityY = -19;
      }
  
       monkey.velocityY = monkey.velocityY + 0.8;
  
     if (ground.x<400){
    ground.x=ground.width/2;
    }
    
  if (monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      score1=score1+1;
  }
     score=Math.ceil(frameCount/frameRate())
   
  
    if (obstacleGroup.isTouching(monkey)){
       gameState = END;
    }
  }else if(gameState===END){
      //console.log("parth")
       ground.velocityX=0;
      FoodGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
      
      monkey.velocityY=0; 
      monkey.changeAnimation("collided",monkey_Collided);
      
    
      
    
  }
 
  
  monkey.collide(invisibleGround);
  
  
  
  //console.log(monkey.y);
  
  
  
  
  
  
  textSize(30);
  text("Survival: "+Math.round(score),550,50) 
  
  text("Banana Took: "+score1,50,50);
  
 
  
  drawSprites();
}

function spawnBanana(){
 
  
  if (World.frameCount%60===0){
    banana = createSprite(790,300,10,10);
    banana.addImage(bananaImage);
    banana.scale=0.1
    banana.velocityX=-7;
    banana.x = Math.round(random(200,790));
    FoodGroup.add(banana);
  }
  
  
}

function spawnObstacle(){
  if (World.frameCount%60===0){
    obstacle = createSprite(790,528,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.25;
    obstacle.velocityX=-7;
    obstacleGroup.add(obstacle);
}
}

