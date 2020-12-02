import * as g from "../bat@v0.0.13-alpha/bat.js";


//let assets = [
//    {src:"../bat@v0.0.13-alpha/example/img/block.png", name:"block"},
//    {src:"../bat@v0.0.13-alpha/example/img/block.png", name:"block"},
////    {src:"../bat@v0.0.12-alpha/example/img/cubes.png", name:"cube", type:"img"},
//    {src:"../bat@v0.0.13-alpha/example/french.mp3", name:"ggg", type:"aud"},
//    {src:"../bat@v0.0.13-alpha/example/french.mp3", name:"ggg", type:"aud"},
//    {src:"../bat@v0.0.13-alpha/example/french.mp3", name:"ggg", type:"aud"},
////    {src:"https://raw.githubusercontent.com/Mirielle2004/Text-Files/master/cubeVertex.txt", res:"", name:"level", type:"file"}
//    
//];



let s = new g.Swipe(null, "mouse");

const init = () => {
    
    let config = {
    width: innerWidth,
    height: innerHeight,
    theme: "light",
    };

    let scene = new g.Scene(innerWidth, innerHeight, true);
    scene.update = function() {
        let ctx = this.getContext();
        let fps = this.getFPS();
        ctx.font = "bold 20px Arial";
        ctx.fillText(fps, 100, 100);
    }
    
    g.Launcher(config).then(e => {
        scene.start();
    });

};


addEventListener("load", init);