// the 'loading' game state;
// it sets a loading bar graphic loaded in 'preload' game state,
// and then continues to load all the required assets
var loading = function (game) {
    'use strict';
	console.log("%c     loading.js is being processed   ", "color:white; background:red");
};

loading.prototype = {
    preload: function () {
        'use strict';
        // set up loading bar graphic
        var loadingBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "loadBar");
        loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(loadingBar, 1);
        
        // insert the loading of all assets after this line, :
        this.load.spritesheet('charactersheet', 'assets/charactersheet.png', 64, 64);
        this.load.spritesheet('projectilesheet', 'assets/projectilesheet.png', 48, 64);
        // this.load.image('assetname', 'assets/ts_t0.png', 48, 48);

// hey Elroy

    },
    create: function () {
        'use strict';
        // everything is loaded, time to start the game
	   this.game.state.start("Runner", true, false, true);
    }
};