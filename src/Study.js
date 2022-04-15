import React, {useEffect, useState} from "react";
import { readDeck } from "./utils/api";
import { Link, useParams } from "react-router-dom";

function Study() {
    const [deck, setDeck] = useState({cards:[]});
    const [cardIndex, setCardIndex] = useState(0);
    const [isBack, setIsBack] = useState(false);
    const { deckId } = useParams();

    function onFlip () {
        if (isBack) {
            setIsBack(false);
        } else {
            setIsBack(true);
        }
    }

    function onNext () {
        console.log(deck.cards.length, cardIndex);
        if (deck.cards.length - 1 <= cardIndex) {
            const result = window.confirm("Restart cards?");
            if (result) {
                setCardIndex(0);
                setIsBack(false);
            }
        } else {
            setIsBack(false);
            setCardIndex(cardIndex + 1);
        }
    }

    useEffect(() => {
        async function loadDeck() {
          const response = await readDeck(
          deckId  
          );
          setDeck(response);
        }
        if (deckId) {
            loadDeck();
        }
      }, []);
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                    <li className="breadcrumb-item"><a href="Study">Study</a></li>
                </ol>
            </nav>
            <Link to="/decks/new">Create Deck</Link>
                <h2>Study: {deck.name}</h2>
                <div className="card">
                <div className="card-header">
                    Featured
                </div>
                <div className="card-body">
                    {deck.cards.length < 3?(<div>
                        <h5 className="card-title">Not enough cards</h5>
                    <p className="card-text">You need at least 3 cards to study. There are 2 cards in the deck.</p>
                    <Link to="decks/2/cards/new">Flip</Link>
                    </div>):(<div>
                        <h5 className="card-title">Card {cardIndex + 1} of {deck.cards.length}</h5>
                    <p className="card-text">{isBack?deck.cards[cardIndex]?.back:deck.cards[cardIndex]?.front}</p>
                    <button onClick={onFlip}>Flip</button>
                    {isBack?(<button onClick={onNext}>Next</button>):(null)}
                    </div>)}
                    
                </div>
                </div>
        </div>
    )
}

export default Study;