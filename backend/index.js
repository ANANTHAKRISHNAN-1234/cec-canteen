const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 7000;
const connectDB = require("./db");
connectDB();
const cors = require("cors");
const User = require("./models/adminuser");
const Menu = require("./models/menustruct");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/admin", (req, res) => {
  res.send("hello");
});
app.listen(PORT, () => {
  console.log("server is listening on PORT:" + PORT);
});
app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
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

    const isPasswordValid = await bcrypt.compare(adminpassword, user.password);

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
