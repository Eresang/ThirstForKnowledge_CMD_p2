var bulletTime = 0;

var tempTest;

function enemyAI() {

    if (player.hp <= 0) {
        return;
    }

    for (i = 0; i < enemies.length; i+=1) {
         
        var enemy = enemies[i];
        
        if (enemy !== null) {
            
                if ((enemy.x - player.x) < 540) {

                    if (enemy.y > (player.y - 10) && enemy.y < (player.y + 10)) {
                        enemy.body.velocity.y = 0;
                    }
                    else if (enemy.y < player.y) {
                        enemy.body.velocity.y = 70;
                    }
                    else {
                        enemy.body.velocity.y = -70;
                    }
                }

            if ((enemy.x - player.x) < 480) {
                if (((enemy.y > (player.y - 10) && enemy.y < (player.y + 10)) && enemy.alive === true) && enemy.x > player.x) {
                    enemyShoot(i);
                }  
            }       
        }
    }
}

function enemyShoot (i) {
    
    if (enemies[i].living) {
        enemyFireRate = projectileTypes[enemies[i].projectile].firerate * difficultyModifier;
        if (enemies[i].fireCounter > enemyFireRate) {
        
            enemies[i].fireCounter = 0; 
            enemyAnimations(enemies[i], 'attack');
            createProjectile(enemies[i], enemies[i].projectile);
        }
    }   
    
}

function killEnemies() {
    'use strict';
    var i;
    
    for (i = 0; i < enemies.length; i += 1) {
        if (enemies[i].x < game.camera.x - enemies[i].width && enemies[i].alive) {
            enemies[i].kill();
        }
    }
}




// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------

var maxEnemyCount = 30,
    enemies = [];

var enemyTypes = [ 
    {   // canteen lady
        sheet: 'canteenLady',
        bodyWidth: 35,
        bodyHeight: 12,
        bodyXOffset: 0,
        bodyYOffset: 2,
        bodyEnable: true,
        projectile: 7,
        fireCounter: 0,
        health: 50,

    },
    {
        sheet: 'bully',
        bodyWidth: 26,
        bodyHeight: 12,
        bodyXOffset: 0,
        bodyYOffset: 2,
        bodyEnable: true,
        projectile: 1,
        fireCounter: 0,
        health: 50
    },
    {
        sheet: 'principal',
        bodyWidth: 35,
        bodyHeight: 12,
        bodyXOffset: 0,
        bodyYOffset: 2,
        bodyEnable: true,
        projectile: 8,
        fireCounter: 0,
        health: 80        
    }
];

function incrementFireCounters () {
    for (i = 0; i < enemies.length; i++) {
        enemies[i].fireCounter++;
    }
}

function initEnemies() {
    
    var i;
    
    enemies.length = maxEnemyCount;
    for (i = 0; i < maxEnemyCount; i++) {
        enemies[i] = maingroup.create(0, 0);
        game.physics.arcade.enable(enemies[i]);
        enemies[i].anchor.setTo(0.0, 1.0);
        enemies[i].kill();
    }
}

function getEnemy() {
    
    var i,
        p = null;
    
    for (i = 0; i < maxEnemyCount; i += 1) {
        if (obstacles[i].alive === false) {
            p = enemies[i];
            return p;
        }
    }
    return p;
}

// ----------------------------------------------------------------------------------
function createEnemy(o, t) {
    
    if ((o) && (t)) {
        o.angle = 0;
        o.body.angle = 0;
        o.body.setSize(t.bodyWidth, t.bodyHeight, t.bodyXOffset, t.bodyYOffset);
        o.body.enable = t.bodyEnable;
        o.loadTexture(t.sheet);
        o.onDeath = null;
        o.animations.add('idle');
        o.animations.play('idle', 10, true);
        o.collideHandler = t.collision;
        o.projectile = t.projectile;
        o.fireCounter = t.fireCounter;
        o.hp = t.health;
        o.living = true;
    }
}
                       
function createCanteenLady(x, y) {
    var o, t;
    o = getEnemy();
    if (!(o)) {
        return;
    }
    
    t = enemyTypes[0];
    
    createEnemy(o, t);
    o.frame = 0;
    o.reset(x, y, t.health);
}

function createBully(x, y) {
    var o, t;
    o = getEnemy();
    if (!(o)) {
        return;
    }
    
    t = enemyTypes[1];
    createEnemy(o, t);
    o.frame = 0;
    o.reset(x, y, t.health);
}

function createPrincipal(x, y) {
    var o, t;
    o = getEnemy();
    if (!(o)) {
        return;
    }
    
    t = enemyTypes[2];
    createEnemy(o, t);
    o.frame = 0;
    o.reset(x, y, t.health);
}

function specialDeath() {
    'use strict';
    gn_stageComplete = true;
    
    sc_text = game.add.text(0, 0, 'Stage complete!\nYour grade: ' + getScore() + '\n\nPress space to continue...', sc_textstyleB);
    sc_text.x = -(sc_text.width / 2) + (gameWidth / 2);
    sc_text.y = -(sc_text.height / 2) + (gameHeight / 2);
    sc_text.fixedToCamera = true;
}

function createPrimePrincipal(x, y) {
    var o, t;
    o = getEnemy();
    if (!(o)) {
        return;
    }
    
    t = enemyTypes[2];
    createEnemy(o, t);
    o.onDeath = specialDeath;
    o.frame = 0;
    o.reset(x, y, t.health);
}

function enemyAnimations(enemy, animation) {
    
    if (enemy.key === "canteenLady" || enemy.key === "canteenLadyAttack") {
        
        if (animation === 'death') {
            enemy.loadTexture('canteenLadyDeath');
            enemy.animations.add('death');
            enemy.animations.play('death', 10, false);
        }
        if (animation === 'attack') {
            enemy.loadTexture('canteenLadyAttack');
            enemy.animations.add('attack');
            enemy.animations.play('attack', 10, false);
            tempTest = enemy;
            enemy.events.onAnimationComplete.add(playIdleAnimation, this);
        }
        if (animation === 'idle') {
            enemy.loadTexture('canteenLady');
            enemy.animations.add('idle');
            enemy.animations.play('idle', 30, true);
        }
    }
    if (enemy.key === "bully" || enemy.key === "bullyAttack") {
        if (animation === 'death') {
            enemy.loadTexture('bullyDeath');
            enemy.animations.add('death');
            enemy.animations.play('death', 10, false);
        }
        if (animation === 'attack') {
            enemy.loadTexture('bullyAttack');
            enemy.animations.add('attack');
            enemy.animations.play('attack', 10, false);
            tempTest = enemy;
            enemy.events.onAnimationComplete.add(playIdleAnimation, this);
        }
        if (animation === 'idle') {
            enemy.loadTexture('bully');
            enemy.animations.add('idle');
            enemy.animations.play('idle', 10, true);
        }        
    }
    if (enemy.key === "principal" || enemy.key === "principalAttack") {
        if (animation === 'death') {
            enemy.loadTexture('principalDeath');
            enemy.animations.add('death');
            enemy.animations.play('death', 10, false);
        }
        if (animation === 'attack') {
            enemy.loadTexture('principalAttack');
            enemy.animations.add('attack');
            enemy.animations.play('attack', 10, false);
            tempTest = enemy;
            enemy.events.onAnimationComplete.add(playIdleAnimation, this);
        }
        if (animation === 'idle') {
            enemy.loadTexture('principal');
            enemy.animations.add('idle');
            enemy.animations.play('idle', 10, true);
        }        
    }
}

function playIdleAnimation() {
    enemyAnimations(tempTest, 'idle');
}

function createRandomEnemy(x, y) {
    random = Math.random();
    
    if (random <= 0.5) {
        createBully(x, y);
    }
    else if (random > 0.5 && random <= 0.51) {
        createCanteenLady(x, y);
    }
    else {
        createPrincipal(x, y);
    }
}