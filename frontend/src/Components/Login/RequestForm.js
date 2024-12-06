import React, { useState } from 'react'
import UserHeader from '../User/UserHeader'
import UserSidebar from '../User/UserSidebar'
import { BASE_URL } from '../helper'

const RequestForm = () => {
  const [items, setItems] = useState([{ item: '', quantity: '' }])

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items]
    updatedItems[index][field] = value
    setItems(updatedItems)
  }

  const addItem = () => {
    setItems([...items, { itemName: '', quantity: '' }])
  }

  const removeItem = (index) => {
    const updatedItems = [...items]
    updatedItems.splice(index, 1)
    setItems(updatedItems)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const requestData = { items: items }
      //console.log(requestData)

      const response = await fetch(
        `${BASE_URL}/api/v1/requests/createRequest`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(requestData),
        }
      )
      // console.log(response)
      if (!response.ok) {
        throw new Error('Request submission failed')
      }
      const data = await response.json()
      alert('Request submitted successfully')
      setItems([{ item: '', quantity: '' }])
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      <UserHeader />
      <div className="pt-16 h-[100vh] flex">
        <UserSidebar className="fixed h-[100%]" />
        <div className="flex justify-center items-center flex-grow">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
          >
            <h2 className="text-2xl font-semibold text-center mb-6 text-[#b14ae8]">
              Stock Request Form
            </h2>

            {items.map((itemObj, index) => (
              <div key={index} className="mb-6 border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium mb-4">Item {index + 1}</h3>

                {/* Item Name */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor={`item-${index}`}
                  >
                    Item
                  </label>
                  <input
                    type="text"
                    id={`item-${index}`}
                    value={itemObj.item}
                    onChange={(e) =>
                      handleItemChange(index, 'item', e.target.value)
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b14ae8]"
                  />
                </div>

                {/* Quantity */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor={`quantity-${index}`}
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    id={`quantity-${index}`}
                    value={itemObj.quantity}
                    onChange={(e) =>
                      handleItemChange(index, 'quantity', e.target.value)
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b14ae8]"
                  />
                </div>
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove Item
                  </button>
                )}
              </div>
            ))}

            {/* Add Item Button */}
            <button
              type="button"
              onClick={addItem}
              className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition duration-300 mb-4"
            >
              + Add Another Item
            </button>

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
  )
}

export default RequestForm
