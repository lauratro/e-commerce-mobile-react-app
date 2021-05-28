import React, { useState, useContext, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { VariablesContext } from "../context/ContextStorage";
import CheckboxMentor from "../components/CheckboxMentor";

export default function TotalShoppingCart() {
  const { docProduct, setDocProduct, priceCart, setPriceCart } =
    useContext(VariablesContext);
  let amount = 0;

  if (priceCart.length > 0) {
    amount = priceCart.reduce((a, c) => a + c, 0);
    console.log(amount);
    setPriceCart(amount);
  } else {
    amount = 0;
  }
  return (
    <div>
      <Grid container>
        <Paper>
          <p>Total Cost {priceCart} $</p>
          <CheckboxMentor />
        </Paper>
      </Grid>
    </div>
  );
}
