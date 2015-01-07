function collisionHandler () {
    
    //checks collision between enemies and obstacles
    game.physics.arcade.collide(enemyArray, obstacles);
    
    //checks collision between the player and obstacles
    game.physics.arcade.collide(player, obstacles, function c(p, q) {
        if (q.collideHandler) {
            q.collideHandler(p, q);
        }
    });
    
    //checks collision between the player and pickups
    game.physics.arcade.collide(player, pickups, function c(p, q) {
        if (q.collideHandler) {
            q.collideHandler(p, q);
        }
    });
    
    //check collision between bullets and enemies
    //kills the bullet and enemy in the process
    game.physics.arcade.collide(projectiles, enemyArray, killEnemy);
}

function killEnemy (projectile, enemy) {
    projectile.kill();
    enemy.kill();
    console.log(enemyArray.length);
}