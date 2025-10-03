const Order = require("../models/Order");

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { products, total, address, paymentMethod } = req.body;
    const order = await Order.create({
      user: req.user.id,
      products,
      total,
      address,
      paymentMethod
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("products.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
