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
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 10,
    padding: 10,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  image: {
    maxWidth: 300,
    height: 300,
    margin: 15,
  },
}));
function Favorites() {
  const isTabletOrMobileDeviceLandscape = useMediaQuery({
    query: "(min-device-width: 600px)",
  });
  const isTabletOrMobileDeviceVertical = useMediaQuery({
    query: "(max-device-width: 550px)",
  });
  const TextTitleProd = styled.h2`
    @media (min-width: 600px) {
      width: 70%;
      margin: 0 auto;
      font-size: 15px;
    }
    @media (max-width: 559px) {
      font-weigth: bold;
      font-size: 12px;
      margin: 5px;
    }
  `;
  const Category = styled.h2`
    @media (max-width: 559px) {
      font-weigth: bold;
      font-size: 12px;
      margin: 5px;
    }
    font-size: 15px;
  `;
  const ImgProd = styled.img`
    @media (min-width: 600px) {
      width: 120px;
      height: 120px;
    }
    @media (max-width: 600px) {
      width: 120px;
      height: 120px;
      font-style: italic;
    }
  `;
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
    // console.log("externa", favorite);
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
  // console.log("extern", favorite);
  if (favorite) {
    return favorite.map((prod) => {
      // console.log("title", prod.docId);
      return (
        <Page title="Favorites">
          <div className={classes.root} name={prod.title}>
            <Paper
              className={classes.paper}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              xs={12}
              sm={6}
              justifyContent="space-between"
            >
              <Grid items>
                <ImgProd
                  src={prod.product.image}
                  alt="picture"
                  className={classes.image}
                />
              </Grid>
              <Grid
                items
                md={6}

                // style={isTabletOrMobileDeviceVertical && { maxWidth: "50%" }}
              >
                <TextTitleProd>{prod.product.title}</TextTitleProd>

                <p>{prod.product.price} $</p>
                <Category>Category: {prod.product.category}</Category>
              </Grid>

              <Grid items>
                <button
                  alignItems="flex-start"
                  onClick={() => removeProduct(prod.docId, prod.product.title)}
                >
                  Remove
                </button>
                {/*   <Link to={`detail/${prod.product.id}`}>
                      <Button size="small" color="primary">
                        See More
                      </Button>
                    </Link> */}
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
