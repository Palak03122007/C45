var bg,bgImg;
var ufo,ufo_sprite;
var comet1,comet2,cometsGroup;
var holeImg,holeImg2,holeImg3,holesGroup;
var ufo,ufoImg,ufoGroup;
var health=20;
var bar;

function preload(){
    bgImg = loadImage("bgimg.jpg");
    ufo = loadImage("spaceship.png");
    comet1 = loadImage("comet1.png");
    comet2 = loadImage("comet2.png");
    holeImg = loadImage("hole.png");
    holeImg2 = loadImage("hole2.png");
    holeImg3 = loadImage("hole3.png");
    ufoImg = loadImage("ufoimg.png");
}

function setup(){

    createCanvas(960,540);

    bg = createSprite(480,20,960,540);
    bg.addImage(bgImg);
    bg.velocityY = 5;

    ufo_sprite = createSprite(400,450);
    ufo_sprite.addImage(ufo);
    ufo_sprite.scale = 0.4;

    bar = createSprite(480,3000,960,10);
    bar.shapeColor = "black";

    cometsGroup = createGroup();
    holesGroup = createGroup();
    ufoGroup = createGroup();
}

function draw(){

    if(bg.y>540){
        bg.y = 0;
    }

    fill("red");
    textSize(20);
    text("Health: "+health,700,100);

    spawnComets();

    if(cometsGroup.isTouching(bar)){
        cometsGroup.setVelocityYEach(0);
        cometsGroup.setVisibleEach(false);
        spawnHoles();
    }
    if(holesGroup.isTouching(bar)){
        holesGroup.setVelocityYEach(0);
        holesGroup.setVisibleEach(false);
        spawnUFO();
    }

    if(keyDown(UP_ARROW)){
        ufo_sprite.y = ufo_sprite.y - 7;
    }
    if(keyDown(DOWN_ARROW)){
        ufo_sprite.y = ufo_sprite.y + 7;
    }
    if(keyDown(LEFT_ARROW)){
        ufo_sprite.x = ufo_sprite.x - 7;
    }
    if(keyDown(RIGHT_ARROW)){
        ufo_sprite.x = ufo_sprite.x + 7;
    }

    drawSprites();
}

function spawnComets(){
    if(frameCount%20===0){
        var com1 = createSprite(random(60,900),-50);
        com1.velocityY = 10;
        
         //generate random obstacles
         var rand = Math.round(random(1,2));
         switch(rand) {
           case 1: com1.addImage(comet1);
                   break;
           case 2: com1.addImage(comet2);
                   break;
           default: break;
         }
        
         //assign scale and lifetime to the obstacle           
         com1.scale = 0.09;
    
          //add each obstacle to the group
         cometsGroup.add(com1);

}
}

function spawnHoles(){
    if(frameCount%20===0){
        var hole = createSprite(random(60,900),-50);
        hole.velocityY = 15;
        
        var ran = Math.round(random(1,3));
         switch(ran) {
           case 1: hole.addImage(holeImg);
           hole.scale = 0.1;
                   break;
           case 2: hole.addImage(holeImg2);
           hole.scale = 0.25;
                   break;
           case 3: hole.addImage(holeImg3);
           hole.scale = 0.25;
                   break;
           default: break;
         }
          //add each obstacle to the group
         holesGroup.add(hole);
}
}

function spawnUFO(){
    if(frameCount%20===0){
        var ufo = createSprite(random(60,900),-50);
        ufo.velocityY = Math.round(random(5,15));      
        ufo.addImage(ufoImg);
        ufo.scale = 0.06;
    
          //add each obstacle to the group
         ufoGroup.add(ufo);
}
}