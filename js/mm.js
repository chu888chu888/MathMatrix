/*!
* MathMatrix v0.1
* https://github.com/Tairraos/MathMatrix
*
* Copyright 2012 Tairraos and other contributors
* Released under the MIT license
*
* Date: 2012-11-13
*/
//(function() {

var dp = getRndMatrix();

function getRndMatrix() {
	var arrMatrix = [[], [], [], [], [], [], [], [], [], []], i, j;
	for ( i = 0; i < 10; i++) {
		for ( j = 0; j < 10; j++) {
		    //number, color, status(normal, locked, bonus)
			arrMatrix[i][j] = rndNumber() + rndColor() + 'n';
		}
	}
	return arrMatrix;
}

function rndNumber() {
	return (Math.random() * 10 | 0).toString();
}

function rndColor() {
	//r=red,y=yello,b=blue,g=green
	return 'rybg'[Math.random() * 4 | 0];
}

function textMartrix(arrMatrix) {
	var i, j;
	for ( i = 0; i < 10; i++) {
		for ( j = 0; j < 10; j++) {
			arrMatrix[i][j];
		}
	}
}

//})();
