const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  cart: { type: [String], default: [] },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
}, { collection: "Customer" });

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;