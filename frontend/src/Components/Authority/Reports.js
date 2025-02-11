import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import AuthorityHeader from "./AuthorityHeader";
import { BASE_URL } from "../helper";
const UserReports = () => {
  const [departments, setDepartments] = useState([]); // Stores the department list
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const navigate = useNavigate(); // Hook to navigate dynamically

  useEffect(() => {
    // Fetch departments from the backend API
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/users/getDepts`, {
          credentials: "include", // To include cookies if required
        });

        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }

        const data = await response.json();
        console.log(data);
       /*  setDepartment */
         setDepartments(data.departments); // Assuming data has a `departments` array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleDepartmentClick = (departmentId) => {
    // Navigate to a dynamic route using department ID
    navigate(`/fic-reports/${departmentId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading departments...</p>
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
    <div className="min-h-screen bg-gray-100">
      <AuthorityHeader />
      <div className="pt-24 px-8">
        <div className="max-w-7xl mx-auto bg-white p-10 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Departments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {departments.map((dept) => (
              <div
                key={dept._id}
                className="relative border border-gray-300 rounded-lg shadow-sm hover:shadow-md bg-white transition-all duration-300 cursor-pointer"
                onClick={() => handleDepartmentClick(dept._id)} // Navigate on click
              >
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-5 text-center font-semibold rounded-t-lg">
                  {dept.department}
                </div>
                <div className="p-6 flex flex-col items-center">
                  <button className="bg-purple-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-purple-700 transition-all">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReports;
