import React, { useState, useEffect } from "react";
import Page from "../components/PageTitle";
import IsLoadingData from "../components/IsLoadingData";
import ButtonFilters from "../components/ButtonFilters";
import RangeSlider from "../components/PriceSlider";

import MediaCard from "./Products";
import CardContainer from "../components/CardsContainer";

function Electronics() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  /*   let showFilter = () => {
    setShowFilters((noShow) => !noShow);
  }; */

  const [isLoading, setIsLoading] = useState(true);
  let fetchApi = async () => {
 try{
   const response= await fetch("https://fakestoreapi.com/products/category/electronics");
   const data = await response.json()
console.log(data);
        setProducts(data);
        setIsLoading(false)
 }catch(err){
      console.log(err)
    }
    
  };
    /*  fetch("https://fakestoreapi.com/products/category/electronics")
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setProducts(response);
        setIsLoading(false); */
  useEffect(() => {
    fetchApi();
  }, [filteredProducts]);
  //Filter Button
  function showButtonFilter(data) {
    setShowFilters(data);

    console.log("showBut", data);
  }

  //Filtered Data
  function filterData(data) {
    if (data.length === 0) {
      data = products;
      console.log("data", data);
    } else {
      setFilteredProducts(data);
      console.log("sliderData", data);
    }
  }
  console.log("dati Ele filt", filteredProducts);
  return (
    <Page title="Electronics">
      {!isLoading ? (
        <React.Fragment>
          <ButtonFilters
            onClick={(showFilter) => showButtonFilter(showFilter)}
            showFilters={showFilters}
          />
          {showFilters && (
            <React.Fragment>
              <RangeSlider
                products={products}
                filterData={(data) => filterData(data)}
              />
            </React.Fragment>
          )}
          <CardContainer>
            <MediaCard
              products={products}
              filteredProducts={filteredProducts}
            />
          </CardContainer>
        </React.Fragment>
      ) : (
        <div>
          <IsLoadingData />
        </div>
      )}
    </Page>
  );
}
export default Electronics;
