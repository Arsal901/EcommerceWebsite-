import axios from "axios";

function PaymentButton() {

  const handlePayment = async () => { 
    try {

      const response = await axios.post(
        "http://localhost:5000/create-order",
        {
          amount: 499,
        }
      );

      const order = response.data;

      const options = {
        key: "rzp_test_T12oAdDJX9pN7o",

        amount: order.amount,

        currency: order.currency,

        order_id: order.id,

        name: "My Store",

        description: "Product Purchase",

        handler: function (response) {
          alert("Payment Successful");

          console.log(response);
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={handlePayment}>
      Pay ₹499
    </button>
  );
}

export default PaymentButton;