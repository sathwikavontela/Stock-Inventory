import React from 'react'
import { Link } from 'react-router-dom'
import Stocklogo from '../utils/Stocklogo.png'

const Header = () => {
  return (
    <div className="bg-[#8d2ac2] p-1 fixed w-full z-10 top-0 h-[10%]  ">
      <div className="flex justify-between items-center min-h-[50%]">
        <img
          src={Stocklogo}
          alt="stock-inventory-main-logo"
          className="NavLogo w-20 h-20"
        />
        <ul className="flex space-x-6 text-white px-8  min-h-[50%]">
          <Link to="/">
            <li className="text-xl">Home</li>
          </Link>

          <Link to="/about-us">
            <li className="text-xl">About Us</li>
          </Link>


          <Link to="/login">
            <li className="text-xl">Login</li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Header
