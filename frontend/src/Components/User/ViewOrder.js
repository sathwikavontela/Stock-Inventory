import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../helper'

const ViewOrder = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    fetchRequestById()
  }, [orderId])

  const fetchRequestById = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/requests/getRequestById/${orderId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // To send cookies with the request(jwt token)
        }
      )

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      if (data.request) {
        setOrder(data.request)
      } else {
        alert('Order not found')
      }
    } catch (error) {
      alert(error.message)
    }
  }

  if (!order) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      {/* Card Header */}
      <div className="relative bg-gradient-to-b from-[#8d2ac2] to-purple-600 p-2 text-center rounded-t-full">
      
        <h2 className="text-2xl font-bold text-white mt-2">Order Details</h2>
        <p className="text-sm text-purple-200 mt-1">Order ID: {order._id}</p>
      </div>
  
      {/* Card Body */}
      <div className="bg-[#f8f5f2] p-6 rounded-b-lg text-center shadow-md">
        <div className="space-y-4">
          {/* Order Status */}
          <div>
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-purple-600">Status:</span>{' '}
              {order.status}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-purple-600">Created At:</span>{' '}
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-purple-600">Updated At:</span>{' '}
              {order.updatedAt
                ? new Date(order.updatedAt).toLocaleString()
                : 'N/A'}
            </p>
          </div>
  
          {/* Order Items */}
          <div>
            <h3 className="text-lg font-semibold text-purple-700">Order Items</h3>
            <ul className="list-none mt-3 space-y-3">
              {order.items.map((item, index) => (
                <li
                  key={index}
                  className="bg-[#fffaf3] p-4 rounded-md shadow hover:shadow-lg transition-transform transform hover:scale-105"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-purple-700">{item.item}</span>
                    <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  
      {/* Footer Section */}
      <div className="mt-6 flex justify-between items-center">
        <button
          className="px-6 py-2 bg-[#8d2ac2] text-white font-semibold rounded-md hover:bg-purple-600 transition-transform transform hover:scale-105"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
        <span className="text-sm text-gray-600">Details are ready to view!</span>
      </div>
    </div>
  );
  
  
  
  
  
}

export default ViewOrder
