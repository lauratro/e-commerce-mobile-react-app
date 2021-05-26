import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import myfirebase from "../firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
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
  const {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    name,
    setName,
    productName,
    setProductName,
    productPrice,
    setProductPrice,
  } = useContext(AuthContext);
  // console.log("name", productName);
  let { id } = useParams();
  let [product, setProduct] = useState();
  const classes = useStyles();

  useEffect(() => {
    const fetchData = () => {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((json) => setProduct(json));
    };
    fetchData();
  }, []);

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
          console.log(doc);
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
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>{product.description}</Paper>
            </Grid>

            <Button
              size="small"
              color="primary"
              disabled={user ? false : true}
              onClick={handleBuy}
            >
              Buy
            </Button>
          </Grid>
        </div>
      )}
    </div>
  );
}
export default SingleProduct;
