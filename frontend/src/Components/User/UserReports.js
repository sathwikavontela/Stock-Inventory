import React, { useState, useEffect } from "react";
import { BASE_URL } from "../helper";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactApexChart from "react-apexcharts";

const UserReports = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ordersPerPage = 10;

  useEffect(() => {
    if (startDate && endDate) {
      fetchApprovedRequests();
    }
  }, [startDate, endDate]);

  const fetchApprovedRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/api/v1/users/get/approved/items?startDate=${startDate}&endDate=${endDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      setOrders(data.products);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const downloadPDF = async () => {
    try {
      const tableData = currentOrders.map((order) => [
        order._id,
        order.totalQuantity,
        "Approved",
      ]);

      const doc = new jsPDF();
      doc.text("User Reports", 14, 10);
      doc.autoTable({
        head: [["Order Name", "Quantity", "Status"]],
        body: tableData,
        startY: 20,
      });
      doc.save("user-reports.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to download the PDF. Please try again.");
    }
  };

  // ApexCharts Data
  const pieChartData = {
    series: currentOrders.map((order) => order.totalQuantity),
    options: {
      chart: {
        type: "pie",
      },
      labels: currentOrders.map((order) => order._id),
      title: {
        text: "Orders Quantity Distribution",
        align: "center",
        margin: 10,
        style: {
          fontSize: "18px",
          fontWeight: "bold",
        },
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="px-8 w-full mt-8 pb-2">
      <h1 className="text-xl font-bold mb-4">User Reports</h1>

      {/* Calendar for Date Selection */}
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
      </div>

      {/* Orders Table */}
      <div className="shadow overflow-hidden rounded-lg border-b border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">
                Order Name
              </th>
              <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">
                Quantity
              </th>
              <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentOrders.length > 0 ? (
              currentOrders.map((order, index) => (
                <tr key={index} className="bg-gray-50 even:bg-gray-100">
                  <td className="w-1/4 text-left py-3 px-4">{order._id}</td>
                  <td className="w-1/4 text-left py-3 px-4">
                    {order.totalQuantity}
                  </td>
                  <td className="w-1/4 text-left py-3 px-4 text-green-500">
                    Approved
                  </td>
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

      {/* Pie Chart */}
      <div className="mt-8">
        <ReactApexChart
          options={pieChartData.options}
          series={pieChartData.series}
          type="pie"
          height={350}
        />
      </div>

      {/* Download PDF Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={downloadPDF}
          className="bg-blue-500 text-white px-6 py-2 rounded-md"
        >
          Download PDF
        </button>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-200 opacity-50 cursor-not-allowed"
              : "bg-gray-800 text-white"
          }`}
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "bg-gray-800 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserReports;
