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
  //  const [priceItem, setPriceItem] = useState([]);
  // const [priceTotal, setPriceTotal] = useState();
  const [quantityUser, setQuantityUser] = useState(null);
  const [filtered, setFiltered] = useState([]);

  console.log("OutshoppingCartProd", docProduct);
  useEffect(() => {
    console.log("totdoc pre filter", docProduct);
    let arrayShopProd = [];
    if (user) {
      db.collection("shopping")
        .where("uid", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          let arrayPrice = [];
          let arrayId = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //   console.log(doc.id, " => ", doc.data());
            // console.log("intern", doc.data());

            let docData = doc.data();
            let docDataProd = docData;
            let priceProd = docDataProd.product.price;
            //   console.log("price", priceI);
            //Product id
            let idProd = docData.product.id;
            //  console.log("id", idProd);
            arrayId.push(idProd);
            //  console.log("idlist", arrayId);
            //Product Price
            arrayPrice.push(Number(priceProd));

            arrayShopProd.push(docData);
          });
          console.log("docData", arrayShopProd);
          setDocProduct(arrayShopProd);
          setPriceCart(arrayPrice);
          setIdProductArray(arrayId);
          console.log("doc", docProduct);
          // setIdProductArray(arrayId);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, []);
  useEffect(() => {
    //Object with quantity
    var objectKeyValue = idProductArray.reduce(function (acc, curr) {
      if (typeof acc[curr] == "undefined") {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }

      return acc;
    }, {});
    setQuantityUser(objectKeyValue);
    console.log("quantity", objectKeyValue);
  }, [idProductArray]);

  useEffect(() => {
    if (docProduct) {
      var filteredA = docProduct.reduce((unique, o) => {
        if (!unique.some((obj) => obj.product.title === o.product.title)) {
          unique.push(o);
        }
        return unique;
      }, []);

      console.log("filt", filteredA);
      setFiltered(filteredA);
    }
  }, [docProduct]);
  //Remove Product
  useEffect(() => {
    removeProductFirebase();
  }, [idProductArray]);

  let removeProductFirebase = (id, title, prodId) => {
    db.collection("shopping")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        console.log(id);
      })
      .then(() => {
        //  console.log("externa", docProduct);
        let removedPro = [];

        /* removedPro = docProduct.filter((elem) => elem.product.title !== title); */
        let indexToRemove = docProduct.findIndex((elem, index) => {
          return elem.product.title === title;
        });
        console.log("index", indexToRemove);
        docProduct.splice(indexToRemove, 1);
        console.log("docP", docProduct);
        setDocProduct(docProduct);

        // console.log("id", prodId);
        if (quantityUser) {
          if (quantityUser.hasOwnProperty(prodId)) {
            setQuantityUser({
              ...quantityUser,
              [prodId]: (quantityUser[prodId] -= 1),
            });
          }
        }
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };
  console.log("shoppingCartProd", docProduct);

  /*  let removeProductContext = (title, prodId) => {
      let indexToRemove = docProduct.findIndex((elem, index) => {
        return elem.product.title === title;
      });
      console.log("index", indexToRemove);
      docProduct.splice(indexToRemove, 1);
      console.log("docP", docProduct);
      setDocProduct(docProduct);

      // console.log("id", prodId);
      if (quantityUser) {
        if (quantityUser.hasOwnProperty(prodId)) {
          setQuantityUser({
            ...quantityUser,
            [prodId]: (quantityUser[prodId] -= 1),
          });
        }
      }
    };
  };
  removeProductContext(); */
  // console.log("extern", docProduct);
  // console.log("externPrice", priceCart);

  //Filter array to have unique object

  const refreshPage = () => {
    window.location.reload();
  };
  function twoFunctionsRemove(id, title, prodId) {
    removeProductFirebase(id, title, prodId);
    // removeProductContext(title, prodId);
    refreshPage();
  }
  // Define quantity for each product

  //How many times there is an object in the array

  // console.log("keyValue", objectKeyValue);

  console.log("quantity", quantityUser);
  console.log("filtered", filtered);
  if (docProduct && quantityUser) {
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
                  {quantityUser[prod.product.id]} x {prod.product.price} $
                </p>

                <p>Id : {prod.product.id}</p>
                <Grid items>
                  <button
                    onClick={() => {
                      twoFunctionsRemove(
                        prod.docId,
                        prod.product.title,
                        prod.product.id
                      );
                    }}
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
