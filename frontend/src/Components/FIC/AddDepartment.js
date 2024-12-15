import React, { useState } from "react";
import { BASE_URL } from "../helper";
import FICHeader from "./FICHeader";
import FICSidebar from "./FICSidebar";

const AddDepartment = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    departmentName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${BASE_URL}/api/v1/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          fullname: formData.fullname,
          department: formData.departmentName,
          email: formData.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      setMessage("Department added successfully");
      setFormData({
        username: "",
        password: "",
        fullname: "",
        departmentName: "",
        email: "",
      });
    } catch (error) {
      setMessage("Error adding department. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FICHeader />
      <div className="pt-16 h-[100vh] flex">
        <FICSidebar className="fixed h-[100%]" />
        <div className="flex justify-center items-center flex-grow">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
          >
            <h2 className="text-2xl font-semibold text-center mb-6 text-[#b14ae8]">
              Add New Department
            </h2>

            {/* Username */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b14ae8]"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b14ae8]"
              />
            </div>

            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="fullname">
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b14ae8]"
              />
            </div>

            {/* Department Name */}
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="departmentName"
              >
                Department Name
              </label>
              <input
                type="text"
                id="departmentName"
                name="departmentName"
                value={formData.departmentName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b14ae8]"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b14ae8]"
              />
            </div>

            {/* Message */}
            {message && (
              <p
                className={`mb-4 text-sm ${
                  message.includes("successfully")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-[#b14ae8] text-white py-2 rounded-md hover:bg-[#9c40d8] transition duration-300 ${
                loading ? "bg-gray-400 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Department"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDepartment;
