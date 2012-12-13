/*!
 * MathMatrix v0.1
 * https://github.com/Tairraos/MathMatrix
 *
 * Copyright 2012 Tairraos and other contributors
 * Released under the MIT license
 *
 * Date: 2012-11-13
 */
(function ($) {
    "use strict";
    window.mm = window.mm || {};

    mm.Matrix = function (param) {
        this.init(param);
    };
    $.extend(mm.Matrix, {

        setting: {
            maxNum: 9,
            width: 6,
            height: 6
        },

        data: {
        },

        sharp: {
            r: 'rabbit',
            f: 'frog',
            c: 'cow',
            s: 'sheep'
        },

        /**
         * @description generate randomize number depends on setting.maxNum
         * @return {String}
         * @private
         */
        _rndNumber: function () {
            return (Math.random() * (this.setting.maxNum + 1) | 0).toString();
        },

        /**
         * @description generate randomize sharp
         * @return {String}
         * @private
         */
        _rndSharp: function () {
//r=red,y=yellow,b=blue,g=green
            return 'rybg'.substr(Math.random() * 4 | 0, 1);
        },

        /**
         * @description generate randomize block
         * @return {String}
         * @private
         */
        _rndBlock: function () {
            return this._rndNumber() + this._rndSharp() + 'n';
        },

        /**
         * @description generate randomize block line
         * @param {number} size size of line/column
         * @return {Array}
         * @private
         */
        _rndLine: function (size) {
            var arrLine = [];
            while (size--) {
                arrLine.push(this._rndBlock());
            }
            return arrLine;
        },

        /**
         * @function getRndMatrix
         * @description generate randomize matrix
         * @param {number} width
         * @param {number} height
         * @return {Array}
         */
        getRndMatrix: function (width, height) {
            var arrMatrix = [];
            while (width--) {
                arrMatrix.push(this._rndLine(height));
            }
            return arrMatrix;
        },

        /**
         * @function init
         * @description initialize the data.matrix
         * @param {object} param
         *   member: {num} maxNum, {num} size, {num} width, {num} height
         */
        init: function (param) {
            var _s = this.setting;
            if (param) {
                _s.maxNum = param.maxNum || _s.maxNum;
                _s.width = param.size || param.width || _s.width;
                _s.height = param.size || param.height || _s.height;
            }
            this.data.matrix = this.getRndMatrix(_s.height, _s.width);
        }
    });

    var setting = {r: 'red', y: 'yellow', b: 'blue', g: 'green'};

    function getTextMatrix(arrMatrix) {
        var i = arrMatrix.length, j, ret_html = [];
        while (i--) {
            j = arrMatrix[0].length;
            ret_html.push('<div class="matrix-line">');
            while (j--) {
                ret_html.push('<span class="', setting[arrMatrix[i][j][1]], '">', arrMatrix[i][j][0], '</span>');
            }
            ret_html.push('</div>');
        }
        return ret_html.join('');
    }

    $.extend(mm.Matrix.prototype, mm.Matrix);

    $(function () {
        mm.Matrix.init();
        $('#main_content').append(getTextMatrix(mm.Matrix.data.matrix));
    });
}(jQuery));
