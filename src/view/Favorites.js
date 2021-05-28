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
function Favorites() {
  const classes = useStyles();
  const db = myfirebase.firestore();
  const { user, setUser } = useContext(AuthContext);
  const {
    docProduct,
    setDocProduct,
    idProductArray,
    setIdProductArray,
    favorite,
    setFavorite,
  } = useContext(VariablesContext);
  console.log("docsfav", favorite);
  //console.log("user", user);
  // let [docProduct, setDocProduct] = useState();

  useEffect(() => {
    if (user) {
      db.collection("favorites")
        .where("uid", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          let arrayFavorites = [];

          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " fav=> ", doc.data());
            console.log("Favinter", doc.data());
            /*     db.collection("shopping").doc(doc.id).update({
              docId: doc.id,
            }); */
            let docData = doc.data();
            let docDataFav = docData;
            //Product id
            /*    let idProd = docData.product.id;
            console.log("id", idProd);
            arrayId.push(idProd); */

            //  console.log("docProd", docDataProd);
            arrayFavorites.push(docDataFav);
          });
          setFavorite(arrayFavorites);
          // setIdProductArray(arrayId);
          console.log("docFav", favorite);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, []);
  let removeProduct = (id, title) => {
    console.log("externa", favorite);
    let removedPro = [];
    removedPro = favorite.filter((elem) => elem.product.title !== title);
    setFavorite(removedPro);
    // setDocProduct(
    //  (docProduct) => docProduct.filter((elem) => elem.id !== prodid)
    // tracks = tracks.filter(currentTrack => currentTrack.id !== track.id );

    db.collection("favorites")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });

    console.log(favorite);
  };
  console.log("extern", favorite);
  if (favorite) {
    return favorite.map((prod) => {
      // console.log("title", prod.docId);
      return (
        <Page title="Favorites">
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

                  <p>{prod.product.price} $</p>
                  <p>{prod.docId}</p>
                  <Grid items>
                    <button
                      onClick={() =>
                        removeProduct(prod.docId, prod.product.title)
                      }
                    >
                      Remove
                    </button>
                    {/*   <Link to={`detail/${prod.product.id}`}>
                      <Button size="small" color="primary">
                        See More
                      </Button>
                    </Link> */}
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
        </Page>
      );
    });
  } else {
    return <p>No products selected</p>;
  }
}
export default Favorites;
