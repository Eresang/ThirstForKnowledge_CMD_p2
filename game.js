//the game state
var player,
    maingroup;

var runner = function (game) {
    'use strict';
};

runner.prototype = {
    create: function () {
        
        'use strict';
        game.stage.backgroundColor = "#9d00ff";
        maingroup = game.add.group();
        initProjectiles();
        initPlayer();
        
        //starts advanced timing for fps debugger
        game.time.advancedTiming = true;
        // starts the physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.stage.backgroundColor = "#9d00ff";
        maingroup = game.add.group();        
        
        addEnemiesToArray();
        spawnEnemy();
        
        addObstaclesToArray();
        //spawnObstacle();
    },
    
    update: function () {
        'use strict';
        checkPlayerInput();
        updateProjectiles();
        collisionHandler();
        killObstacles();
        worldGenerator();
    },
    
    init: function () {
        'use strict';
        
    },
    
    render: function () {
        game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
    }
    
};