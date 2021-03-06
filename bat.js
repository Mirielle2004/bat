/**
 * 
 * @author Mirielle S.
 * name: Bat.js
 * @description A simple HTML5 Canvas game Engine
 * Last Revision: 20th Nov. 2020
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


export const Bat = {
    author: "Mirielle S.",
    version: "0.0.13-alpha",
    date: "1st December, 2020",
    license: "MIT"
};


// maths
export {Vec2d as Vector2} from "../bat@v0.0.13-alpha/lib/maths/vectors/vec2d.js";
export {Vec3d as Vector3} from "../bat@v0.0.13-alpha/lib/maths/vectors/vec3d.js";
export {Mat3x3} from "../bat@v0.0.13-alpha/lib/maths/matrices/mat3x3.js";
export {Mat4x4} from "../bat@v0.0.13-alpha/lib/maths/matrices/mat4x4.js";


// components
export {Component} from "../bat@v0.0.13-alpha/lib/components/components.js";


// physics
export {Collision} from "../bat@v0.0.13-alpha/lib/physics/collision2D.js";


// controls
export {Swipe} from "../bat@v0.0.13-alpha/lib/controls/swipe.js";
export {JoyStick} from "../bat@v0.0.13-alpha/lib/controls/joystick.js";


// tiled
export {TileMap} from "../bat@v0.0.13-alpha/lib/tiled/tilemap.js";
export {TileCamera} from "../bat@v0.0.13-alpha/lib/tiled/tilecam.js";


// scoreboard
export {FireBase} from "../bat@v0.0.13-alpha/lib/firebase/firebase.js";


// core
export * as Utils from "../bat@v0.0.13-alpha/lib/core/utils.js";
export {Launcher} from "../bat@v0.0.13-alpha/lib/core/launcher.js";
export {Preloader} from "../bat@v0.0.13-alpha/lib/core/preloader.js";
export {Scene} from "../bat@v0.0.13-alpha/lib/core/scene.js";