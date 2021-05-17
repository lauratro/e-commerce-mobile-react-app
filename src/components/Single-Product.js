import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

function SingleProduct(props) {
  let { id } = useParams();
  let [product, setProduct] = useState({});
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((json) => setProduct(json));
  console.log(product);
  return (
    <div>
      <p>{id}</p>
      <p>{product.title}</p>
      <p>{product.description}</p>
      <img src={product.image} alt="product image" />
    </div>
  );
}
export default SingleProduct;
