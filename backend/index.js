const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 7000;
const connectDB = require("./db");
connectDB();
const cors = require("cors");
const crypto = require("crypto");
const User = require("./models/adminuser");
const Menu = require("./models/menustruct");
const Customer = require("./models/customer");
const Order = require("./models/orders");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const { toBeDisabled } = require("@testing-library/jest-dom/matchers");
const Razorpay = require("razorpay");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to my canteen app!!");
});
app.get("/admin", (req, res) => {
  res.send("hello");
});
app.listen(PORT, () => {
  console.log("server is listening on PORT:" + PORT);
});
app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    const newPassword = await bcrypt.hashSync(req.body.password, 10);
    await User.create({
      name: req.body.username,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate email" });
  }
});
app.post("/api/login", async (req, res) => {
  console.log(req.body);
  const { adminemail, adminpassword } = req.body;
  console.log(adminemail);
  console.log(adminpassword);
  try {
    const user = await User.findOne({ email: adminemail });
    console.log(user);
    if (!user) {
      return res.json({
        status: "error",
        error: "Invalid loginas credentials",
      });
    }

    const isPasswordValid = await bcrypt.compareSync(
      adminpassword,
      user.password
    );

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          email: user.email,
        },
        "secret123"
      );

      return res.json({ status: "ok", user: token });
    } else {
      return res.json({ status: "error", error: "Invalid Login credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../src/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });
app.post("/api/menu", upload.single("image"), async (req, res) => {
  console.log(req.body);
  const imageName = req.file.filename;
  try {
    await Menu.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
      image: imageName,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    console.log("Failed to enter menudata to database");
  }
});
app.get("/api/menu", async (req, res) => {
  try {
    const menuItems = await Menu.find();
    console.log("helllllo");
    console.log(menuItems);
    res.json({ status: "ok", data: menuItems });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "error", error: "Failed to fetch menu items" });
  }
});
app.post("/api/signup", async (req, res) => {
  console.log(req.body);
  try {
    await Customer.create({
      userid: req.body.uid,
      email: req.body.email,
      username: req.body.username,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({
      status: "error",
      error: "Failed to store data to customer collection",
    });
  }
});
app.post("/api/cart", async (req, res) => {
  const { menuId, userId } = req.body;
  console.log("hiiiii");
  console.log(req.body);
  console.log("hello");
  console.log(menuId);
  console.log(userId);
  try {
    const customer = await Customer.findOneAndUpdate(
      { userid: userId },
      { $addToSet: { cart: menuId } },
      { new: true }
    );

    res.json({ success: true, customer });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add item to cart" });
  }
});
app.get(`/api/customer/:userId`, async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  try {
    const customer = await Customer.findOne({ userid: userId });
    if (!customer) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ cart: customer.cart });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Route to fetch a menu item based on its ID
app.get("/api/menu/:id", async (req, res) => {
  console.log("helllooo");
  const id = req.params.id;
  console.log(id);
  try {
    const menuItem = await Menu.findById(id);
    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    res.json(menuItem);
  } catch (error) {
    console.error("Error fetching menu item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.delete("/api/customer/:userId/cart/:itemId", async (req, res) => {
  try {
    console.log("akakakakak");
    const { userId, itemId } = req.params;
    console.log(userId);
    console.log(itemId);
    const customer = await Customer.findOneAndUpdate(
      { userid: userId },
      { $pull: { cart: itemId } },
      { new: true }
    );
    res.status(200).json(customer);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.delete("/api/customer/:userId/cart", async (req, res) => {
  try {
    const { userId } = req.params;
    const customer = await Customer.findOneAndUpdate(
      { userid: userId },
      { $set: { cart: [] } },
      { new: true }
    );
    res.status(200).json(customer);
  } catch (error) {
    console.error("Error removing all items from cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// POST /api/orders
app.post("/api/orders", async (req, res) => {
  const { itemId, name, quantity, price, userId } = req.body;

  try {
    // Find the menu item by itemId
    const menuItem = await Menu.findById(itemId);
    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    // Check if the quantity is greater than the available stock
    if (quantity > menuItem.stock) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    // Calculate the new stock quantity after subtracting the order quantity
    const newStock = menuItem.stock - quantity;
    if (newStock < 0) {
      return res.status(400).json({ error: "Not enough stock available" });
    }

    // Subtract the quantity from the stock
    menuItem.stock = newStock;
    await menuItem.save();

    // Create a new order
    const newOrder = new Order({
      userId,
      name: [name],
      purchasedItems: [itemId],
      quantity: [quantity],
      price: price,
    });

    // Save the new order
    const savedOrder = await newOrder.save();

    // Respond with the saved order, including the automatically generated _id
    res.json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/api/orderall", async (req, res) => {
  const { userId, quantityArray, nameArray, idArray, totalPrice } = req.body;
  try {
    console.log("hellllllllllllo");
    console.log("hehehehehehhehehhehe");
    console.log(quantityArray);
    console.log(nameArray);
    console.log(totalPrice);
    const promises = idArray.map(async (itemid, index) => {
      const menuItem = await Menu.findById(itemid);
      if (!menuItem) {
        return res.status(404).json({ error: "Menu item not found" });
      }

      // Check if the quantity is greater than the available stock
      if (quantityArray[index] > menuItem.stock) {
        return res.status(400).json({ error: "Insufficient stock" });
      }
      const newStock = menuItem.stock - quantityArray[index];
      if (newStock < 0) {
        return res.status(400).json({ error: "Not enough stock available" });
      }

      // Subtract the quantity from the stock
      menuItem.stock = newStock;
      await menuItem.save();
    });

    const newOrder = new Order({
      userId,
      name: nameArray,
      purchasedItems: idArray,
      quantity: quantityArray,
      price: totalPrice,
    });

    // Save the new order
    const savedOrder = await newOrder.save();

    // Respond with the saved order, including the automatically generated _id
    res.json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    return;
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/api/order", async (req, res) => {
  try {
    console.log("Iam in /order");
    console.log(process.env.Razorpay_KEY_ID);
    console.log(process.env.Razorpay_SECRET);
    const razorpay = new Razorpay({
      key_id: process.env.Razorpay_KEY_ID,
      key_secret: process.env.Razorpay_SECRET,
    });
    console.log("hellll");
    const options = req.body;
    console.log(options);
    console.log("hiiihi");
    const order = await razorpay.orders.create(options);
    console.log("doneee");
    if (!order) {
      return res.status(500).send("Error");
    }
    res.header("Access-Control-Allow-Origin","https://cec-canteen-frontend.vercel.app");
    res.json(order);
  } catch (err) {
    console.log(uuuuu);
    console.log(err);
    res.status(500).send("Error");
  }
});
app.post("/api/order/validate", async (req, res) => {
  console.log("Hi akkk");
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});

app.get("/adminorders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
app.post("/getUserByIds", async (req, res) => {
  try {
    console.log("helo");
    const { userIds } = req.body;
    console.log(userIds);
    // Find users based on user IDs
    const users = await Customer.find({ userid: { $in: userIds } });
    console.log(users);
    // Create a mapping of user IDs to user names
    const userMap = {};
    users.forEach((user) => {
      userMap[user.userid] = user.username; // Assuming the user document has a 'name' field
    });
    console.log(userMap);
    // Send the mapping as response
    res.json(userMap);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/adminorders/:orderId/confirm", async (req, res) => {
  try {
    console.log("akkkak");
    console.log(req.params.orderId);
    const { makeTime } = req.body;
    const currentDate = new Date();
    const day = currentDate.getDate(); // Get day (1-31)
    const month = currentDate.getMonth() + 1; // Get month (0-11) and adjust to start from 1
    const year = currentDate.getFullYear(); // Get full year

    // Combine day, month, and year into a string
    const formattedDate = `${day}/${month}/${year}`;
    const currentTime = currentDate.toLocaleTimeString();
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.confirmation = true;
    order.currentDate = formattedDate;
    order.currentTime = currentTime;
    order.makingTime = makeTime;
    order.orderDate = new Date();
    await order.save();

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
app.post("/userorders", async (req, res) => {
  try {
    const userid = req.body.userId;
    console.log(userid);
    const orders = await Order.find({ userId: userid });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
app.put("/api/menu/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;
    const imagePath = req.file ? req.file.path : null;

    // Find the menu item by ID
    const menuItem = await Menu.findById(id);

    // Update the menu item properties
    menuItem.name = name;
    menuItem.description = description;
    menuItem.price = price;
    menuItem.category = category;
    menuItem.stock = stock;
    if (imagePath) {
      menuItem.image = imagePath;
    }

    // Save the updated menu item
    await menuItem.save();

    res.json({ status: "ok", message: "Menu item updated successfully" });
  } catch (error) {
    console.error("Failed to update menu item:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to update menu item" });
  }
});

app.delete("/api/menu/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedMenuItem = await Menu.findByIdAndDelete(id);
    if (!deletedMenuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    res.json(deletedMenuItem);
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await Customer.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/ordersbu", async (req, res) => {
  try {
    const userId = req.query.userId;
    const orders = await Order.find({ userId: userId }).exec(); // Execute the query
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch user orders" });
  }
});

app.get("/adminhome", async (req, res) => {
  try {
    let totp = 0;
    let no_order_month = 0;
    console.log("helloololool");
    const orders = await Order.find({ confirmation: true });
    const pendOrders = await Order.find({ confirmation: false });
    const users = await Customer.find();
    console.log(orders);

    orders.forEach((order) => {
      console.log("hihihihi");
      console.log(order.currentDate);

      const dateTime = order.currentDate; // Assuming 'currentDate' is the date field in your Order model
      const parts = dateTime.split(/[/]/);
      console.log(parts);

      const month = parseInt(parts[1]);
      console.log("Month is:" + month);
      const day = parseInt(parts[0]);
      const year = parseInt(parts[2]);
      console.log("year is:" + year);
      const currentdate = new Date();
      const cur_month = currentdate.getMonth() + 1;
      console.log(cur_month);
      const cur_day = currentdate.getDate();
      const cur_year = currentdate.getFullYear();
      console.log(cur_year);
      if (cur_month === month && cur_year === year) {
        totp += order.price;
        no_order_month++;
        console.log("This order is in this month");
        // Do something with the order
      } else {
        console.log("This order is not in this month");
        // Do something else with the order
      }
    });
    console.log("totp is:" + totp);
    console.log("order per month is:" + no_order_month);
    // Send a response if needed
    res.json({
      totalProfit: totp,
      ordrerPerMonth: no_order_month,
      pendingOrders: pendOrders.length,
      users: users.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
