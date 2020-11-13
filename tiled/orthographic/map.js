class OrthographicMap {

    static getMapId(map, pos) {
        let p = Vec2d.createFrom(pos);
        if (map.type === "2D") {
            if(map.dataType === "number")
                return map.map[p.y][p.x];
            else if(map.dataType === "string")
                return map.map[p.y][0][p.x];
        } else if(map.type === "1D"){
            if(map.dataType === "number")
                return map.map[p.y * map.dimension.x + p.x];
            else if(map.dataType === "string"){
                return map.map[0][p.y * map.dimension.x + p.x];
            }
        }
    }

    static getTileSetIndex(pos, col) {
        let v = Vec2d.createFrom(pos);
        return new Vec2d(v.x % col, v.y / col);
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
                this.id = OrthographicMap.getMapId(this, this.index);
                callback();
            }
        }
    }

    getID(pos) {
        let p = Vec2d.createFrom(pos);
        if (this.type === "2D") {
            if(this.dataType === "number")
                return this.map[p.y][p.x];
            else if(this.dataType === "string")
                return this.map[p.y][0][p.x];
        } else if(this.type === "1D"){
            if(this.dataType === "number")
                return this.map[p.y * this.dimension.x + p.x];
            else if(this.dataType === "string"){
                return this.map[0][p.y * this.dimension.x + p.x];
            }
        }
    }

}