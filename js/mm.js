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
	window.mm = {
		rndNumber: function () {
			return Math.round(Math.random() * 10).toString();
		},
		rndSharp: function () {
			//r=red,y=yellow,b=blue,g=green
			return 'rybgo'.substr(Math.floor(Math.random() * 4), 1);
		},
		rndBlock: function () {
			return mm.rndNumber() + mm.rndSharp() + 'n';
		},
		getRndLine: function (n) {
			var arrLine = [];
			while (n--) {
				arrLine.push(mm.rndBlock());
			}
			return arrLine;
		},
		getRndMatrix: function (w, h) {
			var arrMatrix = [];
			while (w--) {
				arrMatrix.push(mm.getRndLine(h));
			}
			return arrMatrix;
		}
	};

	var setting = {r: 'red', y: 'yellow', b: 'blue', g: 'green', o: 'other'};

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

	$(function () {
		$('#main_content').append(getTextMatrix(mm.getRndMatrix(7, 9)));
	});
}(jQuery));
