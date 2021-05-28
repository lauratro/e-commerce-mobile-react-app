import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import TotalShoppingCart from "../view/TotalShoppingCart";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Page from "../components/PageTitle";
import { Button } from "@material-ui/core";
import { VariablesContext } from "../context/ContextStorage";
import { auth } from "../firebase";
import myfirebase from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  image: {
    maxWidth: 300,
    height: 300,
  },
}));
function ShoppingCart() {
  const classes = useStyles();
  const db = myfirebase.firestore();
  const { user, setUser } = useContext(AuthContext);
  const {
    docProduct,
    setDocProduct,
    idProductArray,
    setIdProductArray,
    priceCart,
    setPriceCart,
  } = useContext(VariablesContext);
  const [priceItem, setPriceItem] = useState([]);
  const [priceTotal, setPriceTotal] = useState();
  console.log("docsho", docProduct);
  console.log("user", user);
  // let [docProduct, setDocProduct] = useState();

  useEffect(() => {
    if (user) {
      db.collection("shopping")
        .where("uid", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          let arrayShopProd = [];
          let arrayPrice = [];
          //let arrayId = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            // console.log("intern", doc.data());
            /*     db.collection("shopping").doc(doc.id).update({
              docId: doc.id,
            }); */
            let docData = doc.data();
            let docDataProd = docData;
            let priceI = docDataProd.product.price;
            console.log("price", priceI);
            //Product id
            /*    let idProd = docData.product.id;
            console.log("id", idProd);
            arrayId.push(idProd); */
            //Product Price
            arrayPrice.push(Number(docDataProd.product.price));
            //  console.log("docProd", docDataProd);
            arrayShopProd.push(docDataProd);
          });
          setDocProduct(arrayShopProd);
          setPriceCart(arrayPrice);
          // setIdProductArray(arrayId);
          console.log("doc", docProduct);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, []);
  let removeProduct = (id, title) => {
    console.log("externa", docProduct);
    let removedPro = [];
    removedPro = docProduct.filter((elem) => elem.product.title !== title);
    setDocProduct(removedPro);

    db.collection("shopping")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });

    console.log(docProduct);
  };
  console.log("extern", docProduct);
  console.log("externPrice", priceCart);
  // Total Price
  // let sum = 0;
  // sum = priceItem.reduce((a, c) => a + c);
  // setPriceTotal(sum);
  if (docProduct) {
    return docProduct.map((prod) => {
      // console.log("title", prod.docId);
      return (
        <div className={classes.root} name={prod.title}>
          <Paper className={classes.paper}>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <img
                src={prod.product.image}
                alt="picture"
                className={classes.image}
              />
              <Grid items>
                <p>{prod.product.title}</p>

                <p>{prod.product.price} $</p>
                <p>{prod.docId}</p>
                <Grid items>
                  <button
                    onClick={() =>
                      removeProduct(prod.docId, prod.product.title)
                    }
                  >
                    Remove
                  </button>
                  {/*   <Link to={`detail/${prod.product.id}`}>
                      <Button size="small" color="primary">
                        See More
                      </Button>
                    </Link> */}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      );
    });
  } else {
    return <p>No products selected</p>;
  }
}
export default ShoppingCart;
