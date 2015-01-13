var playerMoveSpeed = 80,
    pi_allowAnimation;

var kc_leftKey;

function initPlayer() {
    'use strict';
    // create player and physics body, set hitbox and anchor for collision
    player = new Phaser.Sprite(game, gameWidth / 4, (gameHeight + 64) / 2, 'char_idle');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 8, 0, 2); // edit values for new sprites?
    player.anchor.setTo(0.5, 1.0);
    
    // insert creating animations here
    player.animations.add('animation');
    
    player.events.onAnimationComplete.add(allowPlayerAnimation, this);
    
    // add it to maingroup
    maingroup.add(player);
    
    game.camera.follow(player);
    game.camera.deadzone = new Phaser.Rectangle(100, 0, 100, gameHeight);
    
    pi_allowAnimation = true;
    
    kc_leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
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
            player.loadTexture('char_shoot');
            player.animations.play('animation', 25, false);
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
        player.loadTexture('char_moving');
        break;
    case 135:
        player.loadTexture('char_moving');
        break;
    case 90:
        player.loadTexture('char_moving');
        break;
    case 45:
        player.loadTexture('char_moving');
        break;
    case 0:
        player.loadTexture('char_moving');
        break;
    }
    // change animation if there is no motion
    if (movement) {
        player.loadTexture('char_idle');
    }
    player.animations.play('animation', 25, true);
}

function allowPlayerAnimation() {
    'use strict';
    pi_allowAnimation = true;
    setPlayerAnimations(pi_oldM === 0, pi_oldPlayerAngle);
}