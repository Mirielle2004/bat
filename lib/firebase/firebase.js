//https://firebase.google.com/docs
let CDN_LOADED = false;
let SERVICES = {};


export class FireBase {
    
    static init(services, version="8.1.1") {
        if(document.readyState === "complete")
            throw new Error("Firebase Must be Initialised before window's loaded");
        let _services = {
            analytics: `https://www.gstatic.com/firebasejs/${version}/firebase-analytics.js`,
            auth: `https://www.gstatic.com/firebasejs/${version}/firebase-auth.js`,
            database: `https://www.gstatic.com/firebasejs/${version}/firebase-database.js`,
            firestore: `https://www.gstatic.com/firebasejs/${version}/firebase-firestore.js`,
            messaging: `https://www.gstatic.com/firebasejs/${version}/firebase-messaging.js`,
            functions: `https://www.gstatic.com/firebasejs/${version}/firebase-functions.js`,
            storage: `https://www.gstatic.com/firebasejs/${version}/firebase-storage.js`
        };
        // make sure libraries are loaded just once
        if(!CDN_LOADED) {
            let head = document.querySelector("head");
            let script = document.createElement("SCRIPT");
            script.src = `https://www.gstatic.com/firebasejs/${version}/firebase-app.js`;
            head.appendChild(script);
            for(const service in services) {
                if(_services.hasOwnProperty(service)){
                    let script = document.createElement("SCRIPT");
                    script.src = _services[service];
                    head.appendChild(script);
                } else {
                    console.error(`Failed to Load Firebase Service: ${service}`);
                }
            };
            CDN_LOADED = true;
            SERVICES = services;
        }
    }
    
};