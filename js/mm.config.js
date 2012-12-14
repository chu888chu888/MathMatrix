/**
 * @file mm.config
 * @author Tairraos (http://xiaole.happylive.org)
 * @Date 2012-12-14
 */

(function() {
    "use strict";
    var config = {
        data: {
        },
        setting: {
            maxNum: 9,
            width: 6,
            height: 6
        },
        sharp: {
            r: 'rabbit',
            f: 'frog',
            c: 'cow',
            s: 'sheep'
        }
    };
    mm.declare('mm.config', config);

}());
