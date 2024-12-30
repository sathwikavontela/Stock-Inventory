import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../helper.js";

const OrdersList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/requests/getRequestsforAuthority`,
          { credentials: "include" }
        );
        const data = await response.json();
        setRequests(data.requests || []);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

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
                    onClick={() =>
                      navigate(`/authority/update-request/${request._id}`)
                    }
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
    </div>
  );
};

export default OrdersList;
