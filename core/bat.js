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