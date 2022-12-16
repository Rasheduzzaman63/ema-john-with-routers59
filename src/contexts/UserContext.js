import React from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import app from '../firebase/firebase.config';
import { useState } from 'react';
import { useEffect } from 'react';

export const AuthContext = createContext();


const auth = getAuth(app)

const UserContext = ({children}) => {
const [user, setUser] = useState({name:'Rashed'})
const [loading, setLoading] = useState(true)


    // create New user
    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login user
    const logInUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // signOut 
    const lotOut = ()=>{
        setLoading(true)
       return signOut(auth)
    }

    // To hold current user or State change 
    useEffect( () =>{
      const unSubscribe =  onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            setLoading(false)
        })
        return ()=>unSubscribe;
    },[])

    const authInfo = {user, createUser, logInUser, lotOut, loading}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;