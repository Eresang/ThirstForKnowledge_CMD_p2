var playerMoveSpeed = 80,
    pi_allowAnimation;

var difficultyModifier = 2,
    difficultyModifierInverse = 1;

var damageTaken = 0,
    sc_text,
    sc_textstyle = { font: "bold 28pt Verdana", fill: "#dd2222", stroke: "#000000", strokeThickness: 8, align: "center" },
    sc_textstyleB = { font: "bold 28pt Verdana", fill: "#22dd22", stroke: "#000000", strokeThickness: 8, align: "center" },
    scoreTexts = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];

var kc_leftKey,
    kc_spacekey;

function getScore() {
    'use strict';
    return scoreTexts[lowest(Math.floor(damageTaken / 30), scoreTexts.length - 1)];
}

function initPlayer() {
    'use strict';
    // create player and physics body, set hitbox and anchor for collision
    player = new Phaser.Sprite(game, gameWidth / 4, (gameHeight + 64) / 2, 'char_idle');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 12, 0, 2);
    player.body.enable = true;
    player.scale.x = -1;
    player.anchor.setTo(0.5, 1.0);
    
    player.hp = 100;
    player.wisdom = 100;
    player.score = 0;
    
    // insert creating animations here
    player.animations.add('animation');
    
    player.events.onAnimationComplete.add(allowPlayerAnimation, this);
    
    // add it to maingroup
    maingroup.add(player);
    
    game.camera.follow(player);
    game.camera.deadzone = new Phaser.Rectangle(100, 0, 100, gameHeight);
    
    pi_allowAnimation = true;
    
    kc_leftKey = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
    kc_spacekey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    kc_leftKey.onDown.add(playerSpeedUp);
    kc_leftKey.onUp.add(playerSpeedDown);
    kc_spacekey.onUp.add(playerSpace);
}

function playerSpace() {
    'use strict';
    if (player.hp <= 0 || gn_stageComplete) {
        restartLevel();
        sc_text.destroy(true);
    }
}

function difficultyUp() {
    'use strict';
    difficultyModifier *= 0.9;
    difficultyModifierInverse = 3 - difficultyModifier;
}

function playerSpeedUp() {
    'use strict';
    playerMoveSpeed = 120;
}

function playerSpeedDown() {
    'use strict';
    playerMoveSpeed = 80;
}

function playerDamage(damage) {
    'use strict';
    if (player.hp > 0) {
        player.hp -= damage;
        damageTaken += damage;
        if (player.hp <= 0) {
            playerDeath();
            player.living = false;
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
            player.body.enable = false;
        }
        pl_text.setText('HP: ' + player.hp);
    }
}

function playerRevive() {
    'use strict';
    playerHeal(100);
    player.reset(gameWidth / 4, (gameHeight + 64) / 2);
    player.living = true;
    player.body.enable = true;
    player.loadTexture('char_idle');
    player.animations.play('animation', 25, true);
}

function playerHeal(amount) {
    'use strict';
    player.hp = lowest(100, player.hp + amount);
    pl_text.setText('Health: ' + player.hp);
}

function playerWisen(amount) {
    'use strict';
    player.wisdom += amount;
    pw_text.setText('Knowledge: ' + player.wisdom);
    if (upgradePossible()) {
        upgradebutton.frame = 0;
    } else {
        upgradebutton.frame = 1;
    }
}

function playerDeath() {
    'use strict';
    player.hp = 0;
    player.loadTexture('char_died');
    player.animations.play('animation', 25, false);
    pi_allowAnimation = false;
    
    sc_text = game.add.text(0, 0, 'You have been defeated\nYour grade: ' + getScore() + '\n\nPress space to continue...', sc_textstyle);
    sc_text.x = -(sc_text.width / 2) + (gameWidth / 2);
    sc_text.y = -(sc_text.height / 2) + (gameHeight / 2);
    sc_text.fixedToCamera = true;
}

// --------------------------------------------------------------------------------------
// player input function(s)
function checkPlayerInput() {
    'use strict';
    var movementAngle = 90,
        m = 0;
    
    if (player.hp <=0) {
        
        return;
    }
    
    
    // player cannot move to the left
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
    
    if (!pi_allowAnimation) {
        m = 0;
    }
    
    // set speed according to angle
    player.body.velocity.x = playerMoveSpeed * Math.sin(Math.PI * movementAngle / 180) * m * stopScroll;
    player.body.velocity.y = playerMoveSpeed * Math.cos(Math.PI * movementAngle / 180) * m;
    // if the direction changed, change the accompanying animation
    if (pi_allowAnimation) {
        animatePlayer(m, movementAngle);
    
        // shooting
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            if (playerShoot()) {
                player.loadTexture(projectileTypes[selectedProjectile].atkAnimation);
                player.animations.play('animation', 25, false);
                pi_allowAnimation = false;
            }
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
    if ((angle !== pi_oldPlayerAngle || movement !== pi_oldM) && pi_allowAnimation) {
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
    if (player.hp > 0) {
        pi_allowAnimation = true;
        setPlayerAnimations(pi_oldM === 0, pi_oldPlayerAngle);
    }
}