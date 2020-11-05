/**
* Principal class for scene rendering
* 
* CONFIG
* .credit        | styling for the credit canvas
* .css           | css stylings for the scene
* .attr          | html attributes of the scene
* .dynamic       | determine wether RAF should be enabled
*
*/

class Scene {
	/**
	* @constructor
	* @param {Number} w width of the scene
	* @param {Number} h height of the scene
	* @param {Object | String} config configuration data of the scene
	*/
	constructor(w, h, config, pure=false) {
		// game section
		this.section = document.createElement("section");
        this.section.style.margin = "0";
        this.pure = pure;

		// game area
		this._canvas = document.createElement("canvas");
		this.ctx = this._canvas.getContext("2d");
		this.config = config || {dynamic: false};

		// set css styling
		this._canvas.width = w || 300;
		this._canvas.height = h || 300;
		if(this.config.css !== undefined) {
            if(!(this.config.css instanceof Object)) 
                console.error("Scene CSS styling data must be an instance of an Object");
            else
                for(const key in this.config.css)
                	this.section.style[key] = this.config.css[key];
        }

        // set other private screens
        this._preloadScene = new PreloadScene(this.section, this._canvas.width, 
            this._canvas.height, config);
        this._creditScene = new CreditScene(this.section, this._canvas.width, 
            this._canvas.height, config.credit);

        // set attributes
        this._canvas["class"] = "canvasScene";
        this.section.class = "gameScene";
        if(this.config.attr !== undefined) {
            if(!(this.config.attr instanceof Object)) 
                console.error("Scene attributes data must be an instance of an Object");
            else
                for(const key in this.config.attr) 
                    this.section[key] = config.attr[key];
        }

        // functions
        this.clear = null;
        this.update = null;

        // create the scene
        this._preloadScene.start();
        document.body.appendChild(this.section);
	}

    
    /**
    * @method getMedia
    * @description get any media files from the preloaded array
    * @returns {HTMLImageElement | HTMLAudioElement}
    */
    getMedia(name, type="img") {
        let preload = this._preloadScene;
        if(type === "img" || type === "image") {
            let res = preload._preloadedImages.filter(i => i.name === name)[0];
            return res.img;
        }else if(type === "aud" || type === "audio") {
            let res = preload._preloadedAudios.filter(i => i.name === name)[0];
            return res.aud;
        } 
    }

    init() {
        const animate = currentTime => {
            if(typeof this.clear === "function" && typeof this.update === "function") {
                this.clear();
                this.update();
                requestAnimationFrame(animate);
            }
        }

        // start the scene
        let mainInterval = setInterval(() => {
            if(this._creditScene.state) {
                // has every assets been loaded ?
                if(this._preloadScene.state) {
                    clearInterval(mainInterval);
                    this.section.append(this._canvas);
                    this._fpsStarted = performance.now();
                    this._elapsedTimeStarted = new Date().getTime();
                    // i want a redraw frame
                    if(this.config.dynamic)
                        requestAnimationFrame(animate);
                    else {
                        this.update();
                    }
                } else {
                    this._preloadScene.activeScene();
                }
                 
                
            }
        }, 0);
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

    getWidth() {
        return this._canvas.width;
    }

    getHeight() {
        return this._canvas.height;
    }

    setWidth(value) {
        this._canvas.width = value;
    }

    setHeight(value) {
        this._canvas.height = value;
    }

    getAttr(identifier) {
        return this.section[identifier];
    }

    setAttr(key, value) {
        this.section[key] = value;
    }

    getStyle(identifier) {
        return this._canvas.style[identifier];
    }

    setStyle(key, value) {
    	this.section.style[key] = value;
    }

    getCanvas() {
    	return this._canvas;
    }

    getParent() {
        return this.section;
    }
		
};