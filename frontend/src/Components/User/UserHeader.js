import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Stocklogo from "../utils/Stocklogo.png";
import Cookie from "js-cookie";
import { BASE_URL } from "../helper";
import Cookies from "js-cookie";

const UserHeader = () => {
  const navigate = useNavigate();

  const Logout = async () => {
    const url = `${BASE_URL}/api/v1/users/logout`;
    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include", // Include credentials (cookies)
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("removing everything")
      document.cookie = "departmentToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Path=/; Secure; SameSite=None";
      localStorage.removeItem("department");
      Cookies.remove("Department_jwt_token");
      console.log("your document cokes is",document.cookie);

      //toast.success("User logged out successfully");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#8d2ac2] p-1 fixed top-0 left-0 w-full z-10">
      <div className="flex justify-between items-center">
        <Link to="/user-home">
          <img
            src={Stocklogo}
            alt="user-navbar-logo"
            className="NavLogo w-16 h-16"
          />
        </Link>
        <ul className="flex space-x-6 text-white px-8">
          <Link to="/user-home">
            <li className="text-xl">Home</li>
          </Link>
          <button onClick={Logout} className="text-xl">
            Logout
          </button>
        </ul>
      </div>
    </div>
  );
};

export default UserHeader;
