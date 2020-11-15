class Scene {

    constructor(parent, dynamic=false) {
        this._parent = parent;
        // game area
        this._canvas = document.createElement("canvas");
        this._canvas.style.position = 'absolute';
        this.ctx = this._canvas.getContext("2d");
        this.dynamic = dynamic;

        // set css styling
        this._canvas.width = this._parent.w || 300;
        this._canvas.height = this._parent.h || 300;
        this._canvas["class"] = "canvasScene";

        // functions
        this.clear = () => this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this.update = null;

        this._fpsStarted = performance.now();
        this._elapsedTimeStarted = new Date().getTime();

        this._parent.getArea().appendChild(this._canvas);
        this._parent._allScenes.push(this);
    }

    animate() {
        const animate = currentTime => {
            if(typeof this.clear === "function" && typeof this.update === "function") {
                this.clear();
                this.update();
                requestAnimationFrame(animate);
            }
        }
        return animate;
    }

    getFPS() {
        let t1 = performance.now();
        let fps = 1000 / (t1 - this._fpsStarted);
        this._fpsStarted = t1;
        return fps;
    }


    getElapsedTime() {
        let t1 = new Date().getTime();
        let eTime = 0.001 * (t1 - this._elapsedTimeStarted);
        this._elapsedTimeStarted = t1;
        // stop updating when tab switched
        if(eTime > 0.2) eTime = 0;
        return eTime;
    }

    getContext() {
        return this._canvas.getContext("2d");
    }

    setWidth(w) {
        this._canvas.width = w;
    }

    setHeight(h) {
        this._canvas.height = h;
    }

    getWidth() {
        return this._canvas.width;
    }

    getHeight() {
        return this._canvas.height;
    }

    getCanvas() {
        return this._canvas;
    }

    getParent() {
        return this._parent;
    }

}
