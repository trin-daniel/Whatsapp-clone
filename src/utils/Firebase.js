import firebase from 'firebase';


class FireBase {
  constructor(){
    this._config = {
      apiKey: "AIzaSyBw2QXzAodQzZ6nnNfXhyIcuiFH7bUaNVg",
      authDomain: "whatsapp-clone-938a2.firebaseapp.com",
      databaseURL: "https://whatsapp-clone-938a2.firebaseio.com",
      projectId: "whatsapp-clone-938a2",
      storageBucket: "gs://whatsapp-clone-938a2.appspot.com",
      messagingSenderId: "273935738840",
      appId: "1:273935738840:web:07ce62df35a697d8fff4ad",
      measurementId: "G-058J4HWPH3"
    }
    this.initialize();
  }

  initialize(){
  // Initialize Firebase
    if(!window._initializedFirebase){
      firebase.initializeApp(this._config);
      firebase.analytics();
      firebase.firestore().settings({});
      window._initializedFirebase = true;
    }
  }

  static database(){
    return firebase.firestore();
  }

  static disk(){
    return firebase.storage();
  }

  AuthenticateFirebase(){
    return new Promise((resolve, reject)=>{
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(response =>{
          const credential={
            token: response.credential.accessToken,
            user: response.user,
          }

          resolve(credential);
        })
        .catch(err =>{
          reject(err);
        })
    })
  }
};

export default FireBase;