import { initializeApp } from "firebase/app";
import {
     getAuth, 
     signInWithPopup, 
     GoogleAuthProvider, 
     createUserWithEmailAndPassword, 
     signInWithEmailAndPassword, 
     signOut,
     onAuthStateChanged      
    } from "firebase/auth";
import { doc,getDoc,setDoc,getFirestore, collection, writeBatch, query, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRZDlrcUAHiNnOvvCOfuir4tyxUDKGr-s",
  authDomain: "crwn-clothing-13ee8.firebaseapp.com",
  projectId: "crwn-clothing-13ee8",
  storageBucket: "crwn-clothing-13ee8.appspot.com",
  messagingSenderId: "924361496433",
  appId: "1:924361496433:web:185fec738cba45a1fb88d0"
};

// const FirebaseApp = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();

export const signInpopup = () => signInWithPopup(auth,provider);

export const db = getFirestore();

export const addCollectionandDocuments = async (collectionkey, objects) => {
    const collectionRef = collection(db,collectionkey)
    const batch = writeBatch(db)

    objects.forEach((object) => {
        const docref = doc(collectionRef, object.title.toLowerCase())
        batch.set(docref, object)
    })

    await batch.commit()
}

export const getCollectionandDocuments = async () => {
    const collectionRef = collection(db, "Categories")
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((docsnapshot) => docsnapshot.data());
}

export const CreateUserDocument = async (userAuth, additionnal = {}) => {
    if(!userAuth) return;

    const userDoc = doc(db,"users",userAuth.uid)
    
    const userSnapshot = await getDoc(userDoc)
    
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDoc,{
                displayName,
                email,
                createdAt,
                ...additionnal
            })
        } catch (error) {
            console.log("error creating the user "+error.message);
        }
    }

    return userDoc;
}

export const EmailAndPasswordAuth = async (email, password) =>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
} 

export const SignInEmailAndPasswordAuth = async (email, password) =>{
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
} 

export const signoutuser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback)