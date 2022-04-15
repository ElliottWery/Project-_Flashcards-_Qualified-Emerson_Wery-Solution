import React, {useEffect, useState} from "react";
import { readDeck } from "./utils/api";
import { Link, useParams } from "react-router-dom";

function Deck() {
    const [deck, setDeck] = useState({cards:[]});
    const { deckId } = useParams();

    useEffect(() => {
        async function loadDeck() {
          const response = await readDeck(
          deckId  
          );
          setDeck(response);
        }
    
        loadDeck();
      }, []);

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item active"><a href="#">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">{deck.name}</li>
                    <li class="breadcrumb-item"><a href="Study">Study</a></li>
                </ol>
            </nav>
            <Link to="/decks/new">Create Deck</Link>
            {deck.cards.map(deck => <div>
                <h2>{deck.name}</h2>
                <p>{deck.cards.length} cards</p>
            <Link to={`/decks/${deck.id}`}>view</Link>
            <Link to={`/decks/${deck.id}/study`}>Study</Link>
            <button>Delete</button>
            </div>)}
        </div>
    )
}

export default Deck;