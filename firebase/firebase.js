import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD_QcMmo8HZajYwu0QCrfPM_wDmomcj8Iw",
    authDomain: "qlgpics.firebaseapp.com",
    projectId: "qlgpics",
    storageBucket: "qlgpics.appspot.com",
    messagingSenderId: "291538378237",
    appId: "1:291538378237:web:91e3c833bbe4e91fbe0d94",
    measurementId: "G-7B6RWC0MWW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

async function uploadImage(value, id){
    const storageRef = ref(storage,`images/plant-${id}.jpg`);
    await uploadBytes(storageRef, value);
} 
async function uploadGarden(value, id){
    const storageRef = ref(storage,`garden/garden-${id}.jpg`);
    await uploadBytes(storageRef, value);
}

export { uploadImage, ref, getDownloadURL, storage, uploadGarden }