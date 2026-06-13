
import Navbar from "./NavBar";
import HeroSlider from "./HeroSection";
import Products from "./ProductSection";
import Card from "./Cards";
import Onsale from "../Onsale";
import FooterArea from "../Footer";
import ProductDetailPage from "./ProductDetailPage";
import { useState, useEffect } from "react";

import {BrowserRouter, Routes, Route } from "react-router-dom"; 

import PaymentButton from "./PaymentButton";    



function App() {

          const [cart, setCart] = useState([]);
          const [OpenCartBar, setOpenCartBar] = useState(false); 



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
         <Navbar cart={cart} OpenCartBar={OpenCartBar} setOpenCartBar={setOpenCartBar} setCart={setCart}/>
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
        /> 

        <Route path="/product-detail/:id" element={<ProductDetailPage handleAddToCartProductdetailPage={handleAddToCartProductdetailPage} setOpenCartBar={setOpenCartBar}/> }  /> 
</Routes>
<FooterArea /> 
{/* </BrowserRouter> */}  
    
    </>
  )
}

export default App;