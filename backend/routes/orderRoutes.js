// const express = require("express");
// const router = express.Router();

// const Order = require("../models/Order");

// router.post("/save-address", async (req, res) => {
//   try {
//     const order = new Order(req.body);

//     await order.save();

//     res.json({
//       success: true,
//       message: "Address Saved",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// module.exports = router; 