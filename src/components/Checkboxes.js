import React, { useState, useEffect, useContext } from "react";
import "../styles/Checkboxes.css";
import {VariablesContext} from "../context/ContextStorage"
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
  let {products, setProducts, isLoading, setIsLoading, filteredProducts, setFilteredProducts}= useContext(VariablesContext)
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
  console.log("checkfilPro",filteredProducts)
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { electronics, jewelery, men, women } = state;
  const hasCategoryFilter = Object.values(state).includes(true);
  console.log("state", hasCategoryFilter);
  const hasCategoryNameFilter = Object.keys(state).filter(function (k) {
    return state[k] === true;
  });
  console.log("stateKey", hasCategoryNameFilter);
 
  /* const error =
    [electronics, jewelery, men, women].filter((v) => v).length !== 2; */
  let checkfilterData=(data)=>{
    setFilteredProducts(data)
  }
  let filterCheckbox = () => {
  /*   if (filteredProducts.length === 0) {
      filteredProducts = products
    } */
    let filteredCheckResult = [];
    products.forEach((prod) => {
    
      if (prod.category === "men's clothing") {
        prod.category = "men";
      } else if (prod.category === "women's clothing") {
        prod.category = "women";
      }
      if (hasCategoryNameFilter.includes(prod.category)) {
      //filteredCheckResult.push(prod)
        checkfilterData(prod)
     }
   
     filtered = filteredCheckResult
     return filteredProducts;
   });
    
  };
  filterCheckbox()
  console.log("checkbox", filteredProducts);

  function filterData(data) {
    setFilteredProducts(data)
  }
  function transferDataCheck(array) {
    array = filtered;
  filterData(array);
  }

  function twoFunctions(e) {
    handleChange(e);
 //   transferDataCheck(filtered);
  }
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Our categories:</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={electronics}
                onChange={twoFunctions}
                name="electronics"
              />
            }
            label="Electronics"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={jewelery}
                onChange={twoFunctions}
                name="jewelery"
              />
            }
            label="Jewelery"
          />
          <FormControlLabel
            control={
              <Checkbox checked={men} onChange={twoFunctions} name="men" />
            }
            label="Men's clothing"
          />
          <FormControlLabel
            control={
              <Checkbox checked={women} onChange={twoFunctions} name="women" />
            }
            label="Women's clothing"
          />
        </FormGroup>
        <FormHelperText>Choose 1 or more </FormHelperText>
      </FormControl>
    </div>
  );
}
