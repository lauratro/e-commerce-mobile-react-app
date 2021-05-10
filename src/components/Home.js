import React, { useEffect, useState } from "react";

import MediaCard from "./Products";
import PrimarySearchAppBar from "./App-bar";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import Grid from "@material-ui/core/Grid";

function Home() {
  const [products, setProducts] = useState([]);
  let fetchApi = () => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  };
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <React.Fragment>
      <PrimarySearchAppBar />
      <Box mt={8}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"

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
