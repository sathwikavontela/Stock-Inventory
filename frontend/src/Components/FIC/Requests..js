import React, { useState, useEffect } from "react";
import { BASE_URL } from "../helper";
import FICHeader from "./FICHeader";
import FICSidebar from "./FICSidebar";

const FICRequests = () => {
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [requestsPerPage] = useState(5); // Requests per page
  const [viewType, setViewType] = useState("Approved"); // Toggle Approved/Rejected
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch approved and rejected requests
  const fetchRequests = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/requests/getRequestsforFic`,
        { credentials: "include" }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }
      const data = await response.json();

      if (Array.isArray(data.requests)) {
        const approved = data.requests.filter(
          (request) => request.status === "Approved"
        );
        const rejected = data.requests.filter(
          (request) => request.status === "Rejected"
        );

        setApprovedRequests(approved);
        setRejectedRequests(rejected);
      } else {
        throw new Error("Expected 'requests' to be an array.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch requests when the component mounts
  useEffect(() => {
    fetchRequests();
  }, []);

  // Handle pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Determine which requests to show based on viewType and pagination
  const requestsToShow =
    viewType === "Approved"
      ? approvedRequests
      : rejectedRequests;

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = requestsToShow.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  const totalPages = Math.ceil(requestsToShow.length / requestsPerPage);

  return (
    <>
      <FICHeader />
      <div className=" pt-16 h-[100vh] flex bg-[#f8f9fa]">
        <FICSidebar className=" fixed h-[100%]" />
        <div className="flex justify-center items-start flex-grow">
          <div className="w-full max-w-6xl p-6 bg-white shadow-lg rounded-lg mt-5">
            {/* Loading state */}
            {loading && (
              <p className="text-center text-blue-500 font-semibold">
                Loading...
              </p>
            )}

            {/* Error message */}
            {error && (
              <p className="text-center text-red-600 font-semibold">{error}</p>
            )}

            {/* Toggle Buttons for Approved/Rejected */}
            <div className="mb-6 flex justify-center space-x-4">
              <button
                className={`px-4 py-2 rounded-lg ${
                  viewType === "Approved"
                    ? "bg-[#4171d8] text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setViewType("Approved")}
              >
                Approved Requests
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  viewType === "Rejected"
                    ? "bg-[#4171d8] text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setViewType("Rejected")}
              >
                Rejected Requests
              </button>
            </div>

            {/* Requests Table */}
            {currentRequests.length > 0 ? (
              <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        viewType === "Rejected"
                          ? "bg-gradient-to-r from-[#b14ae8] to-[#a646d3]"
                          : "bg-gradient-to-r from-[#4171d8] to-[#395ebf]"
                      } text-white`}
                    >
                      Request ID
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        viewType === "Rejected"
                          ? "bg-gradient-to-r from-[#b14ae8] to-[#a646d3]"
                          : "bg-gradient-to-r from-[#4171d8] to-[#395ebf]"
                      } text-white`}
                    >
                      Items
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        viewType === "Rejected"
                          ? "bg-gradient-to-r from-[#b14ae8] to-[#a646d3]"
                          : "bg-gradient-to-r from-[#4171d8] to-[#395ebf]"
                      } text-white`}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentRequests.map((request, index) => (
                    <tr
                      key={request._id}
                      className={`hover:bg-gray-100 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {request._id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {request.items.map((item) => item.item).join(", ")}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {request.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination Controls */}
              {requestsToShow.length > requestsPerPage && (
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`${
                      currentPage === 1 ? "bg-gray-300" : "bg-[#b14ae8] text-white"
                    } px-3 py-1 mx-1 rounded-lg`}
                  >
                    Previous
                  </button>
                  <div className="hidden sm:flex sm:items-center">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-1 mx-1 rounded-lg ${
                          currentPage === i + 1
                            ? "bg-[#b14ae8] text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`${
                      currentPage === totalPages ? "bg-gray-300" : "bg-[#b14ae8] text-white"
                    } px-3 py-1 mx-1 rounded-lg`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
            
            ) : (
              <p className="text-gray-500 italic">
                No {viewType.toLowerCase()} requests found.
              </p>
            )}

            {/* Pagination Controls */}
            {requestsToShow.length > requestsPerPage && (
              <div className="flex justify-center mt-4">
                <button
                  className="px-3 py-1 mx-1 bg-gray-200 rounded-lg"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`px-3 py-1 mx-1 rounded-lg ${
                      currentPage === i + 1
                        ? "bg-[#b14ae8] text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="px-3 py-1 mx-1 bg-gray-200 rounded-lg"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FICRequests;
