import React, { useEffect} from "react";
import StyleFirebaseUi from 'react-firebaseui/StyledFirebaseAuth'
import firebase from "firebase/compat";
import db from '../lib/firebase'
import {collection, addDoc, getDocs} from 'firebase/firestore'
var uiConfig = {
    signInFlow: "popup",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: '/'
}

const SignIn = ({setUsername, setDocId, setAvatar}) => {
    const userCollection = collection(db, "users");
    const addNewUser = async(data,name)=> {
        let result = false
        data.docs.forEach((doc)=> {
            if(doc.data().name === name){
                result = true;
                setDocId(doc.id);
                if(doc.data().image);
                setAvatar(doc.data().image);
            }                
        })

        if(result === false) {           
            const docRef = await addDoc(userCollection, {name: name, image: "" })
            setDocId(docRef.id);
        }            
    }
    useEffect(()=> {
        const authObserver =  firebase.auth().onAuthStateChanged( async(user)=> {
            if(user) {  
                const data = await getDocs(userCollection)
                addNewUser(data,user.displayName)
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
