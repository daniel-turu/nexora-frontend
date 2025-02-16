import React, { useEffect, useState, useRef } from "react";
import AnimatedWrapper from "./AnimatedWrapper"; // Import AnimatedWrapper

const sliderData = [
  {
    image: "static/images/bed.jpg",
    text: "Your Bright Future is Our Success",
    subtext: "Empowering future leaders at Nexora Academy",
  },
  {
    image: "static/images/education2.jpg",
    text: "Innovation Meets Tradition",
    subtext:
      "Combining cutting-edge teaching methods with time-honored values for a balanced education.",
  },
  {
    image: "static/images/education.jpg",
    text: "Where Every Student Matters",
    subtext:
      "Creating a supportive and inclusive environment to help every child achieve their full potential.",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const missionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (missionRef.current) observer.observe(missionRef.current);
    return () => {
      if (missionRef.current) observer.unobserve(missionRef.current);
    };
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="w-full h-[100vh] overflow-hidden">
        {sliderData.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-6">
              {/* Animated Text */}
              <AnimatedWrapper variant="fade">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {slide.text}
                </h1>
              </AnimatedWrapper>
              <AnimatedWrapper variant="fadeAndStay">
                <p className="text-lg md:text-2xl">{slide.subtext}</p>
              </AnimatedWrapper>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
