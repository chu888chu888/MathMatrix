/**
 * @module config
 * @author Xiaole Tao (http://xiaole.happylive.org)
 */

(function() {
	'use strict';
	var config = {
		data: {
		},
		setting: {
			blockMaxNum: 9,
			matrixCapacity: 6,
			blockSize: 60
		},
		suit: { h: 'hearts', d: 'diamonds', s: 'spades', c: 'clubs' }
	};
	mm.declare('config', config);
}());
