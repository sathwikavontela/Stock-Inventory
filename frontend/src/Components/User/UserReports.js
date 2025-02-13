import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactApexChart from "react-apexcharts";
import { BASE_URL } from "../helper";

const UserReports = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/api/v1/users/get/approved/items`,
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

      // Ensure we're accessing "products"
      if (!data.products) {
        throw new Error("Invalid data format");
      }

      const formattedData = data.products.map((item) => ({
        id: item._id,
        userId: item.userId,
        items: item.items.map((i) => ({ name: i.item, quantity: i.quantity })),
        status: item.status,
        createdAt: new Date(item.createdAt).toISOString().split("T")[0],
      }));

      setOrders(formattedData);
      setFilteredOrders(formattedData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const filterOrders = () => {
    if (startDate && endDate) {
      const filtered = orders.filter(
        (order) => order.createdAt >= startDate && order.createdAt <= endDate
      );
      setFilteredOrders(filtered);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("User Reports", 14, 10);
    doc.autoTable({
      head: [
        ["Order ID", "User ID", "Items", "Quantity", "Status", "Created At"],
      ],
      body: filteredOrders.map((order) => [
        order.id,
        order.userId,
        order.items.map((i) => i.name).join(", "),
        order.items.map((i) => i.quantity).join(", "),
        order.status,
        order.createdAt,
      ]),
    });
    doc.save("user-reports.pdf");
  };

  const aggregateItemQuantities = () => {
    const itemMap = new Map();

    filteredOrders.forEach((order) => {
      order.items.forEach((item) => {
        if (itemMap.has(item.name)) {
          itemMap.set(item.name, itemMap.get(item.name) + item.quantity);
        } else {
          itemMap.set(item.name, item.quantity);
        }
      });
    });

    return {
      labels: Array.from(itemMap.keys()),
      series: Array.from(itemMap.values()),
    };
  };

  const aggregatedData = aggregateItemQuantities();

  const pieChartData = {
    series: aggregatedData.series,
    options: {
      chart: { type: "pie" },
      labels: aggregatedData.labels,
      title: { text: "Orders Quantity Distribution", align: "center" },
    },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Approved Items</h2>

      {/* Date Filters */}
      <div className="mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={filterOrders}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Filter
        </button>
        <button
          onClick={downloadPDF}
          className="bg-green-500 text-white p-2 rounded ml-2"
        >
          Download PDF
        </button>
      </div>

      {/* Orders Table */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Items</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">
                {order.items.map((item) => (
                  <div key={item.name}>{item.name}</div>
                ))}
              </td>
              <td className="border p-2">
                {order.items.map((item) => (
                  <div key={item.name}>{item.quantity}</div>
                ))}
              </td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2">{order.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pie Chart */}
      <div className="mt-6 w-8/12 h-8/12 mx-auto">
        {" "}
        {/* Adjust width and height */}
        <ReactApexChart
          options={{
            ...pieChartData.options,
            chart: { width: 400 }, // Decrease width
          }}
          series={pieChartData.series}
          type="pie"
        />
      </div>
    </div>
  );
};

export default UserReports;
