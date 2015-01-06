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
        // starts the physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        maingroup = game.add.group();
        initProjectiles();
        initPlayer();
        
        //starts advanced timing for fps debugger
        game.time.advancedTiming = true;
        
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
        
        // sort as last
        maingroup.sort('y', Phaser.Group.SORT_ASCENDING);
    },
    
    init: function () {
        'use strict';
        
    },
    
    render: function () {
        'use strict';
        game.debug.body(player);
        game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
    }
    
};