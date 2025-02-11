import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../helper";
import jsPDF from "jspdf";

const FICDeptReports = () => {
  const { deptId } = useParams(); // Get department ID from URL
  const [reports, setReports] = useState([]); // To store reports
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/requests/getRequestsByDepartmentForFic/${deptId}`,
          {
            credentials: "include", // Include cookies if needed
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }

        const data = await response.json();

        if (data.reports && data.reports.length > 0) {
          setReports(data.reports); // Assuming response contains a `reports` array
        } else {
          setReports([]); // If no reports are available, set an empty array
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [deptId]);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`Reports for Department ID: ${deptId}`, 14, 20);

    let y = 30;
    doc.setFontSize(12);

    // Add table headers
    doc.text("Status", 14, y);
    doc.text("Item Name", 60, y);
    doc.text("Quantity", 120, y);
    doc.text("Approval Status", 160, y);
    y += 10;

    // Add the reports data
    reports.forEach((report) => {
      report.items.forEach((item) => {
        doc.text(report.status, 14, y);
        doc.text(item.itemName, 60, y);
        doc.text(String(item.quantity), 120, y);
        doc.text(item.approved ? "Approved" : "Not Approved", 160, y);
        y += 10;
      });
    });

    // Save PDF
    doc.save(`department-report-${deptId}.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading reports...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Reports for Department: {deptId}
        </h2>
        {reports.length > 0 ? (
          <div>
            {/* Button to Generate PDF */}
            <button
              onClick={generatePDF}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md mb-6"
            >
              Download Reports as PDF
            </button>

            {/* Table to Display Reports */}
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Status
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Item Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <React.Fragment key={index}>
                    {report.items.map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-200">
                        <td className="border border-gray-300 px-4 py-2">
                          {item.itemName}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.quantity}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {report.status}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No reports found for this department.</p>
        )}
      </div>
    </div>
  );
};

export default FICDeptReports;
