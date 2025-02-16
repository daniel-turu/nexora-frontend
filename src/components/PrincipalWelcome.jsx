import React, { useState, useRef, useEffect } from 'react';
import AnimatedWrapper from "./AnimatedWrapper";
import { useDialog } from '../Context/Dialog';
import { getPrincipalWelcomeMessage } from '../api/apiCall';
import { truncateMessage } from './Utils';

export const PrincipalWelcome = () => {
  const { openDialog } = useDialog();
  const missionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [principalData, setPrincipalData] = useState(null);

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

  useEffect(() => {
    const fetchPrincipalMessage = async () => {
      try {
        const data = await getPrincipalWelcomeMessage();
        setPrincipalData(data);
        console.log(data, "ttttttttttttttttttttttttttt");
        
      } catch (error) {
        console.error("Failed to fetch principal's message", error);
      }
    };

    fetchPrincipalMessage();
  }, []);

  return (
    <section
      ref={missionRef}
      className={`py-16 px-6 bg-gray-100 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Nexora Academy</h2>
          <p className="text-gray-700 text-lg">
            {principalData ? truncateMessage(principalData.message) : "Loading message..."}
          </p>
          <button
            onClick={() => openDialog(<ShowMessage message={principalData?.message} />)}
            className="mt-4 inline-block bg-[#0a2240] text-white px-6 py-3 rounded-3xl hover:bg-red-600 transition"
          >
            Full Message
          </button>
        </div>

        <div className="md:w-1/2 flex flex-col items-center">
          <img
            src={principalData?.picture_url || "static/images/education2.jpg"}
            alt="Principal"
            className="w-48 h-48 object-cover rounded-full shadow-lg"
          />
          <p className="mt-4 text-gray-800 font-semibold text-center">
            {principalData ? principalData.principal_name : "Loading..."} <br />
            <span className="text-gray-500">Principal</span>
          </p>
        </div>
      </div>
    </section>
  );
};

const ShowMessage = ({ message, closeDialog }) => {
  return (
    <AnimatedWrapper variant="fadeAndStay">
      <div className=" ">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-lg">
          <h2 className="text-2xl font-bold mb-4">Principal's Message</h2>
          <p className="text-gray-700">
          <div dangerouslySetInnerHTML={{ __html: message ? message : "Loading message..." }} />
          </p>
          <button
            onClick={closeDialog}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </AnimatedWrapper>
  );
};





