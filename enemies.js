var amountOfEnemies = 30;
var enemyArray = [];

function addEnemiesToArray () {
    for (i = 0; i < amountOfEnemies; i++) {
        enemy = game.add.sprite(0, 0, "enemy");
        game.physics.arcade.enable(enemy);
        enemy.body.velocity.x = 200;
        enemy.visible = true;
        enemyArray.push(enemy);
        enemy.newhealth = 25;
    }
}

var x = 0;
var y = 0;

function spawnEnemy () {
    
    ix = x;
    iy = y;
    
    for (i = 0; i < amountOfEnemies; i++) {
        
        enemy = enemyArray[i];
        if (enemy !== null) {
            
            ix += 10;
            iy += 10;
            
            enemy.reset(ix, iy);
            game.physics.arcade.enable(enemy);
            enemy.body.velocity.x = 200;
            
        }
    }
}

