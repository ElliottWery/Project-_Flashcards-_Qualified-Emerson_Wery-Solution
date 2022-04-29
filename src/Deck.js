import React, { useEffect, useState } from "react";
import { readDeck, deleteCard, deleteDeck } from "./utils/api";
import { Link, useParams, useHistory } from "react-router-dom";

function Deck() {
    const [deck, setDeck] = useState({cards:[]});
    const { deckId } = useParams();
    const history = useHistory();


    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(
            deckId  
            );
            console.log(response);
            setDeck(response);
          }
        loadDeck();
      }, [deckId]);

async function onDeleteCard(cardId) {
    if (!window.confirm("Are you sure you want to delete?")) {
        return 
    }
    await deleteCard(cardId);
    const response = await readDeck(
        deckId  
        );
        console.log(response);
        setDeck(response);
} 

async function onDeleteDeck(deckId) {
    if (!window.confirm("Are you sure you want to delete?")) {
        return 
    }
    await deleteDeck(deckId);
    history.push("/");
}

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                </ol>
            </nav>
            <Link to="/decks/new">Create Deck</Link>
            <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{deck.name}</h5>
                        <Link className="btn btn-primary" to={`/decks/${deck.id}/edit`}>Edit</Link>
                        <Link className="btn btn-primary" to={`/decks/${deck.id}/study`}>Study</Link>
                        <Link className="btn btn-primary" to={`/decks/${deck.id}/cards/new`}>Add Cards</Link>
                        <button onClick={e => onDeleteDeck(deck.id)}>Delete</button>
                    </div>
                    </div>
            {deck.cards.map(card => <div key={card.id}>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{card.front}</h5>
                        <h5 className="card-title">{card.back}</h5>
                        <Link className="btn btn-primary" to={`/decks/${deck.id}/cards/${card.id}/edit`}>Edit</Link>
                        <button onClick={e => onDeleteCard(card.id)}>Delete</button>
                    </div>
                    </div>
            </div>)}
        </div>
    )
}

export default Deck;