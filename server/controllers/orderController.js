const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const { services, totalAmount } = req.body;

    const newOrder = new Order({
      services,
      totalAmount,
      paymentStatus: "pending"
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    await Order.findByIdAndUpdate(orderId, { paymentStatus: "paid" });
    res.status(200).json({ message: "Payment status updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update payment status", error: error.message });
  }
};

module.exports = { createOrder, updatePaymentStatus };
