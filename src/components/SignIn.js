import React, { useEffect} from "react";
import StyleFirebaseUi from 'react-firebaseui/StyledFirebaseAuth'
import firebase from "firebase/compat";
import db from '../lib/firebase'
import {collection,  addDoc} from 'firebase/firestore'
var uiConfig = {
    signInFlow: "popup",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: '/'
}

const SignIn = ({setUsername}) => {
    const userCollection = collection(db, "users")
    useEffect(()=> {
        const authObserver =  firebase.auth().onAuthStateChanged( async(user)=> {
            if(user) {
                await addDoc(userCollection, {name: user.displayName })
                setUsername(user.displayName)
            }                
            else setUsername("")
         })
    })
    return(
        <div>
            <StyleFirebaseUi uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
    )
}


export default SignIn
