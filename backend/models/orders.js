const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: [String],
      required: true,
    },
    purchasedItems: {
      type: [String],
      required: true,
    },
    quantity: {
      type: [Number],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { collection: "Orders" }
);

// Create the Orders model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
