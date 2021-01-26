var t,timg;
var g,gimg;
var b,bgroup;
var s;
var d,dimg,dgroup;
var c,cimg,cgroup;      
var gamestate="play";
 
function preload(){
  
  timg=loadImage("tower.png");
  dimg=loadImage("door.png");
  cimg=loadImage("climber.png");
  gimg=loadImage("ghost-standing.png");
  s=loadSound("spooky.wav");
}

function setup(){
  
  createCanvas(600,600);
  
  s.loop();    
  
  t = createSprite(300,300);
  t.addImage(timg)
  t.velocityY = 1;
  g=createSprite(200,200,50,50);
  g.addImage(gimg);
  g.scale=0.3;
  
  dgroup = new Group();
  cgroup = new Group();
  bgroup = new Group();
}

function draw(){
  
  background("black");
  
  if(gamestate==="play"){
    
  if(t.y>400){
    t.y=300;
  }
  
  if(keyDown("left")){
    g.x=g.x-3;
  }
  
  if(keyDown("right")){
    g.x=g.x+3;
  }
  
  if(keyDown("space")){
    g.velocityY=-5; 
  }
  
  g.velocityY=g.velocityY+0.8;  
  
  if(cgroup.isTouching(g)){
    g.velocityY=0;
  }
  
  if(bgroup.isTouching(g)||g.y>600){
    g.destroy();
    gamestate="end";
  }
  
  spawnDoor();
  
  drawSprites();
  }
  if(gamestate==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GAME OVER",230,250);
  }
}

function spawnDoor(){
  if(frameCount%240 === 0){
    d = createSprite(200,-50);
    d.addImage(dimg);
    d.x = Math.round(random(120,400))
    c = createSprite(d.x,10);
    c.addImage(cimg);
    b=createSprite(d.x,15,c.width,2)
    d.velocityY = 1;
    c.velocityY = 1;
    b.velocityY = 1;
    b.debug=true
    c.lifetime = 800;
    d.lifetime = 800;
    g.depth=d.depth;
    g.depth=g.depth+1;
    dgroup.add(d);
    cgroup.add(c);
    bgroup.add(b);
  }
}



