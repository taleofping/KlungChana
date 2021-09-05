import { firebase } from '@firebase/app';
import 'firebase/storage';

class Storage {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp
                (
                    {
                        apiKey: "AIzaSyAzuVhH9pqpx9Ez0rowdFV0-_7MoUOu3i8",
                        authDomain: "klung-chana-inventory.firebaseapp.com",
                        projectId: "klung-chana-inventory",
                        storageBucket: "klung-chana-inventory.appspot.com",
                        messagingSenderId: "1050273407277",
                        appId: "1:1050273407277:web:e8c8f8c09a11517fe1f3a4"
                    }
                );
        }
        else {
            console.log('firebase apps already running....');
        }
        this.db = firebase.firestore();
    }

    uploadProfilePic = async (uri, name, success, reject) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebase
            .storage()
            .ref()
            .child('image_profile/' + name);
        ref
            .put(blob)
            .then((snapshot) => {
                snapshot.ref.getDownloadURL().then((uri) => {
                    success(uri);
                });
            })
            .catch((error) => {
                reject(error);
            });
    };

    uploadProductPic = async (uri, name, success, reject) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebase
            .storage()
            .ref()
            .child('image_product/' + name);
        ref
            .put(blob)
            .then((snapshot) => {
                snapshot.ref.getDownloadURL().then((uri) => {
                    success(uri);
                });
            })
            .catch((error) => {
                reject(error);
            });
    };

    getList = async (success, reject) => {
        var ref = firebase.storage().ref().child('image');
        await ref
            .listAll()
            .then(function (res) {
                success(res);
            })
            .catch(function (error) {
                reject(error);
            });
    };
}

const storage = new Storage();
export default storage;
