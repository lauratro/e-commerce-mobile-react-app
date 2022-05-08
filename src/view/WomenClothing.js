import React, { useState, useEffect, useContext } from "react";
import { VariablesContext } from "../context/ContextStorage";
import Page from "../components/PageTitle";
import IsLoadingData from "../components/IsLoadingData";
import ButtonFilters from "../components/ButtonFilters";
import RangeSlider from "../components/PriceSlider";
import Category from "../components/NameCategory";

import MediaCard from "./Products";
import CardContainer from "../components/CardsContainer";

function Women() {
  const {
 
    setProducts,
    isLoading,
    setIsLoading,
 
  } = useContext(VariablesContext);

  const [showFilters, setShowFilters] = useState(false);


  let fetchApi = async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/category/women's clothing"
      );
      const data = await response.json();
     
      setProducts(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  //Filter Button
  function showButtonFilter(data) {
    setShowFilters(data);

  
  }

  return (
    <Page title="Women's Clothing">
      {!isLoading ? (
        <React.Fragment>
          <ButtonFilters
            onClick={(showFilter) => showButtonFilter(showFilter)}
            showFilters={showFilters}
          />
          {showFilters && (
            <React.Fragment>
              <RangeSlider />
            </React.Fragment>
          )}
          <Category cat="Women 's Clothing" />
          <CardContainer>
            <MediaCard />
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
export default Women;
