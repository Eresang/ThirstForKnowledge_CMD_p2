var amountOfObstacles = 15;
var obstacleArray = [];

function addObstaclesToArray () {
    for (i = 0; i < amountOfObstacles; i++) {
        obstacle = maingroup.create(0, 0, "table");
        game.physics.arcade.enable(obstacle);
        obstacle.exists = false;
        obstacle.body.immovable = true;
        obstacleArray.push(obstacle);
    }
}

function spawnObstacle (x, y, i) {
            
    obstacle = obstacleArray[i];
    obstacle.reset(x, y);
    obstacle.body.velocity.x = -speed;
}

function killObstacles () {
    for (i = 0; i < obstacleArray.length; i++) {
        if (obstacleArray[i].x < 0 - obstacleArray[i].width) {
            obstacleArray[i].kill();
        }
    }
    
    for (i = 0; i < enemyArray.length; i++) {
        if (enemyArray[i].x < 0 - enemyArray[i].width) {
            enemyArray[i].kill();
        }
    }
}