import React from 'react'
import { Link } from 'react-router-dom'
import Stocklogo from '../utils/Stocklogo.png'

const UserHeader = () => {
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

          <Link to="/logout">
            <li className="text-xl">Logout</li>
          </Link>
        </ul>
      </div>
    </div>
  )
}



export default UserHeader
