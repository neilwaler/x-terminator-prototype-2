
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage, flyImage, slashingImage
var FoodGroup, obstacleGroup
var score
var fixedRect, movingRect;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  flyImage = loadImage("download.png")
}



function setup() {
  // createCanvas(600, 600);
  createCanvas(1000,663);


  var survivalTime=0;
  
  //creating monkey
   monkey=createSprite(80,530,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.debug = true
 

  // monkey.addImage(bananaImage)
   monkey.scale=0.1
  
  ground = createSprite(400,560,1000,10);
  ground.velocityX=0;
  ground.x=ground.width/2;
  console.log(ground.x)
ground.debug = true

realGround = createSprite(400,563,1000,10);
realGround.visible = false


  ground1 = createSprite(300,450,300,10);
  ground1.debug = true

  realGround1 = createSprite(300,453,300,10);
  realGround1.visible= false

enemyWall1 = createSprite(210,315,1,50)
enemyWall1.visible = true
enemyWall2 =createSprite(350,315,1,50)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  attack = createSprite(80,315,95,63)
  attack.visible = false
 
  






 



  enemy = createSprite(280,315,30,30)
  enemy.addImage(flyImage)
  enemy.scale=0.2
  enemy.velocityX=2

}


function draw() {
  
  background(255);

  console.log(monkey.y)
  
enemyWall1.shapeColor=("blue");
  attack.shapeColor=("red");
  ground.shapeColor=("green");
  
bounceOff(enemyWall1,enemy)
bounceOff(enemyWall2,enemy)

  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(keyDown("left_arrow")){
    monkey.velocityX=-4.5
  }
  if(keyWentUp("left_arrow")){
    monkey.velocityX=0
  }
  if(keyDown("right_arrow")){
    monkey.velocityX=4.5
  }   
  if(keyWentUp("right_arrow")){
    monkey.velocityX=0
    
  }

  if(keyDown("shift")){
   
    attack.visible = true
  }

//if(enemy.isTouching(enemyWall1)){
// enemy.velocityX=2;
//}

//if(enemy.isTouching(enemyWall2) ) {
 //enemy.velocityX= -2;
//}



  if(keyWentUp("shift")){
 
    attack.visible = false
  }

  if(enemy.isTouching(attack) && keyDown("shift")){
    enemy.lifetime = 0;
  }

    if(keyDown("space") && (monkey.y>=527.3 || monkey.y==417.3)){
      monkey.velocityY = -18;
    }

 

    monkey.velocityY = monkey.velocityY +1.2;
    
  enemy.collide(enemyWall1);
  enemy.collide(enemyWall2);
    monkey.collide(realGround);
    monkey.collide(realGround1);

attack.x = monkey.x
attack.y = monkey.y


    
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);        
  
  
    if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(0);
        FoodGroup.setLifetimeEach(-1);
    
    
    }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
}



function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime =0;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function bounceOff(object1,object2){
  if (object1.x - object2.x < object2.width/2 + object1.width/2
    && object2.x - object1.x < object2.width/2 + object1.width/2) {
    object1.velocityX = object1.velocityX * (-1);
    object2.velocityX = object2.velocityX * (-1);
  }
  if (object1.y - object2.y < object2.height/2 + object1.height/2
    && object2.y - object2.y < object2.height/2 + object1.height/2) {
      object1.velocityY = object1.velocityY * (-1);
      object2.velocityY = object2.velocityY * (-1);
  } 
}