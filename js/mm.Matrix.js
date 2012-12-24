/**
 * @module Matrix
 * @author Xiaole Tao (http://xiaole.happylive.org)
 */
(function() {
	"use strict";
	var config = mm.require('config'),
		setting = config.setting;

	var Matrix = {

		/**
		 * generate randomize number depends on setting.blockMaxNum
		 * @return {String}
		 * @private
		 */
		_rndNumber: function() {
			return (Math.random() * (setting.blockMaxNum + 1) | 0).toString();
		},

		/**
		 * generate randomize suit
		 * @return {String}
		 * @private
		 */
		_rndSuit: function() {
			//h: 'hearts', d: 'diamonds', s: 'spades', c: 'clubs'
			return 'hdsc'.substr(Math.random() * 4 | 0, 1);
		},

		/**
		 * generate randomize block
		 * @return {String}
		 * @private
		 */
		_rndBlock: function() {
			return this._rndNumber() + this._rndSuit() + 'n';
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
		 * @param {number} size
		 * @return {Array}
		 */
		getRndMatrix: function(size) {
			var arrMatrix = [], w = size;
			while (w--) {
				arrMatrix.push(this._rndLine(size));
			}
			return arrMatrix;
		},

		/**
		 * initialize the data.matrix
		 * @param {object} param
		 *   member: {num} blockMaxNum, {num} size, {num} width, {num} height
		 */
		init: function(param) {
			if (param) {
				setting.blockMaxNum = param.blockMaxNum || setting.blockMaxNum;
				setting.matrixCapacity = param.matrixCapacity || setting.matrixCapacity;
			}
			config.data.matrix = this.getRndMatrix(setting.matrixCapacity);
		}
	};

	mm.declare('Matrix', Matrix);
}());
