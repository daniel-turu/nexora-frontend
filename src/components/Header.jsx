import React, { useState, useRef, useEffect } from "react";
import { useNavigation } from "../Context/NavigationContext";
import AnimatedWrapper from "./AnimatedWrapper"; // Import the AnimatedWrapper

export const Header = () => {
  const { navigate } = useNavigation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle clicks outside the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="fixed z-50 w-full text-gray-100 body-font bg-[#0a2240] shadow-lg">
      <div className="container mx-auto flex flex-wrap p-5 flex-row items-center justify-between">
        
        {/* Logo on the left with animation */}
        <AnimatedWrapper variant="slideFromLeft">
          <div
            onClick={() => navigate("Home")}
            className="flex title-font font-medium items-center cursor-pointer"
          >
            <img
              src="static/images/nexoLogo.png"
              alt="Nexora Academy Logo"
              className="w-12 object-contain"
            />
            <span className="ml-3 text-xl hover:text-[#B22222] font-bold">
              Nexora Academy
            </span>
          </div>
        </AnimatedWrapper>

        {/* Navigation on the right */}
        <nav className="flex items-center text-base">
          <AnimatedWrapper variant="fade">
            <div
              onClick={() => navigate("Home")}
              className="mr-5 hover:text-[#B22222] cursor-pointer"
            >
              Home
            </div>
          </AnimatedWrapper>
          
          <AnimatedWrapper variant="fade">
            <div
              onClick={() => navigate("About")}
              className="mr-5 hover:text-[#B22222] cursor-pointer"
            >
              About
            </div>
          </AnimatedWrapper>

          {/* Learning Dropdown with animation */}
          <div className="relative mr-5" ref={dropdownRef}>
            <AnimatedWrapper variant="slideFromBottom">
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hover:text-[#B22222] cursor-pointer"
              >
                Learning
              </div>
            </AnimatedWrapper>

            {isDropdownOpen && (
              <AnimatedWrapper variant="zoomIn">
                <div className="absolute left-0 mt-2 w-40 bg-white text-gray-900 rounded shadow-lg">
                  <div
                    onClick={() => {
                      navigate("CurriculumOffers");
                      setIsDropdownOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    Curriculum
                  </div>
                  <div
                    onClick={() => {
                      navigate("AcademicCalendar");
                      setIsDropdownOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    Academic
                  </div>
                </div>
              </AnimatedWrapper>
            )}
          </div>

          <AnimatedWrapper variant="fade">
            <div
              onClick={() => navigate("Contact")}
              className="mr-5 hover:text-[#B22222] cursor-pointer"
            >
              Contact
            </div>
          </AnimatedWrapper>
        </nav>
      </div>
    </header>
  );
};
