import React from "react";
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
  const classes = useStyles();
  const [value, setValue] = React.useState([0, 1000]);
  let products = props.products;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log("value", value[0]);
  let sliderFilter = (products) => {
    let filtered = [];
    products.forEach((prod) => {
      if (
        Number(value[0]) <= Number(prod.price) &&
        Number(value[1]) >= Number(prod.price)
      ) {
        filtered.push(prod);
      }
    });
    console.log("slider", filtered);
  };
  sliderFilter(products);
  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Price range
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
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
