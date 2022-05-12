import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { VariablesContext } from "../context/ContextStorage";

import myfirebase from "../firebase";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import { useMediaQuery } from "react-responsive";

import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "relative",
    top: 100,
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
  fontBoldTitle: {
    fontWeight: "bold",
    margin: 10,
    paddingBottom: 10,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function SingleProduct(props) {
  const isTabletOrMobileDeviceVertical = useMediaQuery({
    query: "(max-device-width: 540px)",
  });
  const isTabletOrMobileDeviceLandscape = useMediaQuery({
    query: "(max-device-width: 700px)",
  });

  const db = myfirebase.firestore();
  const { user, setUser } = useContext(AuthContext);
  const {
    objectQuantity,
    setObjectQuantity,
    allIdProductArray,
  } = useContext(VariablesContext);

  let { id } = useParams();
  let [product, setProduct] = useState();

  let [buttonFav, setButtonFav] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    const fetchData = () => {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((json) => setProduct(json));
    };
    fetchData();

    //Favorites
    if (user) {
      db.collection("favorites")
        .where("uid", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
       

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
  }, []);

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
         
          db.collection("favorites").doc(doc.id).update({
            docId: doc.id,
          });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
  };

  const twoFunctionsFavorites = () => {
    handleFavorites();
    onClickBtnFav();
  };
  // -------------------------------------End Favorites-------------------------------


  useEffect(() => {
  
    console.log("checking shoppingcart");
    db.collection("shopping")
      .get()
      .then((querySnapshot) => {
        let arrayIdGen = [];
        querySnapshot.forEach((doc) => {
     
          let docDatagen = doc.data();
   
          let idDocGen = docDatagen.product.id;
       

          arrayIdGen.push(idDocGen);
        });
       
        console.log("idquantity", allIdProductArray);
        // Define how many time a object is repeated
        var objectKeyValue = arrayIdGen.reduce(function (acc, curr) {
          if (typeof acc[curr] == "undefined") {
            acc[curr] = 1;
          } else {
            acc[curr] += 1;
          }

          return acc;
        }, {});
        setObjectQuantity(objectKeyValue);
      });
  }, []);

  //Add product to Shopping Collection Firebase
  const handleBuy = () => {

    if (user) {
      db.collection("shopping")
        .add({
          product: product,
          uid: user.uid,
        })
        .then((doc) => {
        
          db.collection("shopping")
            .doc(doc.id)
            .update({
              docId: doc.id,
            })
            .then(() => {
             

              if (objectQuantity) {
                if (objectQuantity.hasOwnProperty(product.id)) {
                  setObjectQuantity({
                    ...objectQuantity,
                    [product.id]: (objectQuantity[product.id] += 1),
                  });
                } else {
                  setObjectQuantity({
                    ...objectQuantity,
                    [product.id]: 1,
                  });
                }
              }

         
            });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
  };

  return (

    <div>
      {product && (
        <div className={classes.root}>
          <Grid
            container
            spacing={3}
            alignItems="center"
            style={
              isTabletOrMobileDeviceVertical
                ? { flexDirection: "column" }
                : { flexDirection: "row" }
            }
          >
            <Grid item xs={12} sm={6}>
              <Paper
             
                className={classes.fontBoldTitle}
              >
                {product.title}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img
                className={classes.media}
                src={product.image}
                alt={product.title}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <div
                style={
                  isTabletOrMobileDeviceVertical
                    ? { display: "flex", flexDirection: "column" }
                    : {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }
                }
              >
                <Paper className={classes.paper} md={6}>
                  Price: {product.price}$
                </Paper>
                <Paper className={classes.paper} md={6}>
                  Category: {product.category}
                </Paper>
              </div>
              <Paper className={classes.paper}>Id: {product.id}</Paper>
              {user ? (
                <div>
                  <Button
                    style={{ marginTop: 5 }}
                    size="small"
                    color="primary"
                    disabled={
                      /* buttonBuy ? true : false */ objectQuantity[
                        product.id
                      ] >= 3 && true
                    }
                    onClick={handleBuy}
                  >
                    <LocalMallIcon />
                  </Button>
                  <Button
                    style={{ marginTop: 5 }}
                    size="small"
                    color="primary"
                    disabled={buttonFav ? true : false}
                    onClick={twoFunctionsFavorites}
                  >
                    {buttonFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </Button>
                </div>
              ) : (
                <p
                  style={{
                    width: "70%",
                    margin: "0 auto",
                    fontWeight: "bold",
                    padding: 10,
                  }}
                >
                  Log in to buy products and select your favorite ones
                </p>
              )}

              {objectQuantity[product.id] >= 3 && <p>Sold out</p>}
              {objectQuantity.length > 0 && <p>There is value</p>}
              {!objectQuantity && <p>no value</p>}
            </Grid>
            <Grid item xs={12}>
              <Paper
                className={classes.paper}
                style={{ textAlign: "justify", margin: 10 }}
              >
                {product.description}
              </Paper>
            </Grid>
          </Grid>
        </div>
      )}
    </div>

    //</Page>
  );
}
export default SingleProduct;
