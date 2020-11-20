 import * as g from "../bat@v0.0.10-alpha/bat.js";
//import * as g from "https://cdn.jsdelivr.net/gh/Mirielle2004/bat@v0.0.9-alpha/bat.js";

let ctx;

let config = {
    mirielle: {
        duration: 0,
        theme: "navy"
    },
    preload:[
        {src:"../bat@v0.0.10-alpha/example/isoTileset.png", name:"roygiv"},
//        {src:"../bat@v0.0.9-alpha/example/test.mp3", name:"test"}
//        {src:"../bat@v0.0.9-alpha/example/block.png", name:"block"},
//        {src:"../bat@v0.0.9-alpha/example/img/hero.png", name:"hero"},
    ]
};




window.addEventListener("load", e => {
    
    let game = new g.GameArea(innerWidth, innerHeight, config);    
    let scene = new g.Scene(game, true);
    ctx = scene.getContext();
        
    game.onReady = function() {
        console.log(`Game Started: ${new Date().getTime()}ms`);
        
        scene.css({display:"none"});
        
        
        let preload = new g.Preloader([
         {src:"../bat@v0.0.10-alpha/example/test.mp3", name:"test"}
        ]);
        
        preload.onLoading = function() {
            if(this.status === "failed") 
                g.Utils.$("#loading").innerHTML = "Failed";
            else g.Utils.$("#loading").innerHTML = "Loading...";
        };
        
        preload.onReady = function() {
            g.Utils.$("#loading").innerHTML = "Loaded";
            let aud = this.getMedia("test", "audio");
            addEventListener("keydown", e => {
                if(e.keyCode === 32) {
                    aud.play();
                }
            })
        }
        
        preload.init();
    }
    
    scene.update = function() {
        
    }
    
    game.init();
    
});