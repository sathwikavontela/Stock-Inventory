import React, { useState, useEffect } from "react";
import { BASE_URL } from "../helper";
import AuthorityHeader from "./AuthorityHeader";
import AuthoritySidebar from "./AuthoritySidebar";
import { FaEye } from "react-icons/fa"; // Importing an eye icon from react-icons

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
          `${BASE_URL}/api/v1/returns/getReturnsForAuth`,
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

  const handleStatusChange = async (returnId, newStatus) => {
    setStatusLoading(true); // Set loading state while updating
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/returns/updateStatus/${returnId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update return status.");
      }
      //console.log(response);

      // Update the status locally after successful update
      setReturns((prevReturns) =>
        prevReturns.map((item) =>
          item._id === returnId ? { ...item, status: newStatus } : item
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setStatusLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex h-screen">
      <AuthorityHeader />
      <div className="pt-16 h-[100vh] flex">
        <AuthoritySidebar />
        <div className="p-4 mx-6 w-[80vw] h-full overflow-y-auto">
          <div className="p-6 overflow-auto">
            {returns.length === 0 ? (
              <p>No returns raised by departments.</p>
            ) : (
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">
                      Department
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Return ID
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      No. of Items
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                    <th className="border border-gray-300 px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {returns.map((item) => (
                    <tr key={item._id} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">
                        {item.userId.department}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item._id}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.items.length}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <select
                          value={item.status || "Pending"}
                          onChange={(e) =>
                            handleStatusChange(item._id, e.target.value)
                          }
                          className="border border-gray-300 rounded p-1"
                          disabled={statusLoading}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
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
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
                <h2 className="text-xl font-bold mb-4 text-center">
                  Return Details
                </h2>
                <p>
                  <strong>Department:</strong>{" "}
                  {selectedReturn.userId.department}
                </p>
                <p>
                  <strong>Return ID:</strong> {selectedReturn._id}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedReturn.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Items:</strong>
                </p>
                <ul className="list-disc pl-6">
                  {selectedReturn.items.map((item, index) => (
                    <li key={index}>
                      <strong>{item.item}</strong> - Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={closeModal}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 absolute top-4 right-4"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Returns;
