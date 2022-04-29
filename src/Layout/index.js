import React from "react";
import {Route, Switch} from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home";
import Study from "../Study";
import CreateDeck from "../CreateDeck";
import Deck from "../Deck";
import EditDeck from "../EditDeck";
import CreateCard from "../CreateCard";
import EditCard from "../EditCard";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
        <Route exact path="/">
          <Home />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study /> 
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CreateCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />  
          </Route>
          </Switch>
      </div>
    </>
  );
}

export default Layout;
