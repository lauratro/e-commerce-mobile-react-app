import React, {  useContext } from "react";
import { BrowserRouter,Link } from "react-router-dom";
import { VariablesContext } from "../context/ContextStorage";

import { useMediaQuery } from "react-responsive";


import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme)=>({

  media: {
    height: 250,
  },
  margin: {
    marginBottom: 25,
    margin:"0 auto",
    width:"90%"
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
    height: "fit-content",
    width: 300,
    [theme.breakpoints.down('md')]: {
    width:400,
    height:300
          },
  },
  cardFlexbox:{
    display: "flex", flexDirection: "row",
    margin:25,
    [theme.breakpoints.up('md')]: {
flexDirection:"column",
height:300
    },
  }
}));

export default function MediaCard() {
  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 600px)",
  });
  let {
    products,
   

    priceResult,
    
    categoryResult,
   
  } = useContext(VariablesContext);


  const classes = useStyles();
  


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
      <Grid container key={product.id} item xs={12} sm={6} md={3} className={classes.margin}>
        <Card
          key={product.id}
          className={classes.borderCard}
          xs="6"
          sm="3"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <CardActionArea className={classes.cardFlexbox}>
            <Link to={`detail/${product.id}`}>
              <CardMedia
                style={{ margin: 15, width: 80, height: 80 }}
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
                  isTabletOrMobileDevice ? { fontSize: 12 } : { fontSize: 15 }
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
