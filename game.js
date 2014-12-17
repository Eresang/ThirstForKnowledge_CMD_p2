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
        initPlayer();
    },
    
    update: function () {
        'use strict';
        checkPlayerInput();
        updateProjectiles();
    },
    
    init: function () {
        'use strict';
        
    }
    
};