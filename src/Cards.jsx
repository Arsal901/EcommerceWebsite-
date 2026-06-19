import { IoCartOutline } from "react-icons/io5";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";


function Card({handleAddToCart, setOpenCartBar}) { 



    const Data = [
                    {
                    id: 1, 
                    img:"Green Main.PNG", 
                    // style:{
                    //     width:"100%", 
                    //     maxwidth:"90%",
                    //     height:"100%",
                    //     maxheight:"50%",
                    // },
                    title:"Holy Quran – Urdu translation in ROMAN Scri..",
                    rating:"5",
                    price: 799.00,  
                    },

                    {id:2, 
                    img:"Hadith1.PNG",
                    title:"Muntakhab Ahadees Roman Urdu (HB)...",
                    rating:"4", 
                    price:375.00, 
                    },

                    {id:3,  
                    img:"Trace4.PNG",
                    title:"Trace Quran (Writable Quran) – Write, Learn..",
                    rating:"4.5",
                    price:699.00, 
                    },
                     {id:4, 
                        img:"that one.jpg",
                    title:"My QR Quran with Roman Urdu Arabic & Eng...", 
                    rating:"4.5",
                    price: 1200.00,   
                    },
                 ]



                



    return (

        <>
            <div className="MainCardBox"> 

        {Data.map((item, index)=> ( 
            <div className="Cardbox" key={index}> 
           <Link to={`/product-detail/ ${item.id}`}><img src={item.img} alt="#" /></Link>
            <h3>{item.title}</h3>
            <div className="rating">  
       {[...Array(5)].map((_, starIndex) => { 

                            if (item.rating >= starIndex + 1) {
                                return <FaStar key={starIndex} />;
                            }

                            else if (item.rating >= starIndex + 0.5) {
                                return <FaStarHalfAlt key={starIndex} />;
                            }

                            else {
                                return <FaRegStar key={starIndex} />; 
                            }

                        })} 
            </div>
            <p>{item.price}</p>
            <div className="AddtoCartbtn">
                <IoCartOutline className="Addtocart" />   
                <button onClick={
                    ()=> {
                    handleAddToCart(item); 
                    setOpenCartBar(true); 
                }}>ADD TO CART</button>    
            </div>
        </div>
        ))}  
                </div>

        
        </>
    )
}

export default Card;