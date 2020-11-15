class TileComponent {
    
        constructor(pos, dimension) {
            this.pos = Vec2d.createFrom(pos);
            this.dimension = Vec2d.createFrom(dimension);
            this.velocity = new Vec2d();

            this.collisionTile = null;

            this.lastPos = null;
            this.nextPos = null;
            this.currentPos = null;

            this._minpos = null;
            this._maxpos = null;
            this._pCollRect = null;
        }
        
        collisionCheck(sizee, velocity, {left=null, top=null}) {
            let size = Vec2d.createFrom(sizee);
            // X - axis
            this.lastPos = this.pos;
            this.nextPos = Vec2d.createFrom({
                x: this.lastPos.x + velocity.x,
                y: this.lastPos.y
            });

            this._pCollRect = new Component.Tile([this.nextPos.x + this.collisionTile.pos.x, 
                this.nextPos.y + this.collisionTile.pos.y], this.collisionTile.dimension);

            this._minpos = this._pCollRect.pos.mult(size.inverse()).applyFunc(Math.floor);
            this._maxpos = this._pCollRect.pos.add(this.collisionTile.dimension).mult(
                size.inverse()).applyFunc(Math.ceil);

            for(let r=this._minpos.y; r < this._maxpos.y; r++) {
                for(let c=this._minpos.x; c < this._maxpos.x; c++) {
                    this.index = new Vec2d(c, r);
                    if(typeof left === "function") left();
                }
            }

            this.pos.x = this.nextPos.x;

            // Y - axis
            this.lastPos = this.pos;
            this.nextPos = Vec2d.createFrom({
                x: this.lastPos.x,
                y: this.lastPos.y + velocity.y
            });

            this._pCollRect = new Component.Tile([this.nextPos.x + this.collisionTile.pos.x, 
                this.nextPos.y + this.collisionTile.pos.y], this.collisionTile.dimension);

            this._minpos = this._pCollRect.pos.mult(size.inverse()).applyFunc(Math.floor);
            this._maxpos = this._pCollRect.pos.add(this.collisionTile.dimension).mult(
                size.inverse()).applyFunc(Math.ceil);

            for(let r=this._minpos.y; r < this._maxpos.y; r++) {
                for(let c=this._minpos.x; c < this._maxpos.x; c++) {
                    this.index = new Vec2d(c, r);
                    if(typeof top === "function") top();
                }
            }

            this.pos.y = this.nextPos.y;
            // this.lastPos = this.collisionTile.pos;

            // this.nextPos = Vec2d.createFrom({
            //     x: this.lastPos.x,
            //     y: this.lastPos.y + velocity.y
            // });

            // this._minpos = this.nextPos.mult(size.inverse()).applyFunc(Math.floor);
            // this._maxpos = this.nextPos.add(this.dimension).mult(
            //     size.inverse()).applyFunc(Math.ceil);

            // for(let r=this._minpos.y; r < this._maxpos.y; r++) {
            //     for(let c=this._minpos.x; c < this._maxpos.x; c++) {
            //         this.index = new Vec2d(c, r);
            //         if(typeof top === "function") top();
            //     }
            // }

            // this.pos.y = this.nextPos.y;

            //     for(let r=this._minPos.y; r < this._maxPos.y; r++) {
            //         for(let c=this._minPos.x; c < this._maxPos.x; c++) {
            //             this.currentPos = map.map[r * map.dimension.x + c];
            //             if(typeof left === "function")
            //                 left();
            //         }
            //     }
            //     this.pos = this.nextPos;
            //     // Y-AXIS
            //     this.lastPos = this.pos;
            //     this.nextPos = Vec2d.createFrom({
            //         x: this.lastPos.x,
            //         y: this.lastPos.y + this.velocity.y
            //     });
            //     this._minPos = this.nextPos.mult(Vec2d.createFrom(map.size).inverse())
            //         .applyFunc(Math.floor);
            //     this._maxPos = this.nextPos.add(this.dimension).mult(Vec2d.createFrom
            //         (map.size).inverse()).applyFunc(Math.ceil);

            //     for(let r=this._minPos.y; r < this._maxPos.y; r++) {
            //         for(let c=this._minPos.x; c < this._maxPos.x; c++) {
            //             this.currentPos = map.map[r * map.dimension.x + c];
            //             if(typeof top === "function")
            //                 top();
            //         }
            //     }
            //     this.pos = this.nextPos;
            // }
            
        }
    }
