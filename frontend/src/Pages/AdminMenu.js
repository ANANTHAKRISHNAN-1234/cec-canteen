import React, { useState, useEffect } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import "./AdminMenu.css";
import Modal from "react-modal";
import axios from "axios";

const customStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "75%",
    height: "83%",
    overflow: "auto",
    border: "1px solid #ccc",
    background: "#fff",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
    zIndex: "9999",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "9998",
  },
};

Modal.setAppElement("#root");

const AddFoodModal = ({ onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("stock", stock);
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:7000/api/menu",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.status === "ok") {
        console.log("Data updated to database successfully");
        onSave();
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    closeModal();
  };

  const onUploadFile = (e) => setImage(e.target.files[0]);

  return (
    <>
      <button className="add-menu" onClick={openModal}>
        + Add New FoodItem
      </button>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 className="menu-heading">Add New FoodItem</h2>
          <button onClick={closeModal}>
            <i className="fa fa-close" aria-hidden="true"></i>
          </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <label className="pb-2 form-label">
            Name:
            <input
              type="text"
              placeholder="Enter name of foodItem"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              required
            />
          </label>
          <br />
          <label className="pb-2 form-label">
            Description:
            <input
              type="text"
              value={description}
              placeholder="Enter description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <br />
          <label className="form-label pb-2">
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </label>
          <br />
          <label className="form-label pb-2">
            Category:
            <input
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </label>
          <br />
          <label className="form-label pb-2">
            Stock:
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              required
            />
          </label>
          <br />
          <label className="form-imagelabel pb-2">
            Image:
            <input
              type="file"
              accept="image/*"
              onChange={onUploadFile}
              required
            />
          </label>
          <br />
          <button className="menu-submit ms-5" type="submit">
            Add
          </button>
        </form>
      </Modal>
    </>
  );
};

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedItem, setEditedItem] = useState({});

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("https://cec-canteen-backend.vercel.app/api/menu");
        setMenuItems(response.data.data);
      } catch (error) {
        console.error("Failed to fetch menu items:", error);
      }
    };
    fetchMenuItems();
  }, []);

  const handleEdit = (itemId) => {
    const editedItem = menuItems.find((item) => item._id === itemId);
    setEditingItemId(itemId);
    setEditedItem({ ...editedItem, _id: itemId });
  };

  const handleSave = async (editedData) => {
    console.log("handleSave function called with data:", editedData);
    try {
      console.log("Sending PUT request with data:", editedData);
      const response = await axios.put(
        `https://cec-canteen-backend.vercel.app/api/menu/${editedData._id}`,
        editedData
      );
      console.log("Received response:", response.data);
      if (response.data.status === "ok") {
        console.log("Menu item updated successfully");
        const updatedMenuItems = menuItems.map((item) =>
          item._id === editedData._id ? editedData : item
        );
        setMenuItems(updatedMenuItems);
      }
      setEditingItemId(null);
      setEditedItem({});
    } catch (error) {
      console.error("Failed to update menu item:", error);
    }
  };

  const handleChange = (key, value) =>
    setEditedItem({ ...editedItem, [key]: value });
  const handleSaveChanges = (item) => handleSave(editedItem);

  const handleDelete = async (itemId) => {
    try {
      const response = await axios.delete(
        `https://cec-canteen-backend.vercel.app/api/menu/${itemId}`
      );
      if (response.data.status === "ok") {
        console.log("Menu item deleted successfully");
        const updatedMenuItems = menuItems.filter(
          (item) => item._id !== itemId
        );
        setMenuItems(updatedMenuItems);
      }
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete menu item:", error);
    }
  };

  return (
    <div className="adminmenu">
      <AdminSidebar />
      <div className="content">
        <AddFoodModal onSave={() => {}} />
        <div className="menu-items mt-4">
          {menuItems && menuItems.length > 0 ? (
            menuItems.map((menuItem) => (
              <div key={menuItem._id} className="menu-item col-md-3 m-3">
                {editingItemId === menuItem._id ? (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleChange("image", e.target.files[0])}
                    />
                    <input
                      type="text"
                      value={editedItem.name || menuItem.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                    <input
                      type="text"
                      value={editedItem.description || menuItem.description}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      value={editedItem.price || menuItem.price}
                      onChange={(e) =>
                        handleChange("price", Number(e.target.value))
                      }
                    />
                    <input
                      type="text"
                      value={editedItem.category || menuItem.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                    />
                    <input
                      type="number"
                      value={editedItem.stock || menuItem.stock}
                      onChange={(e) =>
                        handleChange("stock", Number(e.target.value))
                      }
                    />
                  </div>
                ) : (
                  <div className="adminmenu-image">
                    <img
                      src={require(`../images/${menuItem.image}`)}
                      alt={menuItem.name}
                    />
                    <p>Name: {menuItem.name}</p>
                    <p>Description: {menuItem.description}</p>
                    <p>Price: {menuItem.price}</p>
                    <p>Category: {menuItem.category}</p>
                    <p>Stock: {menuItem.stock}</p>
                  </div>
                )}
                <div className="menu-item-btns text-center">
                  {editingItemId === menuItem._id ? (
                    <>
                      <button
                        className="bg-success text-light p-2 pe-3 ps-3 me-3"
                        onClick={() => handleSaveChanges(menuItem)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-danger text-light p-2 pe-3 ps-3"
                        onClick={() => setEditingItemId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-success text-light p-2 pe-3 ps-3 me-3"
                        onClick={() => handleEdit(menuItem._id)}
                      >
                        <i className="fa fa-edit" aria-hidden="true"></i>
                      </button>
                      <button
                        className="bg-danger text-light p-2 pe-3 ps-3"
                        onClick={() => handleDelete(menuItem._id)}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No menu items available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
