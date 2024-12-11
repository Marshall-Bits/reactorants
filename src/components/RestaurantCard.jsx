import React from "react";

function RestaurantCard({ restaurant, openModal, openEditModal }) {
  return (
    <div className="card" key={restaurant.id}>
      <section>
        <h3>{restaurant.name}</h3>
      </section>
      <p>{restaurant.type}</p>
      <p>{restaurant.rating}⭐</p>
      <p>
        <a target="_blank" className="map-icon" href={restaurant.url}>
          🗺️
        </a>
      </p>
      <button className="danger" onClick={() => openModal(restaurant)}>
        Delete
      </button>
      <button onClick={() => openEditModal(restaurant)}>Edit</button>
    </div>
  );
}

export default RestaurantCard;
