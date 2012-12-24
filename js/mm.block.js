/**
 * @module block
 * @author Xiaole Tao (http://xiaole.happylive.org)
 * Derive by on https://github.com/Tairraos/Poker.JS
 */
(function() {
	'use strict';
	if (window.CanvasRenderingContext2D) {
		var config = mm.require('config'),
			setting = config.setting;
		var symbolPath = {
			'0': 'M55,0,C36,0,0,17,0,39,L0,162,C0,183,36,200,55,200,L66,200,C85,200,120,183,120,162,L120,39,C120,17,85,0,66,0,L55,0,M60,19,C72,19,100,28,100,38,L100,163,C100,174,72,183,60,183,C49,183,20,174,20,163,L20,38,C20,28,49,19,60,19z',
			'1': 'M60,200,L60,0,L82,0,L82,200,L60,200z',
			'2': 'M10,200L11,187C15,149,23,136,70,97C93,78,100,68,101,57C104,31,81,23,65,23C46,22,23,34,35,62L12,68C8,43,12,18,33,8C61,-6,96,-1,115,21C127,36,129,56,123,72C104,113,39,131,35,179H105V152H127V200L10,200z',
			'3': 'M2,156L18,145C31,167,47,181,70,178C104,176,119,140,112,113C105,89,76,77,53,90C47,93,43,96,41,96C39,96,33,85,34,82C50,59,87,21,87,21H28V47H6V0H120V16C120,16,90,48,80,64C104,65,125,81,132,105C136,118,135,148,129,160C119,182,94,199,71,200C33,202,12,176,2,156L2,156z',
			'4': 'M70,200L70,183L86,183L86,153L5,153L5,133L93,0L107,0L107,133L132,133L132,153L107,153L107,183L120,183L120,200zM86,49L30,133L86,133z',
			'5': 'M4,148L24,148C28,160,37,173,48,176C80,183,101,166,108,144C116,120,107,84,85,71C67,61,40,70,27,92L13,83L20,0H112V20H37L37,55C52,44,77,44,93,52C123,66,137,98,131,137C123,175,105,197,64,200C20,201,4,170,4,148L4,148z',
			'6': 'M8,139C6,122,6,78,8,65C15,26,30,7,55,2C81,-4,116,3,124,35L103,36C91,14,60,15,46,29C34,37,28,68,30,70C30,70,50,55,73,55C120,55,132,94,130,127C129,167,116,198,73,200C31,198,12,177,8,139zM110,128C111,101,98,80,73,77C50,76,26,99,27,127C29,155,40,179,69,179C101,179,110,147,110,128z',
			'7': 'M37,200C50,131,65,79,102,22H26V46H6V0H117L131,22C91,64,54,202,61,200H37z',
			'8': 'M2,142C3,115,13,105,32,90C17,79,10,63,12,50C15,17,41,0,69,0C98,1,123,24,125,48C127,69,120,79,105,90C123,105,135,115,135,141C134,168,111,199,71,200C31,201,1,168,2,142L2,142zM113,142C115,117,93,101,69,101C45,101,23,121,23,143C23,166,51,178,69,178C91,178,112,163,113,142L113,142zM105,55C106,34,87,20,67,21C50,21,31,34,31,51C31,72,52,83,70,83C86,84,105,71,105,55L105,55z',
			'9': 'MM11,161L30,156C37,174,52,180,67,178C94,176,102,146,104,120C94,131,78,137,64,136C21,134,10,100,10,65C9,35,21,13,43,3C55,-1,81,-1,92,4C118,18,128,42,126,98C126,144,117,198,66,200C36,204,14,181,11,161L11,161zM85,111C94,105,98,100,102,92C106,86,106,83,106,69C103,36,86,17,60,21C44,23,36,31,33,46C24,73,35,105,55,112C63,116,78,115,85,111L85,111z',
			//Hearts
			'h': 'M100,30C60,7,0,7,0,76C0,131,100,190,100,190C100,190,200,131,200,76C200,7,140,7,100,30z',
			//Diamonds
			'd': 'M184,100C152,120,120,160,100,200C80,160,48,120,16,100C48,80,80,40,100,0C120,40,152,80,184,100z',
			//Spades
			's': 'M200,120C200,168,144,176,116,156C116,180,116,188,128,200C112,196,88,196,72,200C84,188,84,180,84,156C56,176,0,168,0,120C0,72,60,36,100,0C140,36,200,72,200,120z',
			//Clubs
			'c': 'M80,200C92,184,92,160,92,136C76,180,0,176,0,124C0,80,40,76,68,88C80,92,80,88,72,84C44,64,40,0,100,0C160,0,156,64,128,84C120,88,120,92,132,88C160,76,200,80,200,124C200,176,124,180,108,136C108,160,108,184,120,200C100,196,100,196,80,200z'
		}, pc = function(size) {
			var canvas = document.createElement('canvas');
			canvas.height = canvas.width = size;
			return canvas;
		}, fixSuit = function(suit) {
			//hearts, diamonds, spades, clubs
			suit = (suit || 'h').toString();
			return suit.substr(0, 1).toLowerCase();
		}, fixSymbol = function(symbol) {
			//0, 1, 2, 3, 4, 5, 6, 7, 8, 9
			return (symbol || '0').toString();
		};

		/**
		 * Draw block
		 * @summary canvas.drawBlock (x, y, size, suit, point)
		 * @param {number} [x=0] - The x coordinate of top left corner of block in canvas.
		 * @param {number} [y=0] - The y coordinate of top left corner of block in canvas.
		 * @param {number} [size=200] - Size pixel of block.
		 * @param {string} [suit='h'] - Block suit. The value is case insensitive and it should be one of these value in []:
		 *     ['h', 'hearts', 'd', 'diamonds', 's', 'spades', 'c', 'clubs']
		 *     'h', 'd', 's', 'c' are abbreviation
		 * @param {number} [point=0] - Block point. The value should be 0-9.
		 * @example
		 *     canvas.drawBlock (0, 400, 100, 'hearts', 3);
		 *     canvas.drawBlock (0, 200, 100, 'd', 3);
		 */
		CanvasRenderingContext2D.prototype.drawBlock = function(x, y, size, suit, point) {
			var ax = function(n) {
				return x + n * size / 200;
			}, ay = function(n) {
				return y + n * size / 200;
			}, as = function(n) {
				return n * size / 200;
			};

			suit = fixSuit(suit);
			point = fixSymbol(point);

			this.drawEmptyBlock(ax(0), ay(0), as(200));
			this.fillStyle = (suit === 'h' || suit === 'd') ? '#a22' : '#000';
			this.fillBlockSymbol(ax(100), ay(100), as(80), suit);
			this.fillBlockSymbol(ax(20), ay(20), as(100), point);
		};

		/**
		 * Draw round corner rectangle
		 * @summary canvas.roundRect       (x, y[, width, height[, radius[, direction]]])
		 * @param {number} [x=0] - The x coordinate of top left corner of rectangle in canvas.
		 * @param {number} [y=0] - The y coordinate of top left corner of rectangle in canvas.
		 * @param {number} [width=200] - Width of the rectangle.
		 * @param {number} [height=200] - Height of the rectangle.
		 * @param {number} [radius=20] - Radius of corner round.
		 * @example
		 *     canvas.roundRect (0, 0, 200, 200, 30);
		 */
		CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
			width = width || 200;
			height = height || 200;
			radius = radius || 20;

			this.beginPath();
			this.moveTo(x + radius, y);
			this.lineTo(x + width - radius, y);
			this.arc(x + width - radius, y + radius, radius, (Math.PI / 180) * 270, 0, false);
			this.lineTo(x + width, y + height - radius);
			this.arc(x + width - radius, y + height - radius, radius, 0, (Math.PI / 2), false);
			this.lineTo(x + radius, y + height);
			this.arc(x + radius, y + height - radius, radius, (Math.PI / 2), Math.PI, false);
			this.lineTo(x, y + radius);
			this.arc(x + radius, y + radius, radius, Math.PI, (Math.PI / 180) * 270, false);
			this.closePath();
		};

		/**
		 * Stroke round corner rectangle
		 * @summary canvas.strokeRoundRect (x, y[, width, height[, radius[, direction]]])
		 * @param {number} [x=0] - The x coordinate of top left corner of rectangle in canvas.
		 * @param {number} [y=0] - The y coordinate of top left corner of rectangle in canvas.
		 * @param {number} [width=200] - Width of the rectangle.
		 * @param {number} [height=200] - Height of the rectangle.
		 * @param {number} [radius=20] - Radius of corner round.
		 * @example
		 *     canvas.strokeRoundRect (0, 0, 200, 200, 30);
		 */
		CanvasRenderingContext2D.prototype.strokeRoundRect = function(x, y, width, height, radius) {
			this.roundRect(x + 0.5, y + 0.5, width - 1, height - 1, radius);
			this.stroke();
		};

		/**
		 * Fill round corner rectangle
		 * @summary canvas.fillRoundRect   (x, y[, width, height[, radius[, direction]]])
		 * @param {number} [x=0] - The x coordinate of top left corner of rectangle in canvas.
		 * @param {number} [y=0] - The y coordinate of top left corner of rectangle in canvas.
		 * @param {number} [width=200] - Width of the rectangle.
		 * @param {number} [height=200] - Height of the rectangle.
		 * @param {number} [radius=20] - Radius of corner round.
		 * @example
		 *     canvas.fillRoundRect (0, 0, 200, 200, 30);
		 */
		CanvasRenderingContext2D.prototype.fillRoundRect = function(x, y, width, height, radius) {
			this.roundRect(x, y, width, height, radius);
			this.fill();
		};

		/**
		 * Draw SVG curve
		 * @summary canvas.svgCurve (x, y, size, svgPath)
		 * @param {number} [x=0] - The x coordinate of top left corner of block in canvas.
		 * @param {number} [y=0] - The y coordinate of top left corner of block in canvas.
		 * @param {number} size - The pixel size of the curve.
		 * @param {string} svgPath - Value of property 'd' of SVG 'path' method.
		 *     When create the curve by svg software, please move the origin of coordinate be 0,0.
		 *     And keep the bigger size of height and width to 200px.
		 *     Don't use AQ or T method in svg software, browser canvas have not relative method to render it.
		 * @example
		 *     draw a heart symbol:
		 *     canvas.svgCurve ('M100,30C60,7 0,7 0,76C0,131 100,190 100,190C100,190 200,131 200,76C200,7 140,7 100,30z', 0, 0, 200));
		 */
		CanvasRenderingContext2D.prototype.svgCurve = function(x, y, size, svgPath) {
			var relativeX, relativeY, pathNumber, pathArray, svgPathArray, ax = function(n) {
				return ( relativeX = x + n * size / 200);
			}, ay = function(n) {
				return ( relativeY = y + n * size / 200);
			};
			svgPathArray = svgPath.replace(/ *([MZLHVCSQTA]) */gi, '|$1,').replace(/^\||\|[Z],/gi, '').split(/\|/);

			this.beginPath();
			for (pathNumber in svgPathArray) {
				pathArray = svgPathArray[pathNumber].split(/[, ]/);
				if (pathArray[0] === 'M') {
					this.moveTo(ax(pathArray[1]), ay(pathArray[2]));
				} else if (pathArray[0] === 'L') {
					this.lineTo(ax(pathArray[1]), ay(pathArray[2]));
				} else if (pathArray[0] === 'H') {
					this.lineTo(ax(pathArray[1]), relativeY);
				} else if (pathArray[0] === 'V') {
					this.lineTo(relativeX, ay(pathArray[1]));
				} else if (pathArray[0] === 'C') {
					this.bezierCurveTo(ax(pathArray[1]), ay(pathArray[2]), ax(pathArray[3]), ay(pathArray[4]), ax(pathArray[5]), ay(pathArray[6]));
				} else if (pathArray[0] === 'Q') {
					this.quadraticCurveTo(ax(pathArray[1]), ay(pathArray[2]), ax(pathArray[3]), ay(pathArray[4]));
				}
			}
			this.closePath();
		};

		/**
		 * Draw Block symbol
		 * @summary canvas.drawBlockSymbol   (x, y, size[, symbol])
		 * @param {number} [x=0] - The x coordinate of top left corner of block in canvas.
		 * @param {number} [y=0] - The y coordinate of top left corner of block in canvas.
		 * @param {number} [size=200] - Size pixel of block.
		 * @param {number} [symbol='0'] - The name of symbol.  Value is case insensitive and should be one of below:
		 *     ['h', 'hearts', 'd', 'diamonds', 's', 'spades', 'c', 'clubs']
		 *     'h', 'd', 's', 'c' are abbreviation
		 *     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
		 * @example
		 *     canvas.drawBlockSymbol (0, 0, 200, 'hearts');
		 */
		CanvasRenderingContext2D.prototype.drawBlockSymbol = function(x, y, size, symbol) {
			symbol = fixSymbol(symbol);
			if (symbolPath[symbol]) {
				this.svgCurve(x, y, size, symbolPath[symbol]);
			}
		};

		/**
		 * Stroke Block symbol
		 * @summary canvas.strokeBlockSymbol (x, y, size[, symbol])
		 * @param {number} [x=0] - The x coordinate of top left corner of block in canvas.
		 * @param {number} [y=0] - The y coordinate of top left corner of block in canvas.
		 * @param {number} [size=200] - Size pixel of block.
		 * @param {number} [symbol='0'] - The name of symbol.  Value is case insensitive and should be one of below:
		 *     ['h', 'hearts', 'd', 'diamonds', 's', 'spades', 'c', 'clubs']
		 *     'h', 'd', 's', 'c' are abbreviation
		 *     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
		 * @example
		 *     canvas.strokeBlockSymbol (0, 0, 200, 'hearts');
		 */
		CanvasRenderingContext2D.prototype.strokeBlockSymbol = function(x, y, size, symbol) {
			this.drawBlockSymbol(x + 0.5, y + 0.5, size - 1, symbol);
			this.stroke();
		};

		/**
		 * Fill Block symbol
		 * @summary canvas.fillBlockSymbol   (x, y, size[, symbol])
		 * @param {number} [x=0] - The x coordinate of top left corner of block in canvas.
		 * @param {number} [y=0] - The y coordinate of top left corner of block in canvas.
		 * @param {number} [size=200] - Size pixel of block.
		 * @param {string=} [symbol='0'] - The name of symbol.  Value is case insensitive and should be one of below:
		 *     ['h', 'hearts', 'd', 'diamonds', 's', 'spades', 'c', 'clubs']
		 *     'h', 'd', 's', 'c' are abbreviation
		 *     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
		 * @example
		 *     canvas.fillBlockSymbol (0, 0, 200, 'hearts');
		 */
		CanvasRenderingContext2D.prototype.fillBlockSymbol = function(x, y, size, symbol) {
			this.drawBlockSymbol(x, y, size, symbol);
			this.fill();
		};

		/**
		 * Draw blank block
		 * @summary canvas.drawEmptyBlock (x, y, size[, startColor, endColor])
		 * @param {number} [x=0] - The x coordinate of top left corner of block in canvas.
		 * @param {number} [y=0] - The y coordinate of top left corner of block in canvas.
		 * @param {number} [size=200] - Size pixel of block.
		 * @example
		 *     canvas.drawEmptyBlock(0, 0, 200);
		 */
		CanvasRenderingContext2D.prototype.drawEmptyBlock = function(x, y, size) {
			var fillLinGrad, ax = function(n) {
				return x + n * size / 200;
			}, ay = function(n) {
				return y + n * size / 200;
			}, as = function(n) {
				return n * size / 200;
			};

			fillLinGrad = this.createLinearGradient(ax(5), ay(5), ax(55), ay(200));
			fillLinGrad.addColorStop(0, '#fff');
			fillLinGrad.addColorStop(1, '#e0e0e0');

			this.fillStyle = fillLinGrad;
			this.fillRoundRect(ax(0), ay(0), as(200), as(200), as(16));
			this.strokeStyle = '#666';
			this.strokeRoundRect(ax(0), ay(0), as(200), as(200), as(16));
		};

		var block = {
			/**
			 * Draw block as a image
			 * @summary Block.getBlockImage  (suit, point)
			 * @param {string} [suit='h'] - Block suit. The value is case insensitive and it should be one of these value in []:
			 *     ['h', 'hearts', 'd', 'diamonds', 's', 'spades', 'c', 'clubs']
			 *     'h', 'd', 's', 'c' are abbreviation
			 * @param {number} [point=0] - Block point. The value should be 0-9.
			 * @return {HTMLElement} image
			 * @example
			 *     document.body.appendChild(Block.getBlockImage('h', '3'));
			 */
			getBlockImage: function(suit, point) {
				var image = document.createElement('img');
				image.src = this.getBlockData(suit, point);
				return image;
			},

			/**
			 * Draw block in a canvas
			 * @summary Block.getBlockCanvas (suit, point)
			 * @param {string} [suit='h'] - Block suit. The value is case insensitive and it should be one of these value in []:
			 *     ['h', 'hearts', 'd', 'diamonds', 's', 'spades', 'c', 'clubs']
			 *     'h', 'd', 's', 'c' are abbreviation
			 * @param {number} [point=0] - Block point. The value should be 0-9.
			 * @return {HTMLElement} canvas
			 * @example
			 *     document.body.appendChild(Block.getBlockCanvas('h', '3'));
			 */
			getBlockCanvas: function(suit, point) {
				var canvas = pc(setting.blockSize);
				canvas.getContext('2d').drawBlock(0, 0, setting.blockSize, suit, point);
				return canvas;
			},

			/**
			 * Get block image data
			 * @summary Block.getBlockData   (suit, point)
			 * @param {string} [suit='h'] - Block suit. The value is case insensitive and it should be one of these value in []:
			 *     ['h', 'hearts', 'd', 'diamonds', 's', 'spades', 'c', 'clubs']
			 *     'h', 'd', 's', 'c' are abbreviation
			 * @param {number} [point=0] - Block point. The value should be 0-9.
			 * @return {string} imageData
			 * @example
			 *     var imgData = Block.getBlockData('h', '4');
			 */
			getBlockData: function(suit, point) {
				return this.getBlockCanvas(suit, point).toDataURL();
			}
		};
		mm.declare('block', block);
	}
}());
