import React, { useRef, useState, useEffect } from "react";
import "./ImageCompare.css";

const ImageCompare = () => {
  const containerRef = useRef(null);
  const [sliderX, setSliderX] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const container = containerRef.current;
    const bounds = container.getBoundingClientRect();
    const posX = ((e.clientX - bounds.left) / bounds.width) * 100;
    setSliderX(Math.min(100, Math.max(0, posX)));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div ref={containerRef} className="compare-container">
      <img
        src="https://content.moss.co.uk/images/extraextralarge/966657201_01.jpg"
        alt="Right Image"
        className="image full-image"
      />
      <div
        className="image reveal-image"
        style={{ clipPath: `inset(0 ${100 - sliderX}% 0 0)` }}
      >
        <img
          src="https://www.beyours.in/cdn/shop/files/black-classic-shirt.jpg?v=1744815740"
          alt="Left Image"
          className="image"
        />
      </div>

      {/* Draggable Divider */}
      <div
        className="slider"
        style={{ left: `${sliderX}%` }}
        onMouseDown={handleMouseDown}
      >
        <div className="handle" />
      </div>

      {/* Overlay content */}
      <div className="overlay left">
        <h3>BEYOURS CLASSIC</h3>
        <button>EXPLORE</button>
      </div>
      <div className="overlay right">
        <h3>MOSS COLLECTION</h3>
        <button>BUY NOW</button>
      </div>
    </div>
  );
};

export default ImageCompare;
