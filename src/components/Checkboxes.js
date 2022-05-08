import React, { useState,  useContext } from "react";

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

  
    filteredProducts,
   
    categoryResult,
    setCategoryResult,
  } = useContext(VariablesContext);

  console.log("dati da filtrare Check", filteredProducts);

  const [state, setState] = React.useState({
    electronics: false,
    jewelery: false,
    men: false,
    women: false,
  });

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
 

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


  const hasCategoryNameFilter = Object.keys(state).filter(function (k) {
    return state[k] === true;
  });

 

  for (var key in hasCategoryNameFilter) {
    if (hasCategoryNameFilter[key] == "men") {
      hasCategoryNameFilter[key] = `men's clothing`;
    } else if (hasCategoryNameFilter[key] == "women") {
      hasCategoryNameFilter[key] = `women's clothing`;
    }
  }
  categoryResult = Object.values(hasCategoryNameFilter);


 



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
