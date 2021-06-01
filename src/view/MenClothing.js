import React, { useState, useEffect, useContext } from "react";
import { VariablesContext } from "../context/ContextStorage";
import Page from "../components/PageTitle";
import IsLoadingData from "../components/IsLoadingData";
import ButtonFilters from "../components/ButtonFilters";
import RangeSlider from "../components/PriceSlider";

import MediaCard from "./Products";
import CardContainer from "../components/CardsContainer";

function Men() {
  const {
    products,
    setProducts,
    isLoading,
    setIsLoading,
    filteredProducts,
    setFilteredProducts,
    priceResult,
    setPriceResult,
    singleCatProducts,
    setSingleCatProducts,
  } = useContext(VariablesContext);

  const [showFilters, setShowFilters] = useState(false);
  /*   let showFilter = () => {
    setShowFilters((noShow) => !noShow);
  }; */

  let fetchApi = async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/category/men's clothing"
      );
      const data = await response.json();
      console.log("jeweleryData", data);
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

    console.log("showBut", data);
  }

  return (
    <Page title="Men's Clothing">
      {!isLoading ? (
        <React.Fragment>
          <ButtonFilters
            onClick={(showFilter) => showButtonFilter(showFilter)}
            showFilters={showFilters}
          />
          {showFilters && (
            <React.Fragment>
              <RangeSlider
              // products={products}
              // filterData={(data) => filterData(data)}
              />
            </React.Fragment>
          )}
          <CardContainer>
            <MediaCard
            //products={products}
            //filteredProducts={filteredProducts}
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
export default Men;
