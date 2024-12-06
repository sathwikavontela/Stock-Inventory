import React, { useState } from 'react'
import orderData from './RequestData.json' // Adjust the path as necessary

const UserReports = () => {
  const [orders, setOrders] = useState(orderData)
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState('last1month')
  const ordersPerPage = 10

  const filterOrdersByDate = (requestedDate) => {
    const date = new Date(requestedDate)
    const now = new Date()
    const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1))
    const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3))
    const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6))
    const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1))

    switch (filter) {
      case 'last1month':
        return date >= oneMonthAgo
      case 'last3months':
        return date >= threeMonthsAgo
      case 'last6months':
        return date >= sixMonthsAgo
      case 'last1year':
        return date >= oneYearAgo
      default:
        return true
    }
  }

  const filteredOrders = orders.filter((order) => {
    const isAcceptedOrApproved =
      order.status === 'accepted' || order.status === 'approved'
    const isWithinDateRange = filterOrdersByDate(order.requested_date)

    // Debugging logs
    console.log(
      `Order: ${order.item_name}, Accepted/Approved: ${isAcceptedOrApproved}, Within Date Range: ${isWithinDateRange}`
    )

    return isAcceptedOrApproved && isWithinDateRange
  })

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

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
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  )

  return (
    <div className="px-8 w-full mt-8 pb-2">
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2">
          Filter by:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-1"
        >
          <option value="last1month">Last 1 Month</option>
          <option value="last3months">Last 3 Months</option>
          <option value="last6months">Last 6 Months</option>
          <option value="last1year">Last Year</option>
        </select>
      </div>

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
                  <td className={`w-1/4 text-left py-3 px-4 text-green-500`}>
                    {order.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No approved orders found
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



export default UserReports
