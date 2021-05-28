import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { VariablesContext } from "../context/ContextStorage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function CheckboxMentor() {
  const { docProduct, setDocProduct, priceCart, setPriceCart } =
    useContext(VariablesContext);
  const classes = useStyles();
  const [state, setState] = React.useState({
    mentor: false,
  });

  const handleChange = (event) => {
    let discount = priceCart * 0.3;
    console.log("discount", discount);
    let priceDiscountMentor = priceCart - discount;
    console.log("prezzo", priceDiscountMentor);
    if (event.target.checked) {
      setPriceCart(priceDiscountMentor);
    } else {
      priceDiscountMentor = priceCart * 1.42857142857142857;

      setPriceCart(priceDiscountMentor);
    }
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { mentor } = state;
  const error = [mentor].filter((v) => v).length !== 2;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Are you a Mentor? A good one?</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={mentor}
                onChange={handleChange}
                name="mentor"
              />
            }
            label="Mentor Discount"
          />
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
    </div>
  );
}
