import React, { useState } from 'react'
import orderData from './RequestData.json';

const OrdersList = () => {
  const [orders, setOrders] = useState(orderData)
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 10

  const totalPages = Math.ceil(orders.length / ordersPerPage)

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'text-green-500'
      case 'pending':
        return 'text-yellow-500'
      case 'rejected':
        return 'text-red-500'
      default:
        return ''
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder)

  return (
    <div className="px-8 w-full mt-8 pb-2">
      <div className="shadow overflow-hidden rounded-lg border-b border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">
                Order Name
              </th>
              <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">
                Quantity
              </th>
              <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">
                Requested Date
              </th>
              <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">
                Approved Date
              </th>
              <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentOrders.length > 0 ? (
              currentOrders.map((order, index) => (
                <tr key={index} className="bg-gray-50 even:bg-gray-100">
                  <td className="w-1/4 text-left py-3 px-4">
                    {order.item_name}
                  </td>
                  <td className="w-1/4 text-left py-3 px-4">
                    {order.item_quantity}
                  </td>
                  <td className="w-1/4 text-left py-3 px-4">
                    {order.requested_date}
                  </td>
                  <td className="w-1/4 text-left py-3 px-4">
                    {order.approved_date || 'N/A'}
                  </td>
                  <td
                    className={`w-1/4 text-left py-3 px-4 ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
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

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? 'bg-gray-200 opacity-50 cursor-not-allowed'
              : 'bg-gray-800 text-white'
          }`}
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? 'opacity-50 cursor-not-allowed'
              : 'bg-gray-800 text-white'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default OrdersList;
