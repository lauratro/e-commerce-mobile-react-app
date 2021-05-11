import React, { useEffect, useState } from "react";

import MediaCard from "./Products";
import SearchAppBar from "./App-bar";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import Grid from "@material-ui/core/Grid";

function Home() {
  const [products, setProducts] = useState([]);
  let fetchApi = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setProducts(response);
      });
  };
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <React.Fragment>
      <SearchAppBar />
      <Box mt={8} position="relative" top="60px">
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
