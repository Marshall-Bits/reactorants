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
  const [types, setTypes] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");

  async function getRestaurants() {
    try {
      const response = await supabase
        .from("restaurants")
        .select()
        .ilike("type", `%${typeFilter}%`)
        .order("rating", { ascending: true });

      setRestaurants(response.data);
      if (types.length === 0) {
        const types = new Set(
          response.data.map((restaurant) => restaurant.type)
        );
        setTypes(Array.from(types));
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(newRestaurant) {
    try {
      const response = await supabase
        .from("restaurants")
        .insert([newRestaurant]);
      if (response.error) {
        throw response.error;
      }
      getRestaurants();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteRestaurant(id) {
    try {
      const response = await supabase.from("restaurants").delete().eq("id", id);
      if (response.error) {
        throw response.error;
      }
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
      if (response.error) {
        throw response.error;
      }
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
  }, [typeFilter]);

  return (
    <>
      <h1>REACTORANTS</h1>
      <button onClick={toggleCreateForm}>
        {showCreateForm ? "Hide Create Restaurant" : "Create Restaurant"}
      </button>
      {showCreateForm && <CreateRestaurantForm handleSubmit={handleSubmit} />}
      <label htmlFor="">Filter:</label>
      <select onChange={(e) => setTypeFilter(e.target.value)}>
        <option value="">All</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
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
