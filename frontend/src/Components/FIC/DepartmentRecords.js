import React, { useEffect, useState } from 'react';
import departmentsData from '../Data/SectionsData.json';

const DepartmentRecords = ({ departmentId, onBack }) => {
  const [orders, setOrders] = useState([]);
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [filterOption, setFilterOption] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const department = departmentsData.find(dept => dept.id === departmentId);
    if (department) {
      const approvedOrders = department.requests.filter(order => order.status === "approved");
      setOrders(approvedOrders);
      setCurrentDepartment(department);
    }
  }, [departmentId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filterOrders = () => {
    const today = new Date();
    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.approved_date);
      if (filterOption === '3months') {
        return orderDate >= new Date(today.setMonth(today.getMonth() - 3));
      }
      if (filterOption === '6months') {
        return orderDate >= new Date(today.setMonth(today.getMonth() - 6));
      }
      if (filterOption === '1year') {
        return orderDate >= new Date(today.setFullYear(today.getFullYear() - 1));
      }
      if (filterOption === 'custom') {
        return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
      }
      return true; // No filter applied
    });
    return filteredOrders;
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  return (
    <div className="p-6 w-full">
      {/* Back Button */}

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Approved Requests for {currentDepartment?.name}</h1>

      {/* Filter Section */}
      <div className="mb-4 flex items-center">
        <label className="mr-2 text-gray-700 font-semibold">Filter By:</label>
        <select
          value={filterOption}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-md p-2 mr-2 bg-white shadow-md hover:shadow-lg transition-all duration-300"
        >
          <option value="all">All Time</option>
          <option value="3months">Past 3 Months</option>
          <option value="6months">Past 6 Months</option>
          <option value="1year">Past Year</option>
          <option value="custom">Custom Dates</option>
        </select>

        {filterOption === 'custom' && (
          <div className="flex items-center">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-md p-2 mr-2 bg-white shadow-md hover:shadow-lg transition-all duration-300"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded-md p-2 bg-white shadow-md hover:shadow-lg transition-all duration-300"
            />
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="shadow-lg rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Item Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity Approved</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total Quantity Requested</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Requested Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Approved Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filterOrders().length > 0 ? (
              filterOrders().map((order, index) => (
                <tr key={index} className="even:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">{order.item_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.approved_quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.item_quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatDate(order.requested_date)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatDate(order.approved_date)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No approved requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentRecords;
