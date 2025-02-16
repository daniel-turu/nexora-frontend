import React from "react";
import { useState } from "react";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import { ShowAboveProvider } from "../Context/AboveContext";
export const Pages = () => {
  const [currentPage, setCurrentPage] = useState("Home");
  const navigate = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      asfdasd
      fas
      df
      <ShowAboveProvider>

        {currentPage === "Home" && <Home navigate={navigate} />}
        {currentPage === "About" && <About navigate={navigate} />}
        {currentPage === "Contact" && <Contact navigate={navigate} />}


      </ShowAboveProvider> 
    </div>
  );
};
