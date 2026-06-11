import { useEffect, useState } from "react";

function HeroSlider() {
  const images = [
      // "HS1.jpeg",
    // "okk.PNG",  
    // "ooh.PNG",   
    // "hmm.jpg",  
      // "he.jpeg", 
      "Best.jpg", 
      "Best2.webp", 
      "best one 2.jpg", 
  ];
 
  const [current, setCurrent] = useState(0); 

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero">
      
      <img src={images[current]} alt="slider" className="hero-img" />

      {/* <button className="prev" onClick={prevSlide}>❮</button>
      <button className="next" onClick={nextSlide}>❯</button>  */}

    

    <div className="dots">
  {images.map((_, index) => (
    <span
      key={index}
      className={`dot ${current === index ? "active" : ""}`}
      onClick={() => setCurrent(index)}
    ></span>
  ))}
</div>
</div>
  );
}

export default HeroSlider;