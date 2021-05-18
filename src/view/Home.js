import React, { useEffect, useState, useContext} from "react";
import MediaCard from "./Products";

import IsLoadingData from "../components/IsLoadingData";
import CheckboxesGroup from "../components/Checkboxes";
import RangeSlider from "../components/PriceSlider";
import {VariablesContext} from "../context/ContextStorage"
import ButtonFilters from "../components/ButtonFilters";

import "../styles/Checkboxes.css";
import Box from "@material-ui/core/Box";

import Grid from "@material-ui/core/Grid";

function Home() {
  const {products, setProducts, isLoading,setIsLoading}= useContext(VariablesContext)
 // const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  let [filteredCheckBoxData, setFilteredCheckBoxData] = useState(products);
  const [showFilters, setShowFilters] = useState(false);
 // const [isLoading, setIsLoading] = useState(true);

  let fetchApi = async () => {
    try{
      const response=  await fetch("https://fakestoreapi.com/products?limit=30")
   const data= await response.json()
   console.log(data);
   setProducts(data)
   setIsLoading(false)
    }catch(err){
      console.log(err)
    }
  }
   /*  fetch("https://fakestoreapi.com/products?limit=30")
      .then((res) => res.json())
      .then((response) => {
        setProducts(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      }); */
  

  useEffect(() => {
    fetchApi();
  }, [filteredProducts]);
  //Filter Button
  function showButtonFilter(data) {
    setShowFilters(data);

    console.log("showBut", data);
  }
  /* let showFilter = () => {
    setShowFilters((noShow) => !noShow);
  };
*/
  //Filtered Products
  function filterData(data) {
    setFilteredProducts(data);

    console.log("sliderData", data);
  }
  console.log("dati Home filtrati", filteredProducts);
  /*  function filterDataCheckBox(data) {
    setFilteredCheckBoxData(data);

    console.log("CheckboxData", data);
  }
  console.log("dati Home check filtrati", filteredCheckBoxData); */

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
                filteredProducts={filteredProducts}
                // filterDataCheckBox={(data) => filterDataCheckBox(data)}
                filterData={(data) => filterData(data)}
              />
              <RangeSlider
                products={products}
                filteredProducts={filteredProducts}
                // filteredCheckBoxData={filteredCheckBoxData}
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
                filteredCheckBoxData={filteredCheckBoxData}
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
