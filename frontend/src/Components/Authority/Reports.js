import React, { useState, useEffect } from "react";
import { BASE_URL } from "../helper";
import AuthorityHeader from "./AuthorityHeader";
import AuthoritySidebar from "./AuthoritySidebar";

const AuthorityReports = () => {
  const [returns, setReturns] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // Pagination states for returns and requests
  const [returnsPage, setReturnsPage] = useState(1);
  const [requestsPage, setRequestsPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // State to manage modal visibility and selected item
  const [viewItem, setViewItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [returnsResponse, requestsResponse] = await Promise.all([
          fetch(`${BASE_URL}/api/v1/returns/getReturnsForAuth`, {
            credentials: "include",
          }),
          fetch(`${BASE_URL}/api/v1/requests/getRequestsforAuthority`, {
            credentials: "include",
          }),
        ]);

        if (!returnsResponse.ok || !requestsResponse.ok) {
          throw new Error("Failed to fetch data.");
        }

        const returnsData = await returnsResponse.json();
        const requestsData = await requestsResponse.json();

        setReturns(returnsData.returns);
        setRequests(requestsData.requests);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Group data by department
  const groupByDepartment = (data) => {
    return data.reduce((acc, curr) => {
      const dept = curr.userId.department;
      if (!acc[dept]) acc[dept] = [];
      acc[dept].push(curr);
      return acc;
    }, {});
  };

  const groupedReturns = groupByDepartment(returns);
  const groupedRequests = groupByDepartment(requests);

  // Pagination logic
  const paginateData = (data, page) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  };

  const handlePagination = (type, action) => {
    if (type === "returns") {
      if (action === "prev" && returnsPage > 1) setReturnsPage(returnsPage - 1);
      if (
        action === "next" &&
        returnsPage * itemsPerPage < groupedReturns[selectedDepartment]?.length
      )
        setReturnsPage(returnsPage + 1);
    } else if (type === "requests") {
      if (action === "prev" && requestsPage > 1)
        setRequestsPage(requestsPage - 1);
      if (
        action === "next" &&
        requestsPage * itemsPerPage <
          groupedRequests[selectedDepartment]?.length
      )
        setRequestsPage(requestsPage + 1);
    }
  };

  const handleViewItem = (item) => {
    setViewItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setViewItem(null);
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
            {!selectedDepartment ? (
              <div>
                <h2 className="text-xl font-bold mb-4">Select a Department:</h2>
                <ul className="list-disc list-inside">
                  {Object.keys(groupedReturns).length === 0 &&
                  Object.keys(groupedRequests).length === 0 ? (
                    <p>No returns or requests raised by departments.</p>
                  ) : (
                    Object.keys({ ...groupedReturns, ...groupedRequests }).map(
                      (department) => (
                        <li
                          key={department}
                          className="cursor-pointer text-blue-500 hover:underline"
                          onClick={() => {
                            setSelectedDepartment(department);
                            setReturnsPage(1);
                            setRequestsPage(1);
                          }}
                        >
                          {department}
                        </li>
                      )
                    )
                  )}
                </ul>
              </div>
            ) : (
              <div>
                <button
                  className="mb-4 px-4 py-2 bg-gray-300 text-gray-700 rounded"
                  onClick={() => setSelectedDepartment(null)}
                >
                  Back to Departments
                </button>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold mb-4">
                    Reports for Department: {selectedDepartment}
                  </h2>
                </div>

                {/* Returns Table */}
                <h3 className="text-lg font-bold mb-2">Returns</h3>
                <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2">ID</th>
                      <th className="border border-gray-300 px-4 py-2">
                        No. of Items
                      </th>
                      <th className="border border-gray-300 px-4 py-2">Date</th>
                      <th className="border border-gray-300 px-4 py-2">
                        Status
                      </th>
                      <th className="border border-gray-300 px-4 py-2">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginateData(
                      groupedReturns[selectedDepartment] || [],
                      returnsPage
                    ).map((item) => (
                      <tr key={item._id} className="text-center">
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
                          {item.status || "Pending"}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <button
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={() => handleViewItem(item)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-end mb-4">
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
                    onClick={() => handlePagination("returns", "prev")}
                    disabled={returnsPage === 1}
                  >
                    Prev
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                    onClick={() => handlePagination("returns", "next")}
                    disabled={
                      returnsPage * itemsPerPage >=
                      groupedReturns[selectedDepartment]?.length
                    }
                  >
                    Next
                  </button>
                </div>

                {/* Requests Table */}
                <h3 className="text-lg font-bold mb-2">Requests</h3>
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2">ID</th>
                      <th className="border border-gray-300 px-4 py-2">
                        No. of Items
                      </th>
                      <th className="border border-gray-300 px-4 py-2">Date</th>
                      <th className="border border-gray-300 px-4 py-2">
                        Status
                      </th>
                      <th className="border border-gray-300 px-4 py-2">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginateData(
                      groupedRequests[selectedDepartment] || [],
                      requestsPage
                    ).map((item) => (
                      <tr key={item._id} className="text-center">
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
                          {item.status || "Pending"}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <button
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={() => handleViewItem(item)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-end mb-4">
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
                    onClick={() => handlePagination("requests", "prev")}
                    disabled={requestsPage === 1}
                  >
                    Prev
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                    onClick={() => handlePagination("requests", "next")}
                    disabled={
                      requestsPage * itemsPerPage >=
                      groupedRequests[selectedDepartment]?.length
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for View Item */}
      {isModalOpen && viewItem && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Item Details</h3>
            <div>
              <p>
                <strong>Item ID:</strong> {viewItem._id}
              </p>
              <p>
                <strong>Department:</strong> {viewItem.userId.department}
              </p>
              <p>
                <strong>No. of Items:</strong> {viewItem.items.length}
              </p>
              <p>
                <strong>Status:</strong> {viewItem.status}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(viewItem.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Items List:</strong>
              </p>
              <ul>
                {viewItem.items.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.item}</strong>: {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorityReports;
