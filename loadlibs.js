// --
console.log("%c ----------------------------------- ", "color:black; background:yellow");
// add states to the Phaser.Game object
game.state.add("Boot", boot);
game.state.add("Loading", loading);
// --
console.log("%c ----------------------------------- ", "color:black; background:yellow");
// start at the beginning
game.state.start("Boot");