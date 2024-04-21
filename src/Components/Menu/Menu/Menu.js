import React from "react";
import ContentLoader from "react-content-loader";
import "./Menu.css";
import axios from "axios";

const Menu = (props) => {
  const { bgColor, fgColor } = props;
  const { menu } = props;

  const handleAddtoCart = async () => {
    const User = JSON.parse(localStorage.getItem("user"));
    const userId = User.uid;
    const menuId = menu._id;

    try {
      const response = await axios.post("http://localhost:7000/api/cart", {
        menuId,
        userId,
      });
      alert(`${menu.name} successfully added to cart`);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div className="col-sm-6 col-lg-4 text-center mx-auto">
      {menu ? (
        <div className="menu-box">
          <div className="img-box">
            <img
              className="img-fluid"
              src={require(`../../../images/${menu.image}`)}
              alt={menu.name}
            />
          </div>
          <div className="info">
            <h5 className="name">{menu.name}</h5>
            <p>{menu.description.slice(0, 80)}</p>
            <h4 className="price">
              {"\u20b9"}
              {menu.price}
            </h4>
            <h3 className="buy" onClick={handleAddtoCart}>
              Add to Cart
            </h3>
          </div>
        </div>
      ) : (
        <ContentLoader
          viewBox="0 0 440 382"
          backgroundColor={bgColor}
          foregroundColor={fgColor}
        >
          <circle cx="227" cy="100" r="100" />
          <rect x="150" y="220" rx="10" ry="10" width="150" height="20" />
          <rect x="100" y="260" rx="10" ry="10" width="250" height="20" />
          <rect x="175" y="300" rx="10" ry="10" width="100" height="20" />
        </ContentLoader>
      )}
    </div>
  );
};

export default Menu;
