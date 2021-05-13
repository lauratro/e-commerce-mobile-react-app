import React, { useEffect, useState } from "react";
import MediaCard from "./Products";
import MenuAppBar from "./App-bar";
import IsLoadingData from "./IsLoadingData";
import CheckboxesGroup from "./Checkboxes";
import RangeSlider from "./PriceSlider";
import CardContainer from "./CardsContainer";
import ButtonFilters from "./ButtonFilters";

import "../styles/Checkboxes.css";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { positions } from "@material-ui/system";
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
        setFilteredProducts(filteredProducts);
      });
  };

  useEffect(() => {
    fetchApi();
  }, [filteredProducts]);

  function showButtonFilter(data) {
    setShowFilters(data);

    console.log("showBut", data);
  }

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
              <RangeSlider products={products} />
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
              <MediaCard products={products} />
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
