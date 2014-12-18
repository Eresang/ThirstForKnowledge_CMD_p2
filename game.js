//the game state
var maingroup;

var runner = function (game) {
    
};

runner.prototype = {
    create: function () {
        game.time.advancedTiming = true;
        // starts the physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.stage.backgroundColor = "#9d00ff";
        maingroup = game.add.group();
        
        
        addEnemiesToArray();
        //addEnemiesToMaingroup();
        spawnEnemy();
        
        addObstaclesToArray();
        spawnObstacle();
        //moveEnemies();
        
        
    },
    
    update: function () {
        collisionHandler();
    },
    
    init: function () {
        
    },
    
    render: function () {
        game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
    }
    
};