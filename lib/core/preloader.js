export class Preload {

    constructor(assets) {
        if(!assets instanceof Array) 
            throw new Error("Preload assets must be an instance of an Array");

        // preload
        this.preload = assets || [];
        this._preloadedAssetsCounter = 0;
        this._preloadedImages = [];
        this._preloadedAudios = [];
        this._preloadedFiles = [];

        if(this.preload.length !== 0) {
            let imgExtensions = [".jpg", ".gif", ".png"];
            let audExtensions = [".mp3"];
            let otherExtensions = [".txt", ".json", ".obj"];

            // group preload assets 
            if(this.preload instanceof Array) {
                this.preload.forEach((data, index) => {
                    // check for images
                    if(imgExtensions.some(i => data.src.endsWith(i)) || data.type !== undefined 
                        && data.type === "img" || data.type === "image")
                        this._preloadedImages.push({img: new Image(), ind:index, ...data});
                    // check for audios
                    else if(audExtensions.some(i => data.src.endsWith(i)) || data.type !== undefined
                        && data.type === "aud" || data.type === "audio") {
                        let aud = document.createElement("AUDIO");
                        this._preloadedAudios.push({aud:aud, ind:index, ...data});
                        aud.style.display = "none";
                        document.body.appendChild(aud);
                    }
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

        this._files = [];

        this.done = false;
        this.onReady = null;
        this.onLoading = null;

        this.status = "loading";
    }

    /**
    * @method loadingFunction
    * @description funtion to check if preloading is done
    */
    loadingFunction() {
        if(this._preloadedAssetsCounter === this.preload.length) {
            this.status = "loaded";
            this.done = true;
        }
    }


    /**
    * @method startPreload
    * @description preloads all media files, media files data must be in this format
    * - {src:String, name:String}
    * all stored in the configuration's preload array
    */
    start() {
        this._preloadedImages.forEach(data => {
            data.img.addEventListener("load", ()=>{
                this._preloadedAssetsCounter++;
                this.loadingFunction();
            });
            data.img.addEventListener("error", () => {
                this.error = `Fail to Load ${data.src}`;
                this.status = "failed";
            });
            data.img.src = data.src;
        });

        this._preloadedAudios.forEach(data => {
            data.aud.addEventListener("canplay", ()=>{
                this._preloadedAssetsCounter++;
                this.loadingFunction();
            });
            data.aud.addEventListener("error", () => {
                this.error = `Fail to Load ${data.src}`;
                this.status = "failed";
            })
            data.aud.src = data.src;
        });

        const loadFiles = (data, _this) => {
            let req = new XMLHttpRequest();
            req.onreadystatechange = function() {
                if(req.readyState === XMLHttpRequest.DONE) {
                    if(req.status === 200) {
                        _this._preloadedAssetsCounter++;
                        data.res = req.responseText;
                        _this.loadingFunction();
                    } else {
                        this.error = `Bad Internet Connection`;
                        _this.status = "failed";
                    }
                }
            };
            req.open("GET", data.src);
            req.send();
        }

        this._preloadedFiles.forEach(file => {
            loadFiles(file, this);
        });
    }

    /**
    * @method getMedia
    * @description get any media files from the preloaded array
    * @returns {HTMLImageElement | HTMLAudioElement}
    */
    getMedia(name, type="img") {
        if(type === "img" || type === "image") {
            let res = this._preloadedImages.filter(i => i.name === name)[0];
            return res.img;
        }else if(type === "aud" || type === "audio") {
            let res = this._preloadedAudios.filter(i => i.name === name)[0];
            return res.aud;
        } else if(type === "other" || type === "json") {
            let res = this._preloadedFiles.filter(i => i.name === name)[0];
            return res.res;
        }
    }

    init() {
        this.start();
        let interval = setInterval(() => {
            if(this.done) {
                clearInterval(interval);
                if(typeof this.onReady === "function")   this.onReady();
            } else {
                if(typeof this.onLoading === "function") this.onLoading();
            }
        }, 10);
    }

}




/**
* @class preloadScene
* A class displaying the `Preloading` Screen on 
* every start of a scene if there's an asset to preload
*/
export class PreloadScene extends Preload {

    /**
    * @constructor
    * @params {HTMLSectionElement} parent of this scene
    * @param {HTMLCanvasElement} parent canvas of this scene
    * @param {Number} w width of the scene
    * @param {Number} h height of the scene
    */
    constructor(parent, w, h, config) {
        super(config.preload);
        // create the scene
        this.parent = parent;
        this._canvas = document.createElement("canvas");
        this._canvas.width = w;
        this._canvas.height = h;
        this._canvas.style.position = "absolute";
        this.parent.appendChild(this._canvas);

        // configurations
        this.config = config;
        this.ctx = this._canvas.getContext("2d");

        // preload
        this._preloadAngle = 0;
        this._preloadScale = 5;
        this._preloadColorIndex = 0;
    }

    /**
    * @method loadingFunction
    * @description funtion to check if preloading is done
    */
    loadingFunction() {
        if(this._preloadedAssetsCounter === this.preload.length) {
            this.done = true;
            this.parent.removeChild(this._canvas);
        }
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
        
        this.ctx.fillStyle = "black";
        this.ctx.font = "bold 12px Verdana";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText("Please Wait...", W/2, H-20);
    }

};