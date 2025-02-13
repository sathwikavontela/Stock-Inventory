import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../helper";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactApexChart from "react-apexcharts";

const FICDeptReports = () => {
  const { deptId } = useParams();
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/requests/getRequestsByDepartmentForFic/${deptId}`,
          { credentials: "include" }
        );
        if (!response.ok) throw new Error("Failed to fetch reports");
        const data = await response.json();
        console.log(data.reports);
        setReports(data.reports || []);
        setFilteredReports(data.reports || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [deptId]);

  const filterReports = () => {
    if (startDate && endDate) {
      const filtered = reports.filter(
        (report) =>
          new Date(report.createdAt).getTime() >=
            new Date(startDate).getTime() &&
          new Date(report.createdAt).getTime() <= new Date(endDate).getTime()
      );
      setFilteredReports(filtered);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Reports for Department ID: ${deptId}`, 14, 10);
    doc.autoTable({
      head: [["Item Name", "Quantity", "Status", "Date"]],
      body: filteredReports.flatMap((report) =>
        report.items.map((item) => [
          item.itemName,
          item.quantity,
          report.status,
          new Date(report.createdAt).toLocaleDateString(),
        ])
      ),
    });
    doc.save(`department-report-${deptId}.pdf`);
  };

  const generatePieChartData = () => {
    const itemCounts = {};

    filteredReports.forEach((report) => {
      report.items.forEach((item) => {
        if (itemCounts[item.itemName]) {
          itemCounts[item.itemName] += item.quantity;
        } else {
          itemCounts[item.itemName] = item.quantity;
        }
      });
    });

    return {
      series: Object.values(itemCounts),
      options: {
        chart: { type: "pie" },
        labels: Object.keys(itemCounts),
        title: { text: "Item Distribution by Quantity", align: "center" },
      },
    };
  };

  const pieChartData = generatePieChartData();

  if (loading) return <div>Loading reports...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">
        Reports for Department: {deptId}
      </h2>
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
          onClick={filterReports}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Filter
        </button>
        <button
          onClick={generatePDF}
          className="bg-green-500 text-white p-2 rounded ml-2"
        >
          Download PDF
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Item Name</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((report) =>
            report.items.map((item, idx) => (
              <tr key={idx} className="border-b">
                <td className="border p-2">{item.itemName}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">{report.status}</td>
                <td className="border p-2">
                  {new Date(report.createdAt).toLocaleDateString("en-GB")}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="mt-6">
        <ReactApexChart
          options={pieChartData.options}
          series={pieChartData.series}
          type="pie"
        />
      </div>
    </div>
  );
};

export default FICDeptReports;
