<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/gh/Mirielle2004/bat@master/bat.js"></script>
    <title>Sokoban | GAME</title>
</head>
<body>
    <section id="controller" style="display:none">
        <button id="up">UP</button>
        <button id="left">Left</button>
        <button id="right">Right</button>
        <button id="down">Down</button>
    </section>
</body>
</html>

body {
    margin: 0;
    position: fixed;
}

button {
    width: 90px;
    height: 90px;
    border: 2px solid white;
    outline: none;
    background: none;
    color: #eeeeee;
    font-weight: bolder;
    border-radius: 50%;
    box-shadow: 2px 2px 5px 5px lightskyblue;
}

#controller {
    width: 100vw;
    height: 50vh;
    position: absolute;
    transform: translateY(100%);
    z-index: 1;
}
                          
                          
                          let gameArea, player, tilesheet, map, level=0, goods=[], maxLevel=6;

const config = {
    mirielle: {
        duration: 5,
        theme: "dark"
    },
    preload: [
        {src:"https://raw.githubusercontent.com/Mirielle2004/Text-Files/master/TileLevel/sokobanLevel.txt", 
        type:"other", name:"level", res:""},
        {src:"https://i.ibb.co/YRmbxz6/sokoban.png", name:"sokoban", type:"img"}
    ]
};

const getTile = (m, p, s) => OrthographicMap.getMapId(m.map, p, s);


const newLevel = () => {
    goods = [];
    let newLevelData = gameArea.level[level];
    map = new OrthographicMap(newLevelData.map, 
        [22, 22], newLevelData.size);
    for(let r=0; r < newLevelData.size[1]; r++) {
        for(let j=0; j < newLevelData.size[0]; j++) {
            let id = newLevelData.map[r * newLevelData.size[0] + j];
            if(id === 8) player = Vec2d.createFrom([j,r]);
            else if(id === 17) goods.push(Vec2d.createFrom([j,r]));
        }
    }
}

const $ = id => document.getElementById(id);


function gameUpdate() {
    let ctx = this.ctx;
    // let fps = this.getFPS();
    let halfMap = map.dimension.mult(map.size).scale(0.5);
    let tPos = new Vec2d(this.getWidth(), this.getHeight())
        .mult([0.5, 0.3]).sub(halfMap);
    ctx.save();
    ctx.translate(tPos.x, tPos.y);
    // draw the world
    map.render(() => {
        let pos = map.index.scale(map.size.x).applyFunc(Math.floor);
        if(map.id === 0 || map.id === 8 || map.id === 17) {
            ctx.drawImage(tilesheet, 130, 70, 60, 60, 
                pos.x, pos.y, map.size.x, map.size.y);
        } else if(map.id === 1) {
            ctx.drawImage(tilesheet, 1, 1, 60, 60, 
                pos.x, pos.y, map.size.x, map.size.y);
        } else if(map.id === 30) {
            ctx.drawImage(tilesheet, 130, 70, 60, 60, 
                pos.x, pos.y, map.size.x, map.size.y);
            ctx.save();
            ctx.globalAlpha = .5;
            ctx.beginPath();
            ctx.arc(pos.x + map.size.x / 2, pos.y + map.size.y / 2, 
                map.size.x / 4, 0, 2*Math.PI);
            ctx.closePath();
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.restore();
        }
    });

    goods.forEach(good => {
        let absPos = good.scale(map.size.x);
        ctx.drawImage(tilesheet, 264, 140, 60, 60, 
                absPos.x, absPos.y, map.size.x, map.size.y);
    });

    let absPos = player.scale(map.size.x);
    ctx.drawImage(tilesheet, 73, 70, 60, 65, absPos.x, 
        absPos.y, map.size.x, map.size.y);

    if(goods.every(pos => getTile(map, pos, 13) === 30)) {
        if(level < maxLevel) {
            level++;
            alert(`Level ${level + 1}`);
            newLevel();
        } else {
            alert("congratulations! You've completed all levels.. now you can restart");
            level = 0;
            newLevel();
        }
        
    }

    ctx.font = 'bold 15px Verdana';
    ctx.textAlign = 'center';
    ctx.textBaseline = "middle";
    ctx.fillStyle = "teal";
    ctx.fillText(`Level: ${level + 1}`, 50, -10);

    ctx.restore();
}


const movePlayer = dir => {
    if(dir === "left") {
        let fPos = player.add([-1,0]);
        let lFpos = fPos.add([-1, 0]);
        let enem = goods.filter(i => i.x === fPos.x && i.y === fPos.y)[0];
        let nlenem = goods.filter(i => i.x === lFpos.x && i.y === lFpos.y)[0];
            if(enem !== undefined) {
                if(getTile(map, fPos.add([-1,0]), map.dimension.x) !== 1 &&nlenem === undefined) {
                    enem.x--;
                    player.x--;
                }    
            } else {
                if(getTile(map, fPos, map.dimension.x) !== 1)
                    player.x--;
            }
        } else if(dir === "right") {
            let fPos = player.add([1,0]);
            let lFpos = fPos.add([1, 0]);
            let enem = goods.filter(i => i.x === fPos.x && i.y === fPos.y)[0];
            let nlenem = goods.filter(i => i.x === lFpos.x && i.y === lFpos.y)[0];
            if(enem !== undefined) {
                if(getTile(map, fPos.add([1,0]), map.dimension.x) !== 1 && nlenem === undefined) {
                    enem.x++;
                    player.x++;
                    // gameArea.hitBox.play();
                }    
            } else {
                if(getTile(map, fPos, map.dimension.x) !== 1)
                    player.x++;
            }
        } else if(dir === "up") {
            let fPos = player.add([0,-1]);
            let lFpos = fPos.add([0, -1]);
            let enem = goods.filter(i => i.x === fPos.x && i.y === fPos.y)[0];
            let nlenem = goods.filter(i => i.x === lFpos.x && i.y === lFpos.y)[0];
            if(enem !== undefined) {
                if(getTile(map, fPos.add([0,-1]), map.dimension.x) !== 1 && nlenem === undefined) {
                    enem.y--;
                    player.y--;
                }    
            } else {
                if(getTile(map, fPos, map.dimension.x) !== 1)
                    player.y--;
            }
        } else if(dir === "down") {
            let fPos = player.add([0,1]);
            let lFpos = fPos.add([0,1]);
            let enem = goods.filter(i => i.x === fPos.x && i.y === fPos.y)[0];
            let nlenem = goods.filter(i => i.x === lFpos.x && i.y === lFpos.y)[0];
            if(enem !== undefined) {
                if(getTile(map, fPos.add([0,1]), map.dimension.x) !== 1 && nlenem === undefined) {
                    enem.y++;
                    player.y++;
                }    
            } else {
                if(getTile(map, fPos, map.dimension.x) !== 1)
                    player.y++;
            }
        }
}


Bat.Core.init(()=> {
    gameArea = new GameArea(innerWidth, innerHeight, config);
    let scene1 = new Scene(gameArea, true);
    tilesheet = gameArea.getMedia("sokoban", "img");

    // position all buttons controller
    let btnPos = [
            [innerWidth/2 - 45 +"px", "0px"], [innerWidth/2 - 135 +"px", "50px"], 
            [innerWidth/2 + 45 +"px", "50px"], [innerWidth/2 - 45 +"px", "135px"],
        ];
    document.querySelectorAll("button").forEach((btn, i) => {
        btn.style.position = "absolute";
        btn.style.left = btnPos[i][0];
        btn.style.top = btnPos[i][1];
    });

    // get level's file and display controller
    gameArea.onReady = function(){
        $("controller").css({display:"block"});
        this.levelData = this.getMedia("level", "other");
        this.level = JSON.parse(this.levelData);
        newLevel();
    }

    //clear the scene
    scene1.clear = function() {
        this.ctx.fillRect(0, 0, this.getWidth(), this.getHeight());
    };

    // update the scene
    scene1.update = gameUpdate;

    // add events
    addEventListener("keydown", e => {
        if(e.keyCode === 37)
            movePlayer("left");
        if(e.keyCode === 38) movePlayer("up");
        if(e.keyCode === 39) movePlayer("right");
        if(e.keyCode === 40) movePlayer("down");
    });
    $("up").ontouchstart = () => movePlayer("up");
    $("left").ontouchstart = () => movePlayer("left");
    $("right").ontouchstart = () => movePlayer("right");
    $("down").ontouchstart = () => movePlayer("down");

    // start the game
    gameArea.init();
});



[
	{ 
        "size": [13, 10],
        "map":[
            1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,8,0,0,0,0,0,0,0,0,0,0,1,
            1,0,17,0,0,0,1,0,0,0,0,0,1,
            1,0,30,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,1,0,0,0,0,0,1,
            1,0,0,0,1,0,0,0,0,0,1,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,1,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,1,
            1,1,1,1,1,1,1,1,1,1,1,1,1
        ]
    }, {
        "size": [9, 9],
        "map":[
            1,1,1,1,1,1,1,1,1,
            1,0,0,0,1,0,0,0,1,
            1,0,30,17,0,17,30,0,1,
            1,0,17,30,17,30,17,0,1,
            1,1,0,17,8,17,0,1,1,
            1,0,17,30,17,30,17,0,1,
            1,0,30,17,0,17,30,0,1,
            1,0,0,0,1,0,0,0,1,
            1,1,1,1,1,1,1,1,1
        ]
    },{
        "size": [8, 9],
        "map":[
            1,1,1,1,1,1,0,0,
            1,30,1,0,0,1,1,0,
            1,30,30,30,0,0,1,1,
            1,0,1,17,0,0,0,1,
            1,0,17,8,1,0,0,1,
            1,1,0,17,0,17,0,1,
            0,1,17,0,17,0,1,1,
            0,1,0,0,0,1,1,0,
            0,1,1,1,1,1,0,0
        ]
    },{
        "size": [11, 12],
        "map":[
            1,1,1,1,1,1,1,1,0,0,0,
            1,0,0,1,0,0,0,1,0,0,0,
            1,0,0,0,17,0,0,1,0,0,0,
            1,0,0,1,1,0,1,1,1,1,1,
            1,0,17,1,30,0,1,1,0,0,1,
            1,1,0,1,30,0,0,0,17,0,1,
            0,1,0,1,30,0,1,1,0,0,1,
            0,1,0,1,30,1,1,1,0,1,1,
            0,1,8,0,0,0,1,1,0,0,1,
            0,1,1,0,17,0,0,0,0,0,1,
            0,0,1,1,1,1,1,1,0,0,1,
            0,0,0,0,0,0,0,1,1,1,1
        ]
    },{
        "size": [7, 8],
        "map":[
            0,0,1,1,1,1,0,
            0,0,1,0,0,1,0,
            1,1,1,17,0,1,1,
            1,0,17,0,0,8,1,
            1,0,30,30,30,0,1,
            1,1,17,0,0,1,1,
            0,1,0,0,1,1,0,
            0,1,1,1,1,0,0
        ]
    },{
        "size": [13, 12],
        "map":[
            0,1,1,1,1,1,1,1,1,1,1,1,0,
            0,1,0,0,0,0,0,0,0,0,0,1,0,
            0,1,0,17,0,0,1,1,1,1,17,1,1,
            0,1,1,8,0,0,17,0,0,0,0,0,1,
            0,1,0,0,1,30,17,30,1,0,17,0,1,
            1,1,17,17,1,30,17,0,1,0,1,1,1,
            1,0,0,0,0,1,30,30,0,0,1,0,0,
            1,0,17,17,0,1,30,1,1,17,1,0,0,
            1,1,1,0,0,1,30,1,1,0,1,0,0,
            0,0,1,0,0,0,30,0,0,0,1,0,0,
            0,0,1,1,1,1,0,0,1,1,1,0,0,
            0,0,0,0,0,1,1,1,1,0,0,0,0
        ]
    }
]