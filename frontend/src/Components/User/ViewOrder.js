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
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg shadow-lg mt-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Order Details
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-medium text-blue-700 mb-4">
          Order ID: {order._id}
        </h3>

        <div className="mb-4">
          <p className="text-gray-700">
            <span className="font-semibold text-blue-600">Status:</span>{' '}
            {order.status}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-blue-600">Created At:</span>{' '}
            {new Date(order.createdAt).toLocaleString()}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-blue-600">Updated At:</span>{' '}
            {order.updatedAt
              ? new Date(order.updatedAt).toLocaleString()
              : 'N/A'}
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-indigo-600 mb-2">Items:</h4>
          <ul className="list-none pl-0 space-y-2">
            {order.items.map((item1, index) => (
              <li
                key={index}
                className="text-gray-800 flex justify-between items-center"
              >
                <span className="font-medium text-purple-600">
                  {item1.item}
                </span>
                <span className="text-gray-500">
                  (Quantity: {item1.quantity})
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-500 transition duration-300"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
        <span className="text-gray-500">Order details are ready!</span>
      </div>
    </div>
  )
}

export default ViewOrder
