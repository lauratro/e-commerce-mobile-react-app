import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { VariablesContext } from "../context/ContextStorage";
import Page from "../components/PageTitle";
import { auth } from "../firebase";
import myfirebase from "../firebase";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import QuantityStock from "../components/QuantityStock";
import { handleBuy } from "../components/QuantityStock";

import { TextField, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  media: {
    width: "50%",
    margin: "0 auto",
  },
  fontBold: {
    fontWeight: "bold",
  },
}));

function SingleProduct(props) {
  const db = myfirebase.firestore();
  const { user, setUser } = useContext(AuthContext);
  const {
    docProduct,
    setDocProduct,
    idProductArray,
    setIdProductArray,
    objectQuantity,
    setObjectQuantity,
    allIdProductArray,
    setAllIdProductArray,
  } = useContext(VariablesContext);
  console.log("spobj", objectQuantity);
  let { id } = useParams();
  let [product, setProduct] = useState();
  let [buttonBuy, setButtonBuy] = useState(false);
  let [buttonFav, setButtonFav] = useState(false);

  const classes = useStyles();
  // console.log("array", docProduct);
  useEffect(() => {
    const fetchData = () => {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((json) => setProduct(json));
    };
    fetchData();

    if (user) {
      db.collection("shopping")
        .where("uid", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          let arrayId = [];
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());

            let docData = doc.data();

            //Product id
            let idProd = docData.product.id;

            arrayId.push(idProd);
          });
          setIdProductArray(arrayId);
          // console.log("doc", idProductArray);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
    if (user) {
      db.collection("favorites")
        .where("uid", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          let arrayId = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " spfav=> ", doc.data());

            let docData = doc.data();

            //Product id
            let idProdFav = docData.product.id;

            //----KEEP BUTTON SELECTED---////
            if (idProdFav == id) {
              setButtonFav(true);
            }
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
    //Quantity
  }, []);
  //console.log("afterFetch", idProductArray);
  //console.log("afterFetch", buttonBuy);
  var objectKeyValue = allIdProductArray.reduce(function (acc, curr) {
    if (typeof acc[curr] == "undefined") {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }

    return acc;
  }, {});
  console.log("kv", objectKeyValue);
  console.log(objectQuantity);

  const onClickBtnFav = () => {
    setButtonFav(true);
  };

  const handleFavorites = () => {
    console.log(user);
    if (user) {
      db.collection("favorites")
        .add({
          product: product,
          uid: user.uid,
        })
        .then((doc) => {
          console.log("newfav", doc.id);
          db.collection("favorites").doc(doc.id).update({
            docId: doc.id,
          });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
  };
  const refreshData = () => {
    // console.log("externa", allIdProductArray);
    db.collection("shopping")
      .get()
      .then((querySnapshot) => {
        let arrayIdGen = [];
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          let docDatagen = doc.data();
          console.log(docDatagen);
          let idDocGen = docDatagen.product.id;
          console.log("idgen", idDocGen);

          /* if (objectKeyValue) {
            if (objectKeyValue[idDocGen] >= 3) {
              setButtonBuy(true);
            }
          } */

          arrayIdGen.push(idDocGen);
        });
        setAllIdProductArray(arrayIdGen);
        console.log("idquantity", allIdProductArray);
        setObjectQuantity(objectKeyValue);
      });
  };
  const handleBuy = () => {
    console.log(user);
    if (user) {
      db.collection("shopping")
        .add({
          product: product,
          uid: user.uid,
        })
        .then((doc) => {
          console.log("new", doc.id);
          db.collection("shopping").doc(doc.id).update({
            docId: doc.id,
          });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
    db.collection("shopping")
      .get()
      .then((querySnapshot) => {
        let arrayIdGen = [];
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          let docDatagen = doc.data();
          console.log(docDatagen);
          let idDocGen = docDatagen.product.id;
          console.log("idgen", idDocGen);

          /* if (objectKeyValue) {
            if (objectKeyValue[idDocGen] >= 3) {
              setButtonBuy(true);
            }
          } */

          arrayIdGen.push(idDocGen);
        });
        setAllIdProductArray(arrayIdGen);
        console.log("idquantity", allIdProductArray);
        setObjectQuantity(objectKeyValue);
      });
  };
  const twoFunctionsBuy = () => {
    handleBuy();
    //refreshData();
  };
  const twoFunctionsFavorites = () => {
    handleFavorites();
    onClickBtnFav();
  };
  return (
    // <Page title={product.title}>
    <div>
      {product && (
        <div className={classes.root}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12}>
              <Paper className={classes.paper} className={classes.fontBold}>
                {product.title}
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <img
                className={classes.media}
                src={product.image}
                alt={product.title}
              />
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>Price: {product.price}$</Paper>
              <Paper className={classes.paper}>
                Category: {product.category}
              </Paper>
              {user ? (
                <Button
                  size="small"
                  color="primary"
                  disabled={
                    /* buttonBuy ? true : false */ objectKeyValue[product.id] >=
                      2 && true
                  }
                  onClick={handleBuy}
                >
                  <LocalMallIcon />
                </Button>
              ) : (
                <p>Log in to buy products</p>
              )}

              <Button
                size="small"
                color="primary"
                disabled={buttonFav ? true : false}
                onClick={twoFunctionsFavorites}
              >
                {buttonFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </Button>
              {objectQuantity[product.id] >= 2 && <p>Sold out</p>}
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>{product.description}</Paper>
            </Grid>
          </Grid>
        </div>
      )}
    </div>

    //</Page>
  );
}
export default SingleProduct;
