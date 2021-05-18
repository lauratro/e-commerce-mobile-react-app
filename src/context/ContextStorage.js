import React, {createContext, useState} from "react"
//Initialize the context
const initContextVariables = {
    products :[],
    isLoading: true,
    filteredProducts: []
    
}
//Create context
export const VariablesContext = createContext(initContextVariables)

// make provider => value /children
export const VariablesContextProvider =({children}) =>{
    const [products, setProducts] = useState(initContextVariables.products)
      const [isLoading, setIsLoading] = useState(initContextVariables.isLoading)
      const [filteredProducts, setFilteredProducts] = useState(initContextVariables.filteredProducts)
return(
    <VariablesContext.Provider value={{products, setProducts, isLoading,setIsLoading}}>
    {children}
    </VariablesContext.Provider>
)
}