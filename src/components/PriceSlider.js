import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { VariablesContext } from "../context/ContextStorage";

const useStyles = makeStyles({
  root: {
    width: 300,
    margin: " 0 auto",
    marginTop: 40,
  },
});

function valuetext(value) {
  return `${value} $`;
}

export default function RangeSlider() {
  let {
    products,
    setProducts,
    isLoading,
    setIsLoading,
    filteredProducts,
    setFilteredProducts,
    priceResult,
    setPriceResult,

  } = useContext(VariablesContext);

  // console.log("dati da filtrare slider", filteredProducts);

  const classes = useStyles();
  const [value, setValue] = React.useState([0, 1000]);
  let [filtered, setFiltered] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function assignProductValue() {
    filteredProducts = products;
  }
  let sliderFilter = () => {
    let filteredData = [];
    // assignProductValue();
    /*  if (document.title !== "Home | LBY") {
      priceResult = products;
    } */
    /* if (document.title == "Home | LBY") {
      filteredProducts = products;
    } */
    products.forEach((prod) => {
      if (
        Number(value[0]) <= Number(prod.price) &&
        Number(value[1]) >= Number(prod.price)
      ) {
        filteredData.push(prod.price);
      }
    });

    filtered = filteredData;

    return filtered;
  };
  filtered = sliderFilter();
  // console.log("filteroutslider", filtered);
  function filterData(data) {
    setPriceResult(data);
  }
  function transferData(array) {
    array = sliderFilter();
    filterData(array);
  }
  function twoFunctions(e, newValue, filtered) {
    handleChange(e, newValue);
    transferData(filtered);
  }

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Price range
      </Typography>
      <Slider
        value={value}
        onChange={twoFunctions}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
       // valueLabelDisplay="on"
        min={0}
        max={1000}
      />
    </div>
  );
}
