var amountOfObstacles = 30;
var obstacleArray = [];

function addObstaclesToArray () {
    for (i = 0; i < amountOfObstacles; i++) {
        obstacle = game.add.sprite(0, 0, "obstacle");
        game.physics.arcade.enable(obstacle);
        obstacle.visible = true;
        obstacleArray.push(obstacle);
    }
}

function spawnObstacle () {
    
    ix = x;
    iy = y;
    
    for (i = 0; i < amountOfObstacles; i++) {
        
        obstacle = obstacleArray[i];
        if (obstacle !== null) {
            ix += 100;
            iy += 15;
            
            obstacle.reset(ix, iy);
        }        
    }
}