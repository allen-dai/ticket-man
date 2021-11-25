import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBVBkZU_x_dcd8Ma96QifTsFQD1AqFIyFQ",
    authDomain: "webfinalproject-647c3.firebaseapp.com",
    projectId: "webfinalproject-647c3",
    storageBucket: "webfinalproject-647c3.appspot.com",
    messagingSenderId: "811750286549",
    appId: "1:811750286549:web:72262065fdf5a32052ee5c",
    measurementId: "G-N43BXC49CN",
};

let app;

if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
}

export const auth = getAuth(app);
export const db = getFirestore();
export const googleAuthProvider = new GoogleAuthProvider();
