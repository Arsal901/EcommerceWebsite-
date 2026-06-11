
function Onsale() { 

    const OnsaleProducts = [
                            {img:"qq.webp", category:"Books", title:"Quran", offer:"₹999", price:"₹899"},
                            {img:"quran.png", category:"Books", title:"Quran", offer:"₹999", price:"₹899"},
                            {img:"qq.webp", category:"Books", title:"Quran", offer:"₹999", price:"₹899"},
                            {img:"quran.png", category:"Books", title:"Quran", offer:"₹999", price:"₹899"},
                            {img:"qq.webp", category:"Books", title:"Quran", offer:"₹999", price:"₹899"},
                            {img:"quran.png", category:"Books", title:"Quran", offer:"₹999", price:"₹899"},
                            {img:"qq.webp", category:"Books", title:"Quran", offer:"₹999", price:"₹899"},
                            {img:"quran.png", category:"Books", title:"Quran", offer:"₹999", price:"₹899"},
                             
                           ]


    return (

        <>

        <div className="OnSaleContainer">
            <span><h2>ON SALE</h2> </span>

            <div className="onsalebutton">
                <button>View All</button>
            </div>
    
          <div className="line">
            <p></p>
          </div>


            {OnsaleProducts.map((item, index)=> ( 
              <div className="OnsaleBox">
                 <h3 id="category">{item.category}</h3>
                <img src={item.img} alt="#" />
                <h3>{item.title}</h3>
                <p><span>{item.offer}</span>  {item.price}</p>
                <div className="Selectbutton">
                    <button>ADD TO CART</button> 
                </div> 
            </div>
            ))}  
        </div>





        
        
        
        </>
    )
}
  
export default Onsale;