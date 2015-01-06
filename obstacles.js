var amountOfObstacles = 200;
var obstacleArray = [];

function addObstaclesToArray () {
    for (i = 0; i < amountOfObstacles; i++) {
        obstacle = maingroup.create(0, 0);
        game.physics.arcade.enable(obstacle);
        obstacle.body.immovable = true;
        obstacle.anchor.setTo(0.0, 1.0);
        obstacleArray.push(obstacle);
        obstacle.kill();
    }
}

function spawnObstacle (x, y, i) {
            
    obstacle = obstacleArray[i];
    obstacle.reset(x, y);
    obstacle.body.velocity.x = 0;
}

function killObstacles () {
    for (i = 0; i < obstacleArray.length; i++) {
        if (obstacleArray[i].x < game.camera.x - obstacleArray[i].width) {
            obstacleArray[i].kill();
        }
    }
    
    for (i = 0; i < enemyArray.length; i++) {
        if (enemyArray[i].x < 0 - enemyArray[i].width) {
            enemyArray[i].kill();
        }
    }
}