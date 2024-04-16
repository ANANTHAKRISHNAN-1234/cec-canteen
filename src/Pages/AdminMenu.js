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

const EditFoodModal = ({ isOpen, closeModal, menuItem, onUpdate }) => {
  const [name, setName] = useState(menuItem.name);
  const [description, setDescription] = useState(menuItem.description);
  const [price, setPrice] = useState(menuItem.price);
  const [category, setCategory] = useState(menuItem.category);
  const [stock, setStock] = useState(menuItem.stock);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:7000/api/menu/${menuItem._id}`,
        {
          name,
          description,
          price,
          category,
          stock,
        }
      );
      const updatedMenuItem = response.data;
      onUpdate(updatedMenuItem);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 className="menu-heading">Edit Food Item</h2>
        <button onClick={closeModal}>
          <i className="fa fa-close" aria-hidden="true"></i>
        </button>
      </div>
      <form onSubmit={handleFormSubmit}>
        <label className="pb-2 form-label">
          Name:
          <input
            type="text"
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
        <button className="menu-submit ms-5" type="submit">
          Update
        </button>
      </form>
    </Modal>
  );
};

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/menu");
        setMenuItems(response.data.data);
      } catch (error) {
        console.error("Failed to fetch menu items:", error);
      }
    };
    fetchMenuItems();
  }, []);

  const handleEdit = (menuItem) => {
    setSelectedItem(menuItem);
    setEditModalOpen(true);
  };

  const handleUpdate = (updatedMenuItem) => {
    const updatedMenuItems = menuItems.map((item) =>
      item._id === updatedMenuItem._id ? updatedMenuItem : item
    );
    setMenuItems(updatedMenuItems);
  };

  return (
    <div className="adminmenu">
      <AdminSidebar />
      <div className="content">
        <EditFoodModal
          isOpen={editModalOpen}
          closeModal={() => setEditModalOpen(false)}
          menuItem={selectedItem}
          onUpdate={handleUpdate}
        />
        <div className="menu-items  mt-4 ">
          {menuItems && menuItems.length > 0 ? (
            menuItems.map((menuItem) => (
              <div key={menuItem._id} className="menu-item col-md-3 m-3">
                <img
                  className="menu-img"
                  src={require(`../images/${menuItem.image}`)}
                  alt={menuItem.name}
                />
                <div className="menu-item-content">
                  <h4 className="text-center">{menuItem.name}</h4>
                  <p className="menu-item-para">
                    Price: {"\u20b9"}
                    {menuItem.price}
                  </p>
                  <p className="menu-item-para">Stock: {menuItem.stock}</p>
                </div>
                <div className="menu-item-btns text-center ">
                  <button
                    className="bg-success text-light p-2  pe-3 ps-3 me-3"
                    onClick={() => handleEdit(menuItem)}
                  >
                    <i className="fa fa-edit " aria-hidden="true"></i>
                  </button>
                  <button className="bg-danger text-light p-2 pe-3 ps-3">
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
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
