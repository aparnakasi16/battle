class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();

      
    // bgg = createSprite(700,350,150,550)
    //bgg.addImage(bggimg)
    //bgg.scale = 2.5

    soldire1 = createSprite(550,700,10,10)
    soldire1.addImage(solimg)
    soldire1.scale = 0.7
    soldire2 = createSprite(750,720,10,10)
    soldire2.addImage(solimg2)
    soldire2.scale = 0.6
   
   
   

    torget = createSprite(20,450,20,20)
    torget.addImage(torgetimg)
    torget.scale = 0.2


    soldires = [soldire2,soldire1]

    }
  }

  play(){
    
    form.hide();
    
    
    var index = 0;
    image(bggimg,0,0,1500,900)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var index = 0
      var x=0
      var y;
     

      var display_position = 130;
      for(var plr in allPlayers){

      
        index = index+1
        x = x+200
        x = displayHeight - allPlayers[plr].distance
        
        
        soldires[index-1].x = x;
        
        if(index === player.index ){
         textSize(40)
          fill("red")
          //text(allPlayers[plr].name,100,50)
        }
        
         }
         textSize(40)
        fill("orange")
        text(allPlayers.player1.name +":"+allPlayers.player1.score, 50, 50);
        fill("green")
        text(allPlayers.player2.name +":"+allPlayers.player2.score, 50, 110)
       
        
       
    }
    
    torget.x = player.target;
    if(keyWentUp("space") && player.index !== null){
 
      console.log("bullet")
    bullet = createSprite(500,500,10,10)
    shooot.play();
    bullet.addImage(bulletimg)
    bullet.velocityY= random(-2,2) ;
    bullet.scale = 0.1
    bullet.x = player.target;
    bullet.lifetime= 10;
    bullets= bullets - 1
    bulletG.add(bullet);
    bulletG.depth = opponentG.depth;
    bulletG.depth+=2;
    }
    if(bulletG.collide(opponentG)){
      player.score +=100
    
    }
   
    soldires.depth = opponentG.depth 
  soldires.depth = opponentG.depth+10
   
    if(frameCount% 150 === 0){
      opponent = createSprite(random(100, 1000), 500, 100, 100);
      opponent.velocityX = random(-10,10);
      opponent.addImage(opponentimg);
      opponent.scale = 0.2
      opponent.depth -=2
     
      opponentG.add(opponent);
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distance +=10
      player.target -=10
      player.update();
  }
  if(keyIsDown(RIGHT_ARROW) && player.index !== null){
    player.distance -=10
    player.target +=10
    player.update();
}
if(bullets === 0){
  fill("orange")
  text("Press up arrow to reload",500,60)
}
if(keyDown("up")){
  bullets = 50
}



if(bulletG. collide(opponentG))
{
  bulletG.destroyEach();
  opponent.destroy();
}


   drawSprites();
  }
  

 

  
}
