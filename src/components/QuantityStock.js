/* import React, { useState, useEffect, useContext } from "react";
import myfirebase from "../firebase";
import { VariablesContext } from "../context/ContextStorage";
import { AuthContext } from "../context/AuthContext";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { Button } from "@material-ui/core";
import SingleProduct from "../view/Single-Product";

export default function QuantityStock() {
  const db = myfirebase.firestore();
  const {
    product,
    setProduct,
    allIdProductArray,
    setAllIdProductArray,
    objectQuantity,
    setObjectQuantity,
  } = useContext(VariablesContext);
  const { user, setUser } = useContext(AuthContext);
  let [buttonBuy, setButtonBuy] = useState(false);
  useEffect(() => {
    db.collection("shopping")
      .get()
      .then((querySnapshot) => {
        let arrayIdGen = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          let docDatagen = doc.data();
          let idDocGen = docDatagen.product.id;
          // console.log("idgen", idDocGen);
          arrayIdGen.push(idDocGen);
        });
        setAllIdProductArray(arrayIdGen);
        console.log("idquantity", allIdProductArray);
      })
      .then(() => {
        // setObjectQuantity(objectKeyValue);
      });
  }, []);
  //How many times
  var objectKeyValue = allIdProductArray.reduce(function (acc, curr) {
    if (typeof acc[curr] == "undefined") {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }

    return acc;
  }, {});
  console.log(objectKeyValue);
  console.log(objectQuantity);
  // console.log("arrayIdExt", allIdProductArray);

  return (
    <div>
      {/* {user ? (
        <Button
          size="small"
          color="primary"
          disabled={buttonBuy ? true : false}
        >
          <LocalMallIcon />
        </Button>
      ) : (
        <p>Log in to buy products</p>
      )} 
    </div>
  );
}
 */
