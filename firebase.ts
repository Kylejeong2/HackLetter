// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ai-notes-25554.firebaseapp.com",
  projectId: "ai-notes-25554",
  storageBucket: "ai-notes-25554.appspot.com",
  messagingSenderId: "654052071699",
  appId: "1:654052071699:web:9c360a9cad460eca70e2e6",
  measurementId: "G-NWWMXLFJWQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);

export async function uploadFileToFirebase(image_url: string, name: string){
    try {
        const response = await fetch(image_url)
        const buffer = await response.arrayBuffer()
        const file_name = name.replace(' ','') + Date.now + '.jpeg'
        const storageRef = ref(storage, file_name)
        await uploadBytes(storageRef, buffer, {
            contentType: 'image/jpeg'
        })
        const firebase_url = await getDownloadURL(storageRef);
        return firebase_url;
    } catch (error) {
        console.error(error)
    }
}