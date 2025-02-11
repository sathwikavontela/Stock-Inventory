import React from "react";
import { Link } from "react-router-dom";

const FICSidebar = () => {
  return (
    <div className="bg-gray-600  p-4 text-white w-64 ">
      <ul className="space-y-6">
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link to="/fic/add-product">Add New Item</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link to="/fic/add-department">Add new Department</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link to="/fic/requests">Requests</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link to="/fic/returns">Returns</Link>
        </li>
        {/* <li className="hover:bg-gray-700 p-2 rounded">
          <Link to="/reports">Reports</Link>
        </li> */}
      </ul>
    </div>
  );
};

export default FICSidebar;
