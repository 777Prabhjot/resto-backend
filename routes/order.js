import express from "express";
import Order from "../db/modules/Order.js";
import User from "../db/modules/User.js";
import { userAuth } from "../middlewares/userAuth.js";
const router = express.Router();

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json({ results: orders });
  } catch (error) {
    console.log(error);
  }
});

router.get("/ordersByUser", userAuth, async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findOne({ email: id });
    if (user) {
      const orders = await Order.find({ orderBy: user._id });
      return res.status(200).json({ results: orders });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/placeOrder", userAuth, async (req, res) => {
  const { image, name, quantity, price } = req.body;
  const { id } = req.user;
  if (!image || !name || !quantity || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const deliverIn = Math.floor(Math.random() * 30) + 1;
    const totalPrice = quantity * price;
    const user = await User.findOne({ email: id });

    if (user) {
      const order = await new Order({
        image,
        name,
        quantity,
        price: totalPrice,
        deliverIn,
        orderBy: user._id,
      });

      await order.save();
    }
    return res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
