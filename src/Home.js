import React, {useEffect, useState} from "react";
import { listDecks } from "./utils/api";
import {Link} from "react-router-dom";

function Home() {
    const [decks, setDecks] = useState([]);
    
    useEffect(() => {
        async function loadDecks() {
          const response = await listDecks(
            
          );
          setDecks(response);
        }
    
        loadDecks();
      }, []);

    return (
        <div>
            <Link to="/decks/new">Create Deck</Link>
            {decks.map(deck => <div key={deck.id}>
                <h2>{deck.name}</h2>
                <p>{deck.cards.length} cards</p>
            <Link to={`/decks/${deck.id}`}>view</Link>
            <Link to={`/decks/${deck.id}/study`}>Study</Link>
            <button>Delete</button>
            <p>{decks.description}</p>
            </div>)}
        </div>
    )
}

export default Home;