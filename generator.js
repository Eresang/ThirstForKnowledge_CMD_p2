var numEnemies = 0,
    maxEnemies = 5,
    maxEnemiesInColumn = 1;

var numPickups = 0,
    maxPickups = 8,
    maxPickupsInColumn = 1;

var gn_lastCameraX = -gameWidth,
    gn_patternsPassed = 0,
    gn_patternMax = 31,
    gn_patternID = 0,
    gn_patternWidth = [32, 25, 70, 72],
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

//----------------------------------------------------------------
function genEnemy(x, y) {
    'use strict';
    
}

function genPickup(x, y) {
    'use strict';
    
}

//----------------------------------------------------------------
function generateLevelColumn(x) {
    'use strict';
    // loop counter, difficulty modifiers
    var i,
        h = gameHeight - 128 - gn_smallHeight;
    
    // loop through all table spawnpoints
    for (i = 0; i < 4; i += 1) {
        // table priority
        if (Math.random() < gn_obstacleChance) { // obstacle
            createTable(x, h, true);
        } else if (Math.random() < gn_enemyChance && numEnemies < maxEnemies) { // enemy
            genEnemy(x, h);
            numEnemies += 1;
        } else if (Math.random() < gn_pickupChance && numPickups < maxPickups) { // pickup
            genPickup(x, h);
            numPickups += 1;
        }
        h -= gn_bigHeight + gn_smallHeight;
    }
}

function generateLevelColumnNoBigObstacles(x) {
    'use strict';
    // loop counter, difficulty modifiers
    var i, l, p,
        e_count = 0,
        p_count = 0,
        maxFoliageInColumn = 4,
        foliageMask = [false, false, false, false, false, false, false, false, false],
        h = gameHeight - 128;
    
    // first fill in foliage
    l = Math.floor(Math.random() * maxFoliageInColumn);
    for (i = 0; i < l; i += 1) {
        p = Math.floor(Math.random() * foliageMask.length);
        if (!foliageMask[p - 1] && !foliageMask[p + 1]) {
            foliageMask[p] = true;
        }
    }
    
    // loop through all spawnpoints
    for (i = 0; i < gn_columnLength; i += 1) {
        // check if there isn't already foliage
        if (!foliageMask[i]) {
            if ((i === 0 || i === gn_columnLength - 1) && Math.random() * 2.5 < gn_obstacleSmallChance) {
                createParaphernaliaA(x, h);
            } else if (Math.random() < gn_enemyChance && numEnemies < maxEnemies && e_count < maxEnemiesInColumn) { // enemy
                genEnemy(x, h);
                e_count += 1;
                numEnemies += 1;
            } else if (Math.random() < gn_pickupChance && numPickups < maxPickups && p_count < maxPickupsInColumn) { // pickup
                genPickup(x, h);
                p_count += 1;
                numPickups += 1;
            }
        } else {
            createFoliage(x, h);
        }
        // creation height adjustment
        if (isOdd(i)) {
            h -= gn_bigHeight;
        } else {
            h -= gn_smallHeight;
        }
    }
}

function generateLevel() {
    'use strict';
    var p = gn_patterns[gn_patternID];
    // if camera x > last x since last time, generate new row
    if (game.camera.x >= gn_lastCameraX) {
        console.log("genLevel " + (gn_lastCameraX + gameWidth));
        switch (p.pattern[gn_patternPos]) {
        case 0: // start area, only background generation
            // todo
            break;
        case 1: // area with only small generation
            generateLevelColumnNoBigObstacles(gn_lastCameraX + gameWidth);
            break;
        case 2: // area with both big and small generation
            generateLevelColumn(gn_lastCameraX + gameWidth);
            break;
        case 3: // area with boss
                
            break;
        default:
        }
        gn_lastCameraX += gn_patternWidth[p.pattern[gn_patternPos]] + gn_columnspace;
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