var maxSceneryCount = 40,
    scenery = [];

// functions and variables for every type of projectile put in array for easy retrieval
var sceneryTypes = [
        {   // 0 window
            Xshift: 12,
            frame: 0,
            objectWidth: 32,
            YOffset: 6,
            repeat: [2, 8],
            respin: 0.05
        },
        {   // 1 locker
            Xshift: 4,
            frame: 1,
            objectWidth: 22,
            YOffset: -1,
            repeat: [6, 12],
            respin: 0.65
        },
        {   // 2 locker b
            Xshift: 4,
            frame: 2,
            objectWidth: 17,
            YOffset: -1,
            repeat: [4, 8],
            respin: 0.65
        },
        {   // 3 flag
            Xshift: 8,
            frame: 3,
            objectWidth: 44,
            YOffset: 8,
            repeat: [1, 1],
            respin: 0.65
        },
        {   // 4 broom
            Xshift: 1,
            frame: 4,
            objectWidth: 24,
            YOffset: -2,
            repeat: [1, 1],
            respin: 0.8
        },
        {   // 5 hose
            Xshift: 4,
            frame: 5,
            objectWidth: 36,
            YOffset: 0,
            repeat: [1, 1],
            respin: 0.85
        },
        {   // 6 extinguisher
            Xshift: 4,
            frame: 6,
            objectWidth: 28,
            YOffset: 4,
            repeat: [1, 1],
            respin: 0.85
        },
        {   // 7 skeleton
            Xshift: 4,
            frame: 7,
            objectWidth: 28,
            YOffset: -1,
            repeat: [1, 1],
            respin: 0.85
        },
        {   // 8 wc door
            Xshift: 4,
            frame: 8,
            objectWidth: 18,
            YOffset: 0,
            repeat: [1, 1],
            respin: 0.9
        },
        {   // 9 space
            Xshift: 4,
            frame: 9,
            objectWidth: 18,
            YOffset: 0,
            repeat: [1, 4],
            respin: 0.7
        }
    ];

var sc_repeat = 4,
    sc_repeatType = sceneryTypes[9],
    sc_lastX = 0;

// --------------------------------------------------------------------------------------
function initScenery() {
    'use strict';
    var i;
    
    scenery.length = maxSceneryCount;
    for (i = 0; i < maxSceneryCount; i += 1) {
        scenery[i] = maingroup.create(0, 0, "scenerysheet", 0);
        game.physics.arcade.enable(scenery[i]);
        scenery[i].anchor.setTo(0.5, 1.0);
        scenery[i].body.enable = false;
        scenery[i].kill();
    }
}

function getScenery() {
    'use strict';
    var i,
        p = null;
    
    for (i = 0; i < maxSceneryCount; i += 1) {
        if (scenery[i].alive === false) {
            p = scenery[i];
            return p;
        }
    }
    return p;
}
// --------------------------------------------------------------------------------------
function createScenery(o, t) {
    'use strict';
    if ((o) && (t)) {
        o.angle = 0;
        o.body.angle = 0;
        o.frame = t.frame;
 
    }
}

function genScenery(x) {
    'use strict';
    var i, o, p,
        right = x - sc_lastX + 50;
    
    while (right > 0) {
        
        // get scenery object
        o = getScenery();
        if (o) {

            if (sc_repeat < 1) {
                sc_lastX += sc_repeatType.Xshift;
                right -= sc_repeatType.Xshift;
            
                // select new scenery
                p = Math.floor(Math.random() * sceneryTypes.length);
                while (sceneryTypes[p] === sc_repeatType || Math.random() < sceneryTypes[p].respin) {
                    p = Math.floor(Math.random() * sceneryTypes.length);
                }
                sc_repeatType = sceneryTypes[p];
                sc_repeat = game.rnd.integerInRange(sc_repeatType.repeat[0], sc_repeatType.repeat[1]);
            
                sc_lastX += sc_repeatType.Xshift;
                right -= sc_repeatType.Xshift;
            }
        
            createScenery(o, sc_repeatType);
            o.reset(sc_lastX, 130 - sc_repeatType.YOffset);
            
        }
        sc_lastX += sc_repeatType.objectWidth;
        right -= sc_repeatType.objectWidth;
        sc_repeat -= 1;
    }
}

// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
function killScenery() {
    'use strict';
    var i;
    
    for (i = 0; i < scenery.length; i += 1) {
        if (scenery[i].x < game.camera.x - scenery[i].width && scenery[i].alive) {
            scenery[i].kill();
        }
    }
}