
import { useState } from "react";

function EditModal({ restaurant, onClose, onSave }) {
  const [name, setName] = useState(restaurant.name);
  const [rating, setRating] = useState(restaurant.rating);
  const [type, setType] = useState(restaurant.type);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, rating, type });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Restaurant</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
          <label>Rating</label>
          <input
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            type="number"
            min={0}
            max={10}
          />
          <label>Type</label>
          <input
            value={type}
            onChange={(e) => setType(e.target.value)}
            type="text"
          />
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;