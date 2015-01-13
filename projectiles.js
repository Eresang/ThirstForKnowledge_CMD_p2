// functions and variables for every type of projectile put in array for easy retrieval
var projectileTypes = [
        {   // geo weapon
            name: 'Triangle rulers',
            source: {},
            firerate: 15,
            speed: 100,
            frame: 0,
            upgrade: 0,
            upgradeMax: 2,
            damages: [1, 2, 3],
            createProjectile: createProjectile1,
            collision: collisionProjectile1
        },
        {   // catapult weapon
            name: 'Catapult',
            source: {},
            firerate: 30,
            speed: 500,
            frame: 3,
            upgrade: 0,
            upgradeMax: 2,
            damages: [1, 2, 3],
            createProjectile: createProjectile2,
            collision: collisionProjectile2
        },
        {   // peashooter weapon
            name: 'Pea shooter',
            source: {},
            firerate: 20,
            speed: 300,
            frame: 6,
            upgrade: 0,
            upgradeMax: 2,
            damages: [1, 2, 3],
            createProjectile: createProjectile3,
            collision: collisionProjectile3
        },
        {   // waterballoon weapon
            name: 'Water balloons',
            source: {},
            firerate: 60,
            speed: 800,
            frame: 9,
            upgrade: 0,
            upgradeMax: 2,
            damages: [1, 2, 3],
            createProjectile: createProjectile4,
            collision: collisionProjectile4
        },
        {   // paper plane weapon
            name: 'Paper planes',
            source: {},
            firerate: 30,
            speed: 500,
            frame: 12,
            upgrade: 0,
            upgradeMax: 2,
            damages: [1, 2, 3],
            createProjectile: createProjectile5,
            collision: collisionProjectile5
        },
        {   // stink bomb weapon
            name: 'Stink bombs',
            source: {},
            firerate: 20,
            speed: 300,
            frame: 15,
            upgrade: 0,
            upgradeMax: 2,
            damages: [1, 2, 3],
            createProjectile: createProjectile6,
            collision: collisionProjectile6
        },
        {   // test tube weapon
            name: 'Test tubes',
            source: {},
            firerate: 20,
            speed: 300,
            frame: 18,
            upgrade: 0,
            upgradeMax: 2,
            damages: [1, 2, 3],
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
            damages: [1],
            createProjectile: createProjectile8,
            collision: collisionProjectile8
        }
    ];

// other variables
var selectedProjectile = 0,
    maxProjectileCount = 50,
    projectileDelay = 0,
    fireRate = projectileTypes[selectedProjectile].firerate;

var projectiles = [];

var pj_text,
    pj_textstyle = { font: "bold 18pt Calibri", fill: "#000000", align: "left" };

//----------------------------------------------------------------
// basic projectiles
// initialise projectiles
function initProjectiles() {
    'use strict';
    var i;

    pj_text = game.add.text(4, 20, projectileTypes[selectedProjectile].name, pj_textstyle);
    pj_text.fixedToCamera = true;
    
    projectiles.length = maxProjectileCount;
    for (i = 0; i < maxProjectileCount; i += 1) {
        projectiles[i] = maingroup.create(0, 0, 'ammosheet', 0);
        game.physics.arcade.enable(projectiles[i]);
        projectiles[i].anchor.setTo(0.5, 1.0);
        projectiles[i].kill();
    }
}

function upgradeProjectile(projectileID) {
    'use strict';
    var old;
    old = projectileTypes[projectileID].upgrade;
    projectileTypes[projectileID].upgrade = lowest(projectileTypes[projectileID].upgrade + 1, projectileTypes[projectileID].upgradeMax);
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
        pj_text.setText(projectileTypes[selectedProjectile].name);
        // timer?
    }
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
        p.reset(shooter.x, shooter.y);
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
// projectile type 1
function collisionProjectile1(p, q) {
    'use strict';
}

function createProjectile1(p, t, q) {
    'use strict';
    if (q !== player) {
        p.body.velocity.x = -t.speed;
        p.body.setSize(12, 15, 9, 1);
        p.scale.x = -1;
    } else {
        p.body.velocity.x = t.speed;
        p.body.setSize(12, 15, -7, 1);
    }
}

//----------------------------------------------------------------
// projectile type 2
function collisionProjectile2(p, q) {
    'use strict';
}

function createProjectile2(p, t, q) {
    'use strict';
    if (q !== player) {
        p.body.velocity.x = -t.speed;
    } else {
        p.body.velocity.x = t.speed;
    }
}

//----------------------------------------------------------------
// projectile type 3
function collisionProjectile3(p, q) {
    'use strict';
}

function createProjectile3(p, t, q) {
    'use strict';
    if (q !== player) {
        p.body.velocity.x = -t.speed;
    } else {
        p.body.velocity.x = t.speed;
    }
}

//----------------------------------------------------------------
// projectile type 4
function collisionProjectile4(p, q) {
    'use strict';
}

function createProjectile4(p, t, q) {
    'use strict';
    if (q !== player) {
        p.body.velocity.x = -t.speed;
    } else {
        p.body.velocity.x = t.speed;
    }
}

//----------------------------------------------------------------
// projectile type 5
function collisionProjectile5(p, q) {
    'use strict';
}

function createProjectile5(p, t, q) {
    'use strict';
    if (q !== player) {
        p.body.velocity.x = -t.speed;
    } else {
        p.body.velocity.x = t.speed;
    }
}

//----------------------------------------------------------------
// projectile type 6
function collisionProjectile6(p, q) {
    'use strict';
}

function createProjectile6(p, t, q) {
    'use strict';
    if (q !== player) {
        p.body.velocity.x = -t.speed;
    } else {
        p.body.velocity.x = t.speed;
    }
}

//----------------------------------------------------------------
// projectile type 7
function collisionProjectile7(p, q) {
    'use strict';
}

function createProjectile7(p, t, q) {
    'use strict';
    if (q !== player) {
        p.body.velocity.x = -t.speed;
    } else {
        p.body.velocity.x = t.speed;
    }
}

//----------------------------------------------------------------
// projectile type 8
function collisionProjectile8(p, q) {
    'use strict';

}

function createProjectile8(p, t, q) {
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
        if ((projectiles[i].x > game.camera.x + gameWidth || projectiles[i].x < game.camera.x - projectiles[i].width) && projectiles[i].alive) {
            projectiles[i].kill();
        }
    }
}