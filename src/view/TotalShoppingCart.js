import React, { useContext } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { VariablesContext } from "../context/ContextStorage";
import CheckboxMentor from "../components/CheckboxMentor";

export default function TotalShoppingCart() {
  const { docProduct, priceCart, setPriceCart } =
    useContext(VariablesContext);

  let amount = 0;
  console.log("totaldoc", docProduct);

  if (priceCart.length > 0) {
    amount = priceCart.reduce((a, c) => a + c, 0);
  
    let rounded = amount.toFixed(2);
    let roundedPrice = Number(rounded);
    setPriceCart(roundedPrice);
  } else {
    amount = 0;
  }

  return (
    <div display="flex">
      <Grid
        container
        style={{
          justifyContent: "center",

          margin: "0 auto",

          width: "90%",
        }}
      >
        <Paper xs={12} style={{ marginTop: 15 }}>
          <p style={{ backgroundColor: "lightgreen" }}>
            Total Cost {priceCart} $
          </p>
          <CheckboxMentor />
        </Paper>
      </Grid>
    </div>
  );
}
