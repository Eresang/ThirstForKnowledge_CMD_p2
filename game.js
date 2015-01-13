//the game state
var player,
    maingroup;

var runner = function (game) {
    'use strict';
};

runner.prototype = {
    create: function () {
        'use strict';
        game.stage.backgroundColor = "#dec56f";
        // starts the physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        maingroup = game.add.group();
        initProjectiles();
        initPlayer();
        
        //starts advanced timing for fps debugger
        game.time.advancedTiming = true;
        
        //addEnemiesToArray();
        //spawnEnemy();
        
        initObstacles();
        initPickups();
        initEnemies();
        //spawnObstacle();
        
        initLevel();
    },
    
    update: function () {
        'use strict';
        checkPlayerInput();
        updateProjectiles();
        incrementFireCounters();
        
        collisionHandler();
        generateLevel();
        
        killObstacles();
        killEnemies();
        killPickups();
        killProjectiles();
        
        enemyAI();
        maingroup.sort('y', Phaser.Group.SORT_ASCENDING);
    },
    
    init: function () {
        'use strict';
        
    },
    
    render: function () {
        'use strict';
        game.debug.body(player);
        game.debug.text(maingroup.countLiving(), 2, 14);
        
        // Input debug info
        game.debug.inputInfo(32, 32);
    }
    
};