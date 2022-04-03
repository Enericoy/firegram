import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    // your firebaseConfig object here
    apiKey: "AIzaSyAPsJn7EjAfE3xwvaLr09kFNftumgzXDg8",
    authDomain: "enericoy-firegram.firebaseapp.com",
    projectId: "enericoy-firegram",
    storageBucket: "enericoy-firegram.appspot.com",
    messagingSenderId: "788209037566",
    appId: "1:788209037566:web:fd7e531baa78e27af5f5af"
}

initializeApp(firebaseConfig);

//initalise service
const projectStorage = getStorage();
const projectFirestore = getFirestore();
const timestamp=serverTimestamp;

export { projectStorage, projectFirestore };