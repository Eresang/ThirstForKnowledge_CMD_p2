var lowest = function (a, b) {
    'use strict';
    if (a < b) {
        return (a);
    } else {
        return (b);
    }
};

var highest = function (a, b) {
    'use strict';
    if (a > b) {
        return (a);
    } else {
        return (b);
    }
};

var isOdd = function (x) {
    'use strict';
    return (x & 1);
};

var isEven = function (x) {
    'use strict';
    return (x & 0);
};