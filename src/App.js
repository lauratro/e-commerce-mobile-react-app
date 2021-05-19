import logo from "./logo.svg";
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./view/Home";
import SingleProduct from "./view/Single-Product";
import MenuAppBar from "./components/App-bar";
import Electronics from "./view/Electronics";
import {VariablesContextProvider} from "./context/ContextStorage"

function App() {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => setIsLoading(false), 1500);
  return (
    <VariablesContextProvider>
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
    </VariablesContextProvider>
  );
}

export default App;
