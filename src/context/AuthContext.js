import firebase from "firebase/app";
import "firebase/auth";

import {
  createUserWithEmailAndPassword,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginFramework,
  signInWithEmailAndPassword,
  storeAuthToken,
} from "../helpers/loginManager";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
    error: "",
    success: false,
    emailVerfied: false,
  });

  initializeLoginFramework();

  // const history = useHistory();
  // const location = useLocation();

  // let { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };
  const register = (name, email, password) => {
    createUserWithEmailAndPassword(name, email, password).then((res) => {
      handleResponse(res, false);
    });
  };
  const login = (email, password, history, from) => {
    signInWithEmailAndPassword(email, password).then((res) => {
      handleResponse(res, true, history, from);
    });
  };
  const handleResponse = (res, redirect, history, from) => {

    if (res.success) {
      setUser(res);
    }else if(res.error){
      const faliedUser = { 
        isSignedIn: false,
        name: "",
        email: "",
        photo: "",
        error: res.error,
        success: res.success,}
      setUser(faliedUser)
    }

   
    // setLoggedInUser(res);

    if (res.success && redirect) {
      storeAuthToken(res);
      setTimeout(() => {
        history.replace(from);
      }, 2000);
    }
  };
  const signOut = () => {
    handleSignOut();
    const signedOutUser = {
      isSignedIn: false,
      name: "",
      email: "",
      photo: "",
      error: "",
      success: false,
    };
    sessionStorage.clear();
    window.location.reload();
    handleResponse(signedOutUser, false);
  };
  const checkUserLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({
          isSignedIn: true,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          error: user.error ? user.error : "",
          success: true,
          emailVerified: user.emailVerified,
        });
        handleResponse(user, true);
      } else {
        setUser({
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
          error: "",
          success: false,
          emailVerified: false,
        });
      }
    });
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        googleSignIn,
        login,
        register,
        checkUserLoggedIn,
        signOut,
        handleResponse
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
