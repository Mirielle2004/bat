class OrthographicMap {
    /**
    * @method checkType
    * @description check the type of an array
    * @param {array} the array
    * returns {String}
    */
    static checkType(array) {
        if(array[0][0] !== undefined)
            return "2D";
        return "1D";
    }

    /**
    * @method getId
    * @description get the value from an array using the index
    * @param {array} the array
    * @param {pos} the index as a vector
    * @param {dimensionX} (for 1D array) the number of columns
    * returns {Number}
    */
    static getId(array, poss, dimensionX) {
        let pos = Vec2d.createFrom(poss);
        if(OrthographicMap.checkType(array) === "2D") {
            return array[pos.y][pos.x];
        } else if(OrthographicMap.checkType(array) === "1D") {
            return array[pos.y * dimensionX + pos.x];
        }
    }

    static setId(array, poss, dimensionX, value) {
        let pos = Vec2d.createFrom(poss);
        array[pos.y * dimensionX + pos.x] = value;
    }

    /**
    * @method indexAt
    * @description get the index from an array using the position
    * @param {pos} the postion as a vector
    * @param {size} size of each tile in the map as a vector
    * returns {Number}
    */
    static indexAt(pos, size) {
        let newPos = Vec2d.createFrom(pos);
        let newSize = Vec2d.createFrom(size);
        return new Vec2d(~~(newPos.x / newSize.x), ~~(newPos.y / newSize.y));
    }


    static getTileSetIndex(value, col) {
        return new Vec2d(~~(value % col), ~~(value / col));
    }
    /**
     * @constructor
     * @param {Array} map map data
     * @param {Vec2d} size size of each tiles in the map
     */
    constructor(map, size, dimension) {
        if (map instanceof Array) {
            this.map = map;
            this.size = Vec2d.createFrom(size);
            this.dataType = null;
            // 2D Array
            if (this.map[0][0] != undefined) {
                this.type = "2D";
                if(typeof this.map[0][0] === "string") {
                    this.dataType = "string";
                    this.dimension = Vec2d.createFrom({
                        x: this.map[0][0].length,
                        y: this.map.length
                    });
                } else {
                    this.dataType = "number";
                    this.dimension = Vec2d.createFrom({
                        x: this.map[0].length,
                        y: this.map.length
                    });
                }
            } else {
                this.type = "1D";
                this.dimension = Vec2d.createFrom(dimension);
                if(typeof this.map[0] === "string") this.dataType = "string";
                else this.dataType = "number";
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
        for (let r = this.minView.y; r < this.maxView.y; r++) {
            for (let c = this.minView.x; c < this.maxView.x; c++) {
                this.index = new Vec2d(c, r);
                this.id = this.getId(this.index);
                callback();
            }
        }
    }

    getId(pos) {
        return OrthographicMap.getId(this.map, pos, this.dimension.x);
    }

    indexAt(pos) {
        return OrthographicMap.indexAt(pos, this.size);
    }

}