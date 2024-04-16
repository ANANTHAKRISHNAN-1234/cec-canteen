const mongoose = require("mongoose");

const Customer = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    cart: { type: [String], default: [] },
    orders: { type: [String], default: [] },
  },
  { collection: "Customer" }
);

const Customers = mongoose.model("CustomerData", Customer);

module.exports = Customers;
