// initial internal game world dimensions
var gameWidth = 640,
    gameHeight = 480;
// create the game object and set it to create a canvas in parent container 'gameDiv'
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'gameDiv', null, false, false);

// the 'boot' game state;
// it loads the loading bar graphic and sets up a couple of scaling options,
// and then it starts the 'loading' game state
var boot = function (game) {
    'use strict';
    console.log("%c        boot.js is being processed   ", "color:white; background:red");
};

boot.prototype = {
    preload: function () {
        'use strict';
        this.load.image("loadBar", "assets/loading.png");
        game.stage.backgroundColor = '#00001a';
    },
    create: function () {
        'use strict';
        // set up scale manager
	    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = gameWidth / 2;
        this.scale.minHeight = gameHeight / 2;
        this.scale.maxWidth = gameWidth * 4;
        this.scale.maxHeight = gameHeight * 4;
	    this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        // refresh layout
	    this.scale.refresh();
	    this.state.start("Loading");
    }
};