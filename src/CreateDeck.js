import React, { useState } from "react";
import {} from "./utils/api";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "./utils/api";
import CardForm from "./CardForm";

function CreateDeck() {
  const history = useHistory();
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
        <CardForm formData={formData} handleSubmit={handleSubmit} handleChange={handleChange} />
      </div>

    )
}

export default CreateDeck;