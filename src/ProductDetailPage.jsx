import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";

import { FaShoppingCart } from "react-icons/fa";

import axios from "axios";



function ProductDetailPage({handleAddToCartProductdetailPage, setOpenCartBar}) { 
  const { id } = useParams();

  const [changeImage, setChangeImage] = useState(null); 

  

  const ProductImages = {
    1: [
      { id: 1, img: "/Green Main.PNG", title:"Holy Quran – Urdu translation in ROMAN Script with Transliteration and Arabic Text by Mufti Taqi Usmani", price:799, offer:"₹1399", discount:"26%OFF", rating:"4.6", 
      description:`Qur’an Kareem Allah Ta’ala ki woh Kitaab hai jo khud mein ek mojza hai, isliye iska theek theek tarjuma aur iski 
      balaaghat waghairah ko kisi dusri zabaan mein utaar dena bilkul na-mumkin hai, lekin jitna mumkin ho sakta tha iski 
      koshishein huin, isi saff mein Mufti Taqi Usmani sahab ne ek aasaan aur aam fahem zabaan mein Urdu Tarjuma 
      Qur’an pesh kiya jo kaafi maqbool hua, isliye hum ne Urdu Roman Script mein “Aasaan Tarjuma” ka intikhaab kiya.
      Tarjum-e-Qur’an ko Urdu Roman Script mein pesh karne ka ehsaas is wajah se paida hua ke logon ki ek badi tadaad
      aisi hai jo urdu bolna to jaanti hai lekin likhna-padhna nahi janti, aur woh is wajah se kahin paighaam-e-Ilaahi
      se mehroom na ho jayen, is zimmedaari ko saamne rakhte hue is Tarjuma ko Shaaye kiya gaya.
      Allah Ta’ala se dua hai ke Allah Ta’ala is khidmat ko qubool farmakar humare liye aur tamaam insano ke liye hidayat
      ka zariya banaye. Ameen.There are many instances where people are not able to read Urdu but can understand it very
      well whereas people can read English very well but are unable to understand some words written in roman English. 
      The author has kept in mind this problem and hence has provided the solution by writing the Urdu in Roman English Script 
      so that people can read English very well and understand each bit of it as it is pronounced in Urdu.`}, 
      { id: 2, img: "/Green1.PNG", },
      { id: 2, img: "/Green2.WEBP" },
      { id: 3, img: "/Green3.PNG" },
      { id: 4, img: "/Green4.JPEG"},
      { id: 5, img: "/Green5.PNG" },
      
    ],
    2: [ 
      { id: 1, img: "/Hadith1.PNG", title:"Muntakhab Ahadees Roman Urdu (HB)...",  price:375 , offer:"₹599", discount:"37%OFF", rating:"4.5",
        description:`Muntakhab Ahadees Roman Urdu: Hazrat Maulana Muhammad Yusuf Kandhlawi (Rh.) ne umr ke aakhiri hisse mein apne kai bharosemand
                     logon ko saath le kar apni nigrani mein Mustanad Ahadees ke zariye “6-Numberon” par aik zakhira jama kiya jo ke Arbi zuban mein tha.
                     Maulana ke Inteqal ke kai saal baad ye Zakhira Hazrat Maulana Muhammad Saad Sahab ko mila, unhone unka Urdu tarjuma kiya aur tarteeb
                     de kar isko “Muntakhab Ahadees” naam se shaya kiya. Is kitaab ki ek ehem khususiyat yeh bhi hai ke ismein tamaam Ahadees Mustanad aur Motabar hain.
                     Alhamdulillah, “idara” ko Akaabir-e-Ummat ke Mashwaron se is aham-tareen kitaab “Muntakhab Ahadees” ko Urdu Roman Script mein pesh karne 
                     ki sa’adat hasil hui, chunki Ummat ki ek badi tadaad aisi hai jo urdu likhne-padhne se nawaaqif hai, isliye unke liye yeh edition insha’Allah
                     kaafi faidamand saabit hoga.`
      },
      { id: 2, img: "/Hadith2.jpeg" },
      { id: 3, img: "/Hadith3.jpeg" }, 
      { id: 4, img: "/Hadith4.PNG" },
      { id: 5, img: "/Hadith5.PNG" },
    ], 
    3: [
      { id: 1, img: "/Trace4.PNG", title:"Trace Quran (Writable Quran) – Write, Learn & Connect with the Holy Quran",  price:699, offer:"₹1399", discount:"26%OFF", rating:"4", 
        Mainheading:`Write, Learn & Connect with the Holy Quran`,
        description:`The Trace Quran (Writable Quran) is a beautiful and engaging way to connect with the Holy Quran on a deeper
         level. This unique tracing Quran allows you to write the Quran while reading it, helping you improve focus, strengthen 
         your memorization, and enhance your understanding of every verse. By writing each word, you experience a spiritual 
         calmness that brings you closer to the message of Allah.`
        },
      { id: 2, img: "/Trace2.PNG" },
      { id: 3, img: "/Trace3.WEBP" },
      { id: 4, img: "/Trace1.PNG" },
      { id: 5, img: "/Trace5.PNG" }, 
      { id: 6, img: "/Trace6.WEBP" },
      { id: 7, img: "/Trace7.WEBP" },
      { id: 8, img: "/Trace8.WEBP" },
    ],
    4: [
      { id: 1, img: "/that one.jpg", title:"QR Quran with Roman Urdu Arabic & English Transliteration – Mufti Taqi Usmani", price:999 , offer:"₹1399", discount:"26%OFF", rating:"4.2"  },
      { id: 2, img: "/2.jpg" },
      { id: 3, img: "/3.jpg" },
      { id: 4, img: "/4.jpg" },
      { id: 5, img: "/Last5.jpg" },
    ],
  };

  const images = ProductImages[Number(id)] || [];

  useEffect(() => {
  setChangeImage(images[0].img);
}, [id]);


// const product = images[0];

const product = {
   ...images[0],
   id: Number(id)
}


// function QuantityBox() {
  const [qty, setQty] = useState(1);

  const handleMinus = () => {
    setQty((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handlePlus = () => {
    setQty((prev) => prev + 1);
  };
// }

// payment function

const handlePayment = async () => {
  try { 
    const response = await axios.post("http://localhost:5000/create-order", {
  amount: 499,
}); 

    const order = response.data;

    const options = {
      key: "rzp_test_T18WxjuzH98hhE", 
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,

      name: "Sahil Truth", 
      description: product.title,

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
    <div className="MainProductPage">
      {/* <h1>Product ID : {id}</h1> */}
  <div className="TopSection">

       <div className="RightSide">
      <div className="ImagesBox">
        {/* <img src={images[0]?.img} alt=""/> */}
        <img src={changeImage} alt="#"/> 
 
        <div className="OtherImages">
          {images.map((item) => (
            <img key={item.id} src={item.img} alt="" onClick={()=> setChangeImage(item.img)}
             
              />
          ))}
        </div>
      </div> 
      </div>
 
   
     <div className="LeftSide">
     <h2>{product?.title}</h2>

     

     <div className="RatingBox"> 
        <h3>4.6<FaStar className="h3icon"/></h3> 
       {[...Array(5)].map((_, starIndex) => { 

                            if (product?.rating >= starIndex + 1) {
                                return <FaStar key={starIndex} className="FaStar"/>;
                            }

                            else if (product?.rating >= starIndex + 0.5) {
                                return <FaStarHalfAlt key={starIndex} className="FaStarHalfAlt"/>;
                            }

                            else {
                                return <FaRegStar key={starIndex}  className="FaRegStar"/>; 
                            }

                        })}
            </div>
      <div className="Pricebox">
        <p>{product?.offer}</p>
        <h4>{product?.price}</h4>
        <span>{product?.discount}</span>  
      </div>


      <div className="Quantity"> 
        <h3>QTY:</h3> 
        <div className="AddItems">

  <div className="MinusBtn" onClick={handleMinus}>
    <FiMinus size={20}  />
  </div>

  <span className="Qty">{qty}</span>

  <div className="PlusBtn" onClick={handlePlus}>
    <GoPlus size={20}  />
  </div>
        </div>
      </div>


   <div className="FeturesDetail"> 
      <ul>
        <li>Arabic (Indo-Pak script) with transliteration</li>
        <li>Premium quality 2-color pages with golden edging</li>
        <li>Roman Urdu translation by Mufti Taqi Usmani</li>
        <li>QR code on every page (iOS & Android compatible)</li>
        <li>Hardcover with gold & UV embossing, matte finish.</li>
        <li>Luxurious black & gold Ka’bah-themed cover</li>
      </ul>
   </div>

   <div className="ButtonsArea">

    <div className="ProductToCart">
      <FaShoppingCart className="ProductCart" />
      <button  onClick={()=> {
                  handleAddToCartProductdetailPage({
                    ...product,
                    qty : qty 
                  });
                  setOpenCartBar(true);
      }}
       >Add To Cart</button>
    </div>

                    
    <div className="BuyNow">
    <button onClick={()=> handlePayment}>Buy Now</button> 
    </div> 
   </div> 


   <div className="DeliveryTime">

    <div className="Delivery">
      <h3>Delivery:</h3>
      <p>Free Delivery</p> 
    </div>

    <div className="Days">
      <h3>Estimated:</h3>
      <p>2-3 days</p> 
    </div>


   </div>

   </div>

  </div>




   <div className="OurProductDetails">
    <h2>PRODUCT DETAILS</h2> 

   
    <h5>{product?.title}</h5>
    <h5>{product?.Mainheading}</h5>
    <p>{product?.description}</p>

       {/* <h6>About This Edition</h6> 
    
    <p className="SpecialPara">The QR Quran (Roman Urdu Edition) beautifully joins Islamic wisdom with modern technology.
      Designed especially for those who find Arabic or Urdu script difficult to read, this Quran lets you recite and understand using Roman Urdu — 
      simple, clear, and accessible for all.</p>

      <ul className="FirstUl" title="Perfect for:">
        <li>Non-Arabic readers learning to recite with proper tajweed</li>
        <li>Students and families wanting easy understanding in Roman Urdu</li>
        <li>Anyone who wishes to listen and reflect on Qur’anic verses directly from their phone</li>
      </ul> */}

      {/* <div className="KeyFetauresofQuran"> */}
        {/* <h4>Key Features of the QR Quran</h4>
        
        <h3>📖 Roman Urdu Translation by Mufti Taqi Usmani</h3>
        <p>Likha gaya hai Roman Urdu mein taake har koi asaani se samajh sake. No need to read Urdu script — just follow in Roman letters and grasp every ayah’s meaning.</p>

        <h3>🔤 Arabic with English Transliteration</h3>
        <p>Arabic text ke saath English transliteration di gayi hai, helping non-Arabic readers recite correctly with tajweed. Perfect for beginners and advanced readers alike.</p>

        <h3>📱 QR Code on Every Page</h3>
        <p>Har page par diya gaya QR code (Android & iOS compatible).
           Scan and listen to tilawat aur tarjuma directly — a beautiful blend of learning and reflection.</p>

          <h3>✨ Premium Quality Design</h3>
          <p>Printed on two-color golden-edged pages with a luxurious black & gold Ka’bah-themed hardcover.
             UV embossed with a matte finish — ideal for gifting and lifelong reading.</p> */}

          {/* <div className="Why">
            <ul title="Why Choose the QR Quran (Roman Urdu Edition)?">
              <li>Trusted translation by Mufti Taqi Usmani</li>
              <li>Read, understand, and listen — all in one Quran</li>
              <li>Best for non-Arabic readers and new learners</li>
              <li>A timeless connection of ilm (knowledge) and technology</li>
              <li>Perfect for Ramadan, daily tilawat, or as a spiritual gift</li>
            </ul>
          </div> */}


          {/* <div className="ProductDetails">
            <ul title="Product Details">
              <li>Languages: Arabic, Roman Urdu, English Transliteration</li>
              <li>Translator: Mufti Taqi Usmani</li>
              <li>Format: Hardcover</li>
              <li>Audio Access: QR Code on every page (Android/iOS)</li>
              <li>Design: Black & Gold Ka’bah Theme with UV Embossing</li>
            </ul>
          </div> */}


      {/* </div> */}

    
   </div>



    </div>
  );
}


export default ProductDetailPage;