/**
 * MathMatrix
 * https://github.com/Tairraos/MathMatrix
 *
 * Copyright 2012 Xiaole Tao (Tairraos) and other contributors
 * Released under the MIT license
 *
 * @author Xiaole Tao (http://xiaole.happylive.org)
 * @version 0.1
 * @license MIT
 */
(function($) {
	'use strict';
	if (!window.mm) { return; }

	var config = $.require('mm.config'),
		Matrix = $.require('mm.Matrix'),
		block = $.require('mm.block');

	function getImageMatrix(arrMatrix) {
		var x, y, b, l = arrMatrix.length, s = config.setting.blockSize + 6,
			domRet = [], domTmp;
		for (y = 0; y < l; y++) {
			for (x = 0; x < l; x++) {
				b = arrMatrix[x][y].split('');
				domTmp = $(block.getBlockCanvas(b[1], b[0])).css({top: y * s + 3, left: x * s + 3}).attr('data-position', x + ',' + y);
				domRet.push(domTmp);
			}
		}
		return domRet;
	}

	$(function() {
		var s = (config.setting.blockSize + 6) * config.setting.matrixCapacity;
		Matrix.init();
		$('#matrix').empty().css({width: s, height: s}).append(getImageMatrix(config.data.matrix));
	});
}(jQuery));
