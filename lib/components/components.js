import {ShapeComponent} from "../components/basic.js";
import {SpriteComponent} from "../components/sprite.js";
import {TileComponent} from "../components/tile.js";


export const Component = {

    Shape: function(type, pos, dimension) {
        return new ShapeComponent(type, pos, dimension);
    },
    
    Sprite: function(frames, col, delay=5) {
        return new SpriteComponent(frames, col, delay);
    },
    
    Tile: function(pos, dimension) {
        return new TileComponent(pos, dimension);
    }

}