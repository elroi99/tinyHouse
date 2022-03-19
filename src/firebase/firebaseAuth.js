import { auth , db  } from "./firebase";
import { User , userConverter } from "./firestore" 
import { GoogleAuthProvider, signInWithPopup , signOut , onAuthStateChanged } from "firebase/auth";
import { getDoc , doc , setDoc } from "firebase/firestore"

export const signInWithFirebase = async () => {
    try{
      const provider = new GoogleAuthProvider();
      let result = await signInWithPopup( auth , provider );  
      const { displayName  , email , uid  } = result.user; // signed in use info from the user object ( auth )
      console.log(`${displayName} ${email} ${uid} signed in`);

      // setting our uid field, document id same as the uid provided for the user by firebase auth. 
      let userDocSnapshot = await getDoc( doc(db , "users" , uid) );
      
      // if user details arent already in firebase, add them there.
      if( !(userDocSnapshot.exists()) ){
        // create a user object 
        let newUser = new User( displayName , email , uid , [] , [] );
        // setting it to firestore.
        await setDoc( doc(db , `users/${uid}`).withConverter(userConverter) , newUser );  // TODO add data based on the schema object. (change this)
        console.log("user does not already exist in firebase, added it.");
      }
    }
    catch(error){
      console.log(error.message);
    }
  
  }

  export const signout = async () => {
    try{
      let user = await signOut(auth);
      console.log(user);
      console.log("signed out successfully")
    }
    catch(error){
      console.log(error.message);
    }
    
  }
  