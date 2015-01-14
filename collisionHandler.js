function collisionHandler() {
    
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

function enemyFade(p, q) {
    'use strict';
    p.kill();
}

function enemyHit (projectile, enemy) {
    
    if (projectile.source !== enemy) {
        if (projectile.collideHandler) {
            projectile.collideHandler(enemy, projectile);
        }
        projectile.kill();
        if (projectile.source === player) {
            enemy.hp = enemy.hp - projectile.damage;
            
            if (enemy.hp <= 0) {
                enemyAnimations(enemy, 'death');
                enemy.living = false;
                enemy.body.velocity.y = 0;
                enemy.body.enable = false;
                t = game.add.tween(enemy);
                t.onComplete = new Phaser.Signal();
                t.onComplete.add(enemyFade);
                t.to({ alpha: 0 }, 800, Phaser.Easing.Linear.None, false, 250).start();
                createRandomPickup(enemy.x, enemy.y);
            }
        }
    }
    
}

function damagePlayer (projectile, player) {
    
    if (projectile.source !== player) {
        if (projectile.collideHandler) {
            projectile.collideHandler(player, projectile);
        }
        projectile.kill();   
        playerDamage(projectile.damage);
    }
    
}