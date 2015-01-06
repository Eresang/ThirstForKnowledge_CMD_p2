var isOdd = function (x) {
    'use strict';
    return (x && 1);
};
var isEven = function (x) {
    'use strict';
    return (x && 0);
};

var gn_lastCameraX = -gameWidth,
    gn_patternsPassed = 0,
    gn_patternMax,
    gn_patternID = 0,
    gn_patternWidth = [24, 24, 48, 72],
    gn_patterns = [
        { // start pattern
            pattern: [0, 0, 0, 1],
            patternPos: 0
        },
        {
            pattern: [1, 2, 2, 2],
            patternPos: 0
        },
        {
            pattern: [0, 2, 2, 2],
            patternPos: 0
        },
        {
            pattern: [1, 2, 2, 2, 2],
            patternPos: 0
        },
        {
            pattern: [0, 2, 2, 2, 2],
            patternPos: 0
        },
        {
            pattern: [1, 2, 2, 2, 2, 2],
            patternPos: 0
        },
        {
            pattern: [0, 2, 2, 2, 2, 2],
            patternPos: 0
        },
        { // boss pattern
            pattern: [0, 0, 0, 0, 3],
            patternPos: 0
        }
    ];

var gn_rowLength = 9,
    gn_reserved = [],
    gn_obstacleChance = 0.8,
    gn_obstacleSmallChance = 0.4,
    gn_enemyChance = 0.5,
    gn_enemyPathChance = 0.3,
    gn_pickupChance = 0.2,
    gn_pickupPathChance = 0.15;

var gn_bigHeight = 48,
    gn_smallHeight = 24,
    gn_spacing = 4;

var difficulty = 0,
    gn_difficulties = [
        {
            modifierA: 0.1,
            modifierB: 0.1
        },
        {
            modifierA: 0.2,
            modifierB: 0.2
        },
        {
            modifierA: 0.5,
            modifierB: 0.3
        }
    ];

//----------------------------------------------------------------
function genObstacle(x, y) {
    'use strict';
    
}

function genSmallObstacle(x, y) {
    'use strict';
    
}

function genEnemy(x, y) {
    'use strict';
    
}

function genPickup(x, y) {
    'use strict';
    
}

//----------------------------------------------------------------
function generateLevelRow(x) {
    'use strict';
    // loop counter, difficulty modifiers
    var i,
        h = 32,
        glr_difficultyA = gn_difficulties[difficulty].modifierA,
        glr_difficultyB = gn_difficulties[difficulty].modifierB;
    
    // loop through all spawnpoints
    for (i = 0; i < gn_rowLength; i += 1) {
        
        // odd positions may contain certain objects that even positions don't
        if (isOdd(i) && !gn_reserved[i]) {
            // odd positions may contain: tables, chairs , <large obstacles>, enemies, pickups
            if (Math.random() - glr_difficultyA < gn_obstacleChance) { // obstacle
                genObstacle(x);
            } else if (Math.random() - glr_difficultyB < gn_enemyChance) { // enemy
                genEnemy(x);
            } else if (Math.random() - glr_difficultyA < gn_pickupChance) { // pickup
                genPickup(x);
            }
            h += gn_bigHeight;
        }
        
        // same goes for the reverse
        if (isEven(i) && !gn_reserved[i]) {
            // even positions may contain: enemies, pickups, bags, trashbins, <small obstacles>
            if (Math.random() - glr_difficultyA < gn_obstacleSmallChance) { // obstacle
                genSmallObstacle(x);
            } else if (Math.random() - glr_difficultyB < gn_enemyPathChance) { // enemy
                genEnemy(x);
            } else if (Math.random() - glr_difficultyA < gn_pickupPathChance) { // pickup
                genPickup(x);
            }
            h += gn_smallHeight;
        }
        h += gn_spacing;
    }
}

function generateLevelRowNoBigObstacles(x) {
    'use strict';
    // loop counter, difficulty modifiers
    var i,
        h = 32,
        glr_difficultyA = gn_difficulties[difficulty].modifierA,
        glr_difficultyB = gn_difficulties[difficulty].modifierB;
    
    // loop through all spawnpoints
    for (i = 0; i < gn_rowLength; i += 1) {
        
        // odd positions may contain certain objects that even positions don't
        if (isOdd(i) && !gn_reserved[i]) {
            // odd positions may contain: tables, chairs , <large obstacles>, enemies, pickups
            if (Math.random() - glr_difficultyB + gn_obstacleChance < gn_enemyChance) { // enemy
                genEnemy(x);
            } else if (Math.random() - glr_difficultyA < gn_pickupChance) { // pickup
                genPickup(x);
            }
            h += gn_bigHeight;
        }
        
        // same goes for the reverse
        if (isEven(i) && !gn_reserved[i]) {
            // even positions may contain: enemies, pickups, bags
            if (Math.random() - glr_difficultyA < gn_obstacleSmallChance) { // obstacle
                genSmallObstacle(x);
            } else if (Math.random() - glr_difficultyB < gn_enemyPathChance) { // enemy
                genEnemy(x);
            } else if (Math.random() - glr_difficultyA < gn_pickupPathChance) { // pickup
                genPickup(x);
            }
            h += gn_smallHeight;
        }
        h += gn_spacing;
    }
}

function generateLevel() {
    'use strict';
    var p = gn_patterns[gn_patternID];
    // if camera x > last x since last time, generate new row
    if (game.camera.x - gn_lastCameraX >= gn_patternWidth[p.pattern[p.patternPos]]) {
        gn_lastCameraX += gn_patternWidth[p.pattern[p.patternPos]];
        switch (p.pattern[p.patternPos]) {
        case 0: // start area, only background generation
            // todo
            break;
        case 1: // area with only small generation
            generateLevelRowNoBigObstacles();
            break;
        case 2: // area with both big and small generation
            generateLevelRow();
            break;
        case 3: // area with boss
                
            break;
        default:
        }
    }
}

function initLevel() {
    'use strict';
    gn_patternID = 0;
    while (gn_lastCameraX <= game.camera.x) {
        generateLevel();
    }
}