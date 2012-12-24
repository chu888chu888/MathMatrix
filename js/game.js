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
		var i = arrMatrix.length, j, ret_html = [], temp_html;
		while (i--) {
			j = arrMatrix[0].length;
			temp_html = $('<div></div>');
			while (j--) {
				temp_html.append(block.getBlockImage(arrMatrix[i][j][1], arrMatrix[i][j][0]));
			}
			ret_html.push(temp_html);
		}
		return ret_html;
	}

	$(function() {
		Matrix.init();
		$('#main_content').append(getImageMatrix(config.data.matrix));
	});
}(jQuery));
