// functions and variables for every type of projectile put in arrays for easy calling
var projectileTypeCount = 3,
    projectileFireRates = [15, 30, 20, 15, 20, 30, 25, 10],
    createProjectileHandlers = [createProjectile1, createProjectile2, createProjectile3, createProjectile4, createProjectile5, createProjectile6];

// other variables
var selectedProjectile = 0,
    maxProjectileCount = 50,
    projectileDelay = 0,
    fireRate = projectileFireRates[selectedProjectile];

var projectiles = [];

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
        selectedProjectile = newProjectileSelected % projectileTypeCount;
        if (selectedProjectile < 0) {
            selectedProjectile = projectileTypeCount + selectedProjectile;
        }
        fireRate = projectileFireRates[selectedProjectile];
        // timer?
    }
}

function swapProjectile() {
    'use strict';
    changeProjectileSelected(selectedProjectile + 1);
}

function playerShoot() {
    'use strict';
    if (projectileDelay >= fireRate) {
        createProjectileHandlers[selectedProjectile]();
        projectileDelay = 0;
        return true;
    }
    return false;
}

//----------------------------------------------------------------
// basic projectiles
// initialise projectiles
function initProjectiles() {
    'use strict';
    var i;
    projectiles.length = maxProjectileCount;
    for (i = 0; i < maxProjectileCount; i += 1) {
        projectiles[i] = maingroup.create(0, 0, 'projectilesheet', 0);
        game.physics.arcade.enable(projectiles[i]);
        projectiles[i].anchor.setTo(0.0, 1.0);
        projectiles[i].checkWorldBounds = true;
        projectiles[i].outOfBoundsKill = true;
        projectiles[i].kill();
    }
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

//----------------------------------------------------------------
// projectile type 1
function createProjectile1() {
    'use strict';
    var p;
    p = getProjectile();
    if (p) {
        p.angle = 0;
        p.body.angle = 0;
        p.collideHandler = collisionProjectile1;
        p.frame = 0;
        p.reset(player.body.x, player.body.y);
        p.body.velocity.x = 800;
    }
}

function collisionProjectile1(p, q) {
    'use strict';
}

//----------------------------------------------------------------
// projectile type 2
function createProjectile2() {
    'use strict';
    var p;
    p = getProjectile();
    if (p) {
        p.collideHandler = collisionProjectile2;
        p.frame = 1;
        p.reset(player.body.x, player.body.y);
        p.body.velocity.x = 500;
    }
}

function collisionProjectile2(p, q) {
    'use strict';
}

//----------------------------------------------------------------
// projectile type 3
function createProjectile3() {
    'use strict';
    var p;
    p = getProjectile();
    if (p) {
        p.collideHandler = collisionProjectile3;
        p.frame = 2;
        p.reset(player.body.x, player.body.y);
        p.body.velocity.x = 500;
    }
}

function collisionProjectile3(p, q) {
    'use strict';
}

//----------------------------------------------------------------
// projectile type 4
function createProjectile4() {
    'use strict';
    //child.collideHandler = collisionProjectile1;
    var p;
    p = getProjectile();
    if (p) {
        p.collideHandler = collisionProjectile4;
        p.frame = 3;
    }
}

function collisionProjectile4(p, q) {
    'use strict';
}

//----------------------------------------------------------------
// projectile type 5
function createProjectile5() {
    'use strict';
    //child.collideHandler = collisionProjectile1;
}

function collisionProjectile5(p, q) {
    'use strict';
}

//----------------------------------------------------------------
// projectile type 6
function createProjectile6() {
    'use strict';
    //child.collideHandler = collisionProjectile1;
}

function collisionProjectile6(p, q) {
    'use strict';
}