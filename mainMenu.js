var music = true;
var mainMenu = function (game) {
    
};

mainMenu.prototype = {
    create: function () {
        game.stage.backgroundColor = "#968f74";
        
        var startButton = game.add.button(0, 0, 'startButton', startGame, this);
        var controlsButton = game.add.button(0, 100, 'controlsButton', controls, this);
        var creditsButton = game.add.button(0, 200, 'creditsButton', credits, this);
        var musicButton = game.add.button(0, 300, 'musicButton', musicToggle, this);
    }
};

function startGame() {
    this.state.start("Runner", true, false, true);
}

function controls() {
    
}

function credits() {
    
}

function musicToggle() {
    if(music){
        music = false;
    }
    else{
        music = true;
    }
    console.log(music);
}