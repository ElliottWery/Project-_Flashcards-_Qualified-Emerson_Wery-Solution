import React, {useEffect, useState} from "react";
import { readCard, updateCard, readDeck } from "./utils/api";
import { Link, useHistory, useParams } from "react-router-dom";

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
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">Name</label>
            <input type="text" className="form-control" id="front" name="front" onChange={handleChange}
          value={formData.front} placeholder="front" />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">Description</label>
            <textarea type="text" className="form-control" id="back" name="back" onChange={handleChange}
          value={formData.back} placeholder="back"></textarea>
          </div>
          <Link to="/">Cancel</Link>
          <button>Submit</button>
        </form>
      </div>

    )
}
export default EditCard;