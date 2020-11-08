class Tile {

	static getTileSetIndex(pos, col) {
		let v = Vec2d.createFrom(pos);
		return new Vec2d(v.x % col, v.y / col);
	}

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
	static Orthographic = class {
		/**
	     * @static getMapId
	     * @description get the value of an index from the map
	     * @param {Array} map Array representing the map
	     * @param {Vec2d} pos the [x,y] index in the array
	     * @param {Number} size number of columns in the array
	     * @returns {Object} index value from the map
	     */
	    static getMapId(map, pos, size=0) {
	        let p = Vec2d.createFrom(pos);
	        if(map[0][0] !== undefined)
	            return map[p.y][p.x];
	        return map[p.y * size + p.x];
	    }


	    ///////////////////////////////////////////////////////////////////////////
	    ///////////////// MAP CAMERA //////////////////////////////////////////////
	    ///////////////////////////////////////////////////////////////////////////
	    static Camera = class {
	        /**
	        * @constructor
	        * @param {Vec3d} camera's position in 3d space
	        * @param {Vec3d} camera's dimension in screen
	        */
	        constructor(pos=new Vec3d(), dimension=new Vec3d()) {
	            this.pos = Vec3d.createFrom(pos);
	            this.dimension = Vec3d.createFrom(dimension);
	            this.minPos = new Vec3d();
	            this.maxPos = new Vec3d();

	            this._shakeEnabled = false;
	            this._isShaking = false;
	            this._shakeTimeOut = 0;
	        }

	        /**
	        * @method lookAt
	        * @description set the minimum and maximum visible area of the camera
	        * @param {Array} map the map
	        * @param {Vec2d} the size of each tile in the map
	        */
	        lookAt(map, sizee) {
	            let size = Vec3d.createFrom(sizee);
	            size.z = this.pos.z;
	            this.minPos = this.pos.mult(size.inverse()).applyFunc(Math.floor);
	            this.maxPos = this.pos.add(this.dimension).mult(
	                size.inverse()).applyFunc(Math.ceil);
	        }

	        /**
	        * @method setMapClamp
	        * @description set the minimum and maximum indexes from the array
	        * @param {Vec2d} minn the minimum indexes on the array
	        * @param {Vec2d} maxx the maximum indexes on the array
	        */
	        setMapClamp(minn, maxx) {
	            let min = Vec3d.createFrom(minn);
	            let max = Vec3d.createFrom(maxx);
	            if(this.minPos.x < min.x) 
	                this.minPos.x = min.x;
	            else if(this.maxPos.x > max.x)
	                this.maxPos.x = max.x;

	            if(this.minPos.y < min.y) 
	                this.minPos.y = min.y;
	            else if(this.maxPos.y > max.y)
	                this.maxPos.y = max.y;
	        }

	        /**
	        * @method setMapClamp
	        * @description set the minimum and maximum position in worldspace
	        * @param {Vec2d} minn the minimum position on the canvas
	        * @param {Vec2d} maxx the maximum position on the canvas
	        */
	        setPosClamp(minn, maxx) {
	            let min = Vec3d.createFrom(minn);
	            let max = Vec3d.createFrom(maxx);
	            if(this.pos.x < min.x)
	                this.pos.x = min.x;
	            else if(this.pos.x + this.dimension.x > max.x)
	                this.pos.x = max.x - this.dimension.x;

	            if(this.pos.y < min.y)
	                this.pos.y = min.y;
	            else if(this.pos.y + this.dimension.y > max.y)
	                this.pos.y = max.y - this.dimension.y;

	            if(this.pos.z < min.z) this.pos.z = min.z;
	            else if(this.pos.z > max.z) this.pos.z = max.z;
	        }

	        /**
	        * @method follow
	        * @description determines the center of the camera
	        * @param {Vec2d} poss the positional vector
	        * @param {Vec2d} dimension the dimension of the component
	        */
	        follow(poss, dimensionn) {
	        	if(!this._isShaking) {
		            let pos = Vec3d.createFrom(poss);
		            let dimension = Vec3d.createFrom(dimensionn);
		            this.pos = pos.add(dimension.scale(0.5)).sub(this.dimension.scale(0.5));
		        } else {
		        	let pos = Vec3d.createFrom(poss);
		            let dimension = Vec3d.createFrom(dimensionn);
		            this.pos = pos.add(dimension.scale(0.5)).sub(this.dimension.scale(0.5)).scale(Math.sin(Math.random() * 20) * 1);
					// this.shake(poss);
		        }
	        }

	        shakeEnabled(pos, dimension=new Vec2d()) {
	        	this._shakeEnabled = true;
	        	this._shakeOrigin = Vec2d.createFrom(pos);
	        	this._shakeDimension = Vec2d.createFrom(dimension);
	        	this._shakePivot = this._shakeOrigin.add(this._shakeDimension.scale(0.5));
	        }

	        shake(origin, duration) {
	        	// if(this._shakeTimeOut >= duration) {
	        	// 	this._isShaking = false;
	        	// 	this._shakeTimeOut = 0;
	        	// } else {
	        	// 	this._isShaking = true;
	        	// 	this._shakeTimeOut++;
	        	// 	let nx = origin.x + Math.sin(Math.random() * 20) * 10;
		        // 	let ny = origin.y + Math.sin(Math.random() * 20) * 10;
		        // 	this.pos = Vec2d.createFrom([nx, ny]);
	        	// }
	        	if(this._shakeEnabled) {
	        		// let diffPos = Vec2d.createFrom([])
	        		// let shakePos = this._shakeOrigin.add()
	        		// let p = this.pos.add(this.dimension.scale(0.5));
		        	let nx = this._shakePivot.x + Math.sin(Math.random() * 20) * 1;
			        let ny = this._shakePivot.y + Math.sin(Math.random() * 20) * 1;
			        this.pos = Vec2d.createFrom([nx, ny]);
			    } else 
			    	throw new Error("Cannot shake Camera: Please enabled camera shake by calling it's method")
	        }

	    }

	    ///////////////////////////////////////////////////////////////////////////
	    ///////////////////////////////////////////////////////////////////////////
	    ///////////////// MAP RENDERER ////////////////////////////////////////////
	    ///////////////////////////////////////////////////////////////////////////
	    ///////////////////////////////////////////////////////////////////////////
	    static Map = class { 
	        /**
	         * @constructor
	         * @param {Array} map map data
	         * @param {Vec2d} size size of each tiles in the map
	         */
	        constructor(map, size, dimension) {
	            if(map instanceof Array) {
	                this.map = map;
	                this.size = Vec2d.createFrom(size);
	                if(this.map[0][0] != undefined) {
	                    this.type = "2D";
	                    this.dimension = Vec2d.createFrom({
	                        x: this.map[0].length,
	                        y: this.map.length
	                    });
	                }  else {
	                    this.type = "1D";
	                    this.dimension = Vec2d.createFrom(dimension);
	                }
	                this.index = new Vec2d();
	                this.id = null; 
	                // view
	                this.minView = new Vec2d();
	                this.maxView = this.dimension;
	            } else {
	                throw TypeError(`Failed to Initialize Map: expects an instance of an Array`);
	            }
	        }

	        /**
	         * @method setView
	         * @description set the minimum and maximum visible area in the tile
	         * @param {Vec2d} min minimum view vector 
	         * @param {Vec2d} max maximum view vector
	         */
	        setView(min, max) {
	            this.minView = Vec2d.createFrom(min);
	            this.maxView = Vec2d.createFrom(max);
	        }

	        /**
	         * @method render
	         * @description API for rendering map to the screen
	         * @param {Function} callback callback to render map
	         */
	        render(callback) {
	            for(let r=this.minView.y; r < this.maxView.y; r++) {
	                for(let c=this.minView.x; c < this.maxView.x; c++) {
	                    this.index = new Vec2d(c, r);
	                    this.id = Tile.Orthographic.getMapId(this.map, this.index, this.dimension.x);
	                    callback();
	                }
	            }
	        }

	    }
	}

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

}