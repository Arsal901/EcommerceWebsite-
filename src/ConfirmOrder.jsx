import { useState } from "react";
// import { RxCross1 } from "react-icons/rx";
// import Card from "./Cards";
import { Link } from "react-router-dom"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CheckoutStepper({ cart, setCart }) {
  // const [city, setCity] = useState(""); 
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const buyNowProduct =
  JSON.parse(localStorage.getItem("buyNowProduct")) || [];

const checkoutItems =
  buyNowProduct.length > 0
    ? buyNowProduct
    : cart;

// const totalPrice = cart.reduce(
//   (total, item) => total + item.price * item.qty,
//   0
// ); 

const totalPrice = checkoutItems.reduce(
  (total, item) => total + item.price * item.qty,
  0
);

console.log("Cart Data:", cart);

const [ChangeTab, setChangeTab] = useState("address");


// Pin Code  se City/Town and state fetch karenge through API 

const [pinCode, setPinCode] = useState("");
const [city, setCity] = useState("");
const [state, setState] = useState("");

const handlePinCodeChange = async (e) => {   
  const pin = e.target.value;

  setPinCode(pin);

  // buyerAddress me bhi PINCODE update karo
  setBuyerAddress((prev) => ({
    ...prev,
    PINCODE: pin,
  }));

  if (pin.length === 6) {
    try {
      const res = await fetch(
        `https://api.postalpincode.in/pincode/${pin}`
      );

      const data = await res.json();

      if (data[0].Status === "Success") {
        const fetchedCity = data[0].PostOffice[0].District;
        const fetchedState = data[0].PostOffice[0].State;

        setCity(fetchedCity);
        setState(fetchedState);

        // buyerAddress me Town aur State bhi update karo
        setBuyerAddress((prev) => ({
          ...prev,
          PINCODE: pin,
          Town: fetchedCity,
          State: fetchedState,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (pin.length === 0) {
    setPinCode("");
    setCity("");
    setState("");

    setBuyerAddress((prev) => ({
      ...prev,
      PINCODE: "",
      Town: "",
      State: "",
    }));
  }
};


const [buyerAddress, setBuyerAddress] = useState({
  FullName : "",
  MobileNo : "",
  AlternateMobileNo : "",
  FullAddress : "",
  NearLandMark : "",
  PINCODE : "",
  Town : "",
  State : "",
});

const isFormValid =
  buyerAddress.FullName.trim() !== "" &&
  buyerAddress.MobileNo.trim() !== "" &&
  buyerAddress.FullAddress.trim() !== "" &&
  buyerAddress.PINCODE.trim() !== "" &&
  buyerAddress.Town.trim() !== "" &&
  buyerAddress.State.trim() !== "";

const handleChange = (e) =>  {
  setBuyerAddress({
    ...buyerAddress,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = (e) => {
  e.preventDefault();

    if (!isFormValid) { 
    alert("Please fill all required fields"); 
    return;
  }
    setChangeTab("summary"); 
    console.log(buyerAddress) 

}; 

console.log(isFormValid);
console.log(buyerAddress);
console.log("FullName:", buyerAddress.FullName);
console.log("MobileNo:", buyerAddress.MobileNo);
console.log("FullAddress:", buyerAddress.FullAddress);
console.log("PINCODE:", buyerAddress.PINCODE);
console.log("Town:", buyerAddress.Town);
console.log("State:", buyerAddress.State);

// console.log(cart); 



const handlePayment = async (e) => {
  e.preventDefault();

  // COD selected
  if (paymentMethod === "COD") {
    alert("Order Placed Successfully ✅");
    setCart([]);
            navigate("/");
    return;
  }

  // Online payment selected
  try {
    const { data: order } = await axios.post(
      "http://127.0.0.1:5000/create-order",
      {
        amount: totalPrice,
      }
    );

    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key:
        import.meta.env.VITE_RAZORPAY_KEY_ID ||
        "rzp_test_T1s9MY6yA3irHF",

      amount: order.amount,
      currency: order.currency,
      name: "SAHILRAJPUT",
      description: "Order Payment",
      order_id: order.id,

      handler: async function (response) {
        try {
          const { data } = await axios.post(
            "http://127.0.0.1:5000/verify-payment",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }
          );

          if (data.success) {

              await axios.post(
    "http://127.0.0.1:5000/save-order",
    {
      ...buyerAddress,
      totalPrice,

      products: checkoutItems,

      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,

      paymentStatus: "Paid",
      orderStatus: "Pending",
    }
  );

            alert("Payment Successful ✅");
            localStorage.removeItem("buyNowProduct");
            setCart([]);
            navigate("/"); 
          } else {
            alert("Payment Verification Failed ❌");
          }
        } catch (error) {
          console.error(error);
          alert("Verification Error");
        }
      },

      prefill: {
        name: buyerAddress.FullName,
        contact: buyerAddress.MobileNo,
      },

      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      alert(response.error.description);
    });

    rzp.open();
  } catch (error) {
    console.error(error);
    alert("Order Creation Failed");
  }
};
  

  return (
    <>

            <div className="MainContainer" id="ConfirmOrderNav">
      <Link className="HomeLink" to="/" id="ConfirmOrderNavLogo"><h1>SAHILRAJPUT</h1></Link> 
            </div>

      <div className="BackgroundContainer">

        <div className="ThreeTask">

          <div className={`FirstAddress ${ChangeTab === "address" ? "activeStep" : ""}`}>
            <h1>1</h1>
             <h3>ADDRESS</h3> 
          </div>

          <div className={`SceondSummary ${ChangeTab === "summary" ? "activeStep" : ""}`}>
            <h1>2</h1>
             <h3>SUMMARY</h3>
          </div>

          <div className={`ThiredPayment ${ChangeTab === "payment" ? "activeStep" : ""}`}>
            <h1>3</h1>
             <h3>PAYMENT</h3>
          </div>

        </div>

        <div className="FirstArea">

        {ChangeTab === "address" && (
        <div className="AddressMain">
          <h2>Shipping Details</h2>
         <br />
          <hr />
          <form onSubmit={handleSubmit}>
          <div className="Address">
            <div className="FullName">
              <p>Full Name</p>
              <input
               type="text"
               placeholder="Full Name"
              name="FullName"
              value={buyerAddress.FullName}
              onChange={handleChange} />
            </div>
            
            <div className="Phonenumbers">
            <div className="MobileNo">
              <p>Mobile No</p>
              <input
               type="number"
              placeholder="Mobile No"
              name="MobileNo"
              value={buyerAddress.MobileNo}
              onChange={handleChange} />
            </div>

            <div className="AlternateMobile">
              <p>Alternate Mobile No</p>
              <input 
              type="number"
              placeholder="Alternate Mobile No"
              name="AlternateMobileNo" 
              value={buyerAddress.AlternateMobileNo}
              onChange={handleChange}/>
            </div>
            </div>

            <div className="fullAddress">
              <p>Full Address</p>
              <input
               type="text"
               placeholder="FullAddress"
              name="FullAddress"
              value={buyerAddress.FullAddress}
              onChange={handleChange} />
            </div>

            <div className="Landmark">
              <p>Near By Landmark</p>
              <input 
              type="text"
              placeholder="Near By LandMark"
              name="NearLandMark"
              value={buyerAddress.NearLandMark}
              onChange={handleChange} />
            </div>

           <div className="CityCode">

            <div className="PinCode">
              <p>PINCODE</p>
              <input
               type="text"
               placeholder="Enter Pin Code"
               name="PINCODE"
               value={pinCode}
               onChange={handlePinCodeChange}  
              />
            </div>

            <div className="Town">
              <p>Town/City</p>
              <input 
              type="text" 
              placeholder="Town/City"
              name="Town"
              value={city}
              readOnly/>
            </div>

            </div>

            <div className="State"> 
              <p>State</p>

              <input 
              type="text" 
              value={state}
              readOnly
              placeholder="State"/>

              {/* <select
               name="State"
                value={buyerAddress.State}
                onChange={handleChange}
              >
                <option value="">Select State</option>
                <option value="Delhi">Delhi</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Karnataka">USA</option> 
              </select> */}
            </div>

            <button className="Continue" type="submit" disabled={!isFormValid}>
            {/* <button className="Continue" type="submit"> */} 
               Continue to Summary
            </button>  
          </div> 
          </form>
        </div>

      )}
</div>
      
{/* // cart.map((item) => (  */}
{/* OrderSummary in Address and Payment section  */}
      {/* {(ChangeTab === "address" || ChangeTab === "payment") && 

checkoutItems.map((item) => ( 
  <div className="ConfirmOrderDetails" key={item.id}> 
    <h4>ORDER SUMMARY</h4>
   <br />
    <hr />

    <div className="OrderSummary">
      <img src={item.img} alt={item.title} />
      <h3>{item.title}</h3> 
      <p>Qty: {item.qty}</p>
      <h5>₹{item.price}</h5>
    </div>

    <div className="Shipping">
      <p>Shipping</p>
      <h3>Free</h3>
    </div>

    <br />

    <div className="Total">
      <h2>Total</h2>
      <p>₹{totalPrice}</p>
    </div>
  </div>

))} */}

 

  {(ChangeTab === "address" || ChangeTab === "payment") && (
  <div className="ConfirmOrderbyCard">
    <h4>ORDER SUMMARY</h4>

    {checkoutItems.map((item) => (
      <div className="OrderSummaryCard" key={item.id}>
        <img src={item.img} alt={item.title} />

        <div className="ProductInfo">
          <h3>{item.title}</h3>

          <div className="ProductInfotext">
            <p className="qtyofProductinfo">
              Qty: {item.qty}
            </p>

            <p className="PriceofProductinfo">
              ₹{item.price}
            </p>
          </div>
        </div>
      </div>
    ))}

    <div className="Shipping">
      <p>Shipping</p>
      <h3>Free</h3>
    </div>

    <div className="Total">
      <h2>Total</h2>
      <p>₹{totalPrice}</p>
    </div>
  </div>
)}

    




  
   


      {/* SUMMARY  */}

 {/* 🟢 ADDRESS PREVIEW (EDITABLE LOOK) */}
    {ChangeTab === "summary" && (
  <div className="SummaryAddressBox">
    <h3>Shipping Address</h3>

    <p><b>Name:</b> {buyerAddress.FullName}</p>
    <p><b>Mobile:</b> {buyerAddress.MobileNo}</p>
    <p><b>Alt Mobile:</b> {buyerAddress.AlternateMobileNo}</p>
    <p><b>Address:</b> {buyerAddress.FullAddress}</p>
    <p><b>Landmark:</b> {buyerAddress.NearLandMark}</p>
    <p><b>PIN:</b> {buyerAddress.PINCODE}</p>
    <p><b>City:</b> {buyerAddress.Town}</p>
    <p><b>State:</b> {buyerAddress.State}</p>

    <button
      className="EditAddressBtn"
      onClick={() => setChangeTab("address")}
    >
      Edit Address
    </button>
  </div>
)}




{ChangeTab === "summary" && (
  <div className="SummaryTabConfirmOrderDetails">

    <h4>Review Order</h4>
    <br />
    <hr />

    {checkoutItems.map((item) => (
      <div className="SummaryTabOrderSummary" key={item.id}>
        <img src={item.img} alt={item.title} />

        <div>
          <h3>{item.title}</h3>
          <p>Qty: {item.qty}</p>
          <h5>₹{item.price}</h5>
        </div>
      </div>
    ))}

    <div className="SummaryTabShipping">
      <p>Shipping</p>
      <h3>Free</h3>
    </div>

    <div className="SummaryTabSubtotal">
      <p>Subtotal</p>
      <h3>₹{totalPrice}</h3>
    </div>

    <div className="SummaryTabTotal">
      <h2>Total</h2>
      <p>₹{totalPrice}</p>
    </div>

    <div className="SummaryButtons">
      <button
        className="BackBtn"
        onClick={() => setChangeTab("address")}
      >
        Back
      </button>

      <button
        className="PaymentBtn"
        onClick={() => setChangeTab("payment")}
      >
        Continue to Payment
      </button>
    </div>

  </div>
)}



{/* <div className="secondArea">
 {ChangeTab === "summary" && 
  // cart.map((item) => (
  checkoutItems.map((item) => (
    <div className="SummaryTabConfirmOrderDetails" key={item.id}>
      <h4>Review Order</h4>

      <br />
      <hr />

      <div className="SummaryTabOrderSummary">
        <img src={item.img} alt={item.title} />
        <h3>{item.title}</h3>
        <p>Qty: {item.qty}</p>
        <h5>₹{item.price}</h5>
      </div>

      <div className="SummaryTabShipping">
        <p>Shipping</p>
        <h3>Free</h3>
      </div>

      <div className="SummaryTabSubtotal">
        <p>Subtotal</p>
        <h3>₹{totalPrice}</h3>  
      </div>

      <br />

      <div className="SummaryTabTotal">
        <h2>Total</h2>
        <p>₹{totalPrice}</p>  
      </div>

      <br />
      <hr />       

      <div className="SummaryButtons">
        <button
          className="BackBtn"
          onClick={() => setChangeTab("address")}>Back</button>  
        <button className="PaymentBtn" onClick={() => setChangeTab("payment")}> Continue to Payment</button>
      </div>
    </div>
  ))
}

</div> */}

<div className="ThiredArea">
{ChangeTab === "payment" && (
  <div className="PaymentSection">
    <h1>PAYMENT METHOD</h1>

    <div className="PaymentBox">

      <label className="PayOnline">
        <input
          type="radio"
          name="payment"
          value="UPI"
          checked={paymentMethod === "UPI"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        Pay Online (UPI, Cards, NetBanking)
      </label>

      

      <label className="CashonDelivery">
        <input
          type="radio"
          name="payment"
          value="COD"
          checked={paymentMethod === "COD"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        Cash On Delivery
      </label>

      <div className="LastPaymentsectionbtns">

      

      <button className="BackofPayment" onClick={() => setChangeTab("summary")}> 
        Back
      </button>

      <button className="PaymentDone"
        onClick={handlePayment}
        disabled={!paymentMethod}
      >
        Place Order
      </button>
      </div>

    </div>
  </div>
)}


</div>



  
     

      </div>
    </>
  );
}

export default CheckoutStepper;