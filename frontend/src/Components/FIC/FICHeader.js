import React from 'react'
import { Link } from 'react-router-dom'
import Stocklogo from '../utils/Stocklogo.png'

const FICHeader = () => {
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
          <Link to="/user-home">
            <li className="text-xl">Reports</li>
          </Link>

          <Link to="/logout">
            <li className="text-xl">Logout</li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default FICHeader
