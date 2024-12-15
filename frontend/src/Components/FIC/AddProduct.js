import React, { useState } from "react";
import { BASE_URL } from "../helper";
import FICHeader from "./FICHeader";
import FICSidebar from "./FICSidebar";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    quantity: "",
    description: "",
    image: null, // File upload field
  });
  const [imageUrl, setImageUrl] = useState(""); // To store the uploaded image URL

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const uploadToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary upload preset
    formData.append("cloud_name", "dnvwmxxdu"); // Replace with your Cloudinary cloud name

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dnvwmxxdu/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      console.log(data);
      return data.secure_url; // URL of the uploaded image
    } catch (error) {
      console.error("Cloudinary Upload Error:", error.message);
      alert("Failed to upload image");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let uploadedImageUrl = "";
      if (formData.image) {
        uploadedImageUrl = await uploadToCloudinary(formData.image);
        if (!uploadedImageUrl) return;
        setImageUrl(uploadedImageUrl);
      }

      const requestData = {
        name: formData.itemName,
        quantity: formData.quantity,
        description: formData.description,
        image: uploadedImageUrl,
      };

      const response = await fetch(`${BASE_URL}/api/v1/products/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify(requestData),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Request submission failed");
      }

      const data = await response.json();
      alert("Request submitted successfully");
      setFormData({
        itemName: "",
        quantity: "",
        description: "",
        image: null,
      });
      setImageUrl("");
    } catch (error) {
      alert(error.message);
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
              Add New Item
            </h2>

            {/* Item Name */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="itemName">
                Item Name
              </label>
              <input
                type="text"
                id="itemName"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b14ae8]"
              />
            </div>

            {/* Quantity */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="quantity">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b14ae8]"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b14ae8]"
              />
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="image">
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b14ae8]"
              />
            </div>

            {imageUrl && (
              <p className="text-green-500 mb-4">Image uploaded: {imageUrl}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#b14ae8] text-white py-2 rounded-md hover:bg-[#9c40d8] transition duration-300"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
