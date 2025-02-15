import React, { useState, useEffect } from "react";
import { BASE_URL } from "../helper";
import { FaEye } from "react-icons/fa"; // Importing an eye icon from react-icons
import FICSidebar from "./FICSidebar";
import FICHeader from "./FICHeader";

const Returns = () => {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null); // State to hold selected return details
  const [statusLoading, setStatusLoading] = useState(false); // Loading state for status updates

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/returns/getReturnsForFIC`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch department returns.");
        }
        const data = await response.json();
        setReturns(data.returns);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReturns();
  }, []);

  const handleViewClick = (returnData) => {
    setSelectedReturn(returnData); // Set the selected return data
  };

  const closeModal = () => {
    setSelectedReturn(null); // Clear the selected return to close the modal
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex h-screen">
      <FICHeader />
      <div className="pt-16 h-[100vh] flex">
        <FICSidebar />
        <div className="p-4 mx-6 w-[80vw] h-full overflow-y-auto">
          <div className="p-6 overflow-auto">
            {returns.length === 0 ? (
              <p>No returns raised by departments.</p>
            ) : (
              <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="w-1/5 text-center py-3 px-4 uppercase font-semibold text-sm">
                      Department
                    </th>
                    <th className="w-1/5 text-center py-3 px-4 uppercase font-semibold text-sm">
                      Return ID
                    </th>
                    <th className="w-1/5 text-center py-3 px-4 uppercase font-semibold text-sm">
                      No. of Items
                    </th>
                    <th className="w-1/5 text-center py-3 px-4 uppercase font-semibold text-sm">
                      Date
                    </th>
                    <th className="w-1/5 text-center py-3 px-4 uppercase font-semibold text-sm">
                      Status
                    </th>
                    <th className="w-1/5 text-center py-3 pl-3 pr-10 uppercase font-semibold text-sm">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {returns.map((item) => (
                    <tr key={item._id} className="bg-gray-150">
                      <td className="w-1/5  py-3 px-2 text-center">
                        {item.userId.department}
                      </td>
                      <td className="w-1/5 text-center py-3 px-2">
                        {item._id}
                      </td>
                      <td className="w-1/5 text-center py-3 px-2">
                        {item.items.length}
                      </td>
                      <td className="w-1/5 text-center py-3 px-2">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="w-1/5 text-center py-3 px-2">
                        {item.status}
                      </td>
                      <td className="w-1/5 text-center py-3 px-2">
                        <button
                          onClick={() => handleViewClick(item)}
                          className="text-blue-500 hover:text-blue-700"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Modal to Display Return Details */}
          {selectedReturn && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="w-full h-full bg-white p-6 overflow-auto">
                <button
                  onClick={closeModal}
                  className="absolute top-6 right-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6"
                >
                  Go Back
                </button>
                <div className="max-w-4xl w-full mx-auto p-6 rounded-lg shadow-lg">
                  <h2 className="text-3xl font-bold mb-6 text-center">
                    Return Details
                  </h2>
                  <p className="mb-2">
                    <strong>Department:</strong>{" "}
                    {selectedReturn.userId.department}
                  </p>
                  <p className="mb-2">
                    <strong>Return ID:</strong> {selectedReturn._id}
                  </p>
                  <p className="mb-2">
                    <strong>Date:</strong>{" "}
                    {new Date(selectedReturn.createdAt).toLocaleDateString()}
                  </p>
                  <p className="mb-4">
                    <strong>Items:</strong>
                  </p>
                  <ul className="list-disc pl-6">
                    {selectedReturn.items.map((item, index) => (
                      <li key={index}>
                        <strong>{item.item}</strong> - Quantity: {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Returns;
