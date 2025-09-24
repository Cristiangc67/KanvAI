import React from "react";
import XClose from "../assets/close.svg?react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router";
import Gallery from "../assets/gallery.svg?react";
import Create from "../assets/create.svg?react";

interface props {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  openMenu: boolean;
}

const NavbarMobile = ({ setOpenMenu, openMenu }: props) => {
  const modalRoot = document.getElementById("modal");
  if (!modalRoot || !openMenu) {
    return null;
  }
  return createPortal(
    <div className="w-screen z-50  h-screen fixed  left-0 top-0 bg-black/50 block md:hidden">
      <div
        onClick={() => setOpenMenu(false)}
        className="w-full h-full bg-transparent"
      ></div>

      <div className="backdrop-blur-3xl  w-1/2 transition-all duration-500 bg-gradient-to-b from-black to-[#30A3B3]/90 border-s border-white/20 h-full absolute inset-y-0 right-0 flex flex-col">
        <button
          onClick={() => setOpenMenu(false)}
          className="border w-fit ms-2 mt-2 p-0.5 hover:bg-[#31957c] border-white/40 bg-[#47d1af]/50 rounded-lg cursor-pointer"
        >
          <XClose className="w-10 h-10" />
        </button>

        <div className="h-full flex flex-col  items-start  px-2 gap-10 mt-5 w-full">
          <div className="flex flex-row justify-around w-full items-center ">
            <NavLink
              className="text-white text-sm px-3 py-2 rounded-xl  border border-[#47d1af]"
              to={"/"}
            >
              Login
            </NavLink>
            <NavLink
              to={"/"}
              className="text-white text-sm bg-[#41be9e] px-3 py-2 rounded-xl"
            >
              Registrarse
            </NavLink>
          </div>
          <NavLink
            className="text-white text-sm flex items-center gap-2"
            to={"/"}
          >
            <Gallery className="h-7 w-7" />
            <span>Galeria</span>
          </NavLink>
          <NavLink
            className="text-white text-sm flex items-center gap-2"
            to={"/"}
          >
            <Create className="h-7 w-7" />
            <span>Crear</span>
          </NavLink>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default NavbarMobile;
