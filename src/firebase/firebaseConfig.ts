import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD8288mwj8x6JHjKKmKD2jmC0HADY4_Sjs",
    authDomain: "pantry-tracker-8b833.firebaseapp.com",
    projectId: "pantry-tracker-8b833",
    storageBucket: "pantry-tracker-8b833.appspot.com",
    messagingSenderId: "216754864000",
    appId: "1:216754864000:web:ddfce2044d25cdeb2c0b65",
    measurementId: "G-S73635XDYS"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
