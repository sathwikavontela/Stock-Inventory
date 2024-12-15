import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Stocklogo from "../utils/Stocklogo.png";
import { BASE_URL } from "../helper";

const UserHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/authority/logout`, {
        method: "GET",
        credentials: "include", // Include cookies for logout
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Optional: Clear localStorage or any stored user state
      localStorage.removeItem("department");

      // Redirect to the login page or homepage
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="bg-[#8d2ac2] p-1 fixed top-0 left-0 w-full z-10">
      <div className="flex justify-between items-center">
        <img
          src={Stocklogo}
          alt="user-navbar-logo"
          className="NavLogo w-16 h-16"
        />
        <ul className="flex space-x-6 text-white px-8">
          <Link to="/authority-home">
            <li className="text-xl">Home</li>
          </Link>

          <li className="text-xl cursor-pointer" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserHeader;
