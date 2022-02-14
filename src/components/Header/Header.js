/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import brandlogo from "../../assets/brandLogoEdited01.png";
import "./Header.css";
import { AuthContext } from "../../context/AuthContext";
import forestTeaApi from "../../helpers/forestTeaApi";

const Header = () => {
  const {user, signOut} = useContext(AuthContext)
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if(user){
      forestTeaApi.get(`/checkAdmin/${user.email}`)
      .then(res =>  {
      setIsAdmin(res.data)
      sessionStorage.setItem("admin", res.data)
    } )
  }},[user])
  const admin = sessionStorage.getItem("admin");

  console.log("admin",admin)
  return (
    <div className="bg-slate-100 text-gray-100 shadow-md w-full ">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to="/">
          <a className="md:w-1/5 title-font font-medium items-center md:justify-start mb-4 md:mb-0">
            <img
              src={brandlogo}
              width={200}
              height={100}
              alt="logo"
              className="brandLogo"
            />
            <p className="italic text-sm text-green-800 font-bold ml-3">
              Take the natural tea taste
            </p>
          </a>
        </Link>

        <nav className="flex flex-wrap md:w-4/5 items-center justify-end text-base md:ml-auto mt-5 md:mt-0">
          <Link to="/home">
            <a className="mx-3 md:mx-5 cursor-pointer font-bold text-green-700 hover:text-green-900 uppercase">
              Home
            </a>
          </Link>
          <Link to="/sales">
            <a className="mx-3 md:mx-5 cursor-pointer font-bold text-green-700 hover:text-green-900 uppercase">
              Sales
            </a>
          </Link>
          <Link to="/returns">
            <a className="mx-3 md:mx-5 cursor-pointer font-bold text-green-700 hover:text-green-900 uppercase">
              Returns
            </a>
          </Link>
          <Link to="/stocks">
            <a className="mx-3 md:mx-5 cursor-pointer font-bold text-green-700 hover:text-green-900 uppercase">
              Stocks
            </a>
          </Link>
          {
           ( isAdmin || admin) &&  <Link to="/register">
           <a className="mx-3 md:mx-5 cursor-pointer font-bold text-green-700 hover:text-green-900 uppercase flex">
            <FaUser className="mt-1 mr-2"/> Register New Staff
           </a>
         </Link>
          }
          {
            user.email && <p className="mx-3 md:mx-5 cursor-pointer text-green-700 hover:text-green-900  flex"> (Welcome, {user.name}) </p>
          }
          {
            user.email ? <button className="mx-3 md:mx-5 flex items-center bg-white p-2 rounded cursor-pointer text-black hover:text-red-700" onClick={signOut}> <FaSignOutAlt/> <span className="mx-3">Logout</span>  </button> : <Link to="/login">
            <a className="mx-3 md:mx-5 flex items-center bg-white p-2 rounded cursor-pointer text-black hover:text-red-700">
              <FaSignInAlt /> <span className="mx-3">Login</span>
            </a>
          </Link>
          }
        </nav>
      </div>
    </div>
  );
};

export default Header;
