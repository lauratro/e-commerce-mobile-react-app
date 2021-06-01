import React, { useState, useContext } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { VariablesContext } from "../context/ContextStorage";
import { AuthContext } from "../context/AuthContext";
import { useMediaQuery } from "react-responsive";

import myfirebase from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import MediaQueries from "../styles/MediaQueries";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles({
  root: {
    width: 300,
  },
  height: {
    height: "fit-content",
  },
  media: {
    height: 250,
  },
  margin: {
    marginBottom: 25,
  },
  fontSize: {
    fontSize: 12,
  },
  seeMore: {
    fontFamily: "Montserrat",
    color: "rgb(0,100,0)",
    fontWeight: "bold",
    "&:hover": {
      color: "rgb(144,238,144)",
    },
  },
  borderCard: {
    borderStyle: "5px solid black",
  },
});

export default function MediaCard() {
  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 600px)",
  });
  let {
    products,
    setProducts,

    priceResult,
    setPriceResult,
    categoryResult,
    setCategoryResult,
  } = useContext(VariablesContext);
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
  } = useContext(AuthContext);
  const classes = useStyles();
  //Button Buy

  //End Button Buy
  // console.log("MediaCardProduct", products);
  // console.log("filProdMediaCard", filteredProducts);
  // console.log("mediaCategResu", categoryResult);
  // console.log("mediaPrice", priceResult);
  let [filtered, setfiltered] = useState([]);

  //Filters Home page
  if (
    categoryResult.length == 0 &&
    priceResult.length === 0 &&
    document.title == "Home | LBY"
  ) {
    let result = products.filter((p) => {
      return p;
    });
    products = result;
  }
  if (categoryResult.length > 0 && priceResult.length === 0) {
    let result = products.filter((p) => {
      if (categoryResult.includes(p.category)) {
        return p;
      }
    });
    products = result;
  } else if (categoryResult.length === 0 && priceResult.length > 0) {
    let result = products.filter((p) => {
      if (priceResult.includes(p.price)) {
        return p;
      }
    });
    products = result;
  } else if (categoryResult.length > 0 && priceResult.length > 0) {
    let result = products.filter((p) => {
      if (
        priceResult.includes(p.price) &&
        categoryResult.includes(p.category)
      ) {
        return p;
      }
    });
    products = result;
  }
  return products.map((product) => {
    return (
      <Grid item xs={12} sm={6} md={4} className={classes.margin}>
        <Card
          key={product.id}
          className={classes.root}
          className={classes.height}
          className={classes.borderCard}
          xs="6"
          sm="3"
        >
          <CardActionArea>
            <Link to={`detail/${product.id}`}>
              <CardMedia
                style={{ margin: 15 }}
                className={classes.media}
                image={product.image}
                title={product.title}
              />
            </Link>
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                component="h4"
                style={
                  isTabletOrMobileDevice ? { fontSize: 15 } : { fontSize: 20 }
                }
              >
                {product.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {product.category}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                ` {product.price} $`
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              ></Typography>
            </CardContent>
          </CardActionArea>
          <CardActions style={{ justifyContent: "center" }}>
            <Button size="small" color="primary" className={classes.seeMore}>
              <Link to={`detail/${product.id}`} className={classes.seeMore}>
                See More
              </Link>
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  });
}
