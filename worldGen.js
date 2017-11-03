var speed = 200;

function worldGenerator () {
    
    for (i = 0; i < obstacleArray.length; i++) {
        
        if (obstacleArray[i].exists === false) {
            randomx = Math.random() * game.world.width + game.world.width;
            randomy = Math.random() * game.world.height;
            spawnObstacle(randomx, randomy, i);
        }        
    }
    
    for (i = 0; i < enemyArray.length; i++) {
        
        if (enemyArray[i].exists === false) {
            randomx = Math.random() * game.world.width + game.world.width;
            randomy = Math.random() * game.world.height;
            spawnEnemy(randomx, randomy, i);
        }        
    }
}