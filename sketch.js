
var gameState = "PLAY";
var monkey , monkey_running, monkey_collided;
var path;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var Stime = 40;
var Srtime 
var Score = 0;

function preload(){
  
  
  monkey_running=   loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided = loadAnimation("sprite_6.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
 
}



function setup() {
  
  createCanvas(400, 400);
  path = createSprite(200,350,400,10)
  path.shapeColor = "black";
  monkey = createSprite(50,310);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.13;
}


function draw() {
  
  background("lightblue");
  
  
  
     
  if(gameState == "PLAY")
    {
      
       spawnBanana();
  
       spawnObstacle();
     
      if(frameCount % 18 == 0)
        {
      Stime = Stime - 1;
        }
      
     textSize(23);
     fill("black");
     textFont("Aharoni");
     text("Survival Time : " + Stime, 120, 75);

          
     if (path.x < 0)
       {
        path.x = 200
       }
      
     if (FoodGroup.isTouching(monkey))
       {
         FoodGroup.destroyEach();
         Stime = Stime + 4
         Score = Score + 1
       }

     
     if (Stime < 30)
       {
         obstacleGroup.setVelocityXEach(-6);
         FoodGroup.setVelocityXEach(-6);
       }
      
      
     if (Stime < 20)
       {
         obstacleGroup.setVelocityXEach(-8);
         FoodGroup.setVelocityXEach(-8);
       }
     
      if (Stime < 10)
       {
         obstacleGroup.setVelocityXEach(-10);
         FoodGroup.setVelocityXEach(-10);
       }
      
     if (Stime < 5)
       {
         obstacleGroup.setVelocityXEach(-12);
         FoodGroup.setVelocityXEach(-12);
       }



     
     if (obstacleGroup.isTouching(monkey) || Stime == 0)
       {
        gameState = "END" 
       }
      
      if (keyDown("space") && monkey.y >= 300  )
       {
        monkey.velocityY = -13.5;
          
       }
  
      
    }
    else if(gameState == "END")
       { 
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
         monkey.collide(obstacleGroup);
                                  monkey.changeAnimation("collided",monkey_collided);
         
         Srtime = 40 - Stime

        textSize(23);
        fill("black");
        textFont("Aharoni");
        text("Score : "+ Score,160,105);
        text("You Survived "+ Srtime +" seconds" ,85,75);
         
        
       }
  
       
       
      
      monkey.velocityY = monkey.velocityY + 0.7
  
    monkey.collide(path); 
   monkey.setCollider("rectangle",0,0,200,600);
  
   monkey.debug = false;
    
 
   drawSprites(); 
  
  
}

function spawnObstacle()
{
if (frameCount % 150 == 0)
    {
      obstacle = createSprite(400,320);
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.15; 
      obstacle.velocityX = -5;
      obstacleGroup.add(obstacle);
      obstacle.setCollider("rectangle",0,0,400, 250)
      obstacle.debug = false;
 
    }
}

function spawnBanana()
{
if (frameCount % 150 == 0)
    {
      banana = createSprite(400,200);
      banana.addImage(bananaImage);
      banana.scale = 0.10; 
      banana.velocityX = -5;
      FoodGroup.add(banana);
    }
}

  
  






