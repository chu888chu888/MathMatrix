/**
 * @module core
 * @author Xiaole Tao (http://xiaole.happylive.org)
 */
(function($) {
	"use strict";
	window.mm = {
		/**
		 * declare class|namespace, and return it
		 * @param {string} sPath - the path of new class|namespace, e.g. 'mm.Matrix'
		 * @param {object} [oStructure] - initialize with structure
		 * @return {object|function} retObj
		 */
		declare: function(sPath, oStructure) {
			var paths = sPath.split('.'), path = paths.shift(), retObj = window.mm;
			while (path) {
				if (!retObj[path]) {
					retObj[path] = path.match(/^[A-Z]/) ? function() {
						if (this.init) { this.init.apply(this,arguments); }
					} : {};
				}
				retObj = retObj[path];
				path = paths.shift();
			}
			if (oStructure) {
				$.extend(retObj, oStructure);
				$.extend(retObj.prototype, oStructure);
			}
			return retObj;
		},

		/**
		 * require class|namespace
		 * @param {string} sPath - the path of new class|namespace, e.g. 'mm.Matrix'
		 * @return {object|function}
		 */
		require: function(sPath) {
			return this.declare(sPath);
		}
	};
}(jQuery));
