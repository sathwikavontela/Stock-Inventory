import Chart from "react-apexcharts";
import React, { useState, useRef, useEffect } from "react";
import "./Styles.css"; // Import the CSS file
import { BASE_URL } from "../../utils";

const PieChart = () => {
  const chartRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/users/orders/fetch-orders/1`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        setOrders(responseData.orders);
        setLoading(false);
      } catch (error) {
        console.error("Fetching error:", error);
        setError("Failed to fetch data.");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []); // Only run once on mount

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        setChartWidth(chartRef.current.offsetWidth);
      }
    };

    handleResize(); // Set initial size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Process data to count orders per month
  useEffect(() => {
    const ordersCountByMonth = orders.reduce((acc, order) => {
      const createdAt = new Date(order.createdAt);

      if (createdAt instanceof Date && !isNaN(createdAt)) {
        const year = createdAt.getFullYear();
        const month = createdAt.getMonth() + 1;
        const monthKey = `${year}-${String(month).padStart(2, "0")}`;

        if (!acc[monthKey]) {
          acc[monthKey] = 0;
        }
        acc[monthKey]++;
      }
      return acc;
    }, {});

    const categoriesData = Object.keys(ordersCountByMonth).sort();
    const seriesData = categoriesData.map((key) => ordersCountByMonth[key]);

    setChartOptions({
      labels: categoriesData,
    });
    setChartSeries(seriesData);
  }, [orders]); // Update when orders change

  const [chartOptions, setChartOptions] = useState({
    labels: [],
  });
  const [chartSeries, setChartSeries] = useState([]);

  return (
    <div>
      <h2 className="font-bold text-2xl p-3">Recent Orders</h2>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <div className="chart-container" ref={chartRef}>
        {!loading && !error && (
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="pie"
            width={chartWidth}
          />
        )}
      </div>
    </div>
  );
};

export default PieChart;
