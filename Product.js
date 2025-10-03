const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String, enum: ["men", "women", "kids", "accessories"], required: true },
  size: { type: [String], enum: ["S", "M", "L", "XL"] }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
