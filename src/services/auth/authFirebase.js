import firebase from 'firebase'
import 'firebase/auth'

class FirebaseAuth{
  constructor(){
    const firebaseConfig = {
      insert here your object config firebase
    };
    
    this.firebaseApp = firebase.initializeApp(firebaseConfig);
  }
}

export default new FirebaseAuth().firebaseApp