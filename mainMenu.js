var music = true;
var mainMenu = function (game) {
    
};

mainMenu.prototype = {
    create: function () {
        game.stage.backgroundColor = "#968f74";
        game.add.sprite(0, 0, 'backdrop');
        game.add.sprite((game.width / 2) - (game.cache.getImage('title').width / 2), 50, 'title');        
        var startButton = game.add.button((game.width / 2) - (game.cache.getImage('startButton').width / 2), 150, 'startButton', startGame, this);
        var controlsButton = game.add.button((game.width / 2) - (game.cache.getImage('controlsButton').width / 2), 225, 'controlsButton', controls, this);
        //var creditsButton = game.add.button((game.width / 2) - (game.cache.getImage('creditsButton').width / 2), 300, 'creditsButton', credits, this);
        musicButton = game.add.button(640 - 100, 400, 'soundButton', musicToggle, this, 1, 1);
    }
};

function startGame() {
    this.state.start("Runner", true, false, true);
}

function controls() {
    this.state.start("controlScreen");
}

function credits() {
    
}

function musicToggle() {
    if(music){
        music = false;
        musicButton.setFrames(0);
    }
    else{
        music = true;
        musicButton.setFrames(1);
    }
    console.log(music);
}