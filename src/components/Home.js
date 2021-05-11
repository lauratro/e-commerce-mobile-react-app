import React, { useEffect, useState } from "react";
import MediaCard from "./Products";
import SearchAppBar from "./App-bar";
import CheckboxesGroup from "./Checkboxes";
import RangeSlider from "./PriceSlider";
import "../styles/Checkboxes.css";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { positions } from "@material-ui/system";
import Grid from "@material-ui/core/Grid";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilters, setShowFilters] = useState(false);
  let fetchApi = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setProducts(response);
        setFilteredProducts();
      });
  };

  useEffect(() => {
    fetchApi();
  }, [filteredProducts]);
  let showFilter = () => {
    setShowFilters((noShow) => !noShow);
  };
  return (
    <React.Fragment>
      <SearchAppBar />
      <button className="posRelative" onClick={showFilter}>
        Filters
      </button>
      {showFilters && (
        <React.Fragment>
          <CheckboxesGroup
            className="posRelative"
            products={products}
            filteredProducts={filteredProducts}
            filterCheckbox={(filteredProducts) =>
              setFilteredProducts(filteredProducts)
            }
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
  );
}
export default Home;
