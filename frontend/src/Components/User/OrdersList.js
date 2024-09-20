import React, { useState } from 'react'

import orderData from './RequestData.json' // Adjust the path as necessary

const OrdersList = () => {
  const [orders, setOrders] = useState(orderData)

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'text-green-500'
      case 'pending':
        return 'text-yellow-500'
      case 'rejected':
        return 'text-red-500'
      default:
        return ''
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mt-14">
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
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={index} className="bg-gray-50 even:bg-gray-100">
                  <td className="w-1/4 text-left py-3 px-4">
                    {order.orderName}
                  </td>
                  <td className="w-1/4 text-left py-3 px-4">
                    {order.quantity}
                  </td>
                  <td className="w-1/4 text-left py-3 px-4">
                    {order.requestedDate}
                  </td>
                  <td className="w-1/4 text-left py-3 px-4">
                    {order.approvedDate || 'N/A'}
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
    </div>
  )
}

export default OrdersList
