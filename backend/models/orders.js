
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
    confirmation: {
      type: Boolean,
      required: true,
      default: false,
    },
    currentDate: {
      type: String,
    },
    currentTime: {
      type: String,
    },
    makingTime: {
      type: String,
    },
    orderDate: {
      type: Date,
    },
  },
  { collection: "Orders" }
);

// Create the Orders model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
