import React from "react";

type BackdropProps = {
  show: boolean;
  onClose: () => void;
};

const Backdrop = ({ show, onClose }: BackdropProps) => {
  return (
    <div
      onClick={onClose}
      className={`${
        show ? "opacity-100 visible" : "opacity-0 invisible"
      }  cursor-pointer z-30 transition-all duration-400 fixed top-0 start-0 h-screen w-full bg-black/10`}
    />
  );
};

export default Backdrop;
