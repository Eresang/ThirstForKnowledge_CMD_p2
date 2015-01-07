// functions and variables for every type of pickup put in array for easy retrieval
var pickupTypes = [
        {   // geo weapon
            name: 'triangle ruler',
            frame: 1,
            respin: 0.2,
            weapon: 0,
            collision: collisionWeaponpickup
        },
        {   // catapult weapon
            name: 'catapult',
            frame: 2,
            respin: 0.3,
            weapon: 1,
            collision: collisionWeaponpickup
        },
        {   // peashooter weapon
            name: 'pea shooter',
            frame: 3,
            respin: 0.4,
            weapon: 2,
            collision: collisionWeaponpickup
        },
        {   // waterballoon weapon
            name: 'water balloon',
            frame: 4,
            respin: 0.5,
            weapon: 3,
            collision: collisionWeaponpickup
        },
        {   // paper plane weapon
            name: 'paper plane',
            frame: 5,
            respin: 0.9,
            weapon: 4,
            collision: collisionWeaponpickup
        },
        {   // stink bomb weapon
            name: 'stink bomb',
            frame: 6,
            respin: 0.7,
            weapon: 5,
            collision: collisionWeaponpickup
        },
        {   // test tube weapon
            name: 'test tube',
            frame: 7,
            respin: 0.5,
            weapon: 6,
            collision: collisionWeaponpickup
        },
        {   // health pickup
            name: 'health',
            frame: 8,
            respin: 0.8,
            weapon: -1,
            collision: collisionHealthpickup
        },
        {   // book/wisdom pickup
            name: 'knowledge',
            frame: 0,
            respin: 0.8,
            weapon: -1,
            collision: collisionBookpickup
        }
    ];

var maxPickupCount = 20,
    pickups = [];

var pu_textstyle1 = { font: "bold 14pt Calibri", fill: "#ffffff", stroke: "#000000", strokeThickness: 3, align: "left" },
    pu_textstyle2 = { font: "bold 14pt Calibri", fill: "#ccccff", stroke: "#000000", strokeThickness: 3, align: "left" },
    pu_textstyle3 = { font: "bold 14pt Calibri", fill: "#bbffbb", stroke: "#000000", strokeThickness: 3, align: "left" };

// --------------------------------------------------------------------------------------
function initPickups() {
    'use strict';
    var i;
    
    pickups.length = maxPickupCount;
    for (i = 0; i < maxPickupCount; i += 1) {
        pickups[i] = maingroup.create(0, 0, 'pickupsheet', 0);
        game.physics.arcade.enable(pickups[i]);
        pickups[i].anchor.setTo(0.0, 1.0);
        pickups[i].body.immovable = true;
        pickups[i].kill();
    }
}

function getPickup() {
    'use strict';
    var i,
        p = null;
    
    for (i = 0; i < maxPickupCount; i += 1) {
        if (pickups[i].alive === false) {
            p = pickups[i];
            return p;
        }
    }
    return p;
}

// --------------------------------------------------------------------------------------
function pickupTextComplete(p, q) {
    'use strict';
    p.destroy(true);
}

function pickupText(x, y, text, style) {
    'use strict';
    var t, d;
    d = game.add.text(0, 0, text, style);
    d.x = -(d.width / 2) + x;
    d.y = -(d.height / 2) + y;
    d.alpha = 1;
    t = game.add.tween(d);
    t.onComplete = new Phaser.Signal();
    t.onComplete.add(pickupTextComplete);
    t.to({ alpha: 0, y: d.y + 16 }, 200, Phaser.Easing.Linear.None, false, 500).start();
}

// --------------------------------------------------------------------------------------
function createPickup(p, t) {
    'use strict';
    if ((p) && (t)) {
        p.angle = 0;
        p.body.angle = 0;
        p.body.setSize(12, 12, 3, 3);
        p.frame = t.frame;
        p.name = t.name;
        p.weapon = t.weapon;
        p.collideHandler = t.collision;
    }
}

function createRandomWeaponPickup(x, y) {
    'use strict';
    var p, t, o;
    p = getPickup();
    if (!(p)) {
        return;
    }
    o = Math.floor(Math.random() * (pickupTypes.length - 2));
    while (Math.random() < obstacleTypes[o].respin) {
        o = Math.floor(Math.random() * (pickupTypes.length - 2));
    }
    t = pickupTypes[o];
    
    createPickup(p, t);
    p.reset(x, y);
    numPickups += 1;
}

function createRandomPickup(x, y) {
    'use strict';
    var p, t, o;
    p = getPickup();
    if (!(p)) {
        return;
    }
    o = Math.floor(Math.random() * pickupTypes.length);
    while (Math.random() < obstacleTypes[o].respin) {
        o = Math.floor(Math.random() * pickupTypes.length);
    }
    t = pickupTypes[o];
    
    createPickup(p, t);
    p.reset(x, y);
    numPickups += 1;
}

// --------------------------------------------------------------------------------------
function collisionBookpickup(p, q) {
    'use strict';
    if (p === player && (q)) {
        pickupText(q.x, q.y, '+wisdom', pu_textstyle2);
        q.kill();
        numPickups -= 1;
    }
}

function collisionWeaponpickup(p, q) {
    'use strict';
    if (p === player && (q)) {
        changeProjectileSelected(q.weapon);
        pickupText(q.x, q.y, q.name, pu_textstyle1);
        q.kill();
        numPickups -= 1;
    }
}

function collisionHealthpickup(p, q) {
    'use strict';
    if (p === player && (q)) {
        q.kill();
        pickupText(q.x, q.y, '+++', pu_textstyle3);
        numPickups -= 1;
    }
}

// --------------------------------------------------------------------------------------
function killPickups() {
    'use strict';
    var i;
    
    for (i = 0; i < pickups.length; i += 1) {
        if (pickups[i].x < game.camera.x - pickups[i].width && pickups[i].alive) {
            pickups[i].kill();
            numPickups -= 1;
        }
    }
}