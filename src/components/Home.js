import React, { useEffect, useState } from "react";
import MediaCard from "./Products";

import IsLoadingData from "./IsLoadingData";
import CheckboxesGroup from "./Checkboxes";
import RangeSlider from "./PriceSlider";

import ButtonFilters from "./ButtonFilters";

import "../styles/Checkboxes.css";
import Box from "@material-ui/core/Box";

import Grid from "@material-ui/core/Grid";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  let fetchApi = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setProducts(response);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchApi();
  }, [filteredProducts]);

  function showButtonFilter(data) {
    setShowFilters(data);

    console.log("showBut", data);
  }
  //Filtered Products
  function filterData(data) {
    setFilteredProducts(data);
    console.log("sliderData", data);
  }
  console.log("dati Home filtrati", filteredProducts);
  /* let showFilter = () => {
    setShowFilters((noShow) => !noShow);
  };
*/
  const onchangeFilter = (data) => {
    setFilteredProducts(data);
    console.log("Form>", data);
  };
  return (
    <div>
      {!isLoading ? (
        <React.Fragment>
          <ButtonFilters
            onClick={(showFilter) => showButtonFilter(showFilter)}
            showFilters={showFilters}
          />

          {showFilters && (
            <React.Fragment>
              <CheckboxesGroup
                className="posRelative"
                products={products}
                data={filteredProducts}
                onchange={(e) => {
                  onchangeFilter(e);
                }}
              />
              <RangeSlider
                products={products}
                filterData={(data) => filterData(data)}
              />
            </React.Fragment>
          )}

          <Box mt={8}>
            <Grid
              container
              direction="row"
              justify="space-around"

              /*  display="flex"
  flexWrap="wrap"
  */
            >
              <MediaCard
                products={products}
                filteredProducts={filteredProducts}
              />
            </Grid>
          </Box>
        </React.Fragment>
      ) : (
        <div>
          <IsLoadingData />
        </div>
      )}
    </div>
  );
}
export default Home;
