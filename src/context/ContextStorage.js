import React, {createContext, useState} from "react"
//Initialize the context
const initContextVariables = {
    products :[],
    isLoading: true,
    filteredProducts: [],
    singleCatProducts:[]
    
}
//Create context
export const VariablesContext = createContext(initContextVariables)

// make provider => value /children
export const VariablesContextProvider =({children}) =>{
    const [products, setProducts] = useState(initContextVariables.products)
      const [isLoading, setIsLoading] = useState(initContextVariables.isLoading)
    const [filteredProducts, setFilteredProducts] = useState(initContextVariables.filteredProducts)
    const [singleCatProducts, setSingleCatProducts] = useState(initContextVariables.singleCatProducts)
return(
    <VariablesContext.Provider value={{products, setProducts, isLoading,setIsLoading, filteredProducts, setFilteredProducts,singleCatProducts,setSingleCatProducts}}>
    {children}
    </VariablesContext.Provider>
)
}