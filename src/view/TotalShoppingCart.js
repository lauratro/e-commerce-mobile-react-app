import React, { useState, useContext, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { VariablesContext } from "../context/ContextStorage";
import CheckboxMentor from "../components/CheckboxMentor";

export default function TotalShoppingCart() {
  const { docProduct, setDocProduct, priceCart, setPriceCart } =
    useContext(VariablesContext);
  const [threeProdDiscountText, setThreeProdDiscountText] = useState(false);
  let amount = 0;
  console.log("totaldoc", docProduct);

  if (priceCart.length > 0) {
    amount = priceCart.reduce((a, c) => a + c, 0);
    console.log(amount);
    let rounded = amount.toFixed(2);
    let roundedPrice = Number(rounded);
    setPriceCart(roundedPrice);
  } else {
    amount = 0;
  }

  /*  if (docProduct.length >= 3) {
    let priceThreeProd = priceCart * 0.9;
    setPriceCart(priceThreeProd);
  } */
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
