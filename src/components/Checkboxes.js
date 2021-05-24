import React, { useState, useEffect, useContext } from "react";

import "../styles/Checkboxes.css";
import { VariablesContext } from "../context/ContextStorage";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function CheckboxesGroup(props) {
  const classes = useStyles();
  let {
    products,
    setProducts,
    isLoading,
    setIsLoading,
    filteredProducts,
    setFilteredProducts,
    categoryResult,
    setCategoryResult,
  } = useContext(VariablesContext);
  // let { filteredProducts } = props;
  console.log("dati da filtrare Check", filteredProducts);
  let [filtered, setFiltered] = useState([]);
  const [state, setState] = React.useState({
    electronics: false,
    jewelery: false,
    men: false,
    women: false,
  });

  console.log("checkprod", products);
  console.log("checkfilPro", filteredProducts);
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    // console.log(event.target.value);

    if (event.target.checked) {
      setCategoryResult([...categoryResult, event.target.value]);
    } else {
      setCategoryResult(
        categoryResult.filter((category) => category !== event.target.value)
      );
    }
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const changeHandler = () => {
    setChecked(!checked);
  };

  const { electronics, jewelery, men, women } = state;
  const hasCategoryFilter = Object.values(state).includes(true);
  // console.log("state", hasCategoryFilter);
  const hasCategoryNameFilter = Object.keys(state).filter(function (k) {
    return state[k] === true;
  });

  // console.log("stateKey", hasCategoryNameFilter);

  for (var key in hasCategoryNameFilter) {
    if (hasCategoryNameFilter[key] == "men") {
      hasCategoryNameFilter[key] = `men's clothing`;
    } else if (hasCategoryNameFilter[key] == "women") {
      hasCategoryNameFilter[key] = `women's clothing`;
    }
  }
  categoryResult = Object.values(hasCategoryNameFilter);
  //console.log("categoryResult", categoryResult);

  /* const error =
    [electronics, jewelery, men, women].filter((v) => v).length !== 2;
  let checkfilterData = (prod) => {
    setCategoryResult((data) => [...data, data.push(prod)]);
  };
  function assignCatValue(data) {
    setCategoryResult(data);
  }
   let filterCheckbox = () => {
       if (filteredProducts.length === 0) {
      filteredProducts = products
    } 
    let filteredCheckResult = [];
    products.forEach((prod) => {
      if (prod.category === "men's clothing") {
        prod.category = "men";
      } else if (prod.category === "women's clothing") {
        prod.category = "women";
      }
      if (hasCategoryNameFilter.includes(prod.category)) {
        filteredCheckResult.push(prod);
        //  setCategoryResult(prod);
        //  categoryResult.push(prod);
        // checkfilterData(prod);
      }
      console.log(filteredCheckResult);
    });
    console.log("result", filteredCheckResult);
    categoryResult = filteredCheckResult;
    return categoryResult;
  };
  filterCheckbox();
  console.log("checkbox", categoryResult);

  function filterData(data) {
    setCategoryResult(data);
  }
  function transferDataCheck(array) {
    array = filterCheckbox();
    filterData(array);
  }
  function directDataCat() {
    setCategoryResult(categoryResult);
  }*/
  function assignCat() {
    setCategoryResult(categoryResult);
  }
  function twoFunctions(e) {
    handleChange(e);
    assignCat();
  }
  /*   function assignCat() {
    setCategoryResult(arrayCat);
  } */

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Our categories:</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={electronics}
                onChange={handleChange}
                name="electronics"
                value="electronics"
              />
            }
            label="Electronics"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={jewelery}
                onChange={handleChange}
                name="jewelery"
                value="jewelery"
              />
            }
            label="Jewelery"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={men}
                onChange={handleChange}
                name="men"
                value="men's clothing"
              />
            }
            label="Men's clothing"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={women}
                onChange={handleChange}
                name="women"
                value="women's clothing"
              />
            }
            label="Women's clothing"
          />
        </FormGroup>
        <FormHelperText>Choose 1 or more </FormHelperText>
      </FormControl>
    </div>
  );
}
