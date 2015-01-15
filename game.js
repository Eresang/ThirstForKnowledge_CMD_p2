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

        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        initGenerator();
        maingroup = game.add.group();
        
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

    }
};