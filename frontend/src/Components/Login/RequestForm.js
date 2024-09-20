import React, { useState } from 'react'
import UserHeader from '../User/UserHeader'
import UserSidebar from '../User/UserSidebar' // Importing the sidebar component

const RequestForm = () => {
  const [item, setItem] = useState('')
  const [quantity, setQuantity] = useState('')
  const [brand, setBrand] = useState('')
  const [isOtherSelected, setIsOtherSelected] = useState(false)

  const handleQuantityChange = (e) => {
    const value = e.target.value
    if (value === 'other') {
      setIsOtherSelected(true)
      setQuantity('')
    } else {
      setIsOtherSelected(false)
      setQuantity(value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({
      item,
      quantity: isOtherSelected ? quantity : quantity,
      brand,
    })
  }

  return (
    <>
      <UserHeader />
      <div className="pt-16 h-[100vh] flex">
        <UserSidebar className="fixed" />

        <div className="flex justify-center items-center flex-grow">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
          >
            <h2 className="text-2xl font-semibold text-center mb-6 text-[#b14ae8]">
              Stock Request Form
            </h2>

            {/* Item */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="item">
                Item
              </label>
              <input
                type="text"
                id="item"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b14ae8]"
              />
            </div>

            {/* Quantity */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="quantity">
                Quantity
              </label>
              {!isOtherSelected ? (
                <select
                  id="quantity"
                  onChange={handleQuantityChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b14ae8]"
                >
                  <option value="" disabled selected>
                    Select quantity
                  </option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="other">Other</option> {/* "Other" option */}
                </select>
              ) : (
                <input
                  type="number"
                  id="customQuantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b14ae8]"
                  placeholder="Enter custom quantity"
                />
              )}
            </div>

            {/* Brand */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="brand">
                Brand
              </label>
              <input
                type="text"
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b14ae8]"
              />
            </div>

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
  )
}

export default RequestForm
