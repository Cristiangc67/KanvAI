import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Menu from "../assets/menu.svg?react";
import { useState } from "react";
import NavbarMobile from "./NavbarMobile";
import { useLocation } from "react-router";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();
  const isLoginOrRegister =
    location.pathname === "/login" || location.pathname === "/register";

  const { handleLogout, profile } = useAuth();
  const navigate = useNavigate();
  /* if (user || profile) {
    console.log("session:", session, " profile:", profile);
  } */
  const wrapperLogout = () => {
    handleLogout();
    navigate("/", { replace: true });
  };

  return (
    <nav
      className={`${
        isLoginOrRegister && "hidden"
      } sticky w-full px-5  h-fit  py-2 items-center flex justify-between bg-[#C6ECEA] md:px-10 lg:px-40 rounded-lg`}
    >
      <NavLink
        to={"/"}
        className="yeseva-one-regular flex items-end text-xl md:text-2xl"
      >
        <img src="/logo.png" className="w-12" alt="" />
        <span className="text-[#30A3B3]">KanvAI</span>
      </NavLink>
      <div className="hidden md:flex items-center justify-between gap-8 josefin-sans-medium text-[#30A3B3]">
        <NavLink to={"/"}>Galeria</NavLink>
        <NavLink to={"/creation"}>Crear</NavLink>
        {!profile && (
          <div className="flex items-center gap-5 ms-5">
            <NavLink to={"/login"}>Login</NavLink>
            <NavLink
              to={"/register"}
              className="text-white bg-[#30A3B3] px-3 py-2 rounded-xl"
            >
              Registrarse
            </NavLink>
          </div>
        )}
        {profile && (
          <button className="cursor-pointer" onClick={wrapperLogout}>
            cerrar sesion
          </button>
        )}
        {profile && (
          <NavLink to={`/user/${profile.id}`}>
            <div className="flex items-center gap-5 ms-5">
              <div className="w-10 aspect-square overflow-hidden rounded-full">
                <img
                  src={
                    profile.avatar_url ? profile.avatar_url : "/usericon.png"
                  }
                  className="w-full rounded-full"
                  alt=""
                />
              </div>
              <p>{profile.username}</p>
            </div>
          </NavLink>
        )}
      </div>
      {!openMenu ? (
        <button
          onClick={() => setOpenMenu(true)}
          className="border block md:hidden  p-0.5 hover:bg-[#31957c] border-white/40 bg-[#33987f] rounded-lg cursor-pointer"
        >
          <Menu className="w-10 h-10 " />
        </button>
      ) : (
        <NavbarMobile setOpenMenu={setOpenMenu} openMenu={openMenu} />
      )}
    </nav>
  );
};

export default Navbar;
