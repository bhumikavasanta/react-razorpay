import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc,collection } from 'firebase/firestore'
import {signin, signup,provider,auth} from '../Firebase'
import { db } from '../Firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { useAuth } from '../Firebase'

const Authentication = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate =useNavigate()
    const currentuser = useAuth()
    const usersCollection = collection(db,"users")//init empty blogs collection

    const gSignupHandler = async()=>{
        provider.setCustomParameters({ prompt: 'select_account' });
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // redux action? --> dispatch({ type: SET_USER, user });
                addDoc(usersCollection,{author:user.user.email})
                navigate("/MyBlogs")
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    const signUpHandler = async()=>{
        await signup(email,password)
        await addDoc(usersCollection,{author:email})
        setEmail('')
        setPassword('')
        navigate("/MyBlogs")

    }

    const signinHandler = async()=>{
        await signin(email,password)
        navigate("/MyBlogs")
    }

    const passwordChangeHandler = (e)=>{
        setPassword(e.target.value)
    }
    const emailChangeHandler = (e)=>{
        setEmail(e.target.value)
    }
    return (
        <>
        
        {!currentuser&&
            <div className='container col-md-4 '>
                <div className="wrapper p-3 my-4" style={{border:"5px solid black"}}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={emailChangeHandler}/>
                            
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={passwordChangeHandler}/>
                    </div>
                    <button type="submit" className="btn btn-dark my-2" onClick={signUpHandler}>Sign Up</button>
                    <button type="submit" className="btn btn-dark m-2" onClick={signinHandler}>Sign In</button>
                    <button type="submit" className="btn btn-dark m-2" onClick={gSignupHandler}>Sign Up with Google</button>
                    </div>
            </div>}
        </>
    )
}

export default Authentication

