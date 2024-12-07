import { useEffect, useState } from "react";
import "./App.css";
import supabase from "./supabase/config";
import EditModal from "./components/EditModal";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [type, setType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [restaurantToEdit, setRestaurantToEdit] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  async function getRestaurants() {
    try {
      const response = await supabase
        .from("restaurants")
        .select()
        .gt("rating", ratingFilter)
        .order("rating", { ascending: true });

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

  async function deleteRestaurant(id) {
    try {
      console.log(id);

      const response = await supabase.from("restaurants").delete().eq("id", id);
      console.log(response);
      getRestaurants();
    } catch (error) {
      console.error(error);
    }
  }

  async function updateRestaurant(id, updatedData) {
    try {
      const response = await supabase
        .from("restaurants")
        .update(updatedData)
        .eq("id", id);

      console.log(response);
      getRestaurants();
    } catch (error) {
      console.error(error);
    }
  }

  const openModal = (restaurant) => {
    setRestaurantToDelete(restaurant);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setRestaurantToDelete(null);
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (restaurantToDelete) {
      deleteRestaurant(restaurantToDelete.id);
      closeModal();
    }
  };

  const openEditModal = (restaurant) => {
    setRestaurantToEdit(restaurant);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setRestaurantToEdit(null);
    setIsEditModalOpen(false);
  };

  const handleSave = async (updatedData) => {
    await updateRestaurant(restaurantToEdit.id, updatedData);
    closeEditModal();
  };

  const toggleCreateForm = () => {
    setShowCreateForm((prev) => !prev);
  };

  useEffect(() => {
    getRestaurants();
  }, [ratingFilter]);

  return (
    <>
      <button onClick={toggleCreateForm}>
        {showCreateForm ? "Hide Create Restaurant" : "Show Create Restaurant"}
      </button>
      {showCreateForm && (
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
        </>
      )}
      <label htmlFor="">Filter:</label>
      <select onChange={(e) => setRatingFilter(Number(e.target.value))}>
        <option value={0}>more than 0 ⭐</option>
        <option value={5}>more than 5 ⭐</option>
        <option value={6}>more than 6 ⭐</option>
        <option value={7}>more than 7 ⭐</option>
        <option value={8}>more than 8 ⭐</option>
      </select>

      <div className="restaurant-list">
        {restaurants.map((restaurant) => {
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
        })}
      </div>

      {isModalOpen && (
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
      )}

      {isEditModalOpen && restaurantToEdit && (
        <EditModal
          restaurant={restaurantToEdit}
          onClose={closeEditModal}
          onSave={handleSave}
        />
      )}
    </>
  );
}

export default App;
