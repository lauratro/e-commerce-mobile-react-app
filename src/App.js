import logo from "./logo.svg";
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import SingleProduct from "./components/Single-Product";
import MenuAppBar from "./components/App-bar";
import Electronics from "./components/Electronics";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => setIsLoading(false), 1500);
  return (
    <BrowserRouter>
      {!isLoading ? (
        <div className="App">
          <MenuAppBar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/electronics">
              <Electronics />
            </Route>
            <Route
              exact
              path="/detail/:id"
              children={<SingleProduct />}
            ></Route>
          </Switch>
        </div>
      ) : (
        <img
          className="loadingImg"
          src="https://media.giphy.com/media/jms5cdvojGlmucRn5K/giphy.gif"
        ></img>
      )}
    </BrowserRouter>
  );
}

export default App;
