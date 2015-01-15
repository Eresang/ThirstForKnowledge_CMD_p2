// functions and variables for every type of projectile put in array for easy retrieval
var projectileTypes = [
        {   // geo weapon
            name: 'Triangle rulers',
            source: {},
            firerate: 45,
            speed: 280,
            frame: 0,
            upgrade: 0,
            upgradeMax: 2,
            damages: [20, 30, 50],
            atkAnimation: 'char_throw',
            createProjectile: createProjectile1,
            collision: collisionProjectile1
        },
        {   // catapult weapon
            name: 'Catapult',
            source: {},
            firerate: 35,
            speed: 300,
            frame: 3,
            upgrade: 0,
            upgradeMax: 2,
            damages: [15, 20, 35],
            atkAnimation: 'char_throw',
            createProjectile: createProjectile2,
            collision: collisionProjectile2
        },
        {   // peashooter weapon
            name: 'Pea shooter',
            source: {},
            firerate: 40,
            speed: 320,
            frame: 6,
            upgrade: 0,
            upgradeMax: 2,
            damages: [17, 25, 43],
            atkAnimation: 'char_blow',
            createProjectile: createProjectile3,
            collision: collisionProjectile3
        },
        {   // waterballoon weapon
            name: 'Water balloons',
            source: {},
            firerate: 80,
            speed: 220,
            frame: 9,
            upgrade: 0,
            upgradeMax: 2,
            damages: [32, 45, 60],
            atkAnimation: 'char_throw',
            createProjectile: createProjectile4,
            collision: collisionProjectile4
        },
        {   // paper plane weapon
            name: 'Paper planes',
            source: {},
            firerate: 65,
            speed: 180,
            frame: 12,
            upgrade: 0,
            upgradeMax: 2,
            damages: [35, 48, 65],
            atkAnimation: 'char_throw',
            createProjectile: createProjectile5,
            collision: collisionProjectile5
        },
        {   // stink bomb weapon
            name: 'Stink bombs',
            source: {},
            firerate: 60,
            speed: 240,
            frame: 15,
            upgrade: 0,
            upgradeMax: 2,
            damages: [42, 48, 56],
            atkAnimation: 'char_throw',
            createProjectile: createProjectile6,
            collision: collisionProjectile6
        },
        {   // test tube weapon
            name: 'Test tubes',
            source: {},
            firerate: 90,
            speed: 250,
            frame: 18,
            upgrade: 0,
            upgradeMax: 2,
            damages: [40, 54, 72],
            atkAnimation: 'char_throw',
            createProjectile: createProjectile7,
            collision: collisionProjectile7
        },
        {
            name: 'Mashed potatoes',
            source: {},
            firerate: 50,
            speed: 300,
            frame: 21,
            upgrade: 0,
            upgradeMax: 0,
            damages: [20],
            createProjectile: createProjectile8,
            collision: collisionProjectile8
        },
        {
            name: 'Pen',
            source: {},
            firerate: 50,
            speed: 300,
            frame: 22,
            upgrade: 0,
            upgradeMax: 0,
            damages: [20],
            createProjectile: createProjectile9,
            collision: collisionProjectile9
        }
    ];

// other variables
var selectedProjectile = 0,
    maxProjectileCount = 50,
    projectileDelay = 0,
    fireRate = projectileTypes[selectedProjectile].firerate;

var projectiles = [];

var upgradeCosts = [250, 800];

//----------------------------------------------------------------
// basic projectiles
// initialise projectiles

function updateWeaponText() {
    'use strict';
    var p = projectileTypes[selectedProjectile];
    
    pj_text.setText('lv.' + (p.upgrade + 1) + ' ' + p.name);
    if (p.upgrade !== p.upgradeMax) {
        pu_text.setText('upgrade cost: ' + upgradeCosts[p.upgrade] + ' KL');
    } else {
        pu_text.setText('weapon maxed');
    }
    if (upgradePossible()) {
        upgradebutton.frame = 0;
    } else {
        upgradebutton.frame = 1;
    }
}

function initProjectiles() {
    'use strict';
    var i;
    
    projectiles.length = maxProjectileCount;
    for (i = 0; i < maxProjectileCount; i += 1) {
        projectiles[i] = maingroup.create(0, 0, 'ammosheet', 0);
        game.physics.arcade.enable(projectiles[i]);
        projectiles[i].anchor.setTo(0.5, 1.0);
        projectiles[i].kill();
    }
    changeProjectileSelected(0);
}

function upgradePossible() {
    'use strict';
    return (projectileTypes[selectedProjectile].upgrade !== projectileTypes[selectedProjectile].upgradeMax && player.wisdom >= upgradeCosts[projectileTypes[selectedProjectile].upgrade]);
}

function upgradeProjectile(projectileID) {
    'use strict';
    var old;
    old = projectileTypes[projectileID].upgrade;
    player.wisdom -= upgradeCosts[old];
    playerWisen(0);
    projectileTypes[projectileID].upgrade = lowest(projectileTypes[projectileID].upgrade + 1, projectileTypes[projectileID].upgradeMax);
    updateWeaponText();
    return (old !== projectileTypes[projectileID].upgrade);
}

function getProjectile() {
    'use strict';
    var i,
        p = null;
    
    for (i = 0; i < maxProjectileCount; i += 1) {
        if (projectiles[i].alive === false) {
            p = projectiles[i];
            return p;
        }
    }
    return p;
}

function updateProjectiles() {
    'use strict';
    projectileDelay += 1;
}

// --------------------------------------------------------------------------------------
// player projectile function(s)
function changeProjectileSelected(newProjectileSelected) {
    'use strict';
    if (selectedProjectile !== newProjectileSelected) {
        // modular projectile selection
        selectedProjectile = newProjectileSelected % projectileTypes.length;
        if (selectedProjectile < 0) {
            selectedProjectile = projectileTypes.length + selectedProjectile;
        }
        fireRate = projectileTypes[selectedProjectile].firerate;
    }
    updateWeaponText();
}

function createProjectile(shooter, projectile) {
    'use strict';
    var p, t;
    p = getProjectile();
    t = projectileTypes[projectile];
    if (p) {
        p.angle = 0;
        p.body.angle = 0;
        p.source = shooter;
        p.collideHandler = t.collision;
        p.frame = t.frame + t.upgrade;
 
        if (shooter === player) {
            p.body.velocity.x = t.speed;
        } else {
            p.body.velocity.x = -t.speed;
        }

        if (t.createProjectile) {
            t.createProjectile(p, t, shooter);
        }
    }
}

function playerShoot() {
    'use strict';
    if (projectileDelay >= fireRate) {
        createProjectile(player, selectedProjectile);
        projectileDelay = 0;
        return true;
    }
    return false;
}

//----------------------------------------------------------------

var dm_textstyle1 = { font: "bold 22pt Verdana", fill: "#dd2222", stroke: "#000000", strokeThickness: 5, align: "center" },
    dm_textstyle2 = { font: "bold 22pt Verdana", fill: "#22dd22", stroke: "#000000", strokeThickness: 5, align: "center" };

function dmgTextComplete(p, q) {
    'use strict';
    p.destroy(true);
}

function dmgText(x, y, text, style, left) {
    'use strict';
    var t, d;
    d = game.add.text(0, 0, text, style);
    d.y = -(d.height / 2) + y - 24;
    d.alpha = 1;
    t = game.add.tween(d);
    t.onComplete = new Phaser.Signal();
    t.onComplete.add(dmgTextComplete);
    if (left) {
        d.x = -(d.width / 2) + x + 12;
        t.to({ alpha: 0, x: d.x - 32 }, 100, Phaser.Easing.Linear.None, false, 200).start();
    } else {
        d.x = -(d.width / 2) + x - 12;
        t.to({ alpha: 0, x: d.x + 32 }, 100, Phaser.Easing.Linear.None, false, 200).start();
    }
    
}

//----------------------------------------------------------------
// projectile type 1
function collisionProjectile1(p, q) {
    'use strict';
    if (p === player) {
        dmgText(p.x, p.y, q.damage, dm_textstyle1, false);
    } else {
        dmgText(p.x, p.y, q.damage, dm_textstyle2, false);
    }
}

function createProjectile1(p, t, q) {
    'use strict';
    if (q !== player) {
        p.body.setSize(8, 15, -2, 1);
        p.scale.x = -1;
    } else {
        p.body.setSize(8, 15, 2, 1);
        p.scale.x = 1;
    }
}

//----------------------------------------------------------------
// projectile type 2
function collisionProjectile2(p, q) {
    'use strict';
    if (p === player) {
        dmgText(p.x, p.y, q.damage, dm_textstyle1, false);
    } else {
        dmgText(p.x, p.y, q.damage, dm_textstyle2, false);
    }
}

function createProjectile2(p, t, q) {
    'use strict';
    if (q !== player) {
        p.body.setSize(8, 15, -2, 1);
        p.scale.x = -1;
    } else {
        p.body.setSize(8, 15, 2, 1);
        p.scale.x = 1;
    }
}

//----------------------------------------------------------------
// projectile type 3
function collisionProjectile3(p, q) {
    'use strict';
    if (p === player) {
        dmgText(p.x, p.y, q.damage, dm_textstyle1, false);
    } else {
        dmgText(p.x, p.y, q.damage, dm_textstyle2, false);
    }
}

function createProjectile3(p, t, q) {
    'use strict';
    if (q !== player) {
        p.body.setSize(8, 15, -2, 1);
        p.scale.x = -1;
    } else {
        p.body.setSize(8, 15, 2, 1);
        p.scale.x = 1;
    }
}

//----------------------------------------------------------------
// projectile type 4
function collisionProjectile4(p, q) {
    'use strict';
    if (p === player) {
        dmgText(p.x, p.y, q.damage, dm_textstyle1, false);
    } else {
        dmgText(p.x, p.y, q.damage, dm_textstyle2, false);
    }
}

function explodeProjectile4(p, q) {
    'use strict';
    p.tween.manager.remove(p.tween);
    p.kill();
}

function createProjectile4(p, t, q) {
    'use strict';
    var tween;
    
    if (q !== player) {
        p.body.setSize(8, 15, -2, 1);
        p.scale.x = -1;
    } else {
        p.body.setSize(8, 15, 2, 1);
        p.scale.x = 1;
    }
    tween = game.add.tween(p);
    p.tween = tween;
    tween.onComplete = new Phaser.Signal();
    tween.onComplete.add(explodeProjectile4);
    tween.to({ y: p.y - 20 }, 800, Phaser.Easing.Sinusoidal.In, true, 0, 0, true);
}

//----------------------------------------------------------------
// projectile type 5
function collisionProjectile5(p, q) {
    'use strict';
    if (p === player) {
        dmgText(p.x, p.y, q.damage, dm_textstyle1, false);
    } else {
        dmgText(p.x, p.y, q.damage, dm_textstyle2, false);
    }
}

function createProjectile5(p, t, q) {
    'use strict';
    if (q !== player) {
        p.body.setSize(8, 15, -2, 1);
        p.scale.x = -1;
    } else {
        p.body.setSize(8, 15, 2, 1);
        p.scale.x = 1;
    }
}

//----------------------------------------------------------------
// projectile type 6
function collisionProjectile6(p, q) {
    'use strict';
    if (p === player) {
        dmgText(p.x, p.y, q.damage, dm_textstyle1, false);
    } else {
        dmgText(p.x, p.y, q.damage, dm_textstyle2, false);
    }
}

function explodeProjectile6(p, q) {
    'use strict';
    p.tween.manager.remove(p.tween);
    p.kill();
}

function createProjectile6(p, t, q) {
    'use strict';
    var tween;
    
    if (q !== player) {
        p.body.setSize(8, 15, -2, 1);
        p.scale.x = -1;
    } else {
        p.body.setSize(8, 15, 2, 1);
        p.scale.x = 1;
    }
    tween = game.add.tween(p);
    p.tween = tween;
    tween.onComplete = new Phaser.Signal();
    tween.onComplete.add(explodeProjectile6);
    tween.to({ y: p.y - 20 }, 800, Phaser.Easing.Quadratic.None, true, 0, 0, true);
}

//----------------------------------------------------------------
// projectile type 7
function collisionProjectile7(p, q) {
    'use strict';
    if (p === player) {
        dmgText(p.x, p.y, q.damage, dm_textstyle1, false);
    } else {
        dmgText(p.x, p.y, q.damage, dm_textstyle2, false);
    }
}

function explodeProjectile7(p, q) {
    'use strict';
    p.tween.manager.remove(p.tween);
    p.kill();
}

function createProjectile7(p, t, q) {
    'use strict';
    var tween;
    
    if (q !== player) {
        p.body.setSize(8, 15, -2, 1);
        p.scale.x = -1;
    } else {
        p.body.setSize(8, 15, 2, 1);
        p.scale.x = 1;
    }
    tween = game.add.tween(p);
    p.tween = tween;
    tween.onComplete = new Phaser.Signal();
    tween.onComplete.add(explodeProjectile7);
    tween.to({ y: p.y - 20 }, 800, Phaser.Easing.Quadratic.None, true, 0, 0, true);
}

//----------------------------------------------------------------
// projectile type 8
function collisionProjectile8(p, q) {
    'use strict';
    if (p === player) {
        dmgText(p.x, p.y, q.damage, dm_textstyle1, false);
    } else {
        dmgText(p.x, p.y, q.damage, dm_textstyle2, false);
    }
}

function createProjectile8(p, t, q) {
    'use strict';
    if (q !== player) {
        p.body.setSize(8, 15, -2, 1);
        p.scale.x = -1;
    } else {
        p.body.setSize(8, 15, 2, 1);
        p.scale.x = 1;
    }
}

//----------------------------------------------------------------
// projectile type 9
function collisionProjectile9(p, q) {
    'use strict';
    if (p === player) {
        dmgText(p.x, p.y, q.damage, dm_textstyle1, false);
    } else {
        dmgText(p.x, p.y, q.damage, dm_textstyle2, false);      
    }
}

function createProjectile9(p, t, q) {
    'use strict';
    if (q !== player) {
        p.body.setSize(8, 15, -2, 1);
        p.scale.x = -1;
    } else {
        p.body.setSize(8, 15, 2, 1);
        p.scale.x = 1;
    }
}

//----------------------------------------------------------------
// projectile type 9
function collisionProjectile9(p, q) {
    'use strict';

}

function createProjectile9(p, t, q) {
    'use strict';
    if (q !== player) {
        p.body.velocity.x = -t.speed;
    } else {
        p.body.velocity.x = t.speed;
    }
}

// --------------------------------------------------------------------------------------
function killProjectiles() {
    'use strict';
    var i;
    
    for (i = 0; i < projectiles.length; i += 1) {
        if ((projectiles[i].x > game.camera.x + gameWidth || projectiles[i].x < game.camera.x) && projectiles[i].alive) {
            if (projectiles[i].tween) {
                projectiles[i].tween.manager.remove(projectiles[i].tween);
            }
            projectiles[i].kill();
        }
    }
}