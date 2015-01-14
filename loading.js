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
        
        this.load.spritesheet('pickupsheet', 'assets/pickups_A.png', 18, 18);
        this.load.spritesheet("enemy", "assets/baddie.png", 32, 32);
        
        this.load.spritesheet("tables", "assets/tables.png", 70, 43);
        this.load.spritesheet("chairs", "assets/chairs.png", 20, 30);
        this.load.spritesheet("foliage", "assets/foliage.png", 100, 51);
        this.load.spritesheet("paraphernaliaA", "assets/paraphernalia_A.png", 26, 32);
        this.load.spritesheet('backdrop', 'assets/backdrop.png', 640, 480, 1);

        this.load.spritesheet('charactersheet', 'assets/charactersheet.png', 64, 64);
        
        this.load.spritesheet('canteenLady', 'assets/canteenLadyIdle.png', 35, 85);
        this.load.spritesheet('canteenLadyDeath', 'assets/canteenLadyDeath.png', 91, 93);
        this.load.spritesheet('canteenLadyAttack', 'assets/canteenLadyAttack.png', 39, 84);
        
        this.load.spritesheet('bully', 'assets/bullyIdle.png', 26, 51);
        this.load.spritesheet('bullyAttack', 'assets/bullyAttack.png', 27, 52);
        this.load.spritesheet('bullyDeath', 'assets/bullyDeath.png', 57, 58);
        
        this.load.spritesheet('principal', 'assets/principalIdle.png', 35, 74);
        this.load.spritesheet('principalAttack', 'assets/principalAttack.png', 34, 73);
        this.load.spritesheet('principalDeath', 'assets/principalDeath.png', 80, 81);

        this.load.spritesheet('ammosheet', 'assets/Ammo2.png', 24, 17);
        this.load.spritesheet('pickupsheet', 'assets/Pickups_A.png', 18, 18);
        this.load.spritesheet("enemy", "assets/baddie.png", 32, 32);
        
        this.load.spritesheet("tables", "assets/Tables.png", 70, 43);
        this.load.spritesheet("chairs", "assets/Chairs.png", 20, 30);
        this.load.spritesheet("foliage", "assets/Foliage.png", 100, 51);
        this.load.spritesheet("paraphernaliaA", "assets/Paraphernalia_A.png", 26, 32);
        this.load.image("startButton", "assets/startButton.png");
        this.load.image("controlsButton", "assets/controlsButton.png");
        this.load.image("creditsButton", "assets/creditsButton.png");
    },
    
    create: function () {
        'use strict';
        // everything is loaded, time to start the game
        this.game.state.start("mainMenu", true, false, true);
    }
};