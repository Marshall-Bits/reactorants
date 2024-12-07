import { useEffect, useState } from "react";
import "./App.css";
import supabase from "./supabase/config";
import EditModal from "./components/EditModal";
import CreateRestaurantForm from "./components/CreateRestaurantForm";
import RestaurantCard from "./components/RestaurantCard";
import DeleteModal from "./components/DeleteModal";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);
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

  async function handleSubmit(newRestaurant) {
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
        <CreateRestaurantForm
          handleSubmit={handleSubmit}
        />
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
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            openModal={openModal}
            openEditModal={openEditModal}
          />
        ))}
      </div>

      {isModalOpen && (
        <DeleteModal
          restaurantToDelete={restaurantToDelete}
          confirmDelete={confirmDelete}
          closeModal={closeModal}
        />
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
