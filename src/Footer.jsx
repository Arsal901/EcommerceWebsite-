
function FooterArea() {

    return (

        <>
         
        <div className="EmailSubsCribebox">
        <h1>Stay Connected With Us</h1>
        <p>Subscribe for new arrivals & exclusive offers</p>

        <form>
            <div className="Subscribe">
                <input type="email" 
                placeholder="Your Email Address" /> 
                <button>Subscribe</button> 
            </div>
        </form>
</div> 

<div className="Footerbox">
    <h2>SahilRajput</h2>
    <p>SahilRajput is a islamic brand</p>

    <div className="Shopdata">
        <ul>
            <h3>Shop</h3>
            <li>Home</li>
            <li>All products</li>
            <li>New Arrivals</li>
            <li>Sale</li>
        </ul>
    </div>

    <div className="Accountdata">
        <ul>
             <h3>Account</h3>
            <li>My Account</li>
            <li>Orders</li>
            <li>Cart</li>
        </ul>
    </div>

    <div className="Help">
        <ul>
            <h3>Help</h3>
            <li>Contact Us</li>
            <li>Shipping Policy</li>
            <li>Privacy Policy</li>
            <li>Term of Service</li>  
        </ul>
    </div>
</div>


<div className="Copyright">
    <h1>@2026 SahilRajput All Right Reserved</h1> 
</div>
         
        
        </>
    )
}

export default FooterArea;
