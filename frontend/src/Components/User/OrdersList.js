import React, { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { BASE_URL } from "../helper";
import { Link } from "react-router-dom";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const requests = await fetch(
        `${BASE_URL}/api/v1/requests/getRequestsByDepartment`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      console.log(requests);
      if (!requests.ok) {
        throw new Error(`Error: ${requests.status} - ${requests.statusText}`);
      }
      const data = await requests.json();
      console.log(data.requests[0]);
      setOrders(data.requests);
    } catch (error) {
      alert(error.message);
    }
  };

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "rejected":
        return "text-red-500";
      default:
        return "";
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

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const formatDate = (isoDate) => {
    if (!isoDate) return "N/A";
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  // const handleViewOrder = (orderId) => {
  //   alert(`View details for Order ID: ${orderId}`)
  // }

  return (
    <div className="px-8 w-full mt-8 pb-2">
      <div className="shadow overflow-hidden rounded-lg border-b border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                Order ID
              </th>
              <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                Requested Date
              </th>
              <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                Approved Date
              </th>
              <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                Status
              </th>
              <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                View
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentOrders.length > 0 ? (
              currentOrders.map((order, index) => (
                <tr key={index} className="bg-gray-50 even:bg-gray-100">
                  <td className="w-1/5 text-left py-3 px-4">{order._id}</td>
                  <td className="w-1/5 text-left py-3 px-4">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="w-1/5 text-left py-3 px-4">
                    {formatDate(order.updatedAt) || "N/A"}
                  </td>
                  <td
                    className={`w-1/5 text-left py-3 px-4 ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </td>
                  <td className="w-1/5 text-left py-3 px-4">
                    <button className="text-blue-500 hover:text-blue-700">
                      <Link to={`/orders/${order._id}`}>
                        <FiEye size={20} />
                      </Link>
                    </button>
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
              ? "bg-gray-200 opacity-50 cursor-not-allowed"
              : "bg-gray-800 text-white"
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
              ? "opacity-50 cursor-not-allowed"
              : "bg-gray-800 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrdersList;
