/**
 * 
 * @author Mirielle S.
 * name: Bat.js
 * Last Revision: 5th Nov. 2020
 * 
 * 
 * MIT License 
 * Copyright (c) 2020 CodeBreaker
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

Object.defineProperties(Math, {

    degToRad: {
        value:function(number) {
            return number * this.PI / 180;
        }
    },

    radToDeg: {
        value: function(number) {
            return number * 180 / this.PI;
        }
    },

    isEven: {
        value: function(number) {
            return !(number & 1)
        }
    },

    randRange: {
        value: function(min, max) {
            return this.random() * (max - min + 1) + min;
        }
    },

    clamp: {
        value: function(min, max, val) {
            return this.min(this.max(min, +val), max);
        }
    }

});

/**
* @class Vec2d
* Principal class for vector's manipulations
*/

class Vec2d {
    /**
     * @static createFrom
     * @description creates a vector from it's argument
     * @param {Object} arg Array or an Array-like to create a vector from
     * @returns {Vec2d}
     */
    static createFrom(arg) {
        if(arg instanceof Vec2d)
            return arg;
        else if(arg instanceof Array) {
            return new Vec2d(arg[0], arg[1]);
        }
        else if(arg instanceof Object) {
            return new Vec2d(arg.x, arg.y);
        } else 
            throw new Error("Insufficient vector's data");
    }

    /**
     * @static getDist
     * @description computes the distance between two points
     * @param {Object} v1 origin positional vector
     * @param {Object} v2 end positional vector
     * @returns {Number} the distance between two points
     */
    static getDist(v1, v2) {
        let diff = Vec2d.createFrom(v2).sub(Vec2d.createFrom(v1));
        return Math.hypot(diff.x, diff.y);
    }

    /**
     * @static cartToPolar
     * @description converts a vector to polar space from cartisian
     * @param {Number} a angle
     * @returns {Vec2d} vector in polar space
     */
    // static cartToPolar(a) {
    //     return new Vec2d(Math.cos(a), Math.sin(a))
    // }

    /**
     * @constructor
     * @param {Number} x x-component for the vector
     * @param {Number} y y-component for the vector
     * @param {Number} w (optional) w-component for the vector
     */
    constructor(x=0, y=0, w=1) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.o = {x:0, y:0, w:1};
        this.angle = Math.atan2(this.y, this.x);
        this.length = Math.hypot(this.x, this.y);
    }

    /**
     * @method add
     * @description add two vector's together
     * @param {Object} v vector to add with this
     * @returns {Vec2d} a new vector 
     */
    add(vec) {
        let v = Vec2d.createFrom(vec);
        return new Vec2d(this.x + v.x, this.y + v.y);
    }

    /**
     * @method sub
     * @description subtracts a vector from this
     * @param {Object} v vector to be subtracted from this
     * @returns {Vec2d} a new vector
     */
    sub(vec) {
        let v = Vec2d.createFrom(vec);
        return new Vec2d(this.x - v.x, this.y - v.y);
    }

    /**
     * @method scale
     * @description scales each components of a vector by a number
     * @param {Number} s scaling factor for this
     * @returns {Vec2d} scaled version of this
     */
    scale(s) {
        return new Vec2d(this.x * s, this.y * s);
    }

    /**
     * @method addScale
     * @description adds a scaled vector to this
     * @param {Object} v a vector to be added to this
     * @param {Number} s a scaling factor to this
     * @returns {Vec2d}
     */
    addScale(vec, s) {
        let v = Vec2d.createFrom(vec);
        return new Vec2d(this.x + v.x * s, this.y + v.y * s);
    }

    /**
     * @method mult
     * @description multiply a vector by a vector
     * @param {Object} v vector to be multiplied with this
     * @returns {Vec2d}
     */
    mult(vec) {
        let v = Vec2d.createFrom(vec);
        return new Vec2d(this.x * v.x, this.y * v.y);
    }

    /**
     * @method dot
     * @description determine the dot product of this vector against the argument
     * @param {Object} v  vector to be tested against this
     * @returns {Number} how much this is similar to the other vector
     */
    dot(vec) {
        let v = Vec2d.createFrom(vec);
        return this.x * v.x + this.y * v.y;
    }

    /**
     * @method angleBetween
     * @description finds the angle between two vectors
     * @param {Vec2d} vec second vector
     */
    angleBetween(vec) {
        let v = Vec2d.createFrom(vec);
        return this.dot(v)/(this.length * v.length);
    }

    /**
     * @method getDist
     * @description get the distance between this and other vector
     * @param {Object} v positional vector 
     * @returns {Number} distance between two points
     */
    getDist(v) {
        let diff = Vec2d.createFrom(v).sub(this);
        return Math.hypot(diff.x, diff.y);
    }

    /**
     * @method inverse
     * @description get the inverse of the each component in this vector
     * @returns {Vec2d} 
     */
    inverse() {
        return new Vec2d(1/this.x, 1/this.y)
    }

    /**
     * @method normalise
     * @description get the unit vector of this
     */
    normalise() {
        if(this.length !== 0) 
            return this.scale(1/this.length);
        else 
            return new Vec2d();
    }

    /**
     * @method getOrthogonal
     * @description get the orthogonal vector to this
     */
    getOrthogonal() {
        let angle = (90 * Math.PI / 180) + this.angle;
        let x = Math.cos(angle);
        let y = Math.sin(angle);
        return new Vec2d(x, y);
    }

    /**
     * @method applyFunc
     * @description apply a function to each component of the vector
     * @param {Function} func function to be applied
     */
    applyFunc(func) {
        return new Vec2d(func(this.x), func(this.y));
    }

    /**
     * @method useNMC
     * @description use normalised coordinate
     * @param vec origin vector
     * @returns vector in a normalised coordinate
     */
    useNMC(vec) {
        let v = Vec3d.createFrom(vec);
        this.x += 1;
        this.y += 1;
        this.x *= v.x;
        this.y *= v.y;
        return new Vec2d(this.x, this.y, 1);
    }

    /**
     * @method clone
     * @description create a copy of this
     */
    clone() {
        return new Vec2d(this.x, this.y);
    }

    /**
     * @method toArray
     * @description creates an array with each components of this vector
     * @returns {Array} containing components of this vectors
     */
    toArray() {
        return [this.x, this.y];
    }

    /**
     * @method toObject
     * @description creates an object with each components of this vector
     * @returns {Object} containing key/value components of this vector respectively
     */
    toObject() {
        return {x: this.x, y:this.y};
    }

    /**
     * @method draw
     * @description visualise this vector
     * @param {CanvasRenderingContext2D} ctx context to draw this vector
     * @param {String} stroke color
     * @param {Number} width width
     */
    draw(ctx, stroke, width=0) {
        ctx.save();
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(this.o.x, this.o.y);
        ctx.lineTo(this.o.x + this.x, this.o.y + this.y);
        ctx.strokeStyle = stroke;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.o.x + this.x, this.o.y + this.y, 3+width, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fillStyle = stroke;
        ctx.fill();
        ctx.restore();
    }
}


/**
* @class Vec3d
* Principal class for vector's manipulations
*/

class Vec3d {
    /**
     * @static createFrom
     * @description creates a vector from it's argument
     * @param {Object} arg Array or an Array-like to create a vector from
     * @returns {Vec3d}
     */
    static createFrom(arg) {
        if(arg instanceof Vec3d)
            return arg;
        else if(arg instanceof Array) {
            return new Vec3d(arg[0], arg[1], arg[2], 1);
        }
        else if(arg instanceof Object) {
            return new Vec3d(arg.x, arg.y, arg.z, 1);
        } else 
            throw new Error("Insufficient vector's data");
    }

    /**
     * @static getDist
     * @description computes the distance between two points
     * @param {Object} v1 origin positional vector
     * @param {Object} v2 end positional vector
     * @returns {Number} the distance between two points
     */
    static getDist(v1, v2) {
        let diff = Vec3d.createFrom(v2).sub(Vec3d.createFrom(v1));
        return Math.hypot(diff.x, diff.y);
    }
    
    /**
     * @constructor
     * @param {Number} x x-component of the vector
     * @param {Number} y y-component of the vector
     * @param {Number} z z-component of the vector
     * @param {Number} w (optional) w-component for the vector
     */
    constructor(x=0, y=0, z=0, w=1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.o = {x:0, y:0, z:0, w:1};
        this.length = Math.hypot(this.x, this.y, this.z);
    }

    /**
     * @method add
     * @description add two vector's together
     * @param {Object} v vector to add with this
     * @returns {Vec3d} a new vector 
     */
    add(vec) {
        let v = Vec3d.createFrom(vec);
        return new Vec3d(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    /**
     * @method sub
     * @description subtracts a vector from this
     * @param {Object} v vector to be subtracted from this
     * @returns {Vec3d} a new vector
     */
    sub(vec) {
        let v = Vec3d.createFrom(vec);
        return new Vec3d(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    /**
     * @method scale
     * @description scales each components of a vector by a number
     * @param {Number} s scaling factor for this
     * @returns {Vec3d} scaled version of this
     */
    scale(s) {
        return new Vec2d(this.x * s, this.y * s, this.z * s);
    }

    /**
     * @method addScale
     * @description adds a scaled vector to this
     * @param {Object} v a vector to be added to this
     * @param {Number} s a scaling factor to this
     * @returns {Vec3d}
     */
    addScale(vec, s) {
        let v = Vec3d.createFrom(vec);
        return new Vec3d(this.x + v.x * s, this.y + v.y * s, this.z + v.z * s);
    }

    /**
     * @method mult
     * @description multiply a vector by a vector
     * @param {Object} v vector to be multiplied with this
     * @returns {Vec3d}
     */
    mult(vec) {
        let v = Vec3d.createFrom(vec);
        return new Vec3d(this.x * v.x, this.y * v.y, this.z * v.z);
    }

    /**
     * @method dot
     * @description determine the dot product of this vector against the argument
     * @param {Object} v  vector to be tested against this
     * @returns {Number} how much this is similar to the other vector
     */
    dot(vec) {
        let v = Vec3d.createFrom(vec);
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    /**
     * @method cross
     * @description creates a vector perpendicular to this and the other vector
     * @param {Object} vec other vector
     * @returns {Vec3d} vector perpendicular to this and the other vector
     */
    cross(vec) {
        let v = Vec3d.createFrom(vec);
        let x = this.y * v.z - this.z * v.y;
        let y = this.z * v.x - this.x * v.z;
        let z = this.x * v.y - this.y * v.x;
        return new Vec3d(x, y, z);
    }

    /**
     * @method angleBetween
     * @description get the angle between two vectors
     * @param {Object} vec second vector
     * @return {Number} angle between this and other vector in radian
     */
    angleBetween(vec) {
        let v = Vec3d.createFrom(vec);
        return this.dot(v)/(this.length * v.length);
    }

    /**
     * @method getDist
     * @description get the distance between this and other vector
     * @param {Object} v positional vector 
     * @returns {Number} distance between two points
     */
    getDist(v) {
        let diff = Vec3d.createFrom(v).sub(this);
        return Math.hypot(diff.x, diff.y, diff.z);
    }

    /**
     * @method inverse
     * @description get the inverse of the each component in this vector
     * @returns {Vec3d} 
     */
    inverse() {
        return new Vec3d(1/this.x, 1/this.y, 1/this.z)
    }

    /**
     * @method normalise
     * @description get the unit vector of this
     */
    normalise() {
        if(this.length !== 0) 
            return this.scale(1/this.length);
        else 
            return new Vec3d();
    }

    applyFunc(func) {
        return new Vec3d(func(this.x), func(this.y), func(this.z));
    }

    /**
     * @method useNMC
     * @description use normalised coordinate
     * @param vec origin vector 
     * @returns vector in a normalised coordinate
     */
    useNMC(vec) {
        let v = Vec3d.createFrom(vec);
        this.x += 1;
        this.y += 1;
        this.x *= v.x;
        this.y *= v.y;
        return new Vec3d(this.x, this.y, this.z, this.w);
    }

    /**
     * @method clone
     * @description create a copy of this
     * @returns {Vec3d} clone of this
     */
    clone() {
        return new Vec3d(this.x, this.y, this.z);
    }

    /**
     * @method toArray
     * @description creates an array with each components of this vector
     * @returns {Array} containing components of this vectors
     */
    toArray() {
        return [this.x, this.y, this.z, this.w];
    }

    /**
     * @method toObject
     * @description creates an object with each components of this vector
     * @returns {Object} containing key/value components of this vector respectively
     */
    toObject() {
        return {x: this.x, y:this.y, z:this.z, w:this.w};
    }

    draw(ctx, o, stroke, width) {
        let vo = Vec3d.createFrom(o);
        ctx.save();
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(vo.x, vo.y);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = stroke;
        ctx.stroke();
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.scale(1,1);
        ctx.arc(0, 0, 3, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fillStyle = stroke;
        ctx.fill();
        ctx.restore();
    }
}


/**
* @todo
* add inverse, mult
**/
class Mat3x3 {

    static validate(data) {
        let isValid = false;
        if(data instanceof Array) {
            if(data.length === 3) {
                for(let i=data.length-1; i > 0; i--) {
                    if(data[i].length < 3) 
                        throw new Error("Insufficient 3x3 matrice data");
                }
            } else {
                throw new Error("Insufficient 3x3 matrice data");
            }
        } else 
            throw new Error("Matrix must be an instance of Array");
    }

    static getData(arg) {
        if(arg instanceof Mat3x3) 
            return arg.data;
        else if(arg instanceof Array) {
            Mat3x3.validate(arg);
            return arg;
        }
        else 
            throw new Error("getData expects an argument of an Array instance");
    }

    static multiplyVec(vec, mat) {
        let res = [];
        let tmp = 0;
        let matData = Mat3x3.getData(mat);
        let vecData = vec;
        if(vec instanceof Array && vec.length === 3) 
            vecData = vec;
        else if(vec instanceof Object && vec.hasOwnProperty("x") 
            && vec.hasOwnProperty("y")) {
                vecData = [vec.x, vec.y, 1]
            }
        // multiply vec by row matrices
        for(let r=0; r < matData.length; r++) {
            tmp = 0;
            for(let j=0; j < matData.length; j++) {
                let prod = vecData[j] * matData[j][r];
                tmp += prod;
            }
            res.push(tmp);
        }
        return res;
    };

    static rotate(angle) {
        return new Mat3x3([
            [Math.cos(angle), Math.sin(angle), 0],
            [-Math.sin(angle), Math.cos(angle), 0],
            [0, 0, 1]
        ]);
    }

    static createEmpty() {
        return new Mat3x3([
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ]);
    }

    /**
     * @constructor
     * @param {Array} data matrix data
     */
    constructor(data) {
        Mat3x3.validate(data);
        this.data = data;
    }

    /**
     * @method add
     * @description addition of matrices
     * @param {Object} arg a matrix
     * @returns {Mat3x3}
     */
    add(arg) {
        let res = [];
        let mat = Mat3x3.getData(arg);
        for(let r=0; r < this.data.length; r++) {
            res.push(new Array(3));
            for(let j=0; j < this.data.length; j++) {
                res[r][j] = this.data[r][j] + mat[r][j];
            }
        }
        return new Mat3x3(res);
    }

    /**
     * @method sub
     * @description subtraction of matrices
     * @param {Object} arg a matrix
     * @returns {Mat3x3}
     */
    sub(arg) {
        let res = [];
        let mat = Mat3x3.getData(arg);
        for(let r=0; r < this.data.length; r++) {
            res.push(new Array(3));
            for(let j=0; j < this.data.length; j++) {
                res[r][j] = this.data[r][j] - mat[r][j];
            }
        }
        return new Mat3x3(res);
    }

    /**
     * @method determinant
     * @description find the determinant of a matrix
     * @returns {Number} the determinant of a matrix
     */
    determinant() {
        let a = this.data[0][0] * (this.data[1][1] * this.data[2][2] - this.data[1][2] * this.data[2][1]);
        let b = this.data[0][1] * (this.data[1][0] * this.data[2][2] - this.data[1][2] * this.data[2][0]);
        let c = this.data[0][2] * (this.data[1][0] * this.data[2][1] - this.data[1][1] * this.data[2][0]);
        return a - b + c - d;
    }

    /**
     * @method scale
     * @description scalar multiplication
     * @param {Object} arg a matrix
     * @returns {Mat3x3}
     */
    scale(s) {
        let res = [];
        let mat = Mat3x3.getData(arg);
        for(let r=0; r < this.data.length; r++) {
            for(let j=0; j < this.data.length; j++) {
                res[r][j] = this.data[r][j] * s;
            }
        }
        return new Mat3x3(res);
    }

    /**
     * @method transpose
     * @description transpose a n * m matrix to m * n matrix
     * @returns {Mat4x4} the transpose of a matrix
     */
    transpose() {
        return new Mat3x3([
            [this.data[0][0], this.data[1][0], this.data[2][0]],
            [this.data[0][1], this.data[1][1], this.data[2][1]],
            [this.data[0][2], this.data[1][2], this.data[2][2]]
        ]);
    }

}

/**
 * @class Mat4x4
 * A 4x4 matrix class, data could be an array or a Mat4x4 object
 * @todo add inverse / multiplication methods
 * 
 */
class Mat4x4 {
    /**
     * @static validate
     * @description validate a 4x4 matrix data
     * @throws Error
     * @param {Object} data matrix data
     */
    static validate(data) {
        let isValid = false;
        if(data instanceof Array) {
            if(data.length === 4) {
                for(let i=data.length-1; i > 0; i--) {
                    if(data[i].length < 4) 
                        throw new Error("Insufficient 4x4 matrice data");
                }
            } else {
                throw new Error("Insufficient 4x4 matrice data");
            }
        } else 
            throw new Error("Matrix must be an instance of Array");
    }

    /**
     * @static getData
     * @description get the data for a mat4x4 object
     * @param {Object} arg return a Mat4x4 matrix data
     * @returns {Array} the mat4x4 data
     */
    static getData(arg) {
        if(arg instanceof Mat4x4) 
            return arg.data;
        else if(arg instanceof Array) {
            Mat4x4.validate(arg);
            return arg;
        }
        else 
            throw new Error("getData expects an argument of an Array instance");
    }

    /**
     * @static multiplyVec
     * @description multiply a vector by a matrix
     * @param {Object} vec a column vector 
     * @param {Object} mat a matrix
     * @returns {Array} a column vector
     */
    static multiplyVec(vec, mat) {
        let res = [];
        let tmp = 0;
        let matData = Mat4x4.getData(mat);
        let vecData = vec;
        if(vec instanceof Array && vec.length === 4) 
            vecData = vec;
        else if(vec instanceof Object && vec.hasOwnProperty("x") 
            && vec.hasOwnProperty("y") && vec.hasOwnProperty("z")) {
                vecData = [vec.x, vec.y, vec.z, 1]
            }
        // multiply vec by row matrices
        for(let r=0; r < matData.length; r++) {
            tmp = 0;
            for(let j=0; j < matData.length; j++) {
                let prod = vecData[j] * matData[j][r];
                tmp += prod;
            }
            res.push(tmp);
        }
        // return back to 3d space
        if(res[3] !== 0) {
            for(let i=0; i < res.length - 1; i++) {
                res[i] /= res[3];
            }
        }
        return res;
    };

    /**
     * @static createEmpty
     * @description creates an empty matrix
     * @returns {Mat4x4}
     */
    static createEmpty() {
        return new Mat4x4([
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]);
    }

    /**
     * @static rotateX
     * @description create a roll rotation matrix
     * @param {Number} angle angle to rotate by
     * @returns {Mat4x4}
     */
    static rotateX(angle) {
        return new Mat4x4([
            [1, 0, 0, 0],
            [0, Math.cos(angle), Math.sin(angle), 0],
            [0, -Math.sin(angle), Math.cos(angle), 0],
            [0, 0, 0, 1]
        ]);
    }
    
    /**
     * @static rotateY
     * @description create a yaw rotation matrix
     * @param {Number} angle angle to rotate by
     * @returns {Mat4x4}
     */
    static rotateY(angle) {
        return new Mat4x4([
            [Math.cos(angle), 0, Math.sin(angle), 0],
            [0, 1, 0, 0],
            [-Math.sin(angle), 0, Math.cos(angle), 0],
            [0, 0, 0, 1]
        ]);
    }
    
    /**
     * @static rotateZ
     * @description create a pitch rotation matrix
     * @param {Number} angle angle to rotate by
     * @returns {Mat4x4}
     */
    static rotateZ(angle) {
        return new Mat4x4([
            [Math.cos(angle), Math.sin(angle), 0, 0],
            [-Math.sin(angle), Math.cos(angle), 0, 0],
            [0, 0, 1, 0], [0, 0, 0, 1]
        ]);
    }

    /**
     * @static project3d
     * @description a 3d perspective projection matrix
     * @param {Number} ar aspect ratio
     * @param {Number} fov field of view
     * @param {Number} zNear farthest distance on the Z-axis
     * @param {Number} zFar neareast distance on the Z-axis
     * @returns {Mat4x4} 3d projection matrix
     */
    static project3d(ar, fov, zNear=0.1, zFar=1000) {
        let q = zFar / (zFar - zNear);
        return new Mat4x4([
            [ar * fov, 0, 0, 0],
            [0, fov, 0, 0],
            [0, 0, q, 1],
            [0, 0, -zNear * q, 0]
        ]);
    }

    /**
     * @constructor
     * @param {Array} data The matrix data
     */
    constructor(data) {
        Mat4x4.validate(data);
        this.data = data;
    }

    /**
     * @method add
     * @description add two matrices
     * @param {Object} arg a matrix
     * @returns {Mat4x4}
     */
    add(arg) {
        let res = [];
        let mat = Mat4x4.getData(arg);
        for(let r=0; r < this.data.length; r++) {
            res.push(new Array(4));
            for(let j=0; j < this.data.length; j++) {
                res[r][j] = this.data[r][j] + mat[r][j];
            }
        }
        return new Mat4x4(res);
    }

    /**
     * @method sub
     * @description addition of matrices
     * @param {Object} arg a matrix
     * @returns {Mat4x4}
     */
    sub(arg) {
        let res = [];
        let mat = Mat4x4.getData(arg);
        for(let r=0; r < this.data.length; r++) {
            res.push(new Array(4));
            for(let j=0; j < this.data.length; j++) {
                res[r][j] = this.data[r][j] - mat[r][j];
            }
        }
        return new Mat4x4(res);
    }

    /**
     * @method scale
     * @description scalar multiplication of matrices
     * @param {Object} arg a matrix
     * @returns {Mat4x4}
     */
    scale(s) {
        let res = [];
        let mat = Mat4x4.getData(arg);
        for(let r=0; r < this.data.length; r++) {
            for(let j=0; j < this.data.length; j++) {
                res[r][j] = this.data[r][j] * s;
            }
        }
        return new Mat4x4(res);
    }

    /**
     * @method determinant
     * @description find the determinant of a matrix
     * @returns {Number} the determinant of a matrix
     */
    determinant() {
        let a = this.data[0][0] * (this.data[1][1] * (this.data[2][2] * this.data[3][3] - this.data[2][3] * this.data[3][2]));
        let b = this.data[0][1] * (this.data[1][0] * (this.data[2][2] * this.data[3][3] - this.data[2][3] * this.data[3][2]));
        let c = this.data[0][2] * (this.data[1][0] * (this.data[2][1] * this.data[3][3] - this.data[2][3] * this.data[3][1]));
        let d = this.data[0][3] * (this.data[1][0] * (this.data[2][1] * this.data[3][2] - this.data[2][2] * this.data[3][1]));
        return a - b + c - d;
    }

    /**
     * @method transpose
     * @description transpose a n * m matrix to m * n matrix
     * @returns {Mat4x4} the transpose of a matrix
     */
    transpose() {
        return new Mat4x4([
            [this.data[0][0], this.data[1][0], this.data[2][0], this.data[3][0]],
            [this.data[0][1], this.data[1][1], this.data[2][1], this.data[3][0]],
            [this.data[0][2], this.data[1][2], this.data[2][2], this.data[3][0]]
        ]);
    }

}


class Collision2D {


    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////// DETECT //////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    static Detect = class {

        static circle(c1, c2) {
            if(c1.r === undefined || c2.r === undefined)
                throw new Error("Insufficient Circle Info: one-or-both circle lacking r attributes");
            let diff = Vec2d.createFrom(c2.pos).sub(Vec2d.createFrom(c1.pos));
            return diff.length < c1.r + c2.r
        }

        static rect(r1, r2) {
            return !(r1.pos.x > r2.pos.x + r2.dimension.x || r1.pos.x + r1.dimension.x < r2.pos.x ||
                r1.pos.y > r2.pos.y + r2.dimension.y || r1.pos.y + r1.dimension.y < r2.pos.y);
        }


        static circleRect(c, r) {
            let diff = {
                x: Math.abs(c.pos.x - (r.pos.x + r.dimension.x * 0.5)),
                y: Math.abs(c.pos.y - (r.pos.y + r.dimension.y * 0.5))
            };
            if(diff.x > c.r + r.dimension.x * 0.5) return false;
            if(diff.y > c.r + r.dimension.y * 0.5) return false;
            if(diff.x <= r.dimension.x) return true;
            if(diff.y <= r.dimension.y) return true;
            let dx = diff.x - r.dimension.x;
            let dy = diff.y - r.dimension.y;
            return Math.hypot(dx, dy) <= c.r * c.r;
        }

        /**
        * @description checks if the point[x, y] is in an arc
        * @param {Vec2d} p point to be checked
        * @param {Object} arc arc data
        // arc objects: {pos,innerRadius:,outerRadius:,startAngle:,endAngle:}
        // Return true if the x,y point is inside an arc
        */
        static isPointInArc(p, arc) {
            if(arc.pos === undefined || arc.innerRadius === undefined || arc.outerRadius 
                === undefined || arc.startAngle === undefined || arc.endAngle === undefined)
                throw new Error(`Insufficient Arc data: Must provide a "pos, innerRadius, outerRadius, startAngle, endAngle"`);
            let diff = p.sub(Vec2d.createFrom(arc.pos));
            let rOuter = arc.outerRadius;
            let rInner = arc.innerRadius;
            if(diff.length < rInner || diff.length > rOuter) return false;
            let angle = (diff.angle + Math.PI * 2) % Math.PI*2;
            return angle >= arc.startAngle && angle <= arc.endAngle;
        }

        /**
        * @description checks if the point[x, y] is in a wedge
        * @param {Vec2d} p point to be checked
        * @param {Object} wedge wedge data
        // wedge objects: {pos:,r:,startAngle:,endAngle:}
        // Return true if the x,y point is inside the closed wedge
        */
        static isPointInWedge(p, wedge) {
            if(wedge.pos === undefined || wedge.r === undefined || wedge.startAngle === undefined)
                throw new Error(`Insufficient Wedge's data: Must provide a "pos, r, startAngle"`);
            let PI2 = Math.PI * 2;
            let diff = p.sub(wedge.pos);
            let r = wedge.r * wedge.r;
            if(diff.length > r) return false;
            let angle = (diff.angle + PI2) % PI2;
            return angle >= wedge.startAngle && angle <= wedge.endAngle;
        }

        /**
        * @description checks if the point[x, y] is in a circle
        * @param {Vec2d} p point to be checked
        * @param {Vec2d} c circle component
        */
        static isPointInCircle(p, c) {
            let diff = p.sub(c.pos);
            return (diff.length < c.r * c.r);
        }

        /**
        * @description checks if the point[x, y] is in a rect
        * @param {Vec2d} p point to be checked
        * @param {Vec2d} c rect component
        */
        static isPointInRect(p, r) {
            return (p.x > r.pos.x && p.x < r.pos.x + r.dimension.x 
                && p.y > r.pos.y && p.y < r.pos.y + r.dimension.y);
        }

        

    }

    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////// RESOLVE /////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////

    static Resolve = {


    }

}


class Physics {

    static CreateData(component, data) {
        // define all physics entities here
        Object.assign(component, data);
    }

}


Object.defineProperties(HTMLElement.prototype, {

    css: {
        value: function(styles) {
            if(!styles instanceof Object) 
                throw new Error(`CSS Styling data must be an instanceof an Object`)
            let res = "";
            for(const key in styles) {
                this.style[key] = styles[key];
            }
        }
    },

    setCss: {
        value: function(key, value) {
            this.styles[key] = value;
        }
    },

    attr: {
        value: function(attrs) {
            if(!attrs instanceof Object) 
                throw new Error(`ATTR data must be an instanceof an Object`)
            for(const key in attrs) {
                this[key] = attrs[key];
            }
        }
    }

});


/**
* @class CreditScene
* A class displaying the `BatGames` Engine splashscreen on 
* every start of a scene.
*/
class CreditScene {

    /**
    * @constructor
    * @params {HTMLSectionElement} parent of this scene
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

        let styles = {
            duration: Math.max(5, config.duration || 5),
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
        this.ctx.fillStyle = this.config.theme === "light" ? "#222" : "#333";
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
        // this.ctx.strokeStyle = this.config.theme === "light" ? "red" : "#fff";
        // this.ctx.strokeText("Games API for web developers on a GO", w/2, h/2 + 20);

        // copyright
        this.ctx.font = `bold 10px ${styles.fontFamily}`;
        this.ctx.fillStyle = this.config.theme === "light" ? "#222" : "#fff";
        this.ctx.fillText("Mirielle "+new Date().getFullYear(), w/2, h - 20);

        // hide this scene after timeout of the specified style's duration
        setTimeout(() => {
            this._canvas.style.display = "none";
            this.state = true;
        }, styles.duration * 1000);
    }

}


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
        this._preloadedAssetsCounter = 0;
        this._preloadedImages = [];
        this._preloadedAudios = [];
        this._preloadedOthers = [];
        this._preloadAngle = 0;
        this._preloadScale = 5;
        this._preloadColorIndex = 0;

        if(this.preload.length !== 0) {
            let imgExtensions = [".jpg", ".gif", ".png"];
            let audExtensions = [".mp3"];
            let otherExtensions = [".txt"];

            // group preload assets 
            if(this.preload instanceof Array) {
                this.preload.forEach((data, index) => {
                    // check for images
                    if(imgExtensions.some(i => data.src.endsWith(i)))
                        this._preloadedImages.push({img: new Image(), ind:index, ...data});
                    // check for audios
                    else if(audExtensions.some(i => data.src.endsWith(i)) || data.type === "aud"
                        || data.type === "audio")
                        this._preloadedAudios.push({aud: new Audio(), ind:index, ...data});
                    // check for text files
                    else if(otherExtensions.some(i => data.src.endsWith(i))) {
                        let endExt = data.src.substring(data.src.length-3, data.src.length);
                        if(endExt === "txt")
                            this._preloadedOthers.push({x: data.src.name, ...data});
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
                this.state = true
                this._canvas.style.display = "none";
            }
        }

        this._preloadedImages.forEach(data => {
            data.img.addEventListener("load", ()=>{
                this._preloadedAssetsCounter++;
                loadingFunction();
            });
            data.img.src = data.src;
        });

        this._preloadedAudios.forEach(data => {
            data.aud.addEventListener("canplaythrough", ()=>{
                this._preloadedAssetsCounter++;
                loadingFunction();
            });
            data.aud.src = data.src;
        });
    }

    /**
    * @method activeScene
    * @description scene shown while preloading
    */
    activeScene() {
        let W = this._canvas.width;
        let H = this._canvas.height;
        if(this.config.credit.theme === "dark") this.ctx.fillStyle = "#222";
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


/**
* Principal class for scene rendering
* 
* CONFIG
* .credit        | styling for the credit canvas
* .css           | css stylings for the scene
* .attr          | html attributes of the scene
* .dynamic       | determine wether RAF should be enabled
*
*/

class Scene {
    /**
    * @constructor
    * @param {Number} w width of the scene
    * @param {Number} h height of the scene
    * @param {Object | String} config configuration data of the scene
    */
    constructor(w, h, config, pure=false) {
        // game section
        this.section = document.createElement("section");
        this.section.style.margin = "0";
        this.pure = pure;

        // game area
        this._canvas = document.createElement("canvas");
        this.ctx = this._canvas.getContext("2d");
        this.config = config || {dynamic: false};

        // set css styling
        this._canvas.width = w || 300;
        this._canvas.height = h || 300;
        if(this.config.css !== undefined) {
            if(!(this.config.css instanceof Object)) 
                console.error("Scene CSS styling data must be an instance of an Object");
            else
                for(const key in this.config.css)
                    this.section.style[key] = this.config.css[key];
        }

        // set other private screens
        this._preloadScene = new PreloadScene(this.section, this._canvas.width, 
            this._canvas.height, config);
        this._creditScene = new CreditScene(this.section, this._canvas.width, 
            this._canvas.height, config.credit);

        // set attributes
        this._canvas["class"] = "canvasScene";
        this.section.class = "gameScene";
        if(this.config.attr !== undefined) {
            if(!(this.config.attr instanceof Object)) 
                console.error("Scene attributes data must be an instance of an Object");
            else
                for(const key in this.config.attr) 
                    this.section[key] = config.attr[key];
        }

        // functions
        this.clear = null;
        this.update = null;

        // create the scene
        this._preloadScene.start();
        document.body.appendChild(this.section);
    }

    
    /**
    * @method getMedia
    * @description get any media files from the preloaded array
    * @returns {HTMLImageElement | HTMLAudioElement}
    */
    getMedia(name, type="img") {
        let preload = this._preloadScene;
        if(type === "img" || type === "image") {
            let res = preload._preloadedImages.filter(i => i.name === name)[0];
            return res.img;
        }else if(type === "aud" || type === "audio") {
            let res = preload._preloadedAudios.filter(i => i.name === name)[0];
            return res.aud;
        } 
    }

    init() {
        const animate = currentTime => {
            if(typeof this.clear === "function" && typeof this.update === "function") {
                this.clear();
                this.update();
                requestAnimationFrame(animate);
            }
        }

        // start the scene
        let mainInterval = setInterval(() => {
            if(this._creditScene.state) {
                // has every assets been loaded ?
                if(this._preloadScene.state) {
                    clearInterval(mainInterval);
                    this.section.append(this._canvas);
                    this._fpsStarted = performance.now();
                    this._elapsedTimeStarted = new Date().getTime();
                    // i want a redraw frame
                    if(this.config.dynamic)
                        requestAnimationFrame(animate);
                    else {
                        this.update();
                    }
                } else {
                    this._preloadScene.activeScene();
                }
                 
                
            }
        }, 0);
    }


    getFPS() {
        let t1 = performance.now();
        let fps = 1000 / (t1 - this._fpsStarted);
        this._fpsStarted = t1;
        return fps;
    }


    getElapsedTime() {
        let t1 = new Date().getTime();
        let eTime = 0.001 * (t1 - this._elapsedTimeStarted);
        this._elapsedTimeStarted = t1;
        // stop updating when tab switched
        if(eTime > 0.2) eTime = 0;
        return eTime;
    }

    getContext() {
        return this._canvas.getContext("2d");
    }

    getWidth() {
        return this._canvas.width;
    }

    getHeight() {
        return this._canvas.height;
    }

    setWidth(value) {
        this._canvas.width = value;
    }

    setHeight(value) {
        this._canvas.height = value;
    }

    getAttr(identifier) {
        return this.section[identifier];
    }

    setAttr(key, value) {
        this.section[key] = value;
    }

    getStyle(identifier) {
        return this._canvas.style[identifier];
    }

    setStyle(key, value) {
        this.section.style[key] = value;
    }

    getCanvas() {
        return this._canvas;
    }

    getParent() {
        return this.section;
    }
        
};



// handle cross-platform animation's frame function
window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000/60);
    }
})();



/**
* @class Bat
* Core class containing global API, variables and whatsoever
*/
class Bat {

    static CreditScene = function(parent, w, h, config) { return new CreditScene(parent, w, h, config)}
    static Scene = function(w, h, config) { return new Scene(w, h, config)}

    static Core = {

        init(callback) {
            addEventListener("load", () => {
                if(typeof callback === "function")
                    callback();
                else
                    throw TypeError("Failed To Initialize Bat: callback must be a function");
            });
        }  
    }

    static Utils = class {

        static randFromArray(array) {
            return array[~~(Math.random() * array.length)]
        }

        /**
         * @description converts it's string argument to a css-like format
         * @param {String} word to be converted to CSS format
         * @returns {String} the converted word in css-like format
         */
        static objectToCSSFormat(word) {
            for(let chr of word) {
                if(chr.charCodeAt() >= 65 && chr.charCodeAt() <= 90) {
                    let s = chr;
                    word = word.replaceAll(chr, `-${s.toLowerCase()}`);
                }
            }
            return word;
        }

    }

}



class Component {

    
    static Tile = class {
    
        constructor(pos, dimension) {
            this.pos = Vec2d.createFrom(pos);
            this.dimension = Vec2d.createFrom(dimension);
            this.velocity = new Vec2d();
            this.rotation = 0;
            this.vertices = [];

            this.lastPos = null;
            this.nextPos = null;
            this.currentPos = null;

            this._minpos = null;
            this._maxpos = null;
        }

        orthCollision(map, velocity, {left=null, top=null}) {
            if(map.size !== undefined && map.dimension !== undefined) {
                // X-AXIS
                this.lastPos = this.pos;
                this.nextPos = Vec2d.createFrom({
                    x: player.pos.x + velocity.x,
                    y: this.lastPos.y
                });
                this._minPos = this.nextPos.mult(Vec2d.createFrom(map.size).inverse())
                    .applyFunc(Math.floor);
                this._maxPos = this.nextPos.add(this.dimension).mult(Vec2d.createFrom
                    (map.size).inverse()).applyFunc(Math.ceil);

                for(let r=this._minPos.y; r < this._maxPos.y; r++) {
                    for(let c=this._minPos.x; c < this._maxPos.x; c++) {
                        this.currentPos = map.map[r * map.dimension.x + c];
                        if(typeof left === "function")
                            left();
                    }
                }
                this.pos = this.nextPos;
                // Y-AXIS
                this.lastPos = this.pos;
                this.nextPos = Vec2d.createFrom({
                    x: this.lastPos.x,
                    y: this.lastPos.y + velocity.y
                });
                this._minPos = this.nextPos.mult(Vec2d.createFrom(map.size).inverse())
                    .applyFunc(Math.floor);
                this._maxPos = this.nextPos.add(this.dimension).mult(Vec2d.createFrom
                    (map.size).inverse()).applyFunc(Math.ceil);

                for(let r=this._minPos.y; r < this._maxPos.y; r++) {
                    for(let c=this._minPos.x; c < this._maxPos.x; c++) {
                        this.currentPos = map.map[r * map.dimension.x + c];
                        if(typeof top === "function")
                            top();
                    }
                }
                this.pos = this.nextPos;
            }
            
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////   
    /////////////////////////////////// SPRITES ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    static Sprite = class {

        /**
         * @constructor
         * @param {Object} frames object contain animation frames data array
         * @param {Number} col number of columns in the spritesheet
         * @param {Number} delay animation delay
        */
        constructor(frames, col, delay=5) {
            this.col = col;
            this.frames = frames;
            this.currentFrames = [];
            this.frameName = null;
            for(const i in this.frames) {
                this.setFrame(i);
                break;
            }
            this.delay = delay;
            this.index = new Vec2d();
            this._delayCounter = 0;
            this._frameCounter = 0;
            this.state = false;
        }

        /**
         * @method setFrame
         * @description sets the current animation's frame
         * @param {String} frameName animation's frame name
         */
        setFrame(frameName) {
            if(this.frames.hasOwnProperty(frameName)) {
                if(this.frames[frameName] instanceof Array) {
                    this.currentFrames = this.frames[frameName];
                    this.frameName = frameName;
                } else 
                    throw TypeError("Sprite's current frame must be an instance of an Array");
            }
            else 
                throw new Error(`Sprite Frame name does not exists`);
        }

        /**
         * @method getSource
         * @description gets the source vectors for the animation. This 
         * method must be called in a loop for an effective animation
         */
        getSource() {
            this._delayCounter++;
            if(this._delayCounter > this.delay) {
                this._delayCounter = 0;
                this._frameCounter++;
                if(this._frameCounter >= this.currentFrames.length) {
                    this.state = false;
                    this._frameCounter = 0;
                } else {
                    this.state = true;
                }
                let value = this.currentFrames[this._frameCounter] - 1;
                let x = value % this.col;
                let y = value / this.col;
                this.index = new Vec2d(x, y);
            }
        }

    }


     ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////   
    /////////////////////////////////// BASIC //////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    static Basic = class {

            constructor(type="rect", pos, dimension) {
                this.type = type;
                this.rotation = 0;
                this.scale = new Vec2d(1, 1);
                this.velocity = new Vec2d(1, 1);
                if(type === "rect") {
                    this.pos = Vec2d.createFrom(pos);
                    this.dimension = Vec2d.createFrom(dimension);
                } else if(type === "circle") {
                    this.pos = Vec2d.createFrom(pos);
                    this.r = dimension;
                } else if(type === "polygon") {
                    this.pos = Vec2d.createFrom(pos);
                    this.vertices = dimension;
                } else if(type === "line") {
                    this.start = Vec2d.createFrom(pos);
                    this.end = Vec2d.createFrom(dimension);
                }
            }

        }

}
