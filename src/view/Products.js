import React, { useState, useContext } from "react";
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

export default function MediaCard(props) {
  let { products, setProducts, filteredProducts, setFilteredProducts } =
    useContext(VariablesContext);
console.log("MediaCard",filteredProducts)
  const classes = useStyles();
  
  // let { products } = props;
  // let { filteredProducts } = props;
  let { filteredCheckBoxData } = props;
  console.log("filProdMediaCard", filteredProducts);
 /* if (filteredProducts.length === 0) {
    filteredProducts = products;
  } */
    if (document.title === "Home | LBY") {
   filteredProducts= products
  }
  return filteredProducts.map((product) => {
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
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              ></Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Link to={`detail/${product.id}`}>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    );
  });
}
