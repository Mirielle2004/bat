Object.defineProperties(Math, {

	radToDeg: {
		value:number => number * 180 / this.PI;
	}

	degToRad: {
		value: number => number * this.PI / 180;
	}

});