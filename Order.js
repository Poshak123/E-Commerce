const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
      size: { type: String }
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, default: "Pending" },
  address: { type: String, required: true },
  paymentMethod: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
