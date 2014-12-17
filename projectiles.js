// functions and variables for every type of projectile put in arrays for easy calling
var projectileTypeCount = 6,
    projectileFireRates = [15, 30, 20, 15, 20, 30, 25, 10],
    createProjectileHandlers = [createProjectile1, createProjectile2, createProjectile3, createProjectile4, createProjectile5, createProjectile6];

// other variables
var selectedProjectile = 0,
    maxProjectileCount = 10,
    projectileDelay = 0,
    fireRate = projectileFireRates[selectedProjectile];

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

function playerShoot() {
    'use strict';
    if (projectileDelay >= fireRate) {
        createProjectileHandlers[selectedProjectile]();
        projectileDelay = 0;
    }
}

//----------------------------------------------------------------
// projectile type 1
function createProjectile1() {
    'use strict';
    var p;
    p = maingroup.create(player.body.x, player.body.y - 16, 'projectilesheet', 0);
    game.physics.arcade.enable(p);
    p.collideHandler = collisionProjectile1;
    p.anchor.setTo(0.0, 1.0);
    p.body.velocity.x = 500;
}

function collisionProjectile1(p, q) {
    'use strict';
}

//----------------------------------------------------------------
// projectile type 2
function createProjectile2() {
    'use strict';
    child.collideHandler = collisionProjectile1;
}

function collisionProjectile2(p, q) {
    'use strict';
}

//----------------------------------------------------------------
// projectile type 3
function createProjectile3() {
    'use strict';
    child.collideHandler = collisionProjectile1;
}

function collisionProjectile3(p, q) {
    'use strict';
}

//----------------------------------------------------------------
// projectile type 4
function createProjectile4() {
    'use strict';
    child.collideHandler = collisionProjectile1;
}

function collisionProjectile4(p, q) {
    'use strict';
}

//----------------------------------------------------------------
// projectile type 5
function createProjectile5() {
    'use strict';
    child.collideHandler = collisionProjectile1;
}

function collisionProjectile5(p, q) {
    'use strict';
}

//----------------------------------------------------------------
// projectile type 6
function createProjectile6() {
    'use strict';
    child.collideHandler = collisionProjectile1;
}

function collisionProjectile6(p, q) {
    'use strict';
}