// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword,GoogleAuthProvider} from "firebase/auth"
import { useEffect } from "react";
import { useState } from "react";
import {getFirestore} from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
    apiKey: "AIzaSyCssajMgot0xcv8FQeHyeGbomZDacGRIpc",
    authDomain: "blog-app-89d47.firebaseapp.com",
    projectId: "blog-app-89d47",
    storageBucket: "blog-app-89d47.appspot.com",
    messagingSenderId: "563464140507",
    appId: "1:563464140507:web:9f5d1eb8125462b108befe"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth();
export const db = getFirestore(app)

export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signup =  (email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password)
}

export const logout = ()=>{
    return signOut(auth)
}

export const signin = (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
}

export const useAuth =()=>{
    const [currentUser,setCurrentUser] = useState()
    useEffect(()=>
        {
            const unSub = onAuthStateChanged(auth, user=>setCurrentUser(user))
            return unSub
        },[])
        return currentUser
}




