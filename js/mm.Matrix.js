/**
 * @file mm.Matrix
 * @author Tairraos (http://xiaole.happylive.org)
 * @Date 2012-12-14
 */
(function() {
    "use strict";

    var config = mm.invoke('mm.config');
    var Matrix = {

        /**
         * generate randomize number depends on setting.maxNum
         * @return {String}
         * @private
         */
        _rndNumber: function() {
            return (Math.random() * (config.setting.maxNum + 1) | 0).toString();
        },

        /**
         * generate randomize sharp
         * @return {String}
         * @private
         */
        _rndSharp: function() {
            //r=red,y=yellow,b=blue,g=green
            return 'rybg'.substr(Math.random() * 4 | 0, 1);
        },

        /**
         * generate randomize block
         * @return {String}
         * @private
         */
        _rndBlock: function() {
            return this._rndNumber() + this._rndSharp() + 'n';
        },

        /**
         * generate randomize block line
         * @param {number} size size of line/column
         * @return {Array}
         * @private
         */
        _rndLine: function(size) {
            var arrLine = [];
            while (size--) {
                arrLine.push(this._rndBlock());
            }
            return arrLine;
        },

        /**
         * generate randomize matrix
         * @param {number} width
         * @param {number} height
         * @return {Array}
         */
        getRndMatrix: function(width, height) {
            var arrMatrix = [];
            while (width--) {
                arrMatrix.push(this._rndLine(height));
            }
            return arrMatrix;
        },

        /**
         * initialize the data.matrix
         * @param {object} param
         *   member: {num} maxNum, {num} size, {num} width, {num} height
         */
        init: function(param) {
            var _s = config.setting;
            if (param) {
                _s.maxNum = param.maxNum || _s.maxNum;
                _s.width = param.size || param.width || _s.width;
                _s.height = param.size || param.height || _s.height;
            }
            config.data.matrix = this.getRndMatrix(_s.height, _s.width);
        }
    };

    mm.declare('mm.Matrix', Matrix);
}());
