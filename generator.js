var numEnemies = 0,
    maxEnemies = 5,
    maxEnemiesInColumn = 1;

var numPickups = 0,
    maxPickups = 8;

var gn_lastCameraX = -gameWidth,
    gn_patternsPassed = 0,
    gn_patternMax = 31,
    gn_patternID = 0,
    gn_patternWidth = [32, 25, 70, 72],
    gn_patternPos = 0,
    gn_patterns = [
        { // start pattern
            pattern: [0, 0, 0, 0, 0, 0, 1]
        },
        {
            pattern: [1, 2, 2, 1, 1, 2, 2, 1, 0]
        },
        {
            pattern: [0, 2, 2, 1, 1, 2, 2, 1]
        },
        {
            pattern: [2, 2, 0, 2, 2, 0, 1, 2, 1]
        },
        {
            pattern: [2, 2, 1, 2, 2, 1, 2, 0]
        },
        {
            pattern: [0, 2, 2, 0, 1, 2, 2]
        },
        {
            pattern: [1, 2, 0, 1, 2, 2, 1]
        },
        {
            pattern: [2, 2, 0, 2, 1, 2, 2, 1]
        },
        {
            pattern: [2, 2, 0, 1, 2, 2, 1, 0, 2]
        },
        {
            pattern: [2, 2, 0, 2, 2, 0, 2]
        },
        {
            pattern: [1, 2, 2, 0, 2, 0, 2, 1]
        },
        {
            pattern: [1, 2, 0, 2, 0, 2, 1]
        },
        { // boss pattern
            pattern: [0, 0, 0, 0, 0, 0, 3]
        }
    ];

var gn_columnLength = 9,
    gn_reserved = [false, false, false, false, false, false, false, false, false],
    gn_obstacleChance = 0.8,
    gn_obstacleSmallChance = 0.2,
    gn_enemyChance = 0.5,
    gn_enemyPathChance = 0.3,
    gn_pickupChance = 0.2,
    gn_pickupPathChance = 0.15;

var gn_bigHeight = 32,
    gn_smallHeight = 16,
    gn_spacing = 4,
    gn_columnspace = 8;

var gn_backdropLayer;

//----------------------------------------------------------------
function genEnemy(x, y) {
    'use strict';
    createCanteenLady(x, y);
}

function genPickup(x, y) {
    'use strict';
    
}

//----------------------------------------------------------------
var gn_pickupSkip = 0,
    gn_pickupInterval = 2;

function generateLevelColumn(x) {
    'use strict';
    // loop counter, difficulty modifiers
    var i,
        a = x + 16,
        e_count = 0,
        h = gameHeight - 128 - gn_smallHeight;
    
    // loop through all table spawnpoints
    for (i = 0; i < 4; i += 1) {
        // table priority
        if (Math.random() < gn_obstacleChance) { // obstacle
            createTable(a, h, true);
        } else if (Math.random() < gn_enemyChance && numEnemies < maxEnemies && e_count < maxEnemiesInColumn) { // enemy
            genEnemy(a, h);
            e_count += 1;
        } else if (gn_pickupSkip < 1 && Math.random() < gn_pickupChance && numPickups < maxPickups) { // pickup
            createRandomWeaponPickup(a, h);
            gn_pickupSkip = gn_pickupInterval;
        }
        h -= gn_bigHeight + gn_smallHeight;
        a += 32;
    }
    if (gn_pickupSkip > 0) {
        gn_pickupSkip -= 1;
    }
}

function generateLevelColumnNoBigObstacles(x) {
    'use strict';
    // loop counter, difficulty modifiers
    var i, l, p,
        a = x,
        e_count = 0,
        maxFoliageInColumn = 4,
        foliageMask = [false, false, false, false, false, false, false, false, false],
        h = gameHeight - 128;
    
    // first fill in foliage
    l = Math.floor(Math.random() * maxFoliageInColumn);
    // some fancy chance reduction
    if (l > 2 && Math.random() > 0.3) {
        l -= 1;
    }
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
            if ((i === 0 || i === gn_columnLength - 1) && Math.random() < gn_obstacleSmallChance) {
                createParaphernaliaA(a, h);
            } else if (Math.random() < gn_enemyChance && numEnemies < maxEnemies && e_count < maxEnemiesInColumn) { // enemy
                genEnemy(a, h);
                e_count += 1;
            } else if (gn_pickupSkip < 1 && Math.random() < gn_pickupChance && numPickups < maxPickups) { // pickup
                createRandomPickup(a, h);
                gn_pickupSkip = gn_pickupInterval;
            }
        } else {
            createFoliage(a, h);
        }
        // creation height adjustment
        if (isOdd(i)) {
            h -= gn_bigHeight;
        } else {
            h -= gn_smallHeight;
        }
        a += 16;
    }
    if (gn_pickupSkip > 0) {
        gn_pickupSkip -= 1;
    }
}

function generateLevel() {
    'use strict';
    var p = gn_patterns[gn_patternID];
    // if camera x > last x since last time, generate new row
    if (game.camera.x >= gn_lastCameraX) {
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
        
        // switch to the next pattern?
        if (gn_patternPos >= p.pattern.length) {
            gn_patternPos = 0;
            gn_patternsPassed += 1;
            if (gn_patternsPassed >= gn_patternMax) {
                gn_patternID = gn_patterns.length - 1;
            } else {
                gn_patternID = Math.floor(Math.random() * (gn_patterns.length - 2)) + 1;
            }
        }
    }
}

function initGenerator() {
    'use strict';
    game.world.resize(gameWidth * 32, gameHeight);
    game.physics.arcade.setBounds(0, 130, gameWidth * 32, 250);
    gn_backdropLayer = game.add.tileSprite(0, 0, game.world.width, gameHeight, 'backdrop');
}

function initLevel() {
    'use strict';
    gn_patternID = 0;
    while (gn_lastCameraX <= game.camera.x) {
        generateLevel();
    }
}