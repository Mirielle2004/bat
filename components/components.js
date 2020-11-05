class Component {

    
    static Tile = class {
    
        constructor(pos, dimension) {
            this.pos = Vec2d.createFrom(pos);
            this.dimension = Vec2d.createFrom(dimension);
            this.velocity = new Vec2d();
            this.rotation = 0;
            this.vertices = [];

            this.lastPos = null;
            this.nextPos = null;
            this.currentPos = null;

            this._minpos = null;
            this._maxpos = null;
        }

        orthCollision(map, velocity, {left=null, top=null}) {
            if(map.size !== undefined && map.dimension !== undefined) {
                // X-AXIS
                this.lastPos = this.pos;
                this.nextPos = Vec2d.createFrom({
                    x: player.pos.x + velocity.x,
                    y: this.lastPos.y
                });
                this._minPos = this.nextPos.mult(Vec2d.createFrom(map.size).inverse())
                    .applyFunc(Math.floor);
                this._maxPos = this.nextPos.add(this.dimension).mult(Vec2d.createFrom
                    (map.size).inverse()).applyFunc(Math.ceil);

                for(let r=this._minPos.y; r < this._maxPos.y; r++) {
                    for(let c=this._minPos.x; c < this._maxPos.x; c++) {
                        this.currentPos = map.map[r * map.dimension.x + c];
                        if(typeof left === "function")
                            left();
                    }
                }
                this.pos = this.nextPos;
                // Y-AXIS
                this.lastPos = this.pos;
                this.nextPos = Vec2d.createFrom({
                    x: this.lastPos.x,
                    y: this.lastPos.y + velocity.y
                });
                this._minPos = this.nextPos.mult(Vec2d.createFrom(map.size).inverse())
                    .applyFunc(Math.floor);
                this._maxPos = this.nextPos.add(this.dimension).mult(Vec2d.createFrom
                    (map.size).inverse()).applyFunc(Math.ceil);

                for(let r=this._minPos.y; r < this._maxPos.y; r++) {
                    for(let c=this._minPos.x; c < this._maxPos.x; c++) {
                        this.currentPos = map.map[r * map.dimension.x + c];
                        if(typeof top === "function")
                            top();
                    }
                }
                this.pos = this.nextPos;
            }
            
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////   
    /////////////////////////////////// SPRITES ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    static Sprite = class {

        /**
         * @constructor
         * @param {Object} frames object contain animation frames data array
         * @param {Number} col number of columns in the spritesheet
         * @param {Number} delay animation delay
        */
        constructor(frames, col, delay=5) {
            this.col = col;
            this.frames = frames;
            this.currentFrames = [];
            this.frameName = null;
            for(const i in this.frames) {
                this.setFrame(i);
                break;
            }
            this.delay = delay;
            this.index = new Vec2d();
            this._delayCounter = 0;
            this._frameCounter = 0;
            this.state = false;
        }

        /**
         * @method setFrame
         * @description sets the current animation's frame
         * @param {String} frameName animation's frame name
         */
        setFrame(frameName) {
            if(this.frames.hasOwnProperty(frameName)) {
                if(this.frames[frameName] instanceof Array) {
                    this.currentFrames = this.frames[frameName];
                    this.frameName = frameName;
                } else 
                    throw TypeError("Sprite's current frame must be an instance of an Array");
            }
            else 
                throw new Error(`Sprite Frame name does not exists`);
        }

        /**
         * @method getSource
         * @description gets the source vectors for the animation. This 
         * method must be called in a loop for an effective animation
         */
        getSource() {
            this._delayCounter++;
            if(this._delayCounter > this.delay) {
                this._delayCounter = 0;
                this._frameCounter++;
                if(this._frameCounter >= this.currentFrames.length) {
                    this.state = false;
                    this._frameCounter = 0;
                } else {
                    this.state = true;
                }
                let value = this.currentFrames[this._frameCounter] - 1;
                let x = value % this.col;
                let y = value / this.col;
                this.index = new Vec2d(x, y);
            }
        }

    }


     ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////   
    /////////////////////////////////// BASIC //////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    static Basic = class {

            constructor(type="rect", pos, dimension) {
                this.type = type;
                this.rotation = 0;
                this.scale = new Vec2d(1, 1);
                this.velocity = new Vec2d(1, 1);
                if(type === "rect") {
                    this.pos = Vec2d.createFrom(pos);
                    this.dimension = Vec2d.createFrom(dimension);
                } else if(type === "circle") {
                    this.pos = Vec2d.createFrom(pos);
                    this.r = dimension;
                } else if(type === "polygon") {
                    this.pos = Vec2d.createFrom(pos);
                    this.vertices = dimension;
                } else if(type === "line") {
                    this.start = Vec2d.createFrom(pos);
                    this.end = Vec2d.createFrom(dimension);
                }
            }

        }

}