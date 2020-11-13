/**
* @class CreditScene
* A class displaying the `BatGames` Engine splashscreen on 
* every start of a scene.
*/
class MirielleScene {

	/**
	* @constructor
	* @params {HTMLSectionElement} parent of this scene
	* @param {Number} w width of the scene
	* @param {Number} h height of the scene
	*/
	constructor(parent, w, h, config) {
		// create the scene
		this._parent = parent;
		this._canvas = document.createElement("canvas");
		this._canvas.width = w;
		this._canvas.height = h;
		this._canvas.style.position = "absolute";
		this.state = false;
		this._parent.appendChild(this._canvas);

		// configurations
		this.config = config;
		this.ctx = this._canvas.getContext("2d");

		let styles = {
			duration: 0, //Math.max(5, config.duration || 5),
			fontSize: Math.max(35, config.fontSize) || 35,
			fontFamily: Math.max(35, config.fontFamily) || "Verdana"
		};

		// set themes
		if(this.config.theme === "dark")
			this._canvas.style.backgroundColor = "#222";
		else if (this.config.theme === "light")
			this._canvas.style.backgroundColor = "#fff";
		else this.config.theme = "light";

		// draw logo
		this.ctx.beginPath();
		this.ctx.moveTo(w/2, h/2 - 20);
		for(let i=0; i <= 360; i+=60) {
			let angle = i * Math.PI / 180;
			let radius = styles.fontSize * 3;
			let x = w/2 + Math.cos(angle) * radius;
			let y = (h/2 - 20) + Math.sin(angle) * radius;
			this.ctx.lineTo(x, y);
		}
		this.ctx.fillStyle = this.config.theme === "light" ? "dimgray" : "#333";
		this.ctx.fill();

		// bat text
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.font = `bold ${styles.fontSize}px ${styles.fontFamily}`;
		this.ctx.fillStyle = this.config.theme === "light" ? "#fff" : "dimgray";
		this.ctx.fillText("Bat Games", w/2, h/2 - 20);

		// bat description
		this.ctx.font = `bold ${styles.fontSize - (styles.fontSize-10)}px ${styles.fontFamily}`;
		this.ctx.fillStyle = "red";
		this.ctx.fillText("Games API for web developers on a GO", w/2, h/2 + 20);

		// copyright
		this.ctx.font = `bold 10px ${styles.fontFamily}`;
		this.ctx.fillStyle = this.config.theme === "light" ? "#222" : "#fff";
		this.ctx.fillText("Mirielle "+new Date().getFullYear(), w/2, h - 50);

		// hide this scene after timeout of the specified style's duration
		let timer = setTimeout(() => {
			clearTimeout(timer);
			this._parent.removeChild(this._canvas);
			this.state = true;
		}, styles.duration * 1000);
	}

}