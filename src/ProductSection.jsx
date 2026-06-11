import { FaGift } from "react-icons/fa6";
import { ImBooks } from "react-icons/im";
import { GiClothes } from "react-icons/gi";
import { TbPerfume } from "react-icons/tb";


function Products() {

    return (

        <>

        <div className="TagsSection">
            <div className="Clothing">
                <GiClothes className="Clothicon"/>
                <h3>Clothing</h3>
            </div>
            <div className="Books">
                <ImBooks className="Bookicon"/>   
                <h3>Books</h3>
            </div>
            <div className="Gifts">
                <FaGift className="Gifticon" /> 
                <h3>Gifts</h3> 
            </div>
            <div className="Perfumes">
                <TbPerfume className="Perfumeicon" /> 
                <h3>Perfumes</h3> 
            </div>
        </div>


        
        
        </>
    )
}

export default Products;