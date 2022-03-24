import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore/lite';
//@ts-ignore
import {API_KEY_FIREBASE} from '@env';

const firebaseConfig = {
  apiKey: API_KEY_FIREBASE,
  authDomain: 'uber-eats-clone-346a4.firebaseapp.com',
  projectId: 'uber-eats-clone-346a4',
  storageBucket: 'uber-eats-clone-346a4.appspot.com',
  messagingSenderId: '1095817917870',
  appId: '1:1095817917870:web:7db57a946ef5ac950e443f',
  measurementId: 'G-MHL9T36Q8K',
};

const app = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(app);

export default firestoreDb;
