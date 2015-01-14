function collisionHandler () {
    
    //checks collision between enemies and obstacles
    game.physics.arcade.collide(enemies, obstacles);
    
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
    game.physics.arcade.overlap(projectiles, enemies, enemyHit);
    game.physics.arcade.overlap(projectiles, player, damagePlayer);
    
    //game.physics.arcade.collide(player, enemies);
}

function enemyHit (projectile, enemy) {
    
    if (enemy.living) {
        projectile.kill();
        if (projectile.source === player) {
            
            enemy.hp = enemy.hp - projectile.damage;
            
            if (enemy.hp <= 0) {
                enemyAnimations(enemy, 'death');
                enemy.living = false;
                enemy.body.velocity.y = 0;
            }
        } 
    }
}

function damagePlayer (projectile, player) {
    
    if (projectile.source != player) {
        projectile.kill();
        player.damage(1);
    }    
}