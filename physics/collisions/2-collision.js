class Collision2D {


	/////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////// DETECT //////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////
	static Detect = class {

		static circle(c1, c2) {
			if(c1.r === undefined || c2.r === undefined)
				throw new Error("Insufficient Circle Info: one-or-both circle lacking r attributes");
			let diff = Vec2d.createFrom(c2.pos).sub(Vec2d.createFrom(c1.pos));
			return diff.length < c1.r + c2.r
		}

		static rect(r1, r2) {
			return !(r1.pos.x > r2.pos.x + r2.dimension.x || r1.pos.x + r1.dimension.x < r2.pos.x ||
				r1.pos.y > r2.pos.y + r2.dimension.y || r1.pos.y + r1.dimension.y < r2.pos.y);
		}


		static circleRect(c, r) {
			let diff = {
				x: Math.abs(c.pos.x - (r.pos.x + r.dimension.x * 0.5)),
				y: Math.abs(c.pos.y - (r.pos.y + r.dimension.y * 0.5))
			};
			if(diff.x > c.r + r.dimension.x * 0.5) return false;
			if(diff.y > c.r + r.dimension.y * 0.5) return false;
			if(diff.x <= r.dimension.x) return true;
			if(diff.y <= r.dimension.y) return true;
			let dx = diff.x - r.dimension.x;
			let dy = diff.y - r.dimension.y;
			return Math.hypot(dx, dy) <= c.r * c.r;
		}

		/**
		* @description checks if the point[x, y] is in an arc
		* @param {Vec2d} p point to be checked
		* @param {Object} arc arc data
		// arc objects: {pos,innerRadius:,outerRadius:,startAngle:,endAngle:}
		// Return true if the x,y point is inside an arc
		*/
		static isPointInArc(p, arc) {
			if(arc.pos === undefined || arc.innerRadius === undefined || arc.outerRadius 
				=== undefined || arc.startAngle === undefined || arc.endAngle === undefined)
				throw new Error(`Insufficient Arc data: Must provide a "pos, innerRadius, outerRadius, startAngle, endAngle"`);
			let diff = p.sub(Vec2d.createFrom(arc.pos));
			let rOuter = arc.outerRadius;
			let rInner = arc.innerRadius;
			if(diff.length < rInner || diff.length > rOuter) return false;
			let angle = (diff.angle + Math.PI * 2) % Math.PI*2;
			return angle >= arc.startAngle && angle <= arc.endAngle;
		}

		/**
		* @description checks if the point[x, y] is in a wedge
		* @param {Vec2d} p point to be checked
		* @param {Object} wedge wedge data
		// wedge objects: {pos:,r:,startAngle:,endAngle:}
		// Return true if the x,y point is inside the closed wedge
		*/
		static isPointInWedge(p, wedge) {
			if(wedge.pos === undefined || wedge.r === undefined || wedge.startAngle === undefined)
				throw new Error(`Insufficient Wedge's data: Must provide a "pos, r, startAngle"`);
			let PI2 = Math.PI * 2;
			let diff = p.sub(wedge.pos);
			let r = wedge.r * wedge.r;
			if(diff.length > r) return false;
			let angle = (diff.angle + PI2) % PI2;
			return angle >= wedge.startAngle && angle <= wedge.endAngle;
		}

		/**
		* @description checks if the point[x, y] is in a circle
		* @param {Vec2d} p point to be checked
		* @param {Vec2d} c circle component
		*/
		static isPointInCircle(p, c) {
			let diff = p.sub(c.pos);
			return (diff.length < c.r * c.r);
		}

		/**
		* @description checks if the point[x, y] is in a rect
		* @param {Vec2d} p point to be checked
		* @param {Vec2d} c rect component
		*/
		static isPointInRect(p, r) {
			return (p.x > r.pos.x && p.x < r.pos.x + r.dimension.x 
				&& p.y > r.pos.y && p.y < r.pos.y + r.dimension.y);
		}

		

	}

	/////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////// RESOLVE /////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////

	static Resolve = {


	}

}