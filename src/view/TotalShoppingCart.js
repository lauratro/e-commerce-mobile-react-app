import React, { useContext, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { VariablesContext } from "../context/ContextStorage";
import { AuthContext } from "../context/AuthContext";
import CheckboxMentor from "../components/CheckboxMentor";

export default function TotalShoppingCart() {
  const [total,setTotal] = useState(0)
  const { docProduct, priceCart } =
    useContext(VariablesContext);
    const { quantityUser } = useContext(AuthContext);

    useEffect(()=>{
 let amount = 0;

  if (priceCart.length > 0 && typeof priceCart == "object") {
    amount = priceCart.reduce((a, c) => a + c, 0);
  
    let rounded = amount.toFixed(2);
    let roundedPrice = Number(rounded);

setTotal(roundedPrice)
  } else {
    amount = 0;
    setTotal(amount)
  }
},[quantityUser,docProduct])
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
            Total Cost {total} $
         
          </p>
          <CheckboxMentor />
        </Paper>
      </Grid>
    </div>
  );
}
