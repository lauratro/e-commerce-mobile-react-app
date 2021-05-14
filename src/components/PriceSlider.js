import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

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

export default function RangeSlider(props) {
  console.log("funct", props.filterData);
  const classes = useStyles();
  const [value, setValue] = React.useState([0, 1000]);
  let [filtered, setFiltered] = useState([]);
  let products = props.products;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log("value", value[0]);
  let sliderFilter = () => {
    let filteredData = [];
    products.forEach((prod) => {
      if (
        Number(value[0]) <= Number(prod.price) &&
        Number(value[1]) >= Number(prod.price)
      ) {
        filteredData.push(prod);
      }
    });

    filtered = filteredData;
    return filtered;
  };
  filtered = sliderFilter();
  console.log("filterout", filtered);
  function transferData(array) {
    array = sliderFilter();
    props.filterData(array);
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
        valueLabelDisplay="on"
        min={0}
        max={1000}
      />
    </div>
  );
}