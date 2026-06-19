
import Navbar from "./NavBar";
import HeroSlider from "./HeroSection";
import Products from "./ProductSection";
import Card from "./Cards";
import Onsale from "../Onsale"; 
import FooterArea from "./Footer";
import ProductDetailPage from "./ProductDetailPage";
import { useState, useEffect } from "react";
import CheckoutStepper from "./ConfirmOrder";
import { useLocation } from "react-router-dom";

import {BrowserRouter, Routes, Route } from "react-router-dom"; 

// import axios from "axios";


// import PaymentButton from "./PaymentButton";     



function App() {

          // const [cart, setCart] = useState([]); 
          const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : []; 
});

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);



          const [OpenCartBar, setOpenCartBar] = useState(false); 
          const location = useLocation(); // footer ko confirmorderpage se hatane ke liye 

//           const handlePayment = async (e) => {
//   if (e) e.preventDefault();
//   console.log("KEY:", import.meta.env.VITE_RAZORPAY_KEY_ID); 

//   try {
//     const { data: order } = await axios.post(
//       "http://127.0.0.1:5000/create-order",
//       { amount: product.price * qty } // ✅ real price × qty
//     );

//     if (!window.Razorpay) {
//       alert("Razorpay SDK not loaded"); 
//       return;
//     }



//     const options = {
//       // key: import.meta.env.VITE_RAZORPAY_KEY_ID,  // ✅ from .env
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_T1s9MY6yA3irHF",  // ✅ from .env
//       amount: order.amount,
//       currency: order.currency,
//       name: "My Store",
//       description: "Product Purchase",
//       order_id: order.id,

//       handler: async function (response) {
//         try {
//           // ✅ verify payment on backend
//           const { data } = await axios.post(
//             "http://127.0.0.1:5000/verify-payment",
//             {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//             }
//           );

//           if (data.success) {
//             alert("Payment Successful & Verified ✅");
//           } else {
//             alert("Payment verification failed ❌");
//           }
//         } catch (err) {
//           console.error("Verification error:", err);
//           alert("Could not verify payment");
//         }
//       },

//       theme: { color: "#3399cc" },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.on("payment.failed", function (response) {
//       alert("Payment failed: " + response.error.description);
//     });
//     rzp.open();

//   } catch (error) {
//     console.error("Payment error:", error);
//     alert("Order creation failed");
//   }
// };



  //  function handleAddToCart(item) {
  //                   setCart([...cart, item]);
  //                   console.log(item);
  //                }

  function handleAddToCart(item) {
  setCart(prev => { 
    const existing = prev.find(i => i.id === item.id); 

    if (existing) {
      return prev.map(i =>
        i.id === item.id
          ? { ...i, qty: i.qty + 1, 
            total: (i.qty + 1) * i.price 
           }
          : i
      );
    }

    return [...prev, { ...item, qty: 1, total: item.price }];
  });
}

const handleAddToCartProductdetailPage = (product) => {

  setCart((prevCart) => {

    const existingItem = prevCart.find(
      (item) => item.id === product.id
    );

    // AGAR ITEM PEHLE SE HAI
    if (existingItem) {

      return prevCart.map((item) =>
        item.id === product.id
          ? {
              ...item,

              qty: item.qty + product.qty,

              total:
                (item.qty + product.qty) * item.price,
            }
          : item
      );
    }

    // AGAR NAYA ITEM HAI
    return [
      ...prevCart,
      {
        ...product,
        total: product.price * product.qty,
      },
    ];
  });
};

// const handleAddToCart = (newProduct) => {
//   setCart((prev) => {
//     const existing = prev.find(item => item.id === newProduct.id);

//     if (existing) {
//       return prev.map(item =>
//         item.id === newProduct.id
//           ? { ...item, qty: item.qty + newProduct.qty }
//           : item
//       );
//     }

//     return [...prev, newProduct];
//   });
// };

     

  useEffect(() => {
  if (OpenCartBar) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [OpenCartBar]); 

  return (

    <>

  {/* <BrowserRouter> */}
         {OpenCartBar && (
          <div
          className="overlays"
          onClick={()=> setOpenCartBar(false)}>
          </div>
         )}
         {!location.pathname.startsWith("/ConfirmOrder") && (
            <Navbar cart={cart} OpenCartBar={OpenCartBar} setOpenCartBar={setOpenCartBar} setCart={setCart} /> 
)}
         
         <Routes> 
          <Route path="/" element={ 
      <>
          <HeroSlider /> 
         <Products />
         <Card handleAddToCart={handleAddToCart} setOpenCartBar={setOpenCartBar}/>          
         <Onsale /> 
         

          {/* <PaymentButton/>   */}
         
     </> 
          } 
        // /> 
        /> 
        <Route path="/ConfirmOrder/:id"  element={<CheckoutStepper cart={cart} setCart={setCart} />}/>
        <Route path="/ConfirmOrder"  element={<CheckoutStepper cart={cart} setCart={setCart} />}/>
        <Route path="/product-detail/:id" element={<ProductDetailPage handleAddToCartProductdetailPage={handleAddToCartProductdetailPage} setOpenCartBar={setOpenCartBar} setCart={setCart}/> }  /> 
          
      
</Routes>

{/* <FooterArea />  */}
{!location.pathname.startsWith("/ConfirmOrder") && ( 
  <FooterArea />
)}

       
{/* </BrowserRouter> */}  
    
    </>
  )
}

export default App;