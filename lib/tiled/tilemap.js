import {Vec2d} from "../maths/vectors/vec2d.js";


export class TileMap {
    
    static cartToIso(poss) {
        let pos = Vec2d.createFrom(poss);
        return new Vec2d(
            pos.x - pos.y,
            (pos.x + pos.y) / 2
        );
    }
    
    static isoToCart(poss) {
        let pos = Vec2d.createFrom(poss);
        return new Vec2d(
            (2 * pos.y + pos.x) / 2,
            (2 * pos.y - pos.x) / 2
        );
    }
    
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
        if(TileMap.checkType(array) === "2D") {
            return array[pos.y][pos.x];
        } else if(TileMap.checkType(array) === "1D") {
            return array[pos.y * dimensionX + pos.x];
        }
    }
    
    /**
    * set the value of an index in the tiileMap
    */
    static setId(array, poss, dimensionX, value) {
        let pos = Vec2d.createFrom(poss);
        if(TileMap.checkType(array) === "2D") {
            array[pos.y][pos.x] = value;
        } else if(TileMap.checkType(array) === "1D") {
            array[pos.y * dimensionX + pos.x] = value;
        }
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
    
    /**
    * @static getTextureIndex
    * @description get the texture index by their value index
    */
    static getTextureIndex(value, col) {
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
            // 2D Array
            if (this.map[0][0] != undefined) {
                this.type = "2D";
                this.dimension = Vec2d.createFrom({
                    x: this.map[0].length,                     y: this.map.length
                });
            } else {
                this.type = "1D";
                this.dimension = Vec2d.createFrom(dimension);
            }
            
            this.draw = null;
            this.texture = {img: null, col:null, size:null};
            
            this.index = new Vec2d();
            this.id = null;
        } else {
            throw TypeError(`Failed to Initialize Map: expects an instance of an Array`);
        }
    }
    
    render(minPos, maxPos) {
        let _min = minPos === undefined ? {x:0, y:0}: Vec2d.createFrom(minPos);
        let _max = maxPos === undefined ? this.dimension : Vec2d.createFrom(maxPos);
        for(let r=_min.y; r < _max.y; r++) {
            for(let c=_min.x; c < _max.x; c++) {
                this.index = new Vec2d(c, r);
                this.id = this.getId(this.index);
                if(this.texture.img !== null) {
                    this.textureIndex = TileMap.getTextureIndex(this.id - 1, this.texture.col).applyFunc(Math.floor).mult(this.size);
                }
                if(typeof this.draw === "function") this.draw();
                else 
                    throw new Error(`Map must have a valid draw method`);
            }
        }
    }
    
    
    getId(pos) {
        return TileMap.getId(this.map, pos, this.dimension.x);
    }

    indexAt(pos) {
        return TileMap.indexAt(pos, this.size);
    }

}