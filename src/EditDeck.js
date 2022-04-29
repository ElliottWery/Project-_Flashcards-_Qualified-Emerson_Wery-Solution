import React, {useEffect, useState} from "react";
import {} from "./utils/api";
import { Link, useHistory, useParams } from "react-router-dom";
import { createDeck, readDeck } from "./utils/api";

function EditDeck() {
  const history = useHistory();
  const {deckId} = useParams();

    const initialFormState = {
      name: "",
      description: "",
    };
    const [formData, setFormData] = useState({ ...initialFormState });
    const handleChange = ({ target }) => {
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log("Submitted:", formData);
      await createDeck(formData);
      setFormData({ ...initialFormState });
      history.push("/deck");
    };
  
  useEffect(() => {
    async function loadDeck() {
        const response = await readDeck(
        deckId  
        );
        console.log(response);
        setFormData(response);
      }
      loadDeck();
    }, [deckId]);

    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
          </ol>
        </nav>
        <div>
          Create Deck   
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" onChange={handleChange}
          value={formData.name} placeholder="Deck Name" />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">Description</label>
            <textarea type="text" className="form-control" id="description" name="description" onChange={handleChange}
          value={formData.description} placeholder="Brief description of the deck"></textarea>
          </div>
          <Link to="/">Cancel</Link>
          <button>Submit</button>
        </form>
      </div>

    )
}
export default EditDeck;