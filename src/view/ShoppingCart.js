import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

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
  const [quantityUser, setQuantityUser] = useState([]);
  const [filtered, setFiltered] = useState([]);
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
          let arrayId = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            // console.log("intern", doc.data());

            let docData = doc.data();
            let docDataProd = docData;
            let priceI = docDataProd.product.price;
            console.log("price", priceI);
            //Product id
            let idProd = docData.product.id;
            console.log("id", idProd);
            arrayId.push(idProd);
            console.log("idlist", arrayId);
            //Product Price
            arrayPrice.push(Number(docDataProd.product.price));
            //  console.log("docProd", docDataProd);
            arrayShopProd.push(docDataProd);
          });
          setDocProduct(arrayShopProd);
          setPriceCart(arrayPrice);
          setIdProductArray(arrayId);
          setQuantityUser(objectKeyValue);
          // setIdProductArray(arrayId);
          console.log("doc", docProduct);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
    uniqueProd();
  }, []);
  //Remove Product
  let removeProduct = (id, title) => {
    db.collection("shopping")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        console.log("externa", docProduct);
        let removedPro = [];

        /* removedPro = docProduct.filter((elem) => elem.product.title !== title); */
        let indexToRemove = docProduct.findIndex((elem, index) => {
          return elem.product.title === title;
        });
        console.log(indexToRemove);

        docProduct.splice(indexToRemove, 1);

        console.log(docProduct);
        setDocProduct(docProduct);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });

    console.log(docProduct);
    uniqueProd();
  };
  console.log("extern", docProduct);
  console.log("externPrice", priceCart);
  const uniqueProd = () => {
    if (docProduct) {
      var filtered = docProduct.reduce((unique, o) => {
        if (!unique.some((obj) => obj.product.title === o.product.title)) {
          unique.push(o);
        }
        return unique;
      }, []);

      console.log("filt", filtered);
      setFiltered(filtered);
    }
  };
  //Filter array to have unique object

  const refreshPage = () => {
    window.location.reload();
  };
  function twoFunctionsRemove(id, title) {
    refreshPage();
    removeProduct(id, title);
  }
  // Define quantity for each product

  //How many times there is an object in the array
  var objectKeyValue = idProductArray.reduce(function (acc, curr) {
    if (typeof acc[curr] == "undefined") {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }

    return acc;
  }, {});
  console.log("keyValue", objectKeyValue);

  console.log("varQuantity", quantityUser);
  console.log(filtered);
  if (docProduct) {
    return filtered.map((prod) => {
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

                <p>
                  {objectKeyValue[prod.product.id]} x {prod.product.price} $
                </p>

                <p>Id : {prod.product.id}</p>
                <Grid items>
                  <button
                    onClick={() =>
                      removeProduct(prod.docId, prod.product.title)
                    }
                  >
                    Remove
                  </button>

                  <Button size="small" color="primary">
                    <Link to={`detail/${prod.product.id}`}>
                      Product details
                    </Link>
                  </Button>
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
