import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { VariablesContext } from "../context/ContextStorage";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
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
    height: 140,
  },
  margin: {
    marginBottom: 5,
  },
  fontSize: {
    fontSize: 12,
  },
});

export default function MediaCard() {
  let {
    products,
    setProducts,
    filteredProducts,
    setFilteredProducts,
    priceResult,
    setPriceResult,
    categoryResult,
    setCategoryResult,
  } = useContext(VariablesContext);

  const classes = useStyles();
  console.log("MediaCardProduct", products);
  console.log("filProdMediaCard", filteredProducts);
  console.log("mediaCategResu", categoryResult);
  console.log("mediaPrice", priceResult);
  let [filtered, setfiltered] = useState([]);
  //Filters Home page
  if (categoryResult.length == 0 && priceResult.length === 0) {
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
      <Grid item xs={12} sm={3}>
        <Card
          key={product.id}
          className={classes.root}
          className={classes.margin}
          className={classes.height}
          xs="6"
          sm="3"
        >
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={product.image}
              title={product.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
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
          <CardActions>
            <Link to={`detail/${product.id}`}>
              <Button size="small" color="primary">
                See More
              </Button>
            </Link>
            <Button size="small" color="primary">
              Buy
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  });
}
