import React, { useEffect ,useState} from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "./utils/api";

function CreateCard() {
  const history = useHistory();
  const {deckId} = useParams();
  const [deck, setDeck] = useState({cards:[]});

    const initialFormState = {
      front: "",
      back: "",
    };
    const [formData, setFormData] = useState({ ...initialFormState });
    const handleChange = ({ target }) => {
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    };

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

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log("Submitted:", formData);
      await createCard(deckId, formData);
      setFormData({ ...initialFormState });
      history.push("/decks/" + deckId);
    }; 

    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Create Card</li>
          </ol>
        </nav>
        <div>
          {deck.name}: Create Card   
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">Front</label>
            <textarea type="text" className="form-control" id="front" name="front" onChange={handleChange}
          value={formData.front} placeholder="front"></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">Back</label>
            <textarea type="text" className="form-control" id="back" name="back" onChange={handleChange}
          value={formData.back} placeholder="back"></textarea>
          </div>
          <Link to="/">Cancel</Link>
          <button>Add Card</button>
        </form>
      </div>

    )
}

export default CreateCard;