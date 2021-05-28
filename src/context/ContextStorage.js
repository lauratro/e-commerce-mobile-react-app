import React, { createContext, useState, useEffect } from "react";
import appFirebase from "../firebase";
import auth from "../firebase";

//Initialize the context
const initContextVariables = {
  products: [],
  isLoading: true,
  priceResult: [],
  categoryResult: [],
  singleCatProducts: [],
  filteredProducts: [],
  currentUser: null,
  loading: true,
  docProduct: [],
  idProductArray: [],
  favorite: [],
  priceCart: [,],
};
//Create context
export const VariablesContext = createContext(initContextVariables);

// make provider => value /children
export const VariablesContextProvider = ({ children }) => {
  const [products, setProducts] = useState(initContextVariables.products);
  const [isLoading, setIsLoading] = useState(initContextVariables.isLoading);
  const [filteredProducts, setFilteredProducts] = useState(
    initContextVariables.filteredProducts
  );
  const [priceResult, setPriceResult] = useState(
    initContextVariables.priceResult
  );
  const [categoryResult, setCategoryResult] = useState(
    initContextVariables.categoryResult
  );
  const [singleCatProducts, setSingleCatProducts] = useState(
    initContextVariables.singleCatProducts
  );
  const [docProduct, setDocProduct] = useState(initContextVariables.docProduct);
  const [idProductArray, setIdProductArray] = useState(
    initContextVariables.idProductArray
  );
  const [priceCart, setPriceCart] = useState(initContextVariables.priceCart);
  const [favorite, setFavorite] = useState(initContextVariables.favorite);
  /*  const [currentUser, setCurrentUser] = useState(
    initContextVariables.currentUser
  );
  const [loading, setLoading] = useState(initContextVariables.currentUser);
  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unlisten = appFirebase.auth().onAuthStateChanged((currentUser) => {
      currentUser ? setCurrentUser(currentUser) : setCurrentUser(null);
      setLoading(false);
    });
    return () => {
      unlisten();
    };
  });
 */
  console.log("in context", priceCart);
  return (
    <VariablesContext.Provider
      value={{
        products,
        setProducts,
        isLoading,
        setIsLoading,
        filteredProducts,
        setFilteredProducts,
        categoryResult,
        setCategoryResult,
        singleCatProducts,
        setSingleCatProducts,
        priceResult,
        setPriceResult,
        docProduct,
        setDocProduct,
        idProductArray,
        setIdProductArray,
        favorite,
        setFavorite,
        priceCart,
        setPriceCart,
        // currentUser,
        // setCurrentUser,
        // signUp,
      }}
    >
      {children}
    </VariablesContext.Provider>
  );
};
