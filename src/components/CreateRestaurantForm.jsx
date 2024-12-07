import React, { useState } from 'react';

function CreateRestaurantForm({ handleSubmit }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [type, setType] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ name, rating, type });
    setName("");
    setRating(0);
    setType("");
  };

  return (
    <>
      <h3>Create a new restaurant:</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
        <label htmlFor="">Rating</label>
        <input
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          type="number"
          min={0}
          max={10}
        />
        <label htmlFor="">Type</label>
        <input
          value={type}
          onChange={(e) => setType(e.target.value)}
          type="text"
        />
        <button type="submit">Create</button>
      </form>
    </>
  );
}

export default CreateRestaurantForm;