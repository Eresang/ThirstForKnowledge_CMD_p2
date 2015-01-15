var interfacegroup,
    upgradebutton,
    mutebutton;

var pl_text, pw_text, ps_text,
    plw_textstyle = { font: "bold 16pt Verdana", fill: "#000000", align: "left" };

var pu_text,
    pu_textstyle = { font: "bold 10pt Verdana", fill: "#000000", align: "left" };

var pj_text,
    pj_textstyle = { font: "bold 16pt Verdana", fill: "#000000", align: "left" };

var up_textstyle = { font: "bold 28pt Verdana", fill: "#ffffff", stroke: "#000000", strokeThickness: 8, align: "center" };

function upgradeTextComplete(p, q) {
    'use strict';
    p.tween.manager.remove(p.tween);
    p.destroy(true);
}

function createUpgradeText(text, style) {
    'use strict';
    var t, d;
    d = game.add.text(0, 0, text, style);
    d.x = -(d.width / 2) + (gameWidth / 2);
    d.y = -(d.height / 2) + (gameHeight / 2) - 50;
    d.fixedToCamera = true;
    d.alpha = 1;
    t = game.add.tween(d);
    d.tween = t;
    t.onComplete = new Phaser.Signal();
    t.onComplete.add(upgradeTextComplete);
    t.to({ alpha: 0, y: gameHeight }, 300, Phaser.Easing.Linear.None, false, 1000).start();
}

function upgradeTrigger() {
    'use strict';
    if (upgradePossible() && player.hp > 0) {
        upgradeProjectile(selectedProjectile);
        createUpgradeText(projectileTypes[selectedProjectile].name + ' lv.' + (projectileTypes[selectedProjectile].upgrade + 1), up_textstyle);
    }
}

function muteTrigger() {
    'use strict';
    if (mutebutton.frame === 0) {
        // set to muted
        mutebutton.frame = 1;
    } else {
        // unmute
        mutebutton.frame = 0;
    }
}

function initStatusbar() {
    'use strict';
    var s;
    // title
    s = interfacegroup.create(gameWidth / 2, 16, "title_text");
    s.anchor.setTo(0.5, 0.0);
    s.fixedToCamera = true;
    
    // statusbar background
    s = interfacegroup.create(0, gameHeight, "status_back");
    s.anchor.setTo(0.0, 1.0);
    s.fixedToCamera = true;
    
    // player hp label
    pl_text = new Phaser.Text(game, 24, gameHeight - 76, 'Health: ' + player.hp, plw_textstyle);
    interfacegroup.add(pl_text, true);
    pl_text.fixedToCamera = true;
    
    // player wisdom label
    pw_text = new Phaser.Text(game, gameWidth - 24, gameHeight - 76, 'Knowledge: ' + player.wisdom, plw_textstyle);
    pw_text.anchor.setTo(1.0, 0.0);
    interfacegroup.add(pw_text, true);
    pw_text.fixedToCamera = true;
   
    // player score label
    //ps_text = new Phaser.Text(game, gameWidth - 4, gameHeight - 76, 'Score: ' + player.score, plw_textstyle);
    //ps_text.anchor.setTo(1.0, 0.0);
    //interfacegroup.add(ps_text, true);
    //ps_text.fixedToCamera = true;    
    
    // weapon type label
    pj_text = new Phaser.Text(game, 185, gameHeight - 44, ' ', pj_textstyle);
    pj_text.anchor.setTo(0.0, 0.0);
    interfacegroup.add(pj_text, true);
    pj_text.fixedToCamera = true;
    
    // weapon uprade label
    pu_text = new Phaser.Text(game, 205, gameHeight - 22, ' ', pu_textstyle);
    pu_text.anchor.setTo(0.0, 0.0);
    interfacegroup.add(pu_text, true);
    pu_text.fixedToCamera = true;
    
    // button for volume
    mutebutton = interfacegroup.create(gameWidth - 4, gameHeight, "mute_button", 0);
    mutebutton.inputEnabled = true;
    mutebutton.anchor.setTo(1.0, 1.0);
    mutebutton.events.onInputDown.add(muteTrigger);
    mutebutton.fixedToCamera = true;
    
    // upgrade button sprite
    upgradebutton = interfacegroup.create(4, gameHeight - 43, "upgrade_button", 0);
    upgradebutton.inputEnabled = true;
    upgradebutton.anchor.setTo(0.0, 0.0);
    upgradebutton.events.onInputDown.add(upgradeTrigger);
    upgradebutton.fixedToCamera = true;
}