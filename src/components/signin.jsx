import {signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import "./signin.css"
import React from "react"
import {auth, provider} from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth";

function Signin() {
    const [user] = useAuthState(auth);

    return(
        <div className="Signin">
            {user?(
                <div className="signinbutton">
                <UserInfo/>
                <SignOutButton/>
                </div>
            ) : (
                <SignInButton/>
            )}

        </div>
    )
}

export default Signin

function SignInButton(){
    const signInWithGoogle = () => {
        //firebaseを使ってグーグルでサインインする
        signInWithPopup(auth, provider)
    };
    return (
        <button className="signinbutton" onClick = {signInWithGoogle}>
            <p>Googleでsign in</p>
        </button>
    )
}

function SignOutButton(){

    return (
        <button className="signinbutton" onClick = {() => auth.signOut()}>
            <p>サインアウト</p>
        </button>
    )
}

function UserInfo(){

    return (
    <div className="signinbutton">
        <img className="usericon" src ={auth.currentUser.photoURL} alt=""/>
        <p>{auth.currentUser.displayName}</p>
    </div>
    )
}

export {SignInButton,SignOutButton,UserInfo}