import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantityArray, setQuantityArray] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const amount = 200000;
  const currency = "INR";
  const receiptId = "receipt#1";

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.uid;
        const response = await axios.get(`http://localhost:7000/api/customer/${userId}`);
        const cart = response.data.cart;

        const menuItems = await Promise.all(
          cart.map(async (itemId) => {
            const menuResponse = await axios.get(`http://localhost:7000/api/menu/${itemId}`);
            return menuResponse.data;
          })
        );

        setCartItems(menuItems);

        let q = menuItems.map(() => 1);
        setQuantityArray(q);

        let totalCost = 0;
        menuItems.forEach((item) => {
          totalCost += item.price * q[menuItems.indexOf(item)];
        });
        setTotalPrice(totalCost);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (itemId, oldPrice, idx) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.uid;
      await axios.delete(`http://localhost:7000/api/customer/${userId}/cart/${itemId}`);
      setTotalPrice(totalPrice - oldPrice);
      setQuantityArray(quantityArray.filter((qty, i) => i !== idx));
      setCartItems(cartItems.filter((item, i) => i !== idx));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const removeAllFromCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.uid;
      await axios.delete(`http://localhost:7000/api/customer/${userId}/cart`);
      setCartItems([]);
      setQuantityArray([]);
      setTotalPrice(0);
    } catch (error) {
      console.error("Error removing all items from cart:", error);
    }
  };

  const updateQuantity = (itemId, newQuantity) => {
    setQuantityArray((prevQuantityArray) =>
      prevQuantityArray.map((prevQuantity, index) =>
        index === itemId ? parseInt(newQuantity) : prevQuantity
      )
    );
  };

  const buyNow = async (e, item, index) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.uid;
      await axios.post(`http://localhost:7000/api/orders`, {
        itemId: item._id,
        name: item.name,
        quantity: quantityArray[index],
        price: item.price * quantityArray[index],
        userId: userId,
      });

      const res = await fetch("http://localhost:7000/order", {
        method: "POST",
        body: JSON.stringify({
          amount: totalPrice * 100,
          currency,
          receipt: receiptId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const order = await res.json();

      let options = {
        key: "rzp_test_i3MlNZjHTupCbP",
        amount,
        currency,
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id,
        handler: async function (response) {
          const body = {
            ...response,
          };
          await fetch("http://localhost:7000/order/validate", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          });
        },

        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      let rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
      e.preventDefault();

      removeFromCart(item._id, item.price * quantityArray[index], index);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(`Cannot buy ${quantityArray[index]} ${item.name}. Out of Stock!!!`);
      } else {
        console.error("Error buying item:", error);
      }
    }
  };

  const buyAll = async (e) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.uid;
      await axios.post(`http://localhost:7000/api/orderall`, {
        userId: userId,
        quantityArray: quantityArray,
        nameArray: cartItems.map((item) => item.name),
        idArray: cartItems.map((item) => item._id),
        totalPrice: totalPrice,
      });

      const res = await fetch("http://localhost:7000/order", {
        method: "POST",
        body: JSON.stringify({
          amount: totalPrice * 100,
          currency,
          receipt: receiptId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const order = await res.json();

      let options = {
        key: "rzp_test_i3MlNZjHTupCbP",
        amount,
        currency,
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id,
        handler: async function (response) {
          const body = {
            ...response,
          };
          await fetch("http://localhost:7000/order/validate", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          });
        },

        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      let rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
      e.preventDefault();
      removeAllFromCart();
    } catch (error) {
      console.error("Error buying items:", error);
    }
  };

  return (
    <div className="cartbody">
      <div className="classbody-heading">
        <h2>The CART</h2>
        <button className="bg-danger text-light" onClick={removeAllFromCart}>
          Remove All
        </button>
      </div>
      {cartItems.map((item, index) => (
        <div className="cart-box" key={item._id}>
          <div className="imgcart-box">
            <img
              className="img-fluid"
              src={require(`../images/${item.image}`)}
              alt={item.name}
            />
            <button
              className="bg-success text-white"
              onClick={(e) => buyNow(e, item, index)}
            >
              Buy now
            </button>
            <button
              className="bg-danger text-white"
              onClick={() =>
                removeFromCart(
                  item._id,
                  item.price * quantityArray[index],
                  index
                )
              }
            >
              Remove
            </button>
          </div>
          <div>
            <h5>{item.name}</h5>
            <p className="cart-price">
              {"\u20b9"}
              {item.price}
            </p>
            <h4>Qty:</h4>
            <input
              type="number"
              min="1"
              value={quantityArray[index]}
              onChange={(e) => updateQuantity(index, e.target.value)}
              className="qty-input"
            ></input>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
      {totalPrice !== 0 ? (
        <div className="cart-end">
          <h4>
            Total Price:{"\u20b9"}
            {totalPrice}
          </h4>
          <button className="bg-success text-light" onClick={buyAll}>
            Buy All
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h3>Cart is empty.....</h3>
        </div>
      )}
    </div>
  );
};

export default CartPage;
