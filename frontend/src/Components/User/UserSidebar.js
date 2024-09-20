import React from 'react'
import { Link } from 'react-router-dom'

const UserSidebar = () => {
  return (
    <div className="bg-gray-600 h-screen p-4 text-white w-64">
      <ul className="space-y-6">
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link to="/requests">Requests</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link to="/orders">Orders</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link to="/reports">Reports</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link to="/returns">Returns</Link>
        </li>
      </ul>
    </div>
  )
}

export default UserSidebar
