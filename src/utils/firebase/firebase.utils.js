import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBk2jI0TcwC-S5K_1dI29SFSRSfwGW-wSI",
  authDomain: "crwn-clothing-db-bb033.firebaseapp.com",
  projectId: "crwn-clothing-db-bb033",
  storageBucket: "crwn-clothing-db-bb033.appspot.com",
  messagingSenderId: "271062248998",
  appId: "1:271062248998:web:2170fca6815146ebc380e7",
};

// Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
// export const signInwithGoogleRedirect = () =>
//   signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocmentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  //   console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  //   console.log(userSnapshot);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }

  return userDocRef;
};
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAutjUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
