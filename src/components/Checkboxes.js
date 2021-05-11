import React from "react";
import "../styles/Checkboxes.css";
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
  const [state, setState] = React.useState({
    electronics: false,
    jewelery: false,
    men: false,
    women: false,
  });
  let products = props.products;
  console.log("check", products);
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { electronics, jewelery, men, women } = state;
  const hasCategoryFilter = Object.values(state).includes(true);
  console.log("state", hasCategoryFilter);
  const hasCategoryNameFilter = Object.keys(state).filter(function (k) {
    return state[k] == true;
  });
  /* console.log("stateKey", hasCategoryNameFilter); */
  let filterCheckbox = (products) => {
    let filtered = [];
    products.forEach((prod) => {
      if (prod.category == "men's clothing") {
        prod.category = "men";
      }
      if (prod.category == "women's clothing") {
        prod.category = "women";
      }
      if (hasCategoryNameFilter.includes(prod.category)) {
        filtered.push(prod);
      }
    });
    console.log(filtered);
  };
  filterCheckbox(products);
  const error =
    [electronics, jewelery, men, women].filter((v) => v).length !== 2;

  return (
    <div className={classes.root} className="posRelative">
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Our categories:</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={electronics}
                onChange={handleChange}
                name="electronics"
                onClick={() => {
                  filterCheckbox(products);
                }}
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
              />
            }
            label="Jewelery"
          />
          <FormControlLabel
            control={
              <Checkbox checked={men} onChange={handleChange} name="men" />
            }
            label="Men's clothing"
          />
          <FormControlLabel
            control={
              <Checkbox checked={women} onChange={handleChange} name="women" />
            }
            label="Women's clothing"
          />
        </FormGroup>
        <FormHelperText>Choose 1 or more </FormHelperText>
      </FormControl>
    </div>
  );
}
