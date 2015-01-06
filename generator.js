var isOdd = function (x) {
    'use strict';
    return (x & 1);
};
var isEven = function (x) {
    'use strict';
    return (x & 0);
};

var gn_lastCameraX = -gameWidth,
    gn_patternsPassed = 0,
    gn_patternMax = 31,
    gn_patternID = 0,
    gn_patternWidth = [32, 70, 25, 72],
    gn_patternPos = 0,
    gn_patterns = [
        { // start pattern
            pattern: [0, 0, 0, 1]
        },
        {
            pattern: [1, 2, 1, 2, 1, 2, 1]
        },
        {
            pattern: [0, 2, 1, 2, 1, 2, 1]
        },
        {
            pattern: [1, 2, 1, 2, 1, 2, 0]
        },
        {
            pattern: [0, 2, 1, 2, 1, 2, 0]
        },
        {
            pattern: [0, 2, 0, 2, 1, 2, 0]
        },
        {
            pattern: [0, 2, 1, 2, 0, 2, 1]
        },
        {
            pattern: [0, 2, 0, 2, 1, 2, 1]
        },
        {
            pattern: [1, 2, 1, 2, 0, 2, 1]
        },
        {
            pattern: [1, 2, 1, 2, 0, 2, 0]
        },
        {
            pattern: [1, 2, 0, 2, 1, 2, 1]
        },
        {
            pattern: [1, 2, 0, 2, 0, 2, 1]
        },
        { // boss pattern
            pattern: [0, 0, 0, 0, 3]
        }
    ];

var gn_columnLength = 9,
    gn_reserved = [false, false, false, false, false, false, false, false, false],
    gn_obstacleChance = 0.8,
    gn_obstacleSmallChance = 0.4,
    gn_enemyChance = 0.5,
    gn_enemyPathChance = 0.3,
    gn_pickupChance = 0.2,
    gn_pickupPathChance = 0.15;

var gn_bigHeight = 32,
    gn_smallHeight = 16,
    gn_spacing = 4,
    gn_columnspace = 8;

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
var tC = 0;
function genObstacle(x, y) {
    'use strict';
    spawnObstacle(x, y, tC);
    obstacleArray[tC].loadTexture('obstacle');
    obstacleArray[tC].body.setSize(70, 8);
    tC += 1;
}

function genSmallObstacle(x, y, inBetween) {
    'use strict';
    if (inBetween) {
        spawnObstacle(x, y, tC);
        obstacleArray[tC].loadTexture('smallobstacle');
        obstacleArray[tC].body.setSize(16, 4);
        console.log(obstacleArray[tC].width + ' ' + obstacleArray[tC].height);
        tC += 1;
    }
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
        h = gameHeight - 128,
        glr_difficultyA = gn_difficulties[difficulty].modifierA,
        glr_difficultyB = gn_difficulties[difficulty].modifierB;
    
    // loop through all spawnpoints
    for (i = 0; i < gn_columnLength; i += 1) {
        // odd positions may contain certain objects that even positions don't
        if (isOdd(i)) {
            // odd positions may contain: tables, chairs , <large obstacles>, enemies, pickups
            if (Math.random() - glr_difficultyA < gn_obstacleChance) { // obstacle
                genObstacle(x, h);
            } else if (Math.random() - glr_difficultyB < gn_enemyChance) { // enemy
                genEnemy(x, h);
            } else if (Math.random() - glr_difficultyA < gn_pickupChance) { // pickup
                genPickup(x, h);
            }
            h -= gn_bigHeight;
        } else { // else, reverse
            // even positions may contain: enemies, pickups, bags, trashbins, <small obstacles>
            if (Math.random() - glr_difficultyA < gn_obstacleSmallChance) { // obstacle
                genSmallObstacle(x, h, false);
            } else if (Math.random() - glr_difficultyB < gn_enemyPathChance) { // enemy
                genEnemy(x, h);
            } else if (Math.random() - glr_difficultyA < gn_pickupPathChance) { // pickup
                genPickup(x, h);
            }
            h -= gn_smallHeight;
        }
        h -= gn_spacing;
    }
}

function generateLevelRowNoBigObstacles(x) {
    'use strict';
    // loop counter, difficulty modifiers
    var i,
        h = gameHeight - 128,
        glr_difficultyA = gn_difficulties[difficulty].modifierA,
        glr_difficultyB = gn_difficulties[difficulty].modifierB;
    
    // loop through all spawnpoints
    for (i = 0; i < gn_columnLength; i += 1) {
        // odd positions may contain certain objects that even positions don't
        if (isOdd(i)) {
            // odd positions may contain: tables, chairs , <large obstacles>, enemies, pickups
            if (Math.random() - glr_difficultyA < gn_obstacleSmallChance) { // obstacle
                genSmallObstacle(x, h, true);
            } else if (Math.random() - glr_difficultyB < gn_enemyChance) { // enemy
                genEnemy(x, h);
            } else if (Math.random() - glr_difficultyA < gn_pickupChance) { // pickup
                genPickup(x, h);
            }
            h -= gn_bigHeight;
        } else { // else, reverse
            // even positions may contain: enemies, pickups, bags
            if (Math.random() - glr_difficultyB + gn_obstacleSmallChance < gn_enemyPathChance) { // enemy
                genEnemy(x, h);
            } else if (Math.random() - glr_difficultyA < gn_pickupPathChance) { // pickup
                genPickup(x, h);
            }
            h -= gn_smallHeight;
        }
        h -= gn_spacing;
    }
}

function generateLevel() {
    'use strict';
    var p = gn_patterns[gn_patternID];
    // if camera x > last x since last time, generate new row
    if (game.camera.x >= gn_lastCameraX) {
        gn_lastCameraX += gn_patternWidth[p.pattern[gn_patternPos]] + gn_columnspace;
        console.log("genLevel " + (gn_lastCameraX + gameWidth));
        switch (p.pattern[gn_patternPos]) {
        case 0: // start area, only background generation
            // todo
            break;
        case 1: // area with only small generation
            generateLevelRowNoBigObstacles(gn_lastCameraX + gameWidth);
            break;
        case 2: // area with both big and small generation
            generateLevelRow(gn_lastCameraX + gameWidth);
            break;
        case 3: // area with boss
                
            break;
        default:
        }
        gn_patternPos += 1;
        if (gn_patternPos >= p.pattern.length) {
            gn_patternPos = 0;
            gn_patternID = lowest(gn_patterns.length - 1, gn_patternID + 1);
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