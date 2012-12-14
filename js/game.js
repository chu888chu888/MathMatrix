/*!
 * MathMatrix v0.1
 * https://github.com/Tairraos/MathMatrix
 *
 * Copyright 2012 Tairraos and other contributors
 * Released under the MIT license
 *
 * Date: 2012-11-13
 */
(function($) {
    "use strict";
    if (!window.mm) { return; }

    var mm = window.mm,
        config = mm.invoke('mm.config'),
        Matrix = mm.invoke('mm.Matrix');

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

    $(function() {
        Matrix.init();
        $('#main_content').append(getTextMatrix(config.data.matrix));
    });
}(jQuery));
