Object.defineProperties(Math, {

	degToRad: {
		value:function(number) {
			return number * this.PI / 180;
		}
	},

	radToDeg: {
		value: function(number) {
			return number * 180 / this.PI;
		}
	},

	isEven: {
		value: function(number) {
			return !(number & 1)
		}
	},

	randRange: {
		value: function(min, max) {
			return this.random() * (max - min + 1) + min;
		}
	},

	clamp: {
		value: function(min, max, val) {
			return this.min(this.max(min, +val), max);
		}
	}

});