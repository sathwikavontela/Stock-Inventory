import React, { useState } from 'react'
import UserHeader from '../User/UserHeader'
import UserSidebar from '../User/UserSidebar' // Importing the sidebar component

const ReturnForm = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    itemQuantity: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form Data:', formData)
  }

  return (
    <>
      <UserHeader />
      <div className="pt-16 h-[100vh] flex">
        <UserSidebar className="fixed" />

        {/* Form Section */}
        <div className="flex justify-center items-center flex-grow w-[88%]">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Item Form</h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="itemName"
              >
                Item Name
              </label>
              <input
                type="text"
                name="itemName"
                id="itemName"
                value={formData.itemName}
                onChange={handleChange}
                placeholder="Enter item name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="itemQuantity"
              >
                Item Quantity
              </label>
              <input
                type="number"
                name="itemQuantity"
                id="itemQuantity"
                value={formData.itemQuantity}
                onChange={handleChange}
                placeholder="Enter item quantity"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}



export default ReturnForm
