import React from 'react'
import { Link } from 'react-router-dom'

const UserSidebar = () => {
  return (
    <div className="bg-gray-600  p-4 text-white w-[12%]  ">
      <ul className="space-y-6 mt-6">
        <li className="hover:bg-gray-700 p-2 rounded-2xl">
          <Link to="/requests">
            <div className='w-full text-center'>Requests</div>
          </Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded-2xl">
          <Link to="/orders">
          <div className='w-full  text-center'>Orders</div>
          </Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded-2xl">
          <Link to="/reports">
          <div className='w-full text-center'>Reports</div>
          </Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded-2xl">
          <Link to="/user-returnform">
          <div className='w-full text-center'>Returns</div>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default UserSidebar
