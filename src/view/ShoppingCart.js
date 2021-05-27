import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
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
function ShoppingCart() {
  const classes = useStyles();
  const db = myfirebase.firestore();
  const { user, setUser } = useContext(AuthContext);
  const { docProduct, setDocProduct, idProductArray, setIdProductArray } =
    useContext(VariablesContext);
  // let [docProduct, setDocProduct] = useState();
  let removeProduct = (id, name) => {
    setDocProduct((docProduct) =>
      docProduct.filter((elem) => elem.title !== name)
    );
    db.collection("shopping")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });

    console.log(docProduct);
  };
  useEffect(() => {
    if (user) {
      db.collection("shopping")
        .where("uid", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          let arrayShopProd = [];
          //let arrayId = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            // console.log("intern", doc.data());
            /*     db.collection("shopping").doc(doc.id).update({
              docId: doc.id,
            }); */
            let docData = doc.data();
            let docDataProd = docData;
            //Product id
            /*    let idProd = docData.product.id;
            console.log("id", idProd);
            arrayId.push(idProd); */

            //  console.log("docProd", docDataProd);
            arrayShopProd.push(docDataProd);
          });
          setDocProduct(arrayShopProd);
          // setIdProductArray(arrayId);
          console.log("doc", docProduct);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, []);

  console.log("extern", idProductArray);
  if (docProduct) {
    return docProduct.map((prod) => {
      // console.log("title", prod.docId);
      return (
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

                <button onClick={() => removeProduct(prod.docId, prod.title)}>
                  Remove
                </button>
              </Grid>
            </Grid>
          </Paper>
        </div>
      );
    });
  } else {
    return <p>No products selected</p>;
  }
}
export default ShoppingCart;
