import React, { useState, useEffect } from "react";
import Page from "./PageTitle";
import IsLoadingData from "./IsLoadingData";
import ButtonFilters from "./ButtonFilters";
import RangeSlider from "./PriceSlider";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MediaCard from "./Products";
import CardContainer from "./CardsContainer";

function Electronics() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilters, setShowFilters] = useState(false);
  /*   let showFilter = () => {
    setShowFilters((noShow) => !noShow);
  }; */

  const [isLoading, setIsLoading] = useState(true);
  let fetchApi = () => {
    fetch("https://fakestoreapi.com/products/category/electronics")
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setProducts(response);
        setIsLoading(false);
        setFilteredProducts(filteredProducts);
      });
  };
  useEffect(() => {
    fetchApi();
  }, []);
  //Filter Button
  function showButtonFilter(data) {
    setShowFilters(data);

    console.log("showBut", data);
  }
  //Filtered Data
  function filterData(data) {
    setFilteredProducts(data);
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
                products={products}
                filterData={(data) => filterData(data)}
              />
            </React.Fragment>
          )}
          <CardContainer>
            <MediaCard products={products} />
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
