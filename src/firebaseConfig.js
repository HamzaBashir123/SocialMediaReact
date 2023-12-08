import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCp6eRLPplgLMMWyHtOXbyqejOUmApo3xo",
    authDomain: "social-media-4ebda.firebaseapp.com",
    projectId: "social-media-4ebda",
    storageBucket: "social-media-4ebda.appspot.com",
    messagingSenderId: "83306641341",
    appId: "1:83306641341:web:a1bb2c5b95d23abc2a44d4"
  };


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage, ref, uploadBytesResumable, getDownloadURL }