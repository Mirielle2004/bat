import {PreloadScene} from "./preloader.js";
import {MirielleScene} from "./mirielleScene.js";
import {Scene} from "./scene.js";

/**
* Principal class for scene rendering
* 
* CONFIG
* .mirielle        | styling for the mirielle canvas
* .css           | css stylings for the scene
* .attr          | html attributes of the scene
* .dynamic       | determine wether RAF should be enabled
*
*/

export class GameArea {
	/**
	* @constructor
	* @param {Number} w width of the scene
	* @param {Number} h height of the scene
	* @param {Object | String} config configuration data of the scene
	*/
	constructor(w, h, config) {
        this.w = w || 300;
        this.h = h || 300;
        this.config = config;
        this.config.mirielle = config.mirielle || {
            theme: "dark",
            duration: 5,
        }
        this.config.preload = config.preload || [];
        this.state = false;
		// game section
		this.section = document.createElement("section");
        this.section.style.margin = "0";

        // set other private screens
        this._preloadScene = new PreloadScene(this.section, this.w, 
            this.h, this.config);
        this._mirielleScene = new MirielleScene(this.section, this.w, 
            this.h, config.mirielle);
        this.section.class = "gameScene";

        // create the scene
        this.onReady = null;
        this._allScenes = [];
        this.files = [];
        this._preloadScene.start();
        document.body.insertBefore(this.section, document.body.childNodes[0]);
	}

    getArea() {
        return this.section;
    }

    
    /**
    * @method getMedia
    * @description get any media files from the preloaded array
    * @returns {HTMLImageElement | HTMLAudioElement}
    */
    getMedia(name, type="img") {
        let preload = this._preloadScene;
        return preload.getMedia(name, type);
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

    init() {
        const appendChildScene = () => {
            this._allScenes.forEach(scene => {
                if(scene instanceof Scene) {
                    this.section.appendChild(scene.getCanvas());
                    scene._fpsStarted = performance.now();
                    scene._elapsedTimeStarted = new Date().getTime();
                    if(scene.dynamic) {
                        requestAnimationFrame(scene.animate());
                    } else {
                        if(typeof scene.update === "function")
                            scene.update();
                        else console.error(`Scene does not have a valid update method`);
                    }
                } else this.section.appendChild(scene);
            });
        }

        let mainInterval = setInterval(() => {
            if(this._mirielleScene.done) {
                // has every assets been loaded ?
                if(this.config.preload.length !== 0) {
                    if(this._preloadScene.done) {
                        clearInterval(mainInterval);
                        this.files.push(this._preloadScene._preloadedFiles);
                        if(typeof this.onReady === "function") this.onReady();
                        appendChildScene();
                    } else this._preloadScene.activeScene();
                } else {
                    clearInterval(mainInterval);
                    if(typeof this.onReady === "function") this.onReady();
                    appendChildScene();
                }
            }
        }, 0);
    }

    appendChild(...element) {
        element.forEach(ele => {
            if(ele instanceof HTMLElement)
                this._allScenes.push(ele);
        }); 
    }

    setWidth(w) {
        this.w = w;
    }

    setHeight(h) {
        this.h = h;
    }

    getWidth() {
        return this.w;
    }

    getHeight() {
        return this.h;
    }
		
};