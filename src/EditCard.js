import React, {useEffect, useState} from "react";
import { readCard, updateCard, readDeck } from "./utils/api";
import { Link, useHistory, useParams } from "react-router-dom";
import CardForm from "./CardForm";

function EditCard() {
  const history = useHistory();
  const {cardId, deckId} = useParams();
    const initialFormState = {
      front: "",
      back: "",
    };
    const [formData, setFormData] = useState({ ...initialFormState });
    const [deck, setDeck] = useState({})
    const handleChange = ({ target }) => {
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log("Submitted:", formData);
      await updateCard(formData);
      setFormData({ ...initialFormState });
      history.push("/");
    }; 

useEffect(() => {
  async function loadCard() {
    const response = await readCard(
    cardId  
    );
    console.log(response);
    setFormData(response);
  }
    loadCard();
  }, [cardId]);

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

    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
          </ol>
        </nav>
        <div>
          Create Deck   
        </div>
        <CardForm formData={formData} handleSubmit={handleSubmit} handleChange={handleChange} />
      </div>

    )
}
export default EditCard;