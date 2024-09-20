import React from 'react'
import { Link } from 'react-router-dom'

const UserSidebar = () => {
  return (
    <div className="bg-gray-600  p-4 text-white w-64 ">
      <ul className="space-y-6">
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link to="/requests">Requests</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link to="/authority/authority-orders">Orders</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link to="/authority/reports">Reports</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link to="/authority/returns">Returns</Link>
        </li>
      </ul>
    </div>
  )
}

export default UserSidebar
