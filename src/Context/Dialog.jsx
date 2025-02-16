import React, { useState, useEffect } from "react";
import { useShowAbove } from "../Context/AboveContext";

export const useDialog = () => {
  const { setBelowComponent } = useShowAbove();
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const closeDialog = () => {
    setVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      setBelowComponent(null);
    }, 300); // Match fade-out duration
  };

  const openDialog = (childComp) => {
    setIsOpen(true);
    setBelowComponent(<DialogWrapper childComp={childComp} closeDialog={closeDialog} />);
    setTimeout(() => setVisible(true), 10); // Ensure smooth fade-in
  };

  return { isOpen, openDialog, closeDialog };
};

// Wrap the Dialog with Fade-In & Out Animations
const DialogWrapper = ({ childComp, closeDialog }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(closeDialog, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg"></div>

      <div className="relative" onClick={(e) => e.stopPropagation()}>
        {React.cloneElement(childComp, { closeDialog: handleClose })}
      </div>
    </div>
  );
};
