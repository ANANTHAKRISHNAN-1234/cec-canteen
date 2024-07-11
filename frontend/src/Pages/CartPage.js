// CartPage.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CartPage.css";
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantityArray, setQuantityArray] = useState([]);
  const [priceArray, setPriceArray] = useState([]);
  // const [idArray, setIdArray] = useState([]);
  // const [nameArray, setNameArray] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const amount = 200000;
  const currency = "INR";
  const receiptId = "receipt#1";
  const notes = {
    key1: "value3",
    key2: "value2",
  };
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Fetch the current user's cart items based on their username
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.uid;
        console.log(userId);
        const response = await axios.get(
          `https://cec-canteen-backend.vercel.app/api/customer/${userId}`
        );
        const cart = response.data.cart;

        // Fetch corresponding menu items based on the menu IDs in the cart
        const menuItems = await Promise.all(
          cart.map(async (itemId) => {
            const menuResponse = await axios.get(
              `https://cec-canteen-backend.vercel.app/api/menu/${itemId}`
            );
            return menuResponse.data;
          })
        );

        // Set the cart items with their details
        setCartItems(menuItems);

        console.log(cartItems);
        let q = menuItems.map(() => 1);
        setQuantityArray(q);
        console.log(menuItems);
        console.log(q);
        let totalCost = 0;
        menuItems.forEach((item) => {
          totalCost += item.price * q[menuItems.indexOf(item)];
        });
        setTotalPrice(totalCost);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    const updatedArray = async () => {
      const updatedIdArray = cartItems.map((item) => item._id);
      const updatedNameArray = cartItems.map((item) => item.name);
    };
    const totPrice = async () => {
      // const totalprice = cartItems.reduce(
      //   (total, item, index) => total + item.price * quantityArray[index],
      //   0
      // );
      // console.log(totalprice);
      // setTotalPrice(totalprice);
    };

    fetchCartItems();
    updatedArray();
    // totPrice();
  }, []);
  const removeFromCart = async (itemId, oldPrice, idx) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.uid;
      // Remove item from the cart array in the database
      await axios.delete(
        `https://cec-canteen-backend.vercel.app/api/customer/${userId}/cart/${itemId}`
      );
      console.log(oldPrice);
      // Update the cartItems state to reflect the removed item
      setTotalPrice(totalPrice - oldPrice);
      setQuantityArray(quantityArray.filter((qty, i) => i !== idx));
      setCartItems(cartItems.filter((item, i) => i !== idx));
      console.log(quantityArray);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const removeAllFromCart = async () => {
    try {
      console.log("hello");
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.uid;
      // Remove all items from the cart array in the database
      await axios.delete(`https://cec-canteen-backend.vercel.app/api/customer/${userId}/cart`);

      // Update the cartItems state to reflect the removal of all items
      setCartItems([]);
      setQuantityArray([]);
      setTotalPrice(0);
    } catch (error) {
      console.error("Error removing all items from cart:", error);
    }
  };
  const updateQuantity = (itemId, newQuantity, cost) => {
    setQuantityArray((prevQuantityArray) =>
      prevQuantityArray.map((prevQuantity, index) =>
        index === itemId ? parseInt(newQuantity) : prevQuantity
      )
    );
    let tot = 0;
    cartItems.forEach((item, index) => {
      if (index === itemId) {
        tot += item.price * newQuantity; // Use newQuantity for the updated item
      } else {
        tot += item.price * quantityArray[index]; // Use quantityArray for other items
      }
    });
    console.log(cost);
    console.log(newQuantity);
    console.log(quantityArray);
    console.log(tot);
    setTotalPrice(tot);
    console.log(tot);
    // setTotalPrice(tot * newQuantity);
  };
  const buyNow = async (e, item, index, cost) => {
    try {
      console.log(quantityArray);
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.uid;
      const response = await axios.post(` https://cec-canteen-backend.vercel.app/api/orders`, {
        itemId: item._id,
        name: item.name,
        quantity: quantityArray[index],
        price: item.price * quantityArray[index],
        userId: userId,
      });
      console.log(response);
      const res = await fetch("https://cec-canteen-backend.vercel.app/order", {
        method: "POST",
        body: JSON.stringify({
          amount: item.price * quantityArray[index] * 100,
          currency,
          receipt: receiptId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const order = await res.json();
      console.log(order);
      var options = {
        key: "rzp_test_i3MlNZjHTupCbP", // Enter the Key ID generated from the Dashboard
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        name: "Acme Corp", //your business name
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id, //This is a sample Order ID. Pass the id obtained in the response of Step 1
        handler: async function (response) {
          const body = {
            ...response,
          };
          const validateRes = await fetch(
            "https://cec-canteen-backend.vercel.app/order/validate",
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const jsonRes = await validateRes.json();
          console.log(jsonRes);
        },

        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          name: "Gaurav Kumar", //your customer's name
          email: "gaurav.kumar@example.com",
          contact: "9000090000", //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
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
      // alert("payment successfull**");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(
          Cannot buy ${quantityArray[index]} ${item.name}. Out of Stock!!!
        );
      } else {
        console.error("Error buying item:", error);
      }
    }
  };
  const buyAll = async (e) => {
    try {
      console.log(quantityArray);
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.uid;
      // console.log(totalprice);
      // setTotalPrice(totalprice);
      // console.log(totalPrice);
      const response = await axios.post(`https://cec-canteen-backend.vercel.app/api/orderall`, {
        userId: userId,
        quantityArray: quantityArray,
        nameArray: cartItems.map((item) => item.name),
        idArray: cartItems.map((item) => item._id),
        totalPrice: totalPrice,
      });

      console.log(response);
      const res = await fetch("https://cec-canteen-backend.vercel.app/order", {
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
      console.log(order);
      var options = {
        key: "rzp_test_i3MlNZjHTupCbP", // Enter the Key ID generated from the Dashboard
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        name: "Acme Corp", //your business name
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          const body = {
            ...response,
          };
          const validateRes = await fetch(
            "https://cec-canteen-backend.vercel.app/order/validate",
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const jsonRes = await validateRes.json();
          console.log(jsonRes);
        },

        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          name: "Gaurav Kumar", //your customer's name
          email: "gaurav.kumar@example.com",
          contact: "9000090000", //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
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
      console.log(cartItems);
      // alert("payment successfull****");
      // Update stock for each selected item
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(`Cannot Buy All,One of the item is Out of Stock!!!`);
        return;
      } else {
        console.error("Error buying item:", error);
      }
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
        <div className="cart-box">
          <div className="imgcart-box">
            <img
              className="img-fluid"
              src={require(`../images/${item.image}`)}
              alt={item.name}
            />
            <button
              className="bg-success text-white"
              onClick={(e) => buyNow(e, item, index, item.price)}
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
          <li key={item._id}>
            <h5>{item.name}</h5>
            <p className="cart-price">
              {"\u20b9"}
              {item.price}
            </p>
            <label>Qty:</label>
            <input
              type="number"
              min="1"
              defaultValue="1"
              onChange={(e) =>
                updateQuantity(index, e.target.value, item.price)
              }
              className="qty-input"
            ></input>
            <p>{item.description}</p>
          </li>
        </div>
      ))}
      {totalPrice !== 0 ? (
        <div className="cart-end">
          <h4>
            Total Price:{"\u20b9"}
            {totalPrice}
          </h4>
          <button className="bg-success text-light " onClick={(e) => buyAll(e)}>
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
