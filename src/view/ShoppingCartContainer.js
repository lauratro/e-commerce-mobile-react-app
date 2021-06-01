import React, { useContext } from "react";
import ShoppingCart from "./ShoppingCart";
import TotalShoppingCart from "./TotalShoppingCart";
import { VariablesContext } from "../context/ContextStorage";
import IsLoadingData from "../components/IsLoadingData";

export default function ShoppingCartContainer() {
  const { docProduct, setDocProduct } = useContext(VariablesContext);

  return (
    <div>
      <ShoppingCart />
      {docProduct ? <TotalShoppingCart /> : <IsLoadingData />}
    </div>
  );
}
