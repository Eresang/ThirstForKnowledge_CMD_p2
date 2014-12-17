function checkPlayerMovement() {
    'use strict';
    var movementAngle,
        m = 0;
    
    // player cannot move to the left
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        m = 1;
        
    }

    // set speed according to angle
    player.body.velocity.x = playerMoveSpeed * Math.sin(movementAngle) * m;
    player.body.velocity.y = playerMoveSpeed * Math.cos(movementAngle) * m;
}