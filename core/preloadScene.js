/**
* @class CreditScene
* A class displaying the `Preloading` Screen on 
* every start of a scene if there's an asset to preload
*/
class PreloadScene {

	/**
	* @constructor
	* @params {HTMLSectionElement} parent of this scene
	* @param {HTMLCanvasElement} parent canvas of this scene
	* @param {Number} w width of the scene
	* @param {Number} h height of the scene
	*/
	constructor(parent, w, h, config) {
		// create the scene
		this.parent = parent;
		this._canvas = document.createElement("canvas");
		this._canvas.width = w;
		this._canvas.height = h;
		this._canvas.style.position = "absolute";
		this.state = false;
		this.parent.appendChild(this._canvas);

		// configurations
		this.config = config;
		this.ctx = this._canvas.getContext("2d");

		// preload
        this.preload = this.config.preload || [];
        this._preloadedImages = [];
        this._preloadedAudios = [];
        this._preloadedFiles = [];
        this._preloadAngle = 0;
        this._preloadScale = 5;

        if(this.preload.length !== 0) {
            let imgExtensions = [".jpg", ".gif", ".png"];
            let audExtensions = [".mp3"];
            let otherExtensions = ['.json', "other"];

            // group preload assets 
            if(this.preload instanceof Array) {
                this.preload.forEach((data, index) => {
                    // check for images
                    if(imgExtensions.some(i => data.src.endsWith(i)) || data.type !== undefined 
                        && data.type === "img" || data.type === "image")
                        this._preloadedImages.push({img: new Image(), ind:index, ...data});
                    // check for audios
                    else if(audExtensions.some(i => data.src.endsWith(i)) || data.type !== undefined 
                        && data.type === "aud" || data.type === "audio")
                        this._preloadedAudios.push({aud: new Audio(), ind:index, ...data});
                    // check for files
                    else if(data.type !== undefined && otherExtensions.some(i => i === data.type)) {
                        this._preloadedFiles.push({...data});
                    } else 
                        throw TypeError(`Invalid Media extension for ${data.src}`);
                });
            } else 
                throw TypeError("Failed to initialize preload: Must be an instanceof of an Array");
        }

	}

	/**
	* @method startPreload
	* @description preloads all media files, media files data must be in this format
	* - {src:String, name:String}
	* all stored in the configuration's preload array
	*/
	start() {

        async function loadImage(data) {
            let promise = new Promise((resolve, reject) => {
                data.img.addEventListener("load", () => {
                    setTimeout(() => resolve(`${data.name} loaded`), 2000);
                });
                data.img.addEventListener("error", () => {
                    reject(`Failed to load the image ${data.img.src}`);
                });
            });
            data.img.src = data.src;
            return promise;
        }

        async function loadAudio(data) {
            let promise = new Promise((resolve, reject) => {
                data.aud.addEventListener("canplaythrough", () => {
                    setTimeout(() => resolve(`${data.name} loaded`), 2000);
                });
                data.aud.addEventListener("error", () => {
                    reject(`Failed to load the Audio ${data.data.src}`);
                });
            });
            data.aud.src = data.src;
            return promise;
        }

        // {src, type, name, res}
        async function loadFile(data) {
            let req = new XMLHttpRequest();
            let promise = new Promise((resolve, reject) => {
                req.addEventListener("load", function() {
                    if(req.status === 200)  {
                        if(data.type === "json")
                            data.res = JSON.parse(req.responseText);
                        else data.res = req.responseText;
                        resolve({name: data.name, res:data.res, type:"file"});
                    }
                });
                req.addEventListener("error", function() {
                    reject(`Failed to Load the file ${data.src}`);
                });
            });
            req.open("GET", data.src);
            req.send();
            return promise;
        }

        this.promisesArr = [];
        this._preloadedImages.forEach((data) => this.promisesArr.push(loadImage(data)));
        this._preloadedAudios.forEach((data) => this.promisesArr.push(loadAudio(data)));
        this._preloadedFiles.forEach((data) => this.promisesArr.push(loadFile(data)));
    }

    /**
	* @method activeScene
	* @description scene shown while preloading
	*/
	activeScene() {
		let W = this._canvas.width;
		let H = this._canvas.height;
        if(this.config.mirielle.theme === "dark") this.ctx.fillStyle = "#222";
        else this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(0, 0, W, H);
        let color = ["red", "teal", "yellow", "navy"];
        let size = 22.5;
        this._preloadAngle++;
        let x = Math.sin(Math.degToRad(this._preloadAngle)) * this._preloadScale;
        let y = Math.sin(Math.degToRad(this._preloadAngle)) * this._preloadScale;
        this.ctx.save();
        this.ctx.translate(W/2 - 22.5, H/2 - 22.5);
        this.ctx.rotate(Math.degToRad(this._preloadAngle + 10));
        this.ctx.scale(x, y);
        for(let r=0; r < 2; r++) {
            for(let j=0; j < 2; j++) {
                let px = j * size - (size * 2)/2;
                let py = r * size - (size * 2)/2;
                if(r < 1) this.ctx.fillStyle = color[r + j];
                else this.ctx.fillStyle = color[Math.min(3, 2+j)];
                this.ctx.fillRect(px, py, size - 5, size - 5);
            }
        }
        this.ctx.restore();
    }

}