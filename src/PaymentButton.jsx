import axios from "axios";

function PaymentButton() {

  const handlePayment = async () => {
    try {
      // 1. create order
      const { data: order } = await axios.post(
        "http://localhost:5000/create-order",
        { amount: 499 }
      );

      // 2. options for Razorpay
      const options = {
        key: "rzp_test_T18WxjuzH98hhE",  
        amount: order.amount, 
        currency: order.currency,
        name: "My Store",
        description: "Product Purchase",
        order_id: order.id,

        handler: function (response) {
          alert("Payment Successful");
          console.log(response);
        },

        theme: {
          color: "#3399cc",
        },
      };

      // 3. open checkout
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.log("Payment error:", error);
      alert("Payment failed or backend not running");
    }
  };

  return (
    <button onClick={handlePayment}>
      Pay ₹499
    </button>
  );
}

export default PaymentButton;