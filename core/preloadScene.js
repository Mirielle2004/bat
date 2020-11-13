/**
* @class preloadScene
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
        this._preloadedAssetsCounter = 0;
        this._preloadedImages = [];
        this._preloadedAudios = [];
        this._preloadedFiles = [];
        this._preloadAngle = 0;
        this._preloadScale = 5;
        this._preloadColorIndex = 0;
        this._currentLoadingFile = "";

        if(this.preload.length !== 0) {
            let imgExtensions = [".jpg", ".gif", ".png"];
            let audExtensions = [".mp3"];
            let otherExtensions = [".txt"];

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
                    // check for text files
                    else if(otherExtensions.some(i => data.src.endsWith(i)) || data.type !== undefined
                        && data.type === "other" || data.type === "file") {
                            this._preloadedFiles.push({type:"file", ...data});
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
        const loadingFunction = ()  => {
            if(this._preloadedAssetsCounter === this.config.preload.length) {
                this.state = true;
                this.parent.removeChild(this._canvas);
            }
        }

        this._preloadedImages.forEach(data => {
            this._currentLoadingFile = data.name;
            data.img.addEventListener("load", ()=>{
                this._preloadedAssetsCounter++;
                loadingFunction();
            });
            data.img.src = data.src;
        });

        this._preloadedAudios.forEach(data => {
            this._currentLoadingFile = data.name;
            data.aud.addEventListener("canplaythrough", ()=>{
                this._preloadedAssetsCounter++;
                loadingFunction();
            });
            data.aud.src = data.src;
        });

        const loadFiles = (data, _this) => {
            this._currentLoadingFile = data.name;
            let req = new XMLHttpRequest();
            req.onreadystatechange = function() {
                if(req.readyState === XMLHttpRequest.DONE) {
                    if(req.status === 200) {
                        _this._preloadedAssetsCounter++;
                        data.res = req.responseText;
                        loadingFunction();
                    } else {
                        console.error("Bad Internet Connection: Failed to get " + data.src);
                    }
                }
            }
            req.open("GET", data.src);
            req.send();
        }

        this._preloadedFiles.forEach(file => {
            loadFiles(file, this);
        });
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

        this.ctx.font = "bold 13px Verdana";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = this.config.mirielle.theme === "dark" ? "lightgray" : "#222";
        this.ctx.fillText("Loading..." + this._currentLoadingFile, W/2, H-50);
        this.ctx.fillText(`${this._preloadedAssetsCounter + 1} of ${this.preload.length}`, W/2, H-20);
    }

}