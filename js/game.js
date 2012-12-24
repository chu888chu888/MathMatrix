/*!
 * MathMatrix v0.1
 * https://github.com/Tairraos/MathMatrix
 *
 * Copyright 2012 Xiaole Tao(Tairraos) and other contributors
 * Released under the MIT license
 *
 * Date: 2012-11-13
 */
(function($) {
	"use strict";
	if (!window.mm) { return; }

	var mm = window.mm,
		config = mm.require('config'),
		Matrix = mm.require('Matrix'),
		block = mm.require('block');

	function getImageMatrix(arrMatrix) {
		var x, y, b, size = arrMatrix.length, ret_html = [], s = config.setting.blockSize + 10;
		for (y = 0; y < size; y++) {
			for (x = 0; x < size; x++) {
				b = arrMatrix[x][y].split('');
				ret_html.push($(block.getBlockCanvas(b[1], b[0])).css({top: y * s + 5, left: x * s + 5}));
			}
		}
		return ret_html;
	}

	$(function() {
		var s = (config.setting.blockSize + 10) * config.setting.matrixCapacity;
		Matrix.init();
		$('#matrix').css({width: s, height: s}).append(getImageMatrix(config.data.matrix));
	});
}(jQuery));
