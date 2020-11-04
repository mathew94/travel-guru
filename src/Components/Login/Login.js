import React, { useState, useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './../../firebase.config';
import './Login.css';
import { userContext } from './../../App';
import {useHistory, useLocation} from 'react-router-dom';


firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const {displayName, email} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name:displayName,
        email: email
      }
      setUser(signedInUser);
      setLoggedInUser(signedInUser);
      history.replace(from);
    })
    .catch(error =>{
      console.log(error);
      console.log(error.message);
    })
  };

  const handleFbSignIn = () => {
    firebase.auth().signInWithPopup(fbProvider)
    .then(res => {
      const {displayName, email} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name:displayName,
        email: email
      }
      setUser(signedInUser);
      setLoggedInUser(signedInUser);
      history.replace(from);
    }).catch(function(error) {
        console.log(error);
        console.log(error.message);
    });
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        photo: '',
        email: ''
      }
      setUser(signedOutUser);
    })
    .catch(error => {
      console.log(error);
      console.log(error.message);
    })
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    console.log(user.email, user.password);
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateUserName(user.name);
      })
      .catch(error => {
        // Handle Errors here.
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }

    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const {displayName, email} = res.user;
        const signedInUser = {
            isSignedIn: true,
            name:displayName,
            email: email
          }
          setUser(signedInUser);
          setLoggedInUser(signedInUser);
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        console.log('sign in user info', res.user);
        history.replace(from);
      })
      .catch(function(error) {
        // Handle Errors here.
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }
    e.preventDefault();
  }
  
  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log('user name updated successfully');
    }).catch(function(error) {
      console.log(error);
    });
  }
    return (
        <div className='login'>
      <input type="checkbox" onChange = {() => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign up</label>
      <form onSubmit = {handleSubmit}>
      {newUser && <input name='name' onBlur = {handleBlur} placeholder='Enter Your Name' type="text"/>}
        <br/>
        <input type="text" onBlur = {handleBlur} name="email" placeholder = "Your Email address" required/>
        <br/>
        <input type="password" onBlur = {handleBlur} name="password" placeholder = "Your Password" required/>
        <br/>
        <br/>
        <input type="submit" value={newUser ? 'sign up' : 'sign in'}/>
      </form>
      <br/>
      {
        user.isSignedIn ? <button onClick = {handleSignOut}>Sign out</button>
        : <button onClick = {handleSignIn}>Sign in using Google</button>
        
      }
      <br/>
      <br/>
      <button onClick = {handleFbSignIn}>Sign in using Facebook</button>
      <p style = {{color:'red'}}>{user.error}</p>
      {user.success && <p style = {{color:'green'}}>User {newUser ? 'created' : 'Logged In'} successfully</p>}
        </div>
    );
};

export default Login;