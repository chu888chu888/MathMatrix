/**
 * @module config
 * @author Xiaole Tao (http://xiaole.happylive.org)
 */

(function($) {
	'use strict';
	var config = {
		data: {
		},
		setting: {
			blockMaxNum: 9,
			matrixCapacity: 5,
			blockSize: 45
		},
		suit: { h: 'hearts', d: 'diamonds', s: 'spades', c: 'clubs' }
	};
	$.declare('mm.config', config);
}(jQuery));
