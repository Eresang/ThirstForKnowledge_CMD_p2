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
        
        initGenerator();
        maingroup = game.add.group();
        maingroup.enableBodyDebug = true;

        initPlayer();
        
        //starts advanced timing for fps debugger
        game.time.advancedTiming = true;
        
        //addEnemiesToArray();
        //spawnEnemy();
        
        initObstacles();
        initPickups();
        initProjectiles();
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
        //game.debug.geom(game.physics.arcade.bounds);
        //maingroup.forEachAlive(function d(c) {
    //        game.debug.body(c);
      //  });
        game.debug.text(maingroup.countLiving() + ' / ' + maingroup.children.length, 2, 14);
        game.debug.text(maingroup.countLiving(), 2, 14);
        
        // Input debug info
        game.debug.inputInfo(32, 32);
    }
    
};