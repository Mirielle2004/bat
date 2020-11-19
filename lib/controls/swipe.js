export class Swipe {
    
    constructor(element, type="default") {
        this.element = element || null;
        // onstart
        this.data = {};
        this.onSwipeStart = null;
        
        if(type === "default") {
            mouse(this);
            touch(this);
        } else if(type === "touch") {
            touch(this);
        } else if(type === "mouse") {
            mouse(this);
        }    
    }
    
}


// get swipe direction and differences
export function getSwipeDirection(v1, v2) {
    let diffPos = {
        x: v2.x - v1.x,
        y: v2.y - v1.y
    };
    let dir = "";
    if(Math.abs(diffPos.x) > Math.abs(diffPos.y)) {
        if(diffPos.x > 0) 
            return [diffPos, "right"]
        return [diffPos, "left"]
    } else {
        if(diffPos.y > 0)
            return [diffPos, "down"]
        else return [diffPos, "up"]
    };
}



// function to handler swipe with touch
function touch(el) {
    let ele = el.element === null ? window : el.element;
}




// function to handle mouse swipe
function mouse(el) {
    let ele = el.element === null ? window : el.element;
    ele.addEventListener("mousedown", e => {
        el.data.origin = {x: e.clientX, y: e.clientY};
        el.data.isActve = true;
        if(typeof el.onSwipeStart === "function") el.onSwipeStart();
    });
    
    ele.addEventListener("mousemove", e => {
        if(el.data.isActve) {
            let getDiffDir = getSwipeDirection(el.data.origin, {x: e.clientX, y:e.clientY});
            let newData = {
                mouse: e,
                currentPos: {x:e.clientX, y:e.clientY},
                diffPos: getDiffDir[0],
                direction: getDiffDir[1],
                angle: Math.atan2(getDiffDir[0].y, getDiffDir[0].x)
            }
            el.data = newData;
            if(typeof el.onSwipeMove === "function") el.onSwipeMove();
        }
    });
    
    ele.addEventListener("mouseup", e => {
       el.data = {
           origin: {x: null, y: null},
           currentPos: {x:e.clientX, y:e.clientY},
           isActive: false,
           direction: null,
       };
        if(typeof el.onSwipeEnd === "function") el.onSwipeEnd();
    });
}