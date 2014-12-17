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
        initPlayer();
    },
    
    update: function () {
        'use strict';
        checkPlayerInput();
    },
    
    init: function () {
        'use strict';
        
    }
    
};