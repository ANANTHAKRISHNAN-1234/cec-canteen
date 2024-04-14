const mongoose = require("mongoose");

const Menu = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { collection: "Menu" }
);

const FoodMenu = mongoose.model("MenuData", Menu);

module.exports = FoodMenu;
