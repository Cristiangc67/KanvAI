import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav className=" sticky w-full  h-fit  py-2 items-center flex justify-between bg-[#C6ECEA] px-40 rounded-lg">
      <NavLink to={"/"} className="yeseva-one-regular flex items-end text-2xl">
        <img src="/logo.png" className="w-12" alt="" />
        <span className="text-[#30A3B3]">KanvAI</span>
      </NavLink>
      <div className="flex items-center justify-between gap-8 josefin-sans-medium text-[#30A3B3]">
        <NavLink to={"/"}>Galeria</NavLink>
        <NavLink to={"/"}>Crear</NavLink>
        <div className="flex items-center gap-5 ms-5">
          <NavLink to={"/"}>Login</NavLink>
          <NavLink
            to={"/"}
            className="text-white bg-[#30A3B3] px-3 py-2 rounded-xl"
          >
            Registrarse
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
