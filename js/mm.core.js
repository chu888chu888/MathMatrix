/**
 * @file mm.core
 * @author Tairraos (http://xiaole.happylive.org)
 * @Date 2012-12-14
 */
(function($) {
    "use strict";
    window.mm = {
        /**
         * declare class|namespace, and return it
         * @param {string} name - the path of new class|namespace, e.g. 'mm.Matrix'
         * @param {object} [content] - initialize content
         * @return {object|function}
         */
        declare: function(name, content) {
            var paths = name.split('.'), path = paths.shift(), point = window;
            while (path) {
                if (!point[path]) {
                    point[path] = path.match(/^[A-Z]/) ? function(param) {
                        if (this.init) { this.init(param); }
                    } : {};
                }
                point = point[path];
                path = paths.shift();
            }
            $.extend(point, content);
            $.extend(point.prototype, content);
            return point;
        },
        invoke: function(name) {
            return this.declare(name);
        }
    };
}(jQuery));
