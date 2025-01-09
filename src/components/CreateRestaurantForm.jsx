import React, { useState } from 'react';

function CreateRestaurantForm({ handleSubmit }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [type, setType] = useState("");
  const [url, setUrl] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ name, rating, type, url });
    setName("");
    setRating(0);
    setType("");
    setUrl("");
  };

  return (
    <>
      <h3>Create a new restaurant:</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="restaurant-name">Name</label>
        <input
          id="restaurant-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
        <label htmlFor="restaurant-rating">Rating</label>
        <input
          id="restaurant-rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          type="number"
          min={0}
          max={10}
        />
        <label htmlFor="restaurant-type">Type</label>
        <input
          id="restaurant-type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          type="text"
        />
        <label htmlFor="restaurant-url">Url de google maps</label>
        <input
          id="restaurant-url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="text"
        />
        <button type="submit">Create</button>
      </form>
    </>
  );
}

export default CreateRestaurantForm;