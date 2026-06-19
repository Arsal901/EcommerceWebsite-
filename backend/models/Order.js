// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   FullName: String,
//   MobileNo: String,
//   AlternateMobileNo: String,
//   FullAddress: String,
//   NearLandMark: String,
//   PINCODE: String,
//   Town: String,
//   State: String,
// });

// module.exports = mongoose.model("Order", orderSchema);




// confirmorderfile  ka code hai yeh joh handlesubmit mai thaa

//    try {
//     const response = await axios.post( 
//       "http://localhost:5000/save-address",
//       buyerAddress
//     );

//     console.log(response.data);

//     setChangeTab("summary");
//   } catch (error) {
//     console.log(error);
//   }
// }; 


const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true,
  },

  MobileNo: {
    type: String,
    required: true,
  },

  AlternateMobileNo: String,

  FullAddress: {
    type: String,
    required: true,
  },

  NearLandMark: String,

  PINCODE: {
    type: String,
    required: true,
  },

  Town: {
    type: String,
    required: true,
  },

  State: {
    type: String,
    required: true,
  },

  totalPrice: Number,

  // 👇 Ye naye fields add karni hain
  products: [
    {
      title: String,
      price: Number,
      qty: Number,
      img: String,
    },
  ],

  razorpay_order_id: String,

  razorpay_payment_id: String,

  paymentStatus: {
    type: String,
    default: "Paid",
  },

  orderStatus: {
    type: String,
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);