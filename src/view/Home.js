import React, { useEffect, useState, useContext } from "react";
import MediaCard from "./Products";

import IsLoadingData from "../components/IsLoadingData";
import CheckboxesGroup from "../components/Checkboxes";
import RangeSlider from "../components/PriceSlider";
import { VariablesContext } from "../context/ContextStorage";
import ButtonFilters from "../components/ButtonFilters";
import Page from "../components/PageTitle";
import "../styles/Checkboxes.css";
import Box from "@material-ui/core/Box";
import CardContainer from "../components/CardsContainer";

function Home() {
  const {
    products,
    setProducts,
    isLoading,
    setIsLoading,
  
  } = useContext(VariablesContext);


  
  const [showFilters, setShowFilters] = useState(false);

  let fetchApi = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      // console.log(data);
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
    <Page title="Home">
      {!isLoading ? (
        <React.Fragment>
          <ButtonFilters
            style={{ position: "relative", top: 100 }}
            onClick={(showFilter) => showButtonFilter(showFilter)}
            showFilters={showFilters}
          />

          {showFilters && (
            <React.Fragment>
              <CheckboxesGroup className="posRelative" />
              <RangeSlider />
            </React.Fragment>
          )}

          <Box mt={8}>
            <CardContainer
              
   
            >
              <MediaCard />
            </CardContainer>
          </Box>
        </React.Fragment>
      ) : (
        <div>
          <IsLoadingData />
        </div>
      )}
    </Page>
  );
}
export default Home;
