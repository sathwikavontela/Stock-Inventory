import React, { useState, useEffect } from "react";
import { BASE_URL } from "../helper";
import FICHeader from "./FICHeader";
import FICSidebar from "./FICSidebar";

const FICRequests = () => {
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(7);
  const [viewType, setViewType] = useState("Approved");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/requests/getRequestsforFic`,
          { credentials: "include" }
        );
        if (!response.ok) throw new Error("Failed to fetch requests");
        const data = await response.json();

        if (Array.isArray(data.requests)) {
          setApprovedRequests(
            data.requests.filter((req) => req.status === "Approved")
          );
          setRejectedRequests(
            data.requests.filter((req) => req.status === "Rejected")
          );
        } else throw new Error("Expected 'requests' to be an array.");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handlePageChange = (page) => setCurrentPage(page);

  const requestsToShow =
    viewType === "Approved" ? approvedRequests : rejectedRequests;

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
      <div className="pt-16 h-[100vh] flex bg-[#f8f9fa]">
        <FICSidebar className="fixed h-[100%]" />
        <div className="flex justify-center items-start flex-grow">
          <div className="w-full max-w-6xl p-6 bg-white shadow-lg rounded-lg mt-5">
            {loading ? (
              <p className="text-center text-blue-500 font-semibold">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-600 font-semibold">{error}</p>
            ) : (
              <>
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

                {currentRequests.length > 0 ? (
                  <>
                   <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider bg-gradient-to-r from-[#4171d8] to-[#395ebf] text-white">
                            Request ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider bg-gradient-to-r from-[#4171d8] to-[#395ebf] text-white">
                            Items
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider bg-gradient-to-r from-[#4171d8] to-[#395ebf] text-white">
                            Quantity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider bg-gradient-to-r from-[#4171d8] to-[#395ebf] text-white">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider bg-gradient-to-r from-[#4171d8] to-[#395ebf] text-white">
                            Remarks
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {currentRequests.map((req, index) => (
                          <tr
                            key={req._id}
                            className={`hover:bg-gray-100 ${
                              index % 2 === 0 ? "bg-gray-50" : "bg-white"
                            }`}
                          >
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                              {req._id}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {req.items.map((item) => item.item).join(", ")}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {req.items.map((item) => item.quantity).join(", ")}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {req.status}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {req.remarks || "No remarks"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`${
                          currentPage === 1
                            ? "bg-gray-300"
                            : "bg-[#4171d8]] text-white"
                        } px-3 py-1 mx-1 rounded-lg`}
                      >
                        Previous
                      </button>
                      <div className="flex items-center">
                        {Array.from({ length: totalPages }, (_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-3 py-1 mx-1 rounded-lg ${
                              currentPage === i + 1
                                ? "bg-[#4171d8] text-white"
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
                          currentPage === totalPages
                            ? "bg-gray-300"
                            : "bg-[#4171d8] text-white"
                        } px-3 py-1 mx-1 rounded-lg`}
                      >
                        Next
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500 italic">
                    No {viewType.toLowerCase()} requests found.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FICRequests;
