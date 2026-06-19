const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");
require("dotenv").config();
const mongoose = require("mongoose");
const Order = require("./models/Order");



// const orderRoutes = require("./routes/orderRoutes"); 


const app = express();

app.use(cors({
  origin: "*" // change to your domain before going live
}));

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/SahilStore")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err)); 

// app.use("/", orderRoutes);


// console.log("KEY_ID =", process.env.RAZORPAY_KEY_ID);
// console.log("KEY_SECRET =", process.env.RAZORPAY_KEY_SECRET); 

const razorpay = new Razorpay({
 
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Server is running" });
});

// Create Order
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount < 1) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    res.json(order);

  } catch (error) {
    console.error("Razorpay error:", error);
    res.status(500).json({ error: "Order creation failed" });
  }
});

// Verify Payment
app.post("/verify-payment", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, error: "Missing payment details" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.json({ success: true, message: "Payment verified ✅" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature ❌" });
    }

  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ success: false, error: "Verification failed" });
  }
});


//  Save-Order
app.post("/save-order", async (req, res) => {
  try {

    console.log("ORDER RECIEVED:", req.body);

    const order = new Order(req.body);

    await order.save();

    console.log("ORDER SAVED ✅");

    res.status(201).json({
      success: true,
      message: "Order Saved Successfully",
    });

  } catch (error) {
    console.log("SAVE ERROR ❌",error);

    // res.status(500).json({
    //   success: false,
    //   message: "Error saving order",
    // });
  }
});

app.listen(5000, () => { 
  console.log("Server running on port 5000");
});