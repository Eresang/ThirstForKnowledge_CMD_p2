var numEnemies = 0,
    maxEnemies = 5,
    maxEnemiesInColumn = 1,
    skipEnemies = 14;

var stopScroll = 1;

var numPickups = 0,
    maxPickups = 8;

var gn_stageComplete = false,
    gn_lastCameraX = -gameWidth,
    gn_patternsPassed = 0,
    gn_patternMax = 8,
    gn_patternID = 0,
    gn_patternWidth = [32, 25, 70, 72],
    gn_patternPos = 0,
    gn_patterns = [
        { // start pattern
            pattern: [1, 2, 1, 1, 1, 2, 1, 1, 2, 2, 1, 0, 1, 0, 1, 1]
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
            pattern: [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 4, 0, 0, 0, 0]
        }
    ];

var gn_obstacleChance = 0.8,
    gn_obstacleSmallChance = 0.2,
    gn_enemyChance = 0.85,
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
    createRandomEnemy(x, y);
}

//----------------------------------------------------------------
var gn_pickupSkip = 20,
    gn_pickupInterval = 2;

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
        } else if (Math.random() < gn_enemyChance && numEnemies < maxEnemies && skipEnemies < 1) { // enemy
            genEnemy(x, h);
            skipEnemies = 4;
        } else if (gn_pickupSkip < 1 && Math.random() < gn_pickupChance && numPickups < maxPickups) { // pickup
            createRandomWeaponPickup(x, h);
            gn_pickupSkip = gn_pickupInterval;
        }
        h -= gn_bigHeight + gn_smallHeight;
    }
}

function generateLevelColumnNoBigObstacles(x) {
    'use strict';
    // loop counter, difficulty modifiers
    var i, l, p,
        foliageMask = [0.9, 0.2, 0.1, 0, 0, 0, 0.1, 0.2, 0.9],
        h = gameHeight - 128;
    
    // first fill in foliage
    for (i = 0; i < 9; i += 1) {
        foliageMask[i] = foliageMask[i] * Math.random();
    }
    
    // loop through all spawnpoints
    for (i = 0; i < 9; i += 1) {
        // check if there isn't already foliage
        if (foliageMask[i] < 0.2) {
            if (i < 3 || i > 6) {
                if (Math.random() < gn_obstacleSmallChance) {
                    createParaphernaliaA(x, h);
                }
            } else if (Math.random() < gn_enemyChance && numEnemies < maxEnemies && skipEnemies < 1) { // enemy
                genEnemy(x, h);
                skipEnemies = 2;
            } else if (gn_pickupSkip < 1 && Math.random() < gn_pickupChance && numPickups < maxPickups) { // pickup
                createRandomPickup(x, h);
                gn_pickupSkip = gn_pickupInterval;
            }
        } else if (i < 4 || i > 5) {
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

function restartLevel() {
    'use strict';
    maingroup.forEachAlive(function e(child) {
        child.kill();
    });
    
    // reset variables, reset view and game
    gn_pickupSkip = 20;
    gn_pickupInterval = 2;
    skipEnemies = 14;
    selectedProjectile = 0;
    numPickups = 0;
    maxPickups = 8;
    damageTaken = 0;
    gn_lastCameraX = -gameWidth,
    gn_patternsPassed = 0;
    gn_patternID = 0;
    pi_allowAnimation = true;
    difficultyModifier = 2;
    difficultyModifierInverse = 1;
    pi_oldPlayerAngle = 90;
    pi_oldM = 1;
    stopScroll = 1;
    gn_stageComplete = false;
    
    game.camera.x = 0;
    playerRevive();
    game.camera.follow(player);
    initLevel();
    updateWeaponText();
}

function generateLevel() {
    'use strict';
    var p = gn_patterns[gn_patternID];
    // if camera x > last x since last time, generate new row
    if (game.camera.x >= gn_lastCameraX) {
        if (gn_lastCameraX <= game.world.bounds.width) {
            game.world.resize(game.world.bounds.width + gameWidth, gameHeight);
            game.physics.arcade.setBounds(0, 130, game.world.bounds.width, 250);
            gn_backdropLayer.width = game.world.bounds.width;
        }
        
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
            createUpgradeText('Principal prime ahead...', sc_textstyle);
            createPrimePrincipal(gn_lastCameraX + gameWidth, gameHeight / 2 - 25);
            game.physics.arcade.setBounds(game.camera.x, 130, game.world.bounds.width, 250);
            break;
        case 4: // stop scrolling
            stopScroll = 0;
            break;
        case 5: // stop spawning normal enemies
            skipEnemies = 40;
            break;
        default: 
            
        }
        // force object spawns to spawn after a certain amount of columns
        gn_pickupSkip = highest(0, gn_pickupSkip - 1);
        skipEnemies = highest(0, skipEnemies - 1);        
        
        // update lastX
        gn_lastCameraX += gn_patternWidth[p.pattern[gn_patternPos]] + gn_columnspace;
        gn_patternPos += 1;
        
        genScenery(gn_lastCameraX + gameWidth);
        
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
    //game.world.resize(gameWidth * 32, gameHeight);
    gn_backdropLayer = game.add.tileSprite(0, 0, game.world.width, gameHeight, 'backdrop');
}

function initLevel() {
    'use strict';
    gn_patternID = 0;
    while (gn_lastCameraX <= game.camera.x) {
        generateLevel();
        genScenery();
    }
}