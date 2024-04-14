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

const AddFoodModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (!isOpen) {
      setName("");
      setDescription("");
      setPrice(0);
      setCategory("");
      setStock(0);
      setImage(null);
    }
  }, [isOpen]);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(axios);
      const response = await axios.post(
        "http://localhost:7000/api/menu",
        {
          name,
          description,
          price,
          category,
          stock,
          image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = await response.data;
      console.log(data);

      if (data.status === "ok") {
        console.log("data updated to database successfully");
      }
    } catch (error) {
      console.log(error);
    }
    // Handle form submission (e.g., send data to backend)
    // You can access the form data in the state variables (name, description, etc.)
    closeModal();
  };
  const onUploadFile = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

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
              autoFocus
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
          <label className=" form-imagelabel pb-2">
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
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/menu");
        console.log("helllllo");
        console.log(response);
        setMenuItems(response.data.data);
      } catch (error) {
        console.error("Failed to fetch menu items:", error);
      }
    };
    fetchMenuItems();
  }, []);

  return (
    <div className="adminmenu">
      <AdminSidebar />
      <div className="content">
        <AddFoodModal />
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
                  <button className="bg-success text-light p-2  pe-3 ps-3 me-3">
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
