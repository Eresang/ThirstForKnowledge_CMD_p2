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
        this.load.spritesheet('char_idle', 'assets/char_nothing.png', 20, 62, 10);
        this.load.spritesheet('char_moving', 'assets/char_walking.png', 32, 62, 10);
        this.load.spritesheet('char_shoot', 'assets/char_throw.png', 57, 62, 10);
        
        this.load.spritesheet('ammosheet', 'assets/ammo.png', 23, 34);
        this.load.spritesheet('pickupsheet', 'assets/pickups_A.png', 18, 18);
        this.load.spritesheet("enemy", "assets/baddie.png", 32, 32);
        
        this.load.spritesheet("tables", "assets/tables.png", 70, 43);
        this.load.spritesheet("chairs", "assets/chairs.png", 20, 30);
        this.load.spritesheet("foliage", "assets/foliage.png", 100, 51);
        this.load.spritesheet("paraphernaliaA", "assets/paraphernalia_A.png", 26, 32);
        this.load.spritesheet('backdrop', 'assets/backdrop.png', 640, 480, 1);
    },
    create: function () {
        'use strict';
        // everything is loaded, time to start the game
        this.game.state.start("Runner", true, false, true);
    }
};