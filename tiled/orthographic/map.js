class OrthographicMap {
    static getMapId(map, pos, size = 0) {
        let p = Vec2d.createFrom(pos);
        if (map[0][0] !== undefined)
            return map[p.y][p.x];
        return map[p.y * size + p.x];
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
            if (this.map[0][0] != undefined) {
                this.type = "2D";
                this.dimension = Vec2d.createFrom({
                    x: this.map[0].length,
                    y: this.map.length
                });
            } else {
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
        for (let r = this.minView.y; r < this.maxView.y; r++) {
            for (let c = this.minView.x; c < this.maxView.x; c++) {
                this.index = new Vec2d(c, r);
                this.id = OrthographicMap.getMapId(this.map, this.index, this.dimension.x);
                callback();
            }
        }
    }

}