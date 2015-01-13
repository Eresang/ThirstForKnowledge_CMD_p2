var bulletTime = 0;

function enemyAI () {
     
    for (i = 0; i < enemies.length; i++) {
         
        enemy = enemies[i];
        
        if (enemy != null) {
            
            if (enemy.living) {
                if((enemy.x - player.x) < 300) {

                    if (enemy.y > (player.y - 10) && enemy.y < (player.y + 10)) {
                        enemy.body.velocity.y = 0;
                    }
                    else if (enemy.y < player.y ) {
                        enemy.body.velocity.y = 70;
                    }
                    else {
                        enemy.body.velocity.y = -70;
                    }
                }
            }

            if (((enemy.y > (player.y - 10) && enemy.y < (player.y + 10)) && enemy.alive === true) && enemy.x > player.x) {
                enemyShoot(i);
            }         
        }
    }
}

function enemyShoot (i) {
    
    if (enemies[i].living) {
        enemyFireRate = projectileTypes[enemies[i].projectile].firerate;
        if (enemies[i].fireCounter > enemyFireRate) {
        
            enemies[i].fireCounter = 0;        
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
        name: "Canteen lady",
        sheet: 'canteenLady',
        bodyWidth: 35,
        bodyHeight: 12,
        bodyXOffset: 0,
        bodyYOffset: 2,
        bodyEnable: true,
        projectile: 7,
        fireCounter: 0,
        idleAnim: 'idle'
    },
    {
        
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
    
    for (i = 0; i < maxEnemyCount; i++) {
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
        o.body.enable = t.bodyEnable;
        o.loadTexture(t.sheet);
        o.animations.add('idle');
        o.animations.play('idle', 30, true);
        o.collideHandler = t.collision;
        o.projectile = t.projectile;
        o.fireCounter = t.fireCounter;
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
    o.reset(x, y);
}

function enemyAnimations(enemy, animation) {
    
    console.log(enemy.key);
    if (enemy.key === "canteenLady") {
        
        if (animation === 'death') {
            
            console.log("death animation");
            enemy.loadTexture('canteenLadyDeath');
            enemy.animations.add('death');
            enemy.animations.play('death', 10, false);
        }
    }
}