import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import firebase from "../firebase";

const initAuthContext = {
  user: null,
  isLoggedIn: false,
  name: null,
  productName: "",
  productPrice: " ",

  loading: true,
};

export const AuthContext = createContext(initAuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(initAuthContext.user);
  const [loading, setLoading] = useState(initAuthContext.user);
  const [isLoggedIn, setIsLoggedIn] = useState(initAuthContext.isLoggedIn);
  const [name, setName] = useState(initAuthContext.name);
  const [productName, setProductName] = useState(initAuthContext.productName);
  const [productPrice, setProductPrice] = useState(initAuthContext.productName);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, [user]);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        name,
        setName,
        productName,
        setProductName,
        productPrice,
        productName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* import { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../firebase";
import firebase from "../firebase";
const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [IsLogged, setIsLogged] = useState(false);
  var db = firebase.firestore();
  const signup = (email, password, fullName) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        db.collection("users")
          .doc(user.uid)
          .set({
            name: fullName,
            email: email,
          })
          .then(() => {
            db.collection("users")
              .doc(user.uid)
              .get()
              .then((doc) => {
                console.log(doc.data());
              });
          });
      });
  };
  const signin = (email, password) => {
    let promise = new Promise(function (resolve, reject) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((ref) => {
          resolve(ref);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  };
  const signout = () => {
    return auth.signOut();
  };
  /* const passwordReset = (email) => {
    let promise = new Promise(function (resolve, reject) {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          resolve(`Password Reset Email sent to ${email}`);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  }; 
 
  const value = {
    user,
    setUser,
    signup,
    signin,
    signout,
    //  passwordReset,
    IsLogged,
    setIsLogged,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
 */
