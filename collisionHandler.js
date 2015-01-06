function collisionHandler () {
    
    //checks collision between enemies and obstacles
    game.physics.arcade.collide(enemyArray, obstacleArray);
    
    //checks collision between the player and obstacles
    game.physics.arcade.collide(player, obstacleArray);
    
    //check collision between bullets and enemies
    //kills the bullet and enemy in the process
    game.physics.arcade.collide(projectiles, enemyArray, killEnemy);
}

function killEnemy (projectile, enemy) {
    projectile.kill();
    enemy.kill();
    console.log(enemyArray.length);
}