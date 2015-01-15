var controlScreen = function (game) {
    
};

controlScreen.prototype = {
    create: function () {
        game.add.sprite(0, 0, 'backdrop');
        game.add.sprite(0, 0, 'controls');
        var closeButton = game.add.button(640-62, 10, 'closeButton', close, this);
    }
};

function close() {
    this.state.start("mainMenu");
}