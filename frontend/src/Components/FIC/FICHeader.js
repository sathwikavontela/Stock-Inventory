import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Stocklogo from "../utils/Stocklogo.png";
import { BASE_URL } from "../helper";

const FICHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/fic/logout`, {
        method: "GET",
        credentials: "include", // Include cookies for the logout request
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Optional: Clear any additional state or storage
      localStorage.removeItem("ficSession");

      // Redirect the user to the login page or homepage
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
          <Link to="/fic-home">
            <li className="text-xl">Home</li>
          </Link>
          <Link to="/fic-reports">
            <li className="text-xl">Reports</li>
          </Link>
          <li className="text-xl cursor-pointer" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FICHeader;
