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
  const { docProduct, setDocProduct, idProductArray, setIdProductArray } =
    useContext(VariablesContext);

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
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());

            let docData = doc.data();

            //Product id
            let idProd = docData.product.id;

            //----KEEP BUTTON SELECTED---////
            if (idProd == id) {
              setButtonBuy(true);
            }
            //  console.log("id", idProd);
            // console.log("idpage", id);
            arrayId.push(idProd);
          });
          setIdProductArray(arrayId);
          // console.log("doc", idProductArray);
          /*    if (idProductArray) {
            console.log("idvar", id);
            console.log("prodArray", idProductArray);
            if (idProductArray.indexOf(Number(id)) !== -1) {
              console.log("funziona");
              setButtonBuy(true);
              console.log("ok", buttonBuy);
            } else {
              console.log("sbaglio");
            }
          } else {
            console.log("empty");
          } */
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
            console.log(doc.id, " spfav=> ", doc.data());

            let docData = doc.data();

            //Product id
            let idProdFav = docData.product.id;
            console.log("idfire", idProdFav);
            //----KEEP BUTTON SELECTED---////
            if (idProdFav == id) {
              setButtonFav(true);
            }
            //  console.log("id", idProd);
            // console.log("idpage", id);
            //  arrayId.push(idProd);
          });
          // setIdProductArray(arrayId);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, []);
  //console.log("afterFetch", idProductArray);
  //console.log("afterFetch", buttonBuy);

  const onClickBtn = () => {
    setButtonBuy(true);
  };
  const onClickBtnFav = () => {
    setButtonFav(true);
  };
  const handleBuy = () => {
    // setProductName(product);
    // setProductName(price);

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
  const twoFunctionsBuy = () => {
    handleBuy();
    onClickBtn();
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
                    /* user ? false : true || */ buttonBuy ? true : false
                  }
                  onClick={twoFunctionsBuy}
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
