import { firebase } from '@firebase/app';
import '@firebase/firestore'

class Firestore {
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

    /*---------------------User----------------------*/
    addUser = (user, success, reject) => {
        firebase
            .firestore()
            .collection('User')
            .add(user)
            .then(function (docRef) {
                success(docRef);
            })
            .catch(function (error) {
                reject(error);
            });
    };
    getUser = (email, success, reject) => {
        firebase
            .firestore()
            .collection('User')
            .where('email', '==', email)
            .get()
            .then(function (querySnapshot) {
                success(querySnapshot);
            })
            .catch(function (err) {
                reject(err);
            });
    }
    getAllUser(success, reject) {
        firebase
            .firestore()
            .collection('User')
            .orderBy('employeeID')
            .get()
            .then(function (querySnapshot) {
                success(querySnapshot);
            })
            .catch(function (error) {
                reject(error);
            });
    }
    deleteUser = (id, success, reject) => {
        firebase
            .firestore()
            .collection('User')
            .doc(id)
            .delete()
            .then(function () {
                success(null);
            })
            .catch(function (error) {
                reject(error);
            });
    };
    updateUserByID = (user, success, reject) => {
        firebase
            .firestore()
            .collection('User')
            .doc(user.id)
            .update({
                firstnameTH: user.firstnameTH,
                lastnameTH: user.lastnameTH,
                firstnameEN: user.firstnameEN,
                lastnameEN: user.lastnameEN,
                tel: user.tel,
                address: user.address,
                pass: user.pass,
                pic: user.pic,
            })
            .then(function () {
                success(null);
            })
            .catch(function (error) {
                reject(error);
            });
    };

    /*-------------------Product--------------------*/
    addProduct = (product, success, reject) => {
        firebase
            .firestore()
            .collection('Products')
            .add(product)
            .then(function (docRef) {
                success(docRef);
            })
            .catch(function (error) {
                reject(error);
            });
    };
    addProductByID = (product, success, reject) => {
        firebase
            .firestore()
            .collection('Products')
            .doc(product.id)
            .set(product)
            .then(function (docRef) {
                success(docRef);
            })
            .catch(function (error) {
                reject(error);
            });
    };
    getProductByID = (id, success, reject) => {
        firebase
            .firestore()
            .collection('Products')
            .doc(id)
            .get()
            .then(function (querySnapshot) {
                success(querySnapshot);
            })
            .catch(function (err) {
                reject(err);
            });
    }
    getProductByShelf = (shelf, success, reject) => {
        firebase
            .firestore()
            .collection('Products')
            .where('shelf', '==', shelf)
            .orderBy('productID')
            .get()
            .then(function (querySnapshot) {
                success(querySnapshot);
            })
            .catch(function (err) {
                reject(err);
            });
    }
    getProductByType = (type, success, reject) => {
        firebase
            .firestore()
            .collection('Products')
            .where('type', '==', type)
            .orderBy('productID')
            .get()
            .then(function (querySnapshot) {
                success(querySnapshot);
            })
            .catch(function (err) {
                reject(err);
            });
    }
    getAllProduct(success, reject) {
        firebase
            .firestore()
            .collection('Products')
            .orderBy('productID')
            .get()
            .then(function (querySnapshot) {
                success(querySnapshot);
            })
            .catch(function (error) {
                reject(error);
            });
    }
    updateProductByID = (product, success, reject) => {
        firebase
            .firestore()
            .collection('Products')
            .doc(product.id)
            .update({
                qty: product.qty
            })
            .then(function () {
                success(null);
            })
            .catch(function (error) {
                reject(error);
            });
    };
    deleteProduct = (id, success, reject) => {
        firebase
            .firestore()
            .collection('Products')
            .doc(id)
            .delete()
            .then(function () {
                success(null);
            })
            .catch(function (error) {
                reject(error);
            });
    };

    /*-----------productProfile---------------*/
    addProductProfile = (productProfile, success, reject) => {
        firebase
            .firestore()
            .collection('ProductProfile')
            .add(productProfile)
            .then(function (docRef) {
                success(docRef);
            })
            .catch(function (error) {
                reject(error);
            });
    };
    getAllProductProfile(success, reject) {
        firebase
            .firestore()
            .collection('ProductProfile')
            .orderBy('productID')
            .get()
            .then(function (querySnapshot) {
                success(querySnapshot);
            })
            .catch(function (error) {
                reject(error);
            });
    }
    updateProductProfileByID = (productProfile, success, reject) => {
        firebase
            .firestore()
            .collection('ProductProfile')
            .doc(productProfile.id)
            .update({
                
            })
            .then(function () {
                success(null);
            })
            .catch(function (error) {
                reject(error);
            });
    };
    deleteProductProfile = (id, success, reject) => {
        firebase
            .firestore()
            .collection('ProductProfile')
            .doc(id)
            .delete()
            .then(function () {
                success(null);
            })
            .catch(function (error) {
                reject(error);
            });
    };

    /*-------------Shelf-------------*/
    addShelf = (shelf, success, reject) => {
        firebase
            .firestore()
            .collection('Shelf')
            .add(shelf)
            .then(function (docRef) {
                success(docRef);
            })
            .catch(function (error) {
                reject(error);
            });
    };
    getShelf = (shelfID, success, reject) => {
        firebase
            .firestore()
            .collection('Shelf')
            .where('shelfID', '==', shelfID)
            .get()
            .then(function (querySnapshot) {
                success(querySnapshot);
            })
            .catch(function (err) {
                reject(err);
            });
    }
    getAllShelf(success, reject) {
        firebase
            .firestore()
            .collection('Shelf')
            .orderBy('shelfID')
            .get()
            .then(function (querySnapshot) {
                success(querySnapshot);
            })
            .catch(function (error) {
                reject(error);
            });
    }
    deleteShelf = (shelfID, success, reject) => {
        firebase
            .firestore()
            .collection('Shelf')
            .doc(shelfID)
            .delete()
            .then(function () {
                success(null);
            })
            .catch(function (error) {
                reject(error);
            });
    };
    updateShelfByID = (shelf, success, reject) => {
        firebase
            .firestore()
            .collection('Shelf')
            .doc(shelf.id)
            .update({
                height: shelf.height,
                length: shelf.length,
                level: shelf.level,
                shelfID: shelf.shelfID,
                width: shelf.width,
            })
            .then(function () {
                success(null);
            })
            .catch(function (error) {
                reject(error);
            });
    };

    /*-------------Log---------------*/
    addLog = (log, success, reject) => {
        firebase
            .firestore()
            .collection('Log')
            .add(log)
            .then(function (docRef) {
                success(docRef);
            })
            .catch(function (error) {
                reject(error);
            });
    }

    /*-----------Notification---------------*/
    addNotification = (notification, success, reject) => {
        firebase
            .firestore()
            .collection('Notification')
            .add(notification)
            .then(function (docRef) {
                success(docRef);
            })
            .catch(function (error) {
                reject(error);
            });
    };
    getAllNotification(success, reject) {
        firebase
            .firestore()
            .collection('Notification')
            .get()
            .then(function (querySnapshot) {
                success(querySnapshot);
            })
            .catch(function (error) {
                reject(error);
            });
    }
    deleteNotification = (id, success, reject) => {
        firebase
            .firestore()
            .collection('Notification')
            .doc(id)
            .delete()
            .then(function () {
                success(null);
            })
            .catch(function (error) {
                reject(error);
            });
    };
    updateNotiByID = (notification, success, reject) => {
        firebase
            .firestore()
            .collection('Notification')
            .doc(notification.id)
            .update({
                notificationHead: notification.notificationHead,
                notiCount: notification.notiCount,
                notiNum: notification.notiNum,
            })
            .then(function () {
                success(null);
            })
            .catch(function (error) {
                reject(error);
            });
    };

    /*------------------Bill---------------------*/
    addBill = (bill, success, reject) => {
        firebase
            .firestore()
            .collection('Bill')
            .add(bill)
            .then(function (docRef) {
                success(docRef);
            })
            .catch(function (error) {
                reject(error);
            });
    }

    deleteBill = (id, success, reject) => {
        firebase
            .firestore()
            .collection('Bill')
            .doc(id)
            .delete()
            .then(function () {
                success(null);
            })
            .catch(function (error) {
                reject(error);
            });
    }

    getAllBill = (success, reject) => {
        firebase
            .firestore()
            .collection('Bill')
            .get()
            .then(function (querySnapshot) {
                success(querySnapshot);
            })
            .catch(function (error) {
                reject(error);
            });
    }

    updateBillByID = (bill, success, reject) => {
        firebase
            .firestore()
            .collection('Bill')
            .doc(bill.id)
            .update({
                confirm: bill.confirm,
            })
            .then(function () {
                success(null);
            })
            .catch(function (error) {
                reject(error);
            });
    };
    /*------------------Ordering Cost---------------------*/
    getAllCost = (success, reject) => {
        firebase
            .firestore()
            .collection('Ordering Cost')
            .get()
            .then(function (querySnapshot) {
                success(querySnapshot);
            })
            .catch(function (error) {
                reject(error);
            });

    }
    updateCost = (oCost, success, reject) => {
        firebase
            .firestore()
            .collection('Ordering Cost')
            .doc("FF60T4mNi2E1Zq3fuC2D")
            .update({
                Apr: oCost.Apr,
                Aug: oCost.Aug,
                Dec: oCost.Dec,
                Feb: oCost.Feb,
                Jan: oCost.Jan,
                Jul: oCost.Jul,
                Jun: oCost.Jun,
                Mar: oCost.Mar,
                May: oCost.May,
                Nov: oCost.Nov,
                Oct: oCost.Oct,
                Sep: oCost.Sep,
            })
            .then(function () {
                success(null);
            })
            .catch(function (error) {
                reject(error);
            });
    };
     /*------------------Carrying Cost---------------------*/
     getAllcCost = (success, reject) => {
        firebase
            .firestore()
            .collection('Carry Cost')
            .get()
            .then(function (querySnapshot) {
                success(querySnapshot);
            })
            .catch(function (error) {
                reject(error);
            });

    }
    updatecCost = (cCost, success, reject) => {
        firebase
            .firestore()
            .collection('Carry Cost')
            .doc("ttL5Kj35fCMrLbFD7c35")
            .update({
                Apr: cCost.Apr,
                Aug: cCost.Aug,
                Dec: cCost.Dec,
                Feb: cCost.Feb,
                Jan: cCost.Jan,
                Jul: cCost.Jul,
                Jun: cCost.Jun,
                Mar: cCost.Mar,
                May: cCost.May,
                Nov: cCost.Nov,
                Oct: cCost.Oct,
                Sep: cCost.Sep,
            })
            .then(function () {
                success(null);
            })
            .catch(function (error) {
                reject(error);
            });
    };
    /*--------------------turnover graph-----------------------*/
    getAllGraph = (success, reject) => {
        firebase
            .firestore()
            .collection('Graph')
            .get()
            .then(function (querySnapshot) {
                success(querySnapshot);
            })
            .catch(function (error) {
                reject(error);
            });
    
    }
    updateGraph = (graph, success, reject) => {
        firebase
            .firestore()
            .collection('Graph')
            .doc("ZJICOP6AvttiabS4az0j")
            .update({
                Apr: graph.Apr,
                Aug: graph.Aug,
                Dec: graph.Dec,
                Feb: graph.Feb,
                Jan: graph.Jan,
                Jul: graph.Jul,
                Jun: graph.Jun,
                Mar: graph.Mar,
                May: graph.May,
                Nov: graph.Nov,
                Oct: graph.Oct,
                Sep: graph.Sep,
            })
            .then(function () {
                success(null);
            })
            .catch(function (error) {
                reject(error);
            });
    };
    
}
const firestore = new Firestore();
export default firestore;