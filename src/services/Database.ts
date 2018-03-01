//import * as firebase from 'firebase';
declare var firebase;

export class DatabaseService {
    instance: any;

    constructor() {
        var config = {
            apiKey: "AIzaSyBpVG2JOIVTXfO-fWx7-YZq938dSINu9Lc",
            authDomain: "madness-labs-pwa.firebaseapp.com",
            databaseURL: "https://madness-labs-pwa.firebaseio.com",
            projectId: "madness-labs-pwa",
            storageBucket: "",
            messagingSenderId: "540141413358"
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(config);

            firebase.firestore().enablePersistence()
                .then(() => {
                    // Initialize Cloud Firestore through firebase
                    this.instance = firebase.firestore();
                })
                .catch((err) => {
                    if (err.code == 'failed-precondition') {
                        // Multiple tabs open, persistence can only be enabled
                        // in one tab at a a time.
                        // ...
                    } else if (err.code == 'unimplemented') {
                        // The current browser does not support all of the
                        // features required to enable persistence
                        // ...
                    }
                });
        } else {
            this.instance = firebase.firestore();
        }
    }
}
