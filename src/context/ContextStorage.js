import React, { createContext, useState } from "react";
//Initialize the context
const initContextVariables = {
  products: [],
  isLoading: true,
  priceResult: [],
  categoryResult: [],
  singleCatProducts: [],
  filteredProducts: [],
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
  console.log("in context", categoryResult);
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
      }}
    >
      {children}
    </VariablesContext.Provider>
  );
};
