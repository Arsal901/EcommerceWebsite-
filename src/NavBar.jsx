
import { RxHamburgerMenu } from "react-icons/rx";
import { FiUser } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";


import { MdHome } from "react-icons/md";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";

import { IoMdRefresh } from "react-icons/io";
import { CiHeart } from "react-icons/ci";

import { MdOutlineShoppingCart } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";

import { RxCross1 } from "react-icons/rx";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";

import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";


import { useEffect } from "react";






 
function Navbar({cart, setCart, OpenCartBar, setOpenCartBar}) {

    const [openSideBar, setOpenSideBar] = useState(false);
    // const [OpenCartBar, setOpenCartBar] = useState(false); 

useEffect(() => {
  if (openSideBar) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto"; 
  }
}, [openSideBar]);

    return (

        <>
           {openSideBar && ( 
            <div className="overlay" onClick={() => setOpenSideBar(false)}></div>
        )}   
         

        <div className="MainContainer">
            <div className="Menu">
                <RxHamburgerMenu className="hamburgerIcon" onClick={()=> setOpenSideBar(true)} />   
                
               {/* {openSideBar && ( */}
                {/* <div className="SideBar"> */}
                <div className={`SideBar ${openSideBar ? "ShowSideBar" : "HideSideBar" }`}>  
                 <div className="first">
                    <div className="Crossicon"> 
                     <RxCross2 className="Cancelicon" onClick={()=> setOpenSideBar(false)} />
                    </div>
                        <FiUser className="usericon" />
                        <span><h1>SAHILRAJPUT</h1><p>Sahil Rajput is a Islamic brand</p></span>
                    </div>


                <div className="sideBarMenus">

                    <div className="second">
                        <h4>Browse</h4>
                        <p></p>
                        <Link className="SideBarHome" to="/"><div className="Home">
                         <MdHome className="Homeicon" />
                         <h2>Home</h2> 
                        </div></Link>

                        <div className="Shop">
                         <RiShoppingBag4Fill className="Shopicon"/>
                         <h2>Shop</h2> 
                        </div>

                        <div className="Cart">
                         <FaShoppingCart className="Carticon" />
                         <h2>Cart</h2> 
                        </div>
                    </div>


                    {/* Third  */}

                     <div className="Third">
                        <h4>Account</h4> 
                        <p></p>
                        <div className="MyAccount">
                         <FiUser className="Accounticon" />
                         <h2>My Acount</h2> 
                        </div>

                        <div className="Order">
                         <IoMdRefresh className="Ordericon"/>
                         <h2>Order History</h2> 
                        </div>

                        <div className="Wishlist">
                         <CiHeart className="Wishlisticon" />
                         <h2>Wishlist</h2>  
                        </div>
                    </div>

                    {/* Fourth  */}

                     <div className="Third">
                        <h4>Blank</h4>  
                        <p></p>
                        <div className="MyAccount">
                         <FiUser className="Accounticon" />
                         <h2>Blank</h2> 
                        </div>

                        <div className="Order">
                         <IoMdRefresh className="Ordericon"/>
                         <h2>Blank</h2> 
                        </div>

                        <div className="Wishlist">
                         <CiHeart className="Wishlisticon" />
                         <h2>Blank</h2>   
                        </div>
                    </div>


                    
                    </div>

                   <div className="Sidebarfooter">
                     <h4>SahilRajput @ 2026</h4>
                   </div>
                </div>
                {/* )} */}
                </div>

                   <Link className="HomeLink" to="/"><h1>SAHILRAJPUT</h1></Link> 

                <div className="ShoppingCart">
                    <FaShoppingCart className="Shopcart" onClick={()=> setOpenCartBar(true)} />
                </div>





                {/* {OpenCartBar && ( */}
                   {/* <div className="RightCartBar">  */}
                   <div className={`RightCartBar ${OpenCartBar ? "ShowCartBar" : "HideCartBar" }`}> 
                    <div className="Head"> 
                        <MdOutlineShoppingCart className="CartBarCart" /> 
                        <h1>CART</h1>  
                        <p></p>  
                        <RxCross2  className="CartClose" onClick={()=>setOpenCartBar(false)}/> 
                    </div>

              <div className="CartBody">
                    {cart.length === 0 ? (
                        <>
                       <BsCart4  className="BigCart"/>   
                       <p>Add items to get started</p>
                       </>
                    ):(
                         cart.map((item, index) => (
                         <div key={index} className="cartItem">
                         <img src={item.img} alt="#" />   
                         <h4>{item.title}</h4>  
                         <RxCross1 className="AddItemCancel" onClick={ () =>  
                            setCart(prev => prev.filter((_, i) => i !== index))} />   
                         {/* <p>{item.price}</p>  */}

                         <p className="Cartitemline"></p>

                         <CiCircleMinus className="Minusbtn"
                         onClick={() => {
                            if(item.qty <= 1) return; 
                         setCart(prev =>
      prev
        .map(i =>
          i.id === item.id
            ? { ...i, qty: i.qty - 1,
                total: (i.qty - 1) * i.price
             }
            : i
        )
        .filter(i => i.qty > 0) 
    );  
                         }} />
                          <h5 className="qtynumber">{item.qty}</h5><CiCirclePlus className="Plusbtn"
                         onClick={() => {
    setCart(prev =>
      prev.map(i =>
        i.id === item.id 
          ? { ...i, qty: i.qty + 1,
            total:(i.qty + 1) * i.price
           }
          : i
      )
    );
  }} /> 


  <p className="totalprice">₹{item.total}</p>    

                        </div>
                       ))
                       )}
</div>



{cart.length > 0 && (
<div className="CartLastbox">

    <div className="SubtotalValue">
        <h4>Subtotal</h4> 
        <h4>₹{cart.reduce((acc, item) => acc + item.total, 0)}</h4> 
    </div>

    {/* <p className="CartLastline"></p>  */}

    <div className="TotalCartValue">
        <h4>Total</h4> 
        <h4>₹{cart.reduce((acc, item) => acc + item.total, 0)}</h4>  
    </div>


    <div className="ViewFullCart">
        <button>VIEW FULL CART</button>
    </div>

    <div className="BuyBtn">
        <button>BUY NOW</button>  
    </div>
</div>
)}

{/* /* Add to Cart notification   */}



{/* <div className="cartContainer">
 
      {cart.length > 0 && (
        <span className="cartBadge">
          {cart.length}
        </span>
      )}

    </div> */}


                    {/* <div className="BrowseShop">
                        <button>BROWSE SHOP</button>    
                    </div> */}
                </div>
                {/* )} */}

                <div className="cartContainer">
 
      {/* <IoCartOutline className="cartIcon" />  */}
      {cart.length > 0 && (
        <span className="cartBadge">
          {cart.length}
        </span>
      )}

    </div>
                
        </div>

       

        
        
        
        </>
    )
}

export default Navbar;   