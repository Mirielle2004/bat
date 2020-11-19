import {Vec2d} from "../maths/vectors/vec2d.js";

/**
* Author: Mirielle S.
*/

export class ShapeComponent {

	constructor(type, pos, dimension) {
		this.validTypes = [
			"rect", 
			"circle",
			"line",
			"polygon"
		];
		if(!(this.validTypes.some(i => i === type)))
			throw TypeError(`Failed to create Component, valid type 
				must be from ${this.validTypes}`);
		this.type = type;

		if(this.type === "rect") {
			this.pos = Vec2d.createFrom(pos);
			this.dimension = Vec2d.createFrom(dimension);
		} 
		else if(this.type === "circle") {
			this.pos = Vec2d.createFrom(pos);
			this.r = dimension;
		} 
		else if(this.type === "line") {
			this.start = Vec2d.createFrom(pos);
			this.end = Vec2d.createFrom(dimension);
		} 
		else if(this.type === "polygon") {
			this.pos = Vec2d.createFrom(pos);
			this.vertices = [];
			if(dimension instanceof Array) {
				if(dimension[0][0] !== undefined) {
					dimension.forEach(data => {
						this.vertices.push(Vec2d.createFrom(data));
					});
				}
			}
		}
		
	}


}