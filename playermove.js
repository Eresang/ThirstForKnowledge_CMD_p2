var playerMoveSpeed = 20,
    movementAngle = 0;

function initPlayer(bodyWidth, bodyHeight) { // 32, 4
    'use strict';
    // create player and physics body, set hitbox and anchor for collision
    player = new Phaser.Sprite(game, 20, 160, 'charactersheet', 0);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.setSize(bodyWidth, bodyHeight, 0, 0);
    player.anchor.setTo(0.5, 1.0);
    
    // add it to maingroup
    maingroup.add(player);
}

function setPlayerSpeed() {
    'use strict';
    player.body.velocityFromAngle(movementAngle);
}