import React, { useState, useEffect } from "react";
import { BASE_URL } from "../helper.js";

const OrdersList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null); // For viewing items

  // Fetch requests from the backend
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/requests/getRequestsforAuthority`,
          { credentials: "include" }
        );
        const data = await response.json();
        console.log(data);
        setRequests(data.requests || []);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Requests for Authority</h1>

      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Request ID</th>
              <th className="px-4 py-2 border">Department</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Requested Date</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td className="px-4 py-2 border">{request._id}</td>
                <td className="px-4 py-2 border">
                  {request.userId?.department || "N/A"}
                </td>
                <td className="px-4 py-2 border">{request.status}</td>
                <td className="px-4 py-2 border">
                  {new Date(request.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => setSelectedRequest(request)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    View Items
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for Viewing Items */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md w-96">
            <h2 className="text-lg font-semibold mb-2">Items Requested</h2>
            <ul className="list-disc ml-5">
              {selectedRequest.items.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.item}</strong>: {item.quantity}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setSelectedRequest(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersList;
