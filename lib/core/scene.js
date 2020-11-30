import {Preload} from "./preloader.js";

/**
* @TODO
* - Add a better animation's pause state
*
* FUNCTIONS
* -onLoading, onReady, update, addEventListener
*/

export class Scene {
    /**
    * @constructor
    * @param {Number} w width of the scene
    * @param {Number} h height of the scene
    * @param {Boolean} dynamic should the scene requestAnimationFrame ? 
    * @param {Preload} preloader preloading assets for the scene
    */
    constructor(w, h, dynamic=false, preloader=null) {
        this._canvas = document.createElement('canvas');
        this._canvas.width = w;
        this._canvas.height = h;
        this._ctx = this._canvas.getContext("2d");
        
        this._isDynamic = dynamic;
        this._animationId = null;
        
        if(preloader === null);
        else {
            if(preloader instanceof Preload) 
                this._preloader = preloader;        
            else 
                throw new Error("Scene Preloader Must be an Instance of a `Preloader`");   
        }
        
        this.state = "active"; // active, pause
        
        // functions
        this.clear = () => this._ctx.clearRect(0, 0, w, h);
        this.update = null;
        
        this._canvas.class = "batCanvasScene";
        
        document.body.appendChild(this._canvas);
    }
    
    /**
    * @method getScene
    * @description get the canvas of this scene
    * @return {HTMLCanvasElement} the canvas of this scene
    */
    getScene() {
        return this._canvas;
    }
    
    /**
    * @method getContext
    * @description get the drawing context for the canvas of this scene
    * @return {CanvasRenderingContext2D} the drawing context for this scene
    */
    getContext() {
        return this._canvas.getContext("2d");
    }
    
    /**
    * EXPERIMENTAL
    * @method pause
    * @description pause a dynamic scene 
    */
    pause() {
        this.state = "paused";
        cancelAnimationFrame(this._animationId);
    }
    
    setWidth(w) {
        this.getScene().width = w;
    }
    
    setHeight(h) {
        this.getScene().height = h;
    }

    /**
    * @method getWidth
    * @description get the width of this scene
    * @return {Number} the width for this scene
    */
    getWidth() {
        return this._canvas.width;
    }

    /**
    * @method getHeight
    * @description get the height of this scene
    * @return {Number} the height of this scene
    */
    getHeight() {
        return this._canvas.height;
    }
    
    /**
    * @method css
    * @description style this css width css using key-value syntax of the javascript object
    * @param {Object} styles styling data for this scene
    * styles = {backgroundColor, color};
    */
    css(styles) {
        this.getScene().css(styles);
    }
    
    /**
    * @method attr
    * @description give an attribute to this scene
    * attr = {id, class}
    */
    attr(att) {
        this.getScene().attr(att);
    }
    
    /**
    * @method getMedia
    * @description get a media from the preloader's asset on this scene
    * @param {String} name name of the media
    * @param {String} type type of the media
    * return {Any} media assets of this scene
    */
    getMedia(name, type) {
        return this._preloader.getMedia(name, type);
    }

    /**
    * @method getFPS
    * @description calculate the current fps for the scene
    * @return {Number} the fps
    */
    getFPS() {
        let t1 = performance.now();
        let fps = 1000 / (t1 - this._fpsStarted);
        this._fpsStarted = t1;
        return fps;
    }


    /**
    * @method getElapsedTimePS
    * @description elased time per seconds
    * @return {Number} total elapsed time in seconds
    */
    getElapsedTimePS() {
        return (this.currentTime - this._timeStarted) * .001;
    }
    
    /**
    * @method getFelapsedTimePS
    * @description elapsed time for every frame in seconds
    * @return {Number} fElapsedTime per seconds
    */
    getFelapsedTimePS() {
        let eTime = 0.001 * (this.currentTime - this._frameElapsedTimeStarted);
        this._frameElapsedTimeStarted = this.currentTime;
        // stop updating when tab switched
        if(eTime > 0.2) eTime = 0;
        return eTime;
    }
    
    /**
    * @method start
    * @description start the scene
    */
    start() {
        let _this = this;
        this.state = "active";
        
        const animate = currentTime => {
            this.clear();
            this.currentTime = new Date().getTime();
            this.update();
            this._animationId = requestAnimationFrame(animate);
        }
        
        // there are assets for preloading
        if(this._preloader instanceof Preload) {
            this._preloader.onLoading = typeof this.onLoading === "function" ? _this.onLoading : () => {};
            this._preloader.onReady = () => {
                if(_this._isDynamic) {
                    _this._frameElapsedTimeStarted = new Date().getTime();
                    _this._fpsStarted = performance.now();
                    _this._timeStarted = new Date().getTime();
                    if(typeof _this.onReady === "function")
                        _this.onReady();
                    requestAnimationFrame(animate);
                } else
                    _this.update();
            };
            this._preloader.start();
        } 
        // no asset for preloading
        else {
            if(_this._isDynamic) {
                _this._elapsedTimeStarted = new Date().getTime();                    _this._fpsStarted = performance.now();
                requestAnimationFrame(animate);
            } else
                _this.update();
        }
    }
    
    
    addEventListener(type, callback, capture=false) {
        this.getScene().addEventListener(type, callback, capture);
    }
}