var amountOfEnemies = 10;
var enemyArray = [];
var bulletArray = [];

function addEnemiesToArray () {
    for (i = 0; i < amountOfEnemies; i++) {
        enemy = game.add.sprite(0, 0, 'canteenLady');
        game.physics.arcade.enable(enemy);
        enemy.body.velocity.x = 200;
        enemy.exists = false;
        enemyArray.push(enemy);
        enemy.newhealth = 25;
        enemy.animations.add('idle');
        
    }
}

function createBulletArray () {
    
}

function spawnEnemy (x, y, i) {
    
    enemy = enemyArray[i];
    enemy.reset(x, y);
    enemy.animations.play('idle', 30, true);
    enemy.body.velocity.x = -speed;
}

function enemyAI () {
     
    for (i = 0; i < enemyArray.length; i++) {
         
         enemy = enemyArray[i];
         
         if((enemy.x - player.x) < 300) {
             
             if (enemy.y === player.y) {
                 enemy.body.velocity.y = 0;
             }
             else if (enemy.y < player.y) {
                 enemy.body.velocity.y = 70;
             }
             else {
                 enemy.body.velocity.y = -70;
             }
         }
         
         if (enemy.y === player.y) {
             enemyShoot(i);
         }         
     }
}

function enemyShoot (i) {
    if (game.time.now > bulletTime) {
        
        bulletTime = game.time.now + enemyFireRate;
        
        
    }
}