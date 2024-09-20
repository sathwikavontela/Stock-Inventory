import React, { useEffect, useState } from 'react';
import departmentsData from '../Data/SectionsData.json';
import DepartmentRecords from './DepartmentRecords';
import FICHeader from './FICHeader';

const FICDept = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

  useEffect(() => {
    // Load the departments data from JSON
    setDepartments(departmentsData);
  }, []);

  const handleDepartmentClick = (id) => {
    setSelectedDepartmentId(id);
  };

  const handleBack = () => {
    setSelectedDepartmentId(null);
  };

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
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Departments</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  className="relative border border-gray-300 rounded-lg shadow-sm hover:shadow-md bg-white transition-all duration-300 cursor-pointer"
                  onClick={() => handleDepartmentClick(dept.id)}
                >
                  <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-5 text-center font-semibold rounded-t-lg">
                    {dept.name}
                  </div>
                  <div className="p-6 flex flex-col items-center">
                    <img
                      src={dept.image}
                      alt={dept.name}
                      className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-gray-200 shadow-sm"
                    />
                    <p className="text-gray-600 text-lg mb-4">
                      Total Requests: {dept.requests.length}
                    </p>
                    <button
                      className="bg-purple-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-purple-700 transition-all"
                    >
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
