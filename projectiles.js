// functions and variables for every type of projectile put in array for easy retrieval
var projectileTypes = [
        {   // geo weapon
            source: {},
            firerate: 15,
            speed: 800,
            frame: 0,
            upgrade: 0,
            upgradeMax: 2,
            damages: [1, 2, 3],
            collision: collisionProjectile1
        },
        {   // catapult weapon
            source: {},
            firerate: 30,
            speed: 500,
            frame: 3,
            upgrade: 0,
            upgradeMax: 2,
            damages: [1, 2, 3],
            collision: collisionProjectile2
        },
        {   // peashooter weapon
            source: {},
            firerate: 20,
            speed: 300,
            frame: 6,
            upgrade: 0,
            upgradeMax: 2,
            damages: [1, 2, 3],
            collision: collisionProjectile3
        },
        {   // waterballoon weapon
            source: {},
            firerate: 60,
            speed: 800,
            frame: 9,
            upgrade: 0,
            upgradeMax: 2,
            damages: [1, 2, 3],
            collision: collisionProjectile4
        },
        {   // paper plane weapon
            source: {},
            firerate: 30,
            speed: 500,
            frame: 12,
            upgrade: 0,
            upgradeMax: 2,
            damages: [1, 2, 3],
            collision: collisionProjectile5
        },
        {   // stink bomb weapon
            source: {},
            firerate: 20,
            speed: 300,
            frame: 15,
            upgrade: 0,
            upgradeMax: 2,
            damages: [1, 2, 3],
            collision: collisionProjectile6
        },
        {   // test tube weapon
            source: {},
            firerate: 20,
            speed: 300,
            frame: 18,
            upgrade: 0,
            upgradeMax: 2,
            damages: [1, 2, 3],
            collision: collisionProjectile7
        }
    ];

// other variables
var selectedProjectile = 0,
    maxProjectileCount = 50,
    projectileDelay = 0,
    fireRate = projectileTypes[selectedProjectile].firerate;

var projectiles = [];

//----------------------------------------------------------------
// basic projectiles
// initialise projectiles
function initProjectiles() {
    'use strict';
    var i;
    projectiles.length = maxProjectileCount;
    for (i = 0; i < maxProjectileCount; i += 1) {
        projectiles[i] = maingroup.create(0, 0, 'ammosheet', 0);
        game.physics.arcade.enable(projectiles[i]);
        projectiles[i].anchor.setTo(0.0, 1.0);
        projectiles[i].checkWorldBounds = true;
        projectiles[i].outOfBoundsKill = true;
        projectiles[i].kill();
    }
}

function upgradeProjectile(projectileID) {
    'use strict';
    projectileTypes[projectileID].upgrade = lowest(projectileTypes[projectileID].upgrade + 1, projectileTypes[projectileID].upgradeMax);
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
        // timer?
    }
}

function swapProjectile() {
    'use strict';
    changeProjectileSelected(selectedProjectile + 1);
}

function createProjectile(shooter) {
    'use strict';
    var p, t;
    p = getProjectile();
    t = projectileTypes[selectedProjectile];
    if (p) {
        p.angle = 0;
        p.body.angle = 0;
        p.source = shooter;
        p.collideHandler = t.collision;
        p.frame = t.frame + t.upgrade;
        p.reset(shooter.body.x, shooter.body.y);
        p.body.velocity.x = t.speed;
    }
}

function playerShoot() {
    'use strict';
    if (projectileDelay >= fireRate) {
        createProjectile(player);
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

//----------------------------------------------------------------
// projectile type 2
function collisionProjectile2(p, q) {
    'use strict';
}

//----------------------------------------------------------------
// projectile type 3
function collisionProjectile3(p, q) {
    'use strict';
}

//----------------------------------------------------------------
// projectile type 4
function collisionProjectile4(p, q) {
    'use strict';
}

//----------------------------------------------------------------
// projectile type 5
function collisionProjectile5(p, q) {
    'use strict';
}

//----------------------------------------------------------------
// projectile type 6
function collisionProjectile6(p, q) {
    'use strict';
}

//----------------------------------------------------------------
// projectile type 7
function collisionProjectile7(p, q) {
    'use strict';
}