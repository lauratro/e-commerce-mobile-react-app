import logo from "./logo.svg";
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./view/Home";
import SingleProduct from "./view/Single-Product";
import MenuAppBar from "./components/App-bar";
import Electronics from "./view/Electronics";
import { VariablesContextProvider } from "./context/ContextStorage";
import Jewelery from "./view/Jewelery";
import Men from "./view/MenClothing";
import Women from "./view/WomenClothing";

import ShoppingCartContainer from "./view/ShoppingCartContainer";
import Favorites from "./view/Favorites";

import { AuthContextProvider } from "./context/AuthContext";
import { AccountBox } from "./view/accountBox/ContainerForm";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => setIsLoading(false), 1500);
  return (
    <AuthContextProvider>
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
                <Route exact path="/jewelery">
                  <Jewelery />
                </Route>

                <Route exact path="/men">
                  <Men />
                </Route>
                <Route exact path="/women">
                  <Women />
                </Route>
                <Route exact path="/account">
                  <AccountBox />
                </Route>
                <Route exact path="/shopping">
                  <ShoppingCartContainer />
                </Route>
                <Route exact path="/favorites">
                  <Favorites />
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
              alt="logo"
            ></img>
          )}
        </BrowserRouter>
      </VariablesContextProvider>
    </AuthContextProvider>
  );
}

export default App;
