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
        //maingroup.enableBodyDebug = true;
        
        interfacegroup = game.add.group();

        initPlayer();
        initStatusbar();
        initObstacles();
        initScenery();
        initPickups();
        initProjectiles();
        initEnemies();
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
        killScenery();
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
       // game.debug.body(player);

        //maingroup.forEachAlive(function d(c) {
       //     game.debug.body(c);
     //   });
        game.debug.text(maingroup.countLiving() + ' / ' + maingroup.children.length, 2, 14);
        game.debug.text(maingroup.countLiving(), 2, 14);
        
        // Input debug info
       // game.debug.inputInfo(32, 32);
    }
    
};