import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../helper.js";

const UpdateOrder = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRequest = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/requests/getRequestById/${id}`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        setRequest(data.request);
      } catch (error) {
        console.error("Error fetching request details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/requests/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status: "Updated" }), // Example update
      });
      if (response.ok) {
        alert("Request updated successfully!");
      } else {
        console.error("Failed to update request");
      }
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!request) {
    return (
      <div className="text-center mt-8 text-red-500">Request not found</div>
    );
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Update Request
      </h1>

      <div className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-xl font-bold mb-4">Request Details</h2>
        <p className="mb-2">
          <strong className="text-gray-700">Request ID:</strong> {request._id}
        </p>
        <p className="mb-2">
          <strong className="text-gray-700">Department:</strong>{" "}
          {request.userId?.department || "N/A"}
        </p>
        <p className="mb-2">
          <strong className="text-gray-700">Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded-md ${
              request.status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : request.status === "Approved"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {request.status}
          </span>
        </p>

        <div className="mb-4">
          <strong className="text-gray-700">Items:</strong>
          <ul className="list-disc ml-6 mt-2">
            {request.items.map((item, idx) => (
              <li key={idx} className="text-gray-600">
                <span className="font-medium">{item.item}</span>:{" "}
                {item.quantity}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleUpdate}
          className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md transition duration-300"
        >
          Update Request
        </button>
      </div>
    </div>
  );
};

export default UpdateOrder;
