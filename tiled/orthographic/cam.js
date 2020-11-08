class OrthographicCamera {
    /**
     * @constructor
     * @param {Vec3d} camera's position in 3d space
     * @param {Vec3d} camera's dimension in screen
     */
    constructor(pos = new Vec3d(), dimension = new Vec3d()) {
        this.pos = Vec3d.createFrom(pos);
        this.dimension = Vec3d.createFrom(dimension);
        this.minPos = new Vec3d();
        this.maxPos = new Vec3d();

        this._shakeEnabled = false;
        this._isShaking = false;
        this._shakeTimeOut = 0;
    }

    /**
     * @method lookAt
     * @description set the minimum and maximum visible area of the camera
     * @param {Array} map the map
     * @param {Vec2d} the size of each tile in the map
     */
    lookAt(map, sizee) {
        let size = Vec3d.createFrom(sizee);
        size.z = this.pos.z;
        this.minPos = this.pos.mult(size.inverse()).applyFunc(Math.floor);
        this.maxPos = this.pos.add(this.dimension).mult(
            size.inverse()).applyFunc(Math.ceil);
    }

    /**
     * @method setMapClamp
     * @description set the minimum and maximum indexes from the array
     * @param {Vec2d} minn the minimum indexes on the array
     * @param {Vec2d} maxx the maximum indexes on the array
     */
    setMapClamp(minn, maxx) {
        let min = Vec3d.createFrom(minn);
        let max = Vec3d.createFrom(maxx);
        if (this.minPos.x < min.x)
            this.minPos.x = min.x;
        else if (this.maxPos.x > max.x)
            this.maxPos.x = max.x;

        if (this.minPos.y < min.y)
            this.minPos.y = min.y;
        else if (this.maxPos.y > max.y)
            this.maxPos.y = max.y;
    }

    /**
     * @method setMapClamp
     * @description set the minimum and maximum position in worldspace
     * @param {Vec2d} minn the minimum position on the canvas
     * @param {Vec2d} maxx the maximum position on the canvas
     */
    setPosClamp(minn, maxx) {
        let min = Vec3d.createFrom(minn);
        let max = Vec3d.createFrom(maxx);
        if (this.pos.x < min.x)
            this.pos.x = min.x;
        else if (this.pos.x + this.dimension.x > max.x)
            this.pos.x = max.x - this.dimension.x;

        if (this.pos.y < min.y)
            this.pos.y = min.y;
        else if (this.pos.y + this.dimension.y > max.y)
            this.pos.y = max.y - this.dimension.y;

        if (this.pos.z < min.z) this.pos.z = min.z;
        else if (this.pos.z > max.z) this.pos.z = max.z;
    }

    /**
     * @method follow
     * @description determines the center of the camera
     * @param {Vec2d} poss the positional vector
     * @param {Vec2d} dimension the dimension of the component
     */
    follow(poss, dimensionn) {
        if (!this._isShaking) {
            let pos = Vec3d.createFrom(poss);
            let dimension = Vec3d.createFrom(dimensionn);
            this.pos = pos.add(dimension.scale(0.5)).sub(this.dimension.scale(0.5));
        } else {
            let pos = Vec3d.createFrom(poss);
            let dimension = Vec3d.createFrom(dimensionn);
            this.pos = pos.add(dimension.scale(0.5)).sub(this.dimension.scale(0.5)).scale(Math.sin(Math.random() * 20) * 1);
            // this.shake(poss);
        }
    }

    shakeEnabled(pos, dimension = new Vec2d()) {
        this._shakeEnabled = true;
        this._shakeOrigin = Vec2d.createFrom(pos);
        this._shakeDimension = Vec2d.createFrom(dimension);
        this._shakePivot = this._shakeOrigin.add(this._shakeDimension.scale(0.5));
    }

    shake(origin, duration) {
        // if(this._shakeTimeOut >= duration) {
        // 	this._isShaking = false;
        // 	this._shakeTimeOut = 0;
        // } else {
        // 	this._isShaking = true;
        // 	this._shakeTimeOut++;
        // 	let nx = origin.x + Math.sin(Math.random() * 20) * 10;
        // 	let ny = origin.y + Math.sin(Math.random() * 20) * 10;
        // 	this.pos = Vec2d.createFrom([nx, ny]);
        // }
        if (this._shakeEnabled) {
            // let diffPos = Vec2d.createFrom([])
            // let shakePos = this._shakeOrigin.add()
            // let p = this.pos.add(this.dimension.scale(0.5));
            let nx = this._shakePivot.x + Math.sin(Math.random() * 20) * 1;
            let ny = this._shakePivot.y + Math.sin(Math.random() * 20) * 1;
            this.pos = Vec2d.createFrom([nx, ny]);
        } else
            throw new Error("Cannot shake Camera: Please enabled camera shake by calling it's method")
    }

}