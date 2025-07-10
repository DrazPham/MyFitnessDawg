import React, { useState } from 'react';
import 'assets/css/blog/carousel.css';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="carousel">
      <button onClick={goToPrev} className="carousel-btn">←</button>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="carousel-img" />
      <button onClick={goToNext} className="carousel-btn">→</button>
    </div>
  );
};

export default Carousel;