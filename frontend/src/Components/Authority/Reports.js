import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { BASE_URL } from "../helper";

const UserReports = () => {
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApprovedRequests(); // Fetch all orders initially
  }, []);

  const fetchApprovedRequests = async () => {
    try {
      setLoading(true);

      // Construct query string based on the availability of startDate and endDate
      let url = `${BASE_URL}/api/v1/users/get/approved/items1`;

      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data.requests || []);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    try {
      const doc = new jsPDF();
      const tableData = orders.map((order) => [
        order.itemName,
        order.quantity,
        order.status,
      ]);

      doc.text("User Reports", 14, 10);
      doc.autoTable({
        head: [["Item Name", "Quantity", "Status"]],
        body: tableData,
        startY: 20,
      });

      doc.save("user-reports.pdf");
    } catch (error) {
      alert("Error generating PDF: " + error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="px-8 w-full mt-8 pb-2">
      <h1 className="text-xl font-bold mb-4">User Reports</h1>

      {/* Date Filter */}
      <div className="mb-4 flex space-x-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <button
          onClick={fetchApprovedRequests}
          className={`px-6 py-2 rounded-md mt-6 ${
            startDate && endDate
              ? "bg-blue-500 text-white"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
          disabled={!startDate || !endDate}
        >
          Filter
        </button>
      </div>

      {/* Orders Table */}
      <div className="shadow overflow-hidden rounded-lg border-b border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                Item Name
              </th>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                Quantity
              </th>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={index} className="bg-gray-50 even:bg-gray-100">
                  <td className="w-1/3 text-left py-3 px-4">
                    {order.itemName}
                  </td>
                  <td className="w-1/3 text-left py-3 px-4">
                    {order.quantity}
                  </td>
                  <td className="w-1/3 text-left py-3 px-4">{order.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No approved orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Download PDF Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={downloadPDF}
          className="bg-green-500 text-white px-6 py-2 rounded-md"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default UserReports;
