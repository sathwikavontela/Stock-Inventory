import React, { useState, useEffect } from "react";
import { BASE_URL } from "../helper";
import FICHeader from "./FICHeader";
import FICSidebar from "./FICSidebar";

const FICRequests = () => {
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch approved and rejected requests
  const fetchRequests = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/requests/getRequestsforFic`,
        { credentials: "include" }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }
      const data = await response.json();
      console.log(data);

      // Split the data into approved and rejected requests
      //   setApprovedRequests(
      //     data.filter((request) => request.status === "approved")
      //   );
      //   setRejectedRequests(
      //     data.filter((request) => request.status === "rejected")
      //   );
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

  return (
    <>
      <FICHeader />
      <div className="pt-16 h-[100vh] flex">
        <FICSidebar className="fixed h-[100%]" />
        <div className="flex justify-center items-center flex-grow">
          <div className="w-full max-w-6xl p-6">
            <h2 className="text-2xl font-semibold text-center mb-6 text-[#b14ae8]">
              Approved and Rejected Requests
            </h2>

            {/* Loading state */}
            {loading && <p>Loading...</p>}

            {/* Error message */}
            {error && <p className="text-red-600">{error}</p>}

            {/* Display approved requests */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#b14ae8]">
                Approved Requests
              </h3>
              {approvedRequests.length > 0 ? (
                <table className="min-w-full table-auto border-collapse border border-gray-300 mt-4">
                  <thead>
                    <tr className="bg-[#b14ae8] text-white">
                      <th className="py-2 px-4">Request ID</th>
                      <th className="py-2 px-4">Description</th>
                      <th className="py-2 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvedRequests.map((request) => (
                      <tr key={request.id} className="border-b">
                        <td className="py-2 px-4">{request.id}</td>
                        <td className="py-2 px-4">{request.description}</td>
                        <td className="py-2 px-4">{request.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No approved requests found.</p>
              )}
            </div>

            {/* Display rejected requests */}
            <div>
              <h3 className="text-xl font-bold text-[#b14ae8]">
                Rejected Requests
              </h3>
              {rejectedRequests.length > 0 ? (
                <table className="min-w-full table-auto border-collapse border border-gray-300 mt-4">
                  <thead>
                    <tr className="bg-[#b14ae8] text-white">
                      <th className="py-2 px-4">Request ID</th>
                      <th className="py-2 px-4">Description</th>
                      <th className="py-2 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rejectedRequests.map((request) => (
                      <tr key={request.id} className="border-b">
                        <td className="py-2 px-4">{request.id}</td>
                        <td className="py-2 px-4">{request.description}</td>
                        <td className="py-2 px-4">{request.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No rejected requests found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FICRequests;
