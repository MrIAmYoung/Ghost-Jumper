//variable for ghost
var ghost, ghostImageJ,ghostImageS;

//variable for climber
var climber, climberImage, climberGroup;

//variable for door
var door, doorImage, doorGroup;

//variable for tower
var tower, towerImage;

//variable for gamestates
var gamestate="serve";

//variable for score
var score=0;

//invisible collider under climber
var invisibleCollider,invisibleColliderGroup;

function preload(){
  ghostImageJ=loadImage("ghost-jumping.png");
  ghostImageS=loadImage("ghost-standing.png");
  climberImage=loadImage("climber.png");
  doorImage=loadImage("door.png");
  towerImage=loadImage("tower.png");
  
  
}

function setup(){
  createCanvas(600,600);
  
  //tower
  tower=createSprite(300,10,5,5);
  tower.addImage("tower",towerImage);
  tower.velocityY=4;
  
  
  //ghost
  ghost=createSprite(300,300,1,1);
  ghost.addImage("jumping",ghostImageJ);
  ghost.scale=0.3;

  doorGroup=new Group();
  climberGroup=new Group();
  invisibleColliderGroup=new Group();
}

function draw(){
  background("white");
  
  //gamestate serve to play
  if (keyDown("space")&&gamestate==="serve"){
    gamestate="play";
  }

  
if (gamestate==="play"){


  //reset the tower
  if (tower.y>600)
  {
    tower.y=300;
  }
  
  //jump command
  if (keyWentDown("space")){
    ghost.velocityY=-7;
  }
  
  //gravity
  ghost.velocityY=ghost.velocityY+0.8;
  
  //move to right
  if (keyDown("right"))
      {
      ghost.x=ghost.x+4;
      }
  
  //move to left
  if (keyDown("left"))
      {
      ghost.x=ghost.x-4;
      }
  ghost.collide(climberGroup);
  

  //kill if touching invisible
  if (ghost.isTouching(invisibleColliderGroup)||ghost.y>600){
    gamestate="end";
  }
    }

    if (gamestate==="end"){
      doorGroup.destroyEach();
      climberGroup.destroyEach();
      invisibleColliderGroup.destroyEach();
      tower.destroy();
      ghost.destroy();
      fill("red");
      textSize(20);
      text("Game Over",300,300);
    }
spamObjects();
drawSprites();
}

function spamObjects(){
if (frameCount % 90===0){
  door=createSprite(1,-10,1,1);
  door.addImage("door",doorImage);
  door.velocityY=4;
  door.x=Math.round(random(100,500));
  door.depth=ghost.depth;
  ghost.depth=ghost.depth+1;
  doorGroup.add(door);
  climber=createSprite(1,-10,1,1);
  climber.addImage("climber",climberImage);
  climber.velocityY=4;
  climber.x=door.x;
  climber.y=door.y+60;
  climber.depth=ghost.depth;
  ghost.depth=ghost.depth+1;
  climberGroup.add(climber);
  invisibleCollider=createSprite();
  invisibleCollider.velocityY=4;
  invisibleCollider.x=climber.x;
  invisibleCollider.y=climber.y+7;
  invisibleCollider.width=climber.width;
  invisibleCollider.height=10;
  invisibleCollider.visible=false;
  invisibleCollider.debug=true;
  invisibleColliderGroup.setLifetimeEach(150);
  climberGroup.setLifetimeEach(150);
  doorGroup.setLifetimeEach(150);
}
}



