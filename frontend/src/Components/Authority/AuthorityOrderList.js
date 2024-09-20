import React, { useState } from 'react';
import orderData from './RequestData.json';

const OrdersList = () => {
  const [orders, setOrders] = useState(orderData);
  const [currentPage, setCurrentPage] = useState(1);
  const [newDept, setNewDept] = useState('');
  const ordersPerPage = 10;

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'rejected':
        return 'text-red-500';
      default:
        return '';
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);
  };

  const addNewDept = () => {
    if (newDept.trim() !== '') {
      const newOrder = {
        id: orders.length + 1,
        dept_name: newDept,
        item_name: 'N/A',
        item_quantity: 0,
        requested_date: 'N/A',
        status: 'pending',
      };
      setOrders([...orders, newOrder]);
      setNewDept('');
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className="px-8 w-full mt-8 pb-2">
      {/* Table */}
      <div className="shadow overflow-hidden rounded-lg border-b border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                Dept Name
              </th>
              <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                Item Name
              </th>
              <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                Quantity
              </th>
              <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                Requested Date
              </th>
              <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentOrders.length > 0 ? (
              currentOrders.map((order, index) => (
                <tr key={index} className="bg-gray-50 even:bg-gray-100">
                  <td className="w-1/5 text-left py-3 px-4">{order.dept_name}</td>
                  <td className="w-1/5 text-left py-3 px-4">{order.item_name}</td>
                  <td className="w-1/5 text-left py-3 px-4">{order.item_quantity}</td>
                  <td className="w-1/5 text-left py-3 px-4">{order.requested_date}</td>
                  <td className="w-1/5 text-left py-3 px-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(index, e.target.value)}
                      className={`px-2 py-1 rounded-md ${getStatusColor(order.status)}`}
                    >
                      <option value="accepted">Accepted</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 opacity-50 cursor-not-allowed' : 'bg-gray-800 text-white'}`}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-gray-800 text-white'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrdersList;
