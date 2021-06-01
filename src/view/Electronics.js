import React, { useState, useEffect, useContext } from "react";
import { VariablesContext } from "../context/ContextStorage";
import Page from "../components/PageTitle";
import IsLoadingData from "../components/IsLoadingData";
import ButtonFilters from "../components/ButtonFilters";
import RangeSlider from "../components/PriceSlider";
import Category from "../components/NameCategory";

import MediaCard from "./Products";
import CardContainer from "../components/CardsContainer";

function Electronics() {
  const { products, setProducts, isLoading, setIsLoading } =
    useContext(VariablesContext);

  const [showFilters, setShowFilters] = useState(false);
  /*   let showFilter = () => {
    setShowFilters((noShow) => !noShow);
  }; */

  // const [isLoading, setIsLoading] = useState(true);
  let fetchApi = async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/category/electronics"
      );
      const data = await response.json();
      // console.log("electData", data);
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
              // products={products}
              // filterData={(data) => filterData(data)}
              />
            </React.Fragment>
          )}
          <Category cat="Electronics" />
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
export default Electronics;
