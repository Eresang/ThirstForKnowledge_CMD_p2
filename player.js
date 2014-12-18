var playerMoveSpeed = 200,
    pi_allowAnimation;

var kc_leftKey;

function initPlayer() {
    'use strict';
    // create player and physics body, set hitbox and anchor for collision
    player = new Phaser.Sprite(game, 20, (gameHeight + 64) / 2, 'charactersheet', 0);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.setSize(32, 4, 0, 0); // edit values for new sprites?
    player.anchor.setTo(0.5, 1.0);
    
    // insert creating animations here
    player.animations.add('character_idle', [0, 1]);
    player.animations.add('character_move_up', [2, 3]);
    player.animations.add('character_move_up_right', [4, 5]);
    player.animations.add('character_move_right', [6, 7]);
    player.animations.add('character_move_down_right', [8, 9]);
    player.animations.add('character_move_down', [10, 11]);
    player.animations.add('character_shoot', [12, 13]);
    
    player.events.onAnimationComplete.add(allowPlayerAnimation, this);
    
    // add it to maingroup
    maingroup.add(player);
    
    pi_allowAnimation = true;
    
    kc_leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    kc_leftKey.onDown.add(swapProjectile, this);
}

// --------------------------------------------------------------------------------------
// player input function(s)
function checkPlayerInput() {
    'use strict';
    var movementAngle = 90,
        m = 0;
    
    // player cannot move to the left
    // creating the right angle in this way may be redundant, as a lot of keyboards register only a limited number of keys pressed simultaneously 
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        m = 1;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        if (m === 0) {
            movementAngle += 90;
        } else {
            movementAngle += 45;
        }
        m = 1;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        if (m === 0) {
            movementAngle -= 90;
        } else {
            movementAngle -= 45;
        }
        m = 1;
    }
    // set speed according to angle
    player.body.velocity.x = playerMoveSpeed * Math.sin(Math.PI * movementAngle / 180) * m;
    player.body.velocity.y = playerMoveSpeed * Math.cos(Math.PI * movementAngle / 180) * m;
    // if the direction changed, change the accompanying animation
    animatePlayer(m, movementAngle);
    
    // shooting
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        if (playerShoot()) {
            player.animations.play('character_shoot', 10, false);
            pi_allowAnimation = false;
        }
    }
}

// --------------------------------------------------------------------------------------
// player movement function(s)
var pi_oldPlayerAngle = 90,
    pi_oldM = 1;

function animatePlayer(movement, angle) {
    'use strict';
    // if angle hasn't changed or there is no movement, don't change animation
    if ((angle !== pi_oldPlayerAngle || movement !== pi_oldM) && pi_allowAnimation === true) {
        setPlayerAnimations(movement === 0 && pi_oldM === 1, angle);
    }
    pi_oldPlayerAngle = angle;
    pi_oldM = movement;
}

function setPlayerAnimations(movement, angle) {
    switch (angle) {
    case 180:
        player.animations.play('character_move_up', 10, true);
        break;
    case 135:
        player.animations.play('character_move_up_right', 10, true);
        break;
    case 90:
        player.animations.play('character_move_right', 10, true);
        break;
    case 45:
        player.animations.play('character_move_down_right', 10, true);
        break;
    case 0:
        player.animations.play('character_move_down', 10, true);
        break;
    }
    // change animation if there is no motion
    if (movement) {
        player.animations.play('character_idle', 10, true);
    }
}

function allowPlayerAnimation() {
    'use strict';
    pi_allowAnimation = true;
    setPlayerAnimations(pi_oldM === 0, pi_oldPlayerAngle);
}