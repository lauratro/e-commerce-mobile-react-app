import React from "react";
import ShoppingCart from "./ShoppingCart";
import TotalShoppingCart from "./TotalShoppingCart";

export default function ShoppingCartContainer() {
  return (
    <div>
      <ShoppingCart />
      <TotalShoppingCart />
    </div>
  );
}
