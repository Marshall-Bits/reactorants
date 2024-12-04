import { useEffect } from "react";
import "./App.css";
import supabase from "./supabase/config";
import { useState } from "react";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [type, setType] = useState("");

  async function getRestaurants() {
    try {
      const response = await supabase
        .from("restaurants")
        .select()
        .gt("rating", ratingFilter);

      setRestaurants(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newRestaurant = {
      name,
      rating,
      type,
    };
    
    try {
      const response = await supabase
        .from("restaurants")
        .insert([newRestaurant]);
      console.log(response);
      getRestaurants();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getRestaurants();
  }, [ratingFilter]);

  return (
    <>
      <h3>Create a new restaurant:</h3>
      <form onSubmit={handleSubmit}>
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
      <label htmlFor="">FILTER RATING GREATER THAN:</label>
      <select onChange={(e) => setRatingFilter(Number(e.target.value))}>
        <option value={0}>0</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
      </select>
      {restaurants.map((restaurant) => {
        return (
          <div key={restaurant.id}>
            <h3>{restaurant.name}</h3>
            <p>{restaurant.type}</p>
            <p>{restaurant.rating}</p>
          </div>
        );
      })}
    </>
  );
}

export default App;
