function collisionHandler () {
    
    //check collision between all enemies and obstacles    
    for (i = 0; i < enemyArray.length; i++) {
        for (j = 0; j < obstacleArray.length; j++) {
            game.physics.arcade.collide(enemyArray[i], obstacleArray[j], sayHi);
        }
    }
}

function sayHi () {
    console.log("hoi");
}