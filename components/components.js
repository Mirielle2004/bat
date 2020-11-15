const Component = {

    Basic: function(type, pos, dimension) {
        return new BasicComponent(type, pos, dimension);
    },

    Tile: function(pos, dimension) {
    	return new TileComponent(pos, dimension);
    },

    Sprite: function(frames, cols, delay=5) {
    	return new SpriteComponent(frames, cols, delay);
    }

}