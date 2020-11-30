// Built on firebase 8.1.1

export class FireBase {
    
    constructor(fbConfig, servicesConfig) {
        this._firebaseConfig = fbConfig;
        this._app = firebase.initializeApp(this._firebaseConfig);
        
        this._authType = [
            "email/password",
            "google",
            "facebook",
            "anonymous"
        ];
        
        let services = servicesConfig;
        if(services.analytics)
            firebase.analytics();
        
        if(services.auth) {
            console.log("auth true");
        }
        
        if(services.database) {
            console.log("db true");
        }
        
        this.authResponse = null;
        this.user = null;
    }
    
    getApp() {
        return this._app;
    }
    
    // AUTH
    createUser(type, data) {
        if(!(this._authType.some(i => i !== type)))
            throw new Error("Invalid SignUp type");
        const auth = firebase.auth();
        
        if(type === "email/password") {
            const promise = auth.createUserWithEmailAndPassword(data.email, data.password);
            promise.then(e => {
                this.authResponse = {...e, ...data};
                if(typeof data.success === "function")
                    data.error();
            }).catch(e => {
                this.authResponse = this.authResponse = {...e, ...data};
                if(typeof data.error === "function")
                    data.error();
            });
        }
    }
    
    logInUser(type, data) {
        if(!(this._authType.some(i => i !== type)))
            throw new Error("Invalid SignIn type");
        const auth = firebase.auth();
        
        if(type === "email/password") {
            const promise = auth.signInWithEmailAndPassword(data.email, data.password);
            promise.then(e => {
               this.authResponse = e;
                if(typeof data.success === "function")
                    data.success(); 
            }).catch(e => {
                this.authResponse = e;
                if(typeof data.error === "function")
                    data.error();
            });
        } 
        else if(type === "google") {
            let provider =  new firebase.auth.GoogleAuthProvider();
            auth.useDeviceLanguage();
            auth.signInWithPopup(provider).then(e => {
                this.authResponse = e;
                if(typeof data.success === "function")
                    data.success(); 
            }).catch(e => {
                this.authResponse = e;
                if(typeof data.error === "function")
                    data.error();
            });
        }
        else if(type === "facebook") {
            let provider = new firebase.auth.FacebookAuthProvider();
            auth.signInWithPopup(provider).then(e => {
                this.authResponse = e;
                if(typeof data.success === "function")
                    data.success(); 
            }).catch(e => {
                this.authResponse = e;
                if(typeof data.error === "function")
                    data.error();
            });
        }
        else if(type === "anonymous") {
            auth.signInAnonymously().then(() => {
                if(typeof data.success === "function")
                    data.success(); 
            }).catch(e => {
                this.authResponse = e;
                if(typeof data.error === "function")
                    data.error();
            });
        }
    }
    
    logoutUser() {
        firebase.auth().signOut();
    }
    
    authObserver(callback) {
        firebase.auth().onAuthStateChanged(user => {
            this.authResponse = user;
            callback();
        });
    }
    
    getCurrentUser() {
        firebase.auth().currentUser();
    }
    
    /**
    name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;
  {info:{}, success, error}
  */
    updateUserProfile(data) {
        this.getCurrentUser().updateProfile(data.info).then(() => {
            
        }).catch(e => {
            
        });
    }
    
    // {emaill, succe, err}
    updateUserEmail(data) {
        this.getCurrentUser().updateEmail(data.email)
        .then(() => {
            
        }).catch(e => {
            
        });
    }
    
    sendEmailVerification(data) {
        this.getCurrentUser().then(() => {
            
        }).catch(e => {
            
        });
    }
    
    updateUserPassword(data) {
        this.getCurrentUser().updatePassword(
            data.password).then(() => {
            
        }).catch(e => {
            
        });
    }
    
    sendUserPasswordResetEmail(data) {
        firebase.auth().sendUserPasswordResetEmail(
        data.email).then(() => {
            
        }).catch(e => {
            
        });
    }
    
    deleteUser() {
        this.getCurrentUser().delete().then(() => {
            
        }).catch(e => {
            
        });
    }
    
    reAuthenticateUser() {
        let credential; this.getCurrentUser().reauthenticateWithCredential(credential).then(() => {
            
        }).catch(e => {
            
        })
    }
    
    // DATABASE
    getDB() {
        return this._db;    
    }
    
    insertDB(rel_url, value) {
        if(!(value instanceof Object))
            throw new Error("Data to be Inserted Must be an Instance of an Object")
        firebase.database().ref(rel_url).set(value);
    }
    
    selectDB(rel_url, callback) {
        firebase.database().ref(rel_url).on("value", (snapshot) => {
            this.dbResponse = snapshot.val();
            callback();
        });
    }
    
    updateDB(rel_url, value) {
        if(!(value instanceof Object))
            throw new Error("Data to be Inserted Must be an Instance of an Object")
        firebase.database().ref(rel_url).update(value);
    }
    
    deleteDB(rel_url) {
        firebase.database().ref(rel_url).remove();
    }
    
    // STORAGE
    
    
    // MESSAGING
    
    
};



/**
//<script src="https://www.gstatic.com/firebasejs/5.0.1/firebase-auth.js"></script>
//<script src="https://www.gstatic.com/firebasejs/5.0.1/firebase-database.js"></script>
//<script src="https://www.gstatic.com/firebasejs/5.0.1/firebase-firestore.js"></script>
//<script src="https://www.gstatic.com/firebasejs/5.0.1/firebase-messaging.js"></script>
//<script src="https://www.gstatic.com/firebasejs/5.0.1/firebase-functions.js"></script>

    <script src="https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js"></script>
    <!-- if analytic -->
    <script src="https://www.gstatic.com/firebasejs/8.1.1/firebase-analytics.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.1.1/firebase-database.js"></script>



    var firebaseConfig = {
        apiKey: "AIzaSyBXoMCwFYRjVOq2sY2K1oqPeVQK41-g6kE",
        authDomain: "batengine-fc905.firebaseapp.com",
        databaseURL: "https://batengine-fc905.firebaseio.com",
        projectId: "batengine-fc905",
        storageBucket: "batengine-fc905.appspot.com",
        messagingSenderId: "806815302221",
        appId: "1:806815302221:web:cfa2c09e2884e7872d5204",
        measurementId: "G-X2D9ZNZSBK"
      };
    
    let services = {
        analytics: true,
        database: true, 
    }
    
    let fb = new g.FireBase(firebaseConfig, services);
    let insert = {
        name: "Hello world",
        age: "oof",
        hack: "Mainame"
    }
    fb.insert("student/12", insert);
    
//    console.log(fb.getApp().database());
*/