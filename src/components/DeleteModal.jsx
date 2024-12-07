
import React from 'react';

function DeleteModal({ restaurantToDelete, confirmDelete, closeModal }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete "{restaurantToDelete.name}"?</p>
        <div className="modal-buttons">
          <button className="danger" onClick={confirmDelete}>
            Yes, Delete
          </button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;