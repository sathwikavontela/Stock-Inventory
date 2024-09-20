import React, { useEffect, useState } from 'react';
import departmentsData from './Data/DepartmentsData.json';

const FICDept = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Load the departments data from JSON
    setDepartments(departmentsData);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Department Sections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div key={dept.id} className="relative p-4 shadow-md rounded-lg bg-white hover:shadow-xl transition-shadow">
            <img src={dept.image} alt={dept.name} className="w-full h-48 object-cover rounded-lg" />
            <div className="mt-4">
              <h2 className="text-xl font-bold">{dept.name}</h2>
              <p className="text-gray-500">Requests: {dept.requests.length}</p>
            </div>
            {/* Notification Icon */}
            {dept.pendingRequests > 0 && (
              <div className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full text-sm">
                {dept.pendingRequests}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FICDept;
