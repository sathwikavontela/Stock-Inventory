import React, { useEffect, useState } from "react";
import DepartmentRecords from "./DepartmentRecords";
import FICHeader from "./FICHeader";
import { BASE_URL } from "../helper";

const FICDept = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    // Fetch departments from the backend API
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/users/getDepts`, {
          credentials: "include", // to include cookies (if needed)
        });
        console.log(response);

        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }

        const data = await response.json();
        setDepartments(data.departments); // assuming the response returns an array of departments
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleDepartmentClick = (id) => {
    setSelectedDepartmentId(id);
  };

  const handleBack = () => {
    setSelectedDepartmentId(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <FICHeader />
      <div className="pt-24 px-8">
        {selectedDepartmentId ? (
          <>
            <button
              onClick={handleBack}
              className="mb-4 text-white bg-purple-600 hover:bg-purple-800 px-5 py-2 rounded-md shadow-sm transition-all duration-200"
            >
              ← Back to Departments
            </button>
            <DepartmentRecords departmentId={selectedDepartmentId} />
          </>
        ) : (
          <div className="max-w-7xl mx-auto bg-white p-10 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Departments
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  className="relative border border-gray-300 rounded-lg shadow-sm hover:shadow-md bg-white transition-all duration-300 cursor-pointer"
                  onClick={() => handleDepartmentClick(dept.department)}
                >
                  <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-5 text-center font-semibold rounded-t-lg">
                    {dept.name}
                  </div>
                  <div className="p-6 flex flex-col items-center">
                    {/* <p className="text-gray-600 text-lg mb-4">
   x                   Total Requests: {dept.requests.length}
                    </p> */}
                    <button className="bg-purple-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-purple-700 transition-all">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FICDept;
