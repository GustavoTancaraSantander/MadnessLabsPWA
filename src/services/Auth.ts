//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
//import { GooglePlus } from '@ionic-native/google-plus';
//import { TwitterConnect } from '@ionic-native/twitter-connect';

//import firebase from 'firebase';
//import '@firebase/auth';

declare var firebase;

/**
 * @module Services
 */
export class AuthService {
    //public service: firebase.auth.Auth;
    public service: any;
    public session: any;

    constructor(
        //private facebook: Facebook,
        //private googlePlus: GooglePlus,
        //private twitter: TwitterConnect
    ) {
        //this.user = afAuth.authState;
        let firstRun: boolean = false;
        if (firebase.apps.length === 0) {
            var config = {
                apiKey: "AIzaSyBpVG2JOIVTXfO-fWx7-YZq938dSINu9Lc",
                authDomain: "madness-labs-pwa.firebaseapp.com",
                databaseURL: "https://madness-labs-pwa.firebaseio.com",
                projectId: "madness-labs-pwa",
                storageBucket: "madness-labs-pwa.appspot.com",
                messagingSenderId: "540141413358"
            };
            firebase.initializeApp(config);
            firstRun = true;
        }
        this.service = firebase.auth();

        if (firstRun) {
            this.service.getRedirectResult().then((data) => {
                if (data && data.user) {
                    this.emitLoggedInEvent(data);
                }
            });
        }

    }

    // instance() {
    //     return this.afAuth.auth;
    // }
    onAuthChanged(callback) {
        this.service.onAuthStateChanged(callback);
    }

    isLoggedIn() {
        return this.service.currentUser;
    }

    emitLoggedInEvent(data) {
        var event = new CustomEvent('authLoggedIn', { detail: { data } });
        document.body.dispatchEvent(event);
    }

    emitLoggedOutEvent() {
        var event = new CustomEvent('authLoggedOut', {});
        document.body.dispatchEvent(event);
    }

    createUser(email: string, password: string) {
        return new Promise((resolve, reject) => {
            try {
                this.service.createUserWithEmailAndPassword(email, password).then((data) => {
                    resolve(data);
                }).catch((error) => {
                    reject(error);
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    withEmail(email: string, password: string) {
        return new Promise((resolve, reject) => {
            try {
                this.service.signInWithEmailAndPassword(email, password).then((user) => {
                    this.emitLoggedInEvent({ user });
                    resolve({ data: { user } });
                }).catch((error) => {
                    reject(error);
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    // facebookNative(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         if (this.platform.is('cordova')) {
    //             this.facebook.login(['email', 'public_profile', 'user_friends'])
    //                 .then((facebookData: FacebookLoginResponse) => {
    //                     const credential = firebase.auth.FacebookAuthProvider.credential(facebookData.authResponse.accessToken);
    //                     firebase.auth().signInWithCredential(credential).then((firebaseData) => {
    //                         resolve(firebaseData);
    //                     });
    //                 }, (error) => {
    //                     reject(error);
    //                 });
    //         } else {
    //             reject({ message: 'This platform does not support native login.' });
    //         }
    //     });
    // }

    // googleNative(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.googlePlus.login({
    //             webClientId: this.enjin.get('google.id'),
    //             offline: true
    //         }).then((googleData) => {
    //             const credential = firebase.auth.GoogleAuthProvider.credential(googleData.idToken);
    //             firebase.auth().signInWithCredential(credential).then((firebaseData) => {
    //                 resolve(firebaseData);
    //             });
    //         }).catch((error) => {
    //             reject(error);
    //         });
    //     });
    // }

    // twitterNative(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.twitter.login().then((twitterData) => {
    //             const credential = firebase.auth.TwitterAuthProvider.credential(twitterData.token, twitterData.secret);
    //             firebase.auth().signInWithCredential(credential).then((firebaseData) => {
    //                 resolve(firebaseData);
    //             });
    //         }, (error) => {
    //             reject(error);
    //         });
    //     });
    // }

    withSocial(network: string, redirect: boolean = false): Promise<any> {
        // let provider;
        // return new Promise((resolve, reject) => {
        //     if (this.platform.is('cordova')) {
        //         if (network === 'facebook') {
        //             this.facebookNative().then((result) => {
        //                 resolve(result);
        //             });
        //         } else if (network === 'google') {
        //             this.googleNative().then((result) => {
        //                 resolve(result);
        //             });
        //         } else if (network === 'twitter') {
        //             this.twitterNative().then((result) => {
        //                 resolve(result);
        //             });
        //         } else {
        //             reject({ message: 'A social network is required or the one provided is not yet supported.' });
        //         }
        //     } else {

        //     }
        // });
        let provider;
        let shouldRedirect = redirect;
        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log('Running in stand-alone mode...');
            shouldRedirect = shouldRedirect ? shouldRedirect : true;
        }
        return new Promise((resolve, reject) => {
            if (network === 'facebook') {
                provider = new firebase.auth.FacebookAuthProvider;
            } else if (network === 'google') {
                provider = new firebase.auth.GoogleAuthProvider;
            } else if (network === 'twitter') {
                provider = new firebase.auth.TwitterAuthProvider;
            } else {
                reject({ message: 'A social network is required or the one provided is not yet supported.' });
            }
            this.service[shouldRedirect ? 'signInWithRedirect' : 'signInWithPopup'](provider).then((data) => {
                this.emitLoggedInEvent(data);
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    logout() {
        this.emitLoggedOutEvent();
        return this.service.signOut();
    }
}