import React, { useState } from "react";
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
  let { id } = useParams();
  let [product, setProduct] = useState({});
  const classes = useStyles();
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((json) => setProduct(json));

  return (
    <div>
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
        </Grid>
      </div>
    </div>
  );
}
export default SingleProduct;
