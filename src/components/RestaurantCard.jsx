
import React from 'react';

function RestaurantCard({ restaurant, openModal, openEditModal }) {
  return (
    <div className="card" key={restaurant.id}>
      <h3>{restaurant.name}</h3>
      <p>{restaurant.type}</p>
      <p>{restaurant.rating}⭐</p>
      <button className="danger" onClick={() => openModal(restaurant)}>
        Delete
      </button>
      <button onClick={() => openEditModal(restaurant)}>Edit</button>
    </div>
  );
}

export default RestaurantCard;