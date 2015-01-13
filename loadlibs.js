// --
console.log("%c ----------------------------------- ", "color:black; background:yellow");
// add states to the Phaser.Game object
game.state.add("Boot", boot);
game.state.add("Loading", loading);
game.state.add("Runner", runner);
game.state.add("mainMenu", mainMenu);


// --
console.log("%c ----------------------------------- ", "color:black; background:yellow");
// start at the beginning
game.state.start("Boot");