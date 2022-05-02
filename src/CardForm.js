import React from "react";
import { Link } from "react-router-dom";

function CardForm({handleSubmit, handleChange, formData}) {
    return (
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
    )
}

export default CardForm;