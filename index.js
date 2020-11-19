 import * as g from "../bat/bat.js";
//import * as g from "https://cdn.jsdelivr.net/gh/Mirielle2004/bat@v0.0.3-alpha/bat.js";

let ctx;

let config = {
    mirielle: {
        duration: 0,
        theme: "navy"
    },
    preload:[
        {src:"../bat/example/isoTileset.png", name:"roygiv"},
        {src:"../bat/example/block.png", name:"block"},
        {src:"../bat/example/img/hero.png", name:"hero"},
    ]
};


const cartToIso= pos => g.Vector2.createFrom({
    x: pos.x - pos.y,
    y: pos.x + pos.y
});



window.addEventListener("load", e => {
    
    let game = new g.GameArea(innerWidth, innerHeight, config);    
    let scene = new g.Scene(game, true);
    ctx = scene.getContext();
    
    let map = new g.TileMap(level, [50, 50], [10, 10]);
    let wall = new g.TileMap(level, [50, 50], [10, 10]);
    let cam = new g.TileCamera([0, 0], [200, 200]);
    let obj = new g.Component.Tile([100, 100], [32, 32]);
    let velocity = new g.Vector2();
    let origin = new g.Vector2(innerWidth/2, 50);
    
    let img = game.getMedia("roygiv", "img");
    let block = game.getMedia("block", "img");
    let hero = game.getMedia("hero", "img");
    
    game.onReady = function() {
        console.log(`Game Started: ${new Date().getTime()}ms`);
        this.img = this.getMedia("hero", "img");
    }
    
    map.draw = function() {
        let index = this.index.mult(map.size);
        let pos = g.TileMap.cartToIso(this.index).mult(this.size);
//        drawPoint([pos.x, pos.y], 5, "red");
        
        if(this.id === 0) {
            drawTile(pos, map.size, "navy");
        }
    }
    
    wall.draw = function() {
        let index = this.index.mult(map.size);
        let pos = g.TileMap.cartToIso(this.index).mult(this.size);
//        drawPoint([pos.x, pos.y], 5, "red");
        
        if(this.id === 1) {
            ctx.drawImage(block, 0, 0, 103, 95, pos.x - 103/3, pos.y -95/2, 103, 98);
        }
    }
    
    scene.update = function() {
        let fps = this.getFPS();
        let ctx = this.ctx;        
        
        ctx.save();
        ctx.translate(origin.x, origin.y);
        
        map.render();
        
        obj.checkCollision(map, velocity, {
           left()  {
               if(obj.currentPos !== 0) {
                   obj.nextPos = obj.lastPos;
               }
           },
            top() {
                if(obj.currentPos !== 0) {
                   obj.nextPos = obj.lastPos;
               }
            }
        });
        
        let pPos = g.TileMap.cartToIso(obj.pos);
        ctx.fillStyle = "red";
        drawTile(pPos, map.size, "red");
        ctx.drawImage(hero, 0, 0, 50, 64, pPos.x-60/2, pPos.y-60/2, 60, 60);
        
        
        wall.render();
        
        ctx.restore();
        
    }
    
    addEventListener("keydown", e => {
        let s = 2;
        if(e.keyCode === 37) {
            velocity.x = -s;
        } else if(e.keyCode === 38) {
            velocity.y = -s;
        } else if(e.keyCode === 39) {
            velocity.x = s;
        } else if(e.keyCode === 40) {
            velocity.y = s;
        } else if(e.keyCode === 32) {
            
        }
    });
    
    
    addEventListener("keyup", e => {
        velocity = new g.Vector2();
    });
    
    game.init();
    
});

const drawPoint = (p, r, c) => {
    ctx.beginPath();
    ctx.arc(p[0], p[1], r, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fillStyle = c;
    ctx.fill();
};

const drawTile = (p, s, c) => {
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + s.x, p.y + s.y/2);
    ctx.lineTo(p.x, p.y + s.y);
    ctx.lineTo(p.x - s.x, p.y + s.y/2);
    ctx.closePath();
    ctx.fillStyle = c;
    ctx.fill();
}

let level = [
    1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,
];

/**
// import * as g from "../bat/bat.js";
"https://cdn.jsdelivr.net/gh/Mirielle2004/modular-test@master/relll.js"
*/