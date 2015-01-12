var maxObstacleCount = 200,
    obstacles = [];

// functions and variables for every type of projectile put in array for easy retrieval
var obstacleTypes = [
        {   // 0 tables
            sheet: 'tables',
            bodyWidth: 70,
            bodyHeight: 12,
            bodyXOffset: 0,
            bodyYOffset: 2,
            bodyEnable: true,
            collision: null
        },
        {   // 1 chairs
            sheet: 'chairs',
            bodyWidth: 20,
            bodyHeight: 7,
            bodyXOffset: 0,
            bodyYOffset: 2,
            bodyEnable: true,
            collision: null
        },
        {   // 2 foliage
            sheet: 'foliage',
            bodyWidth: 15,
            bodyHeight: 6,
            bodyXOffset: 5,
            bodyYOffset: 2,
            bodyEnable: true,
            collision: null
        }, // here be paraphernalia
        {   // 3 full bucket
            sheet: 'paraphernaliaA',
            bodyWidth: 13,
            bodyHeight: 6,
            bodyXOffset: 0,
            bodyYOffset: -2,
            bodyEnable: true,
            collision: collideWaterBucketA,
            respin: 0.2
        },
        {   // 4 empty bucket with spill
            sheet: 'paraphernaliaA',
            bodyWidth: 10,
            bodyHeight: 6,
            bodyXOffset: 4,
            bodyYOffset: -2,
            bodyEnable: true,
            collision: null,
            respin: 1.0
        },
        {   // 5 empty bucket
            sheet: 'paraphernaliaA',
            bodyWidth: 13,
            bodyHeight: 6,
            bodyXOffset: 0,
            bodyYOffset: -2,
            bodyEnable: true,
            collision: collideWaterBucketB,
            respin: 0.2
        },
        {   // 6 waterspill
            sheet: 'paraphernaliaA',
            bodyWidth: 0,
            bodyHeight: 0,
            bodyXOffset: 0,
            bodyYOffset: 0,
            bodyEnable: false,
            collision: null,
            respin: 0.2
        },
        {   // 7 empty bucket, toppled
            sheet: 'paraphernaliaA',
            bodyWidth: 10,
            bodyHeight: 6,
            bodyXOffset: 4,
            bodyYOffset: -2,
            bodyEnable: true,
            collision: null,
            respin: 0.9
        },
        {   // 8 trashbin
            sheet: 'paraphernaliaA',
            bodyWidth: 13,
            bodyHeight: 8,
            bodyXOffset: 7,
            bodyYOffset: 2,
            bodyEnable: true,
            collision: null,
            respin: 0.3
        },
        {   // 9 globe
            sheet: 'paraphernaliaA',
            bodyWidth: 19,
            bodyHeight: 6,
            bodyXOffset: 4,
            bodyYOffset: 2,
            bodyEnable: true,
            collision: null,
            respin: 0.7
        }
    ];

// --------------------------------------------------------------------------------------
function initObstacles() {
    'use strict';
    var i;
    
    obstacles.length = maxObstacleCount;
    for (i = 0; i < maxObstacleCount; i += 1) {
        obstacles[i] = maingroup.create(0, 0);
        game.physics.arcade.enable(obstacles[i]);
        obstacles[i].anchor.setTo(0.0, 1.0);
        obstacles[i].body.immovable = true;
        obstacles[i].kill();
    }
}

function getObstacle() {
    'use strict';
    var i,
        p = null;
    
    for (i = 0; i < maxObstacleCount; i += 1) {
        if (obstacles[i].alive === false) {
            p = obstacles[i];
            return p;
        }
    }
    return p;
}

// --------------------------------------------------------------------------------------
function createObstacle(o, t) {
    'use strict';
    if ((o) && (t)) {
        o.angle = 0;
        o.body.angle = 0;
        o.body.setSize(t.bodyWidth, t.bodyHeight, t.bodyXOffset, t.bodyYOffset);
        o.body.enable = t.bodyEnable;
        o.loadTexture(t.sheet);
        o.collideHandler = t.collision;
    }
}

function createChair(x, y, backFacing) {
    'use strict';
    var o, t;
    o = getObstacle();
    if (!(o)) {
        return;
    }
    t = obstacleTypes[1];
    
    createObstacle(o, t);
    // set frame
    if (backFacing) {
        o.frame = 1;
    } else {
        o.frame = 0;
    }
    o.reset(x, y);
}

function createTable(x, y, withChairs) {
    'use strict';
    var o, t;
    o = getObstacle();
    if (!(o)) {
        return;
    }
    t = obstacleTypes[0];
    
    createObstacle(o, t);
    // set frame, in such a way the table without stuff on it is most prevalent
    o.frame = highest(0, Math.floor(Math.random() * 14) - 4);
    o.reset(Math.floor(Math.random() * 3) + x - 1, Math.floor(Math.random() * 3) + y - 1);
    if (withChairs) {
        // max 4 chairs
        if (Math.random() > 0.3) { // frontfacing A
            createChair(Math.floor(Math.random() * 3) + x + 12, y - 2, false);
        }
        if (Math.random() > 0.3) { // frontfacing B
            createChair(Math.floor(Math.random() * 3) + x + 36, y - 2, false);
        }
        if (Math.random() > 0.3) { // backfacing C
            createChair(Math.floor(Math.random() * 5) + x + 7, y + 4, true);
        }
        if (Math.random() > 0.3) { // backfacing D
            createChair(Math.floor(Math.random() * 5) + x + 39, y + 4, true);
        }
    }
}

function createFoliage(x, y) {
    'use strict';
    var o, t;
    o = getObstacle();
    if (!(o)) {
        return;
    }
    t = obstacleTypes[2];
    
    // set frame
    createObstacle(o, t);
    o.frame = 0;
    o.reset(Math.floor(Math.random() * 2) + x, Math.floor(Math.random() * 3) + y - 1);
}

function createParaphernaliaA(x, y) {
    'use strict';
    var o, t, p;
    o = getObstacle();
    p = Math.floor(Math.random() * 7);
    while (Math.random() < obstacleTypes[3 + p].respin) {
        p = Math.floor(Math.random() * 7);
    }
    t = obstacleTypes[3 + p];
    createObstacle(o, t);
    o.frame = p;
    o.reset(Math.floor(Math.random() * 2) + x, Math.floor(Math.random() * 3) + y - 1);
}

// --------------------------------------------------------------------------------------
function collideWaterBucketA(p, q) {
    'use strict';
    if (p === player && (q)) {
        var t;
        t = obstacleTypes[4];
        q.frame = 1;
        q.body.setSize(t.bodyWidth, t.bodyHeight, t.bodyXOffset, t.bodyYOffset);
        q.collideHandler = null;
    }
}

function collideWaterBucketB(p, q) {
    'use strict';
    if (p === player && (q)) {
        var t;
        t = obstacleTypes[7];
        q.frame = 4;
        q.body.setSize(t.bodyWidth, t.bodyHeight, t.bodyXOffset, t.bodyYOffset);
        q.collideHandler = null;
    }
}

// --------------------------------------------------------------------------------------
function killObstacles() {
    'use strict';
    var i;
    
    for (i = 0; i < obstacles.length; i += 1) {
        if (obstacles[i].x < game.camera.x - obstacles[i].width && obstacles[i].alive) {
            obstacles[i].kill();
        }
    }
}