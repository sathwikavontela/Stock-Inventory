import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../helper'
import { useParams } from 'react-router-dom' // Import useParams

const OrderDetails = () => {
  const { orderId } = useParams()
  //console.log(orderId)
  const [request, setRequest] = useState(null)
  const [products, setProducts] = useState([]) // To store products by name
  //console.log(request)

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/requests/getRequestById/${orderId}`,
          { credentials: 'include' }
        )
        const data = await response.json()
        //  console.log(data.request.items[0].item)
        setRequest(data.request)
      } catch (error) {
        console.error('Error fetching request details:', error)
      }
    }

    fetchRequestDetails()
  }, [orderId])

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDetails = {}

        for (let item of request.items) {
          const productResponse = await fetch(
            `${BASE_URL}/api/v1/products/getProductByName/${item.item}`,
            { credentials: 'include' }
          )
          const productData = await productResponse.json()
          //console.log(productData)
          productDetails[item._id] = productData.product || {}
        }
        //console.log(products)
        setProducts(productDetails)
        console.log(productDetails)
      } catch (error) {
        console.error('Error fetching product details:', error)
      }
    }

    if (request?.items) {
      fetchProductDetails()
    }
  }, [request])

  if (!request) {
    return <div>Loading request details...</div>
  }

  const handleRequestedQuantityChange = (itemName, newQuantity) => {
    setRequest((prevRequest) => ({
      ...prevRequest,
      items: prevRequest.items.map((item) =>
        item.item === itemName
          ? { ...item, requestedQuantity: newQuantity }
          : item
      ),
    }))
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Request ID: {request._id}</h2>
        <p>Status: {request.status}</p>
        <p>Department: {request.userId?.department || 'N/A'}</p>
        <p>Requested Date: {new Date(request.createdAt).toLocaleString()}</p>
      </div>

      <h3 className="text-lg font-semibold mb-4">Items:</h3>
      <div>
        {request.items?.map((item, index) => (
          <div
            key={index}
            className="mb-4 p-4 border border-gray-300 rounded-lg"
          >
            <div className="flex justify-between">
              <div className="text-xl">{item.item}</div>
            </div>

            <div className="mt-2">
              <label className="block text-sm">Requested Quantity:</label>
              <input
                type="number"
                value={item.quantity}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-1"
                onChange={(e) =>
                  handleRequestedQuantityChange(item.item, e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        {products.items?.map((item, index) => (
          <div
            key={index}
            className="mb-4 p-4 border border-gray-300 rounded-lg"
          >
            <div className="flex justify-between">
              <div className="text-xl">{item.item}</div>
            </div>

            <div className="mt-2">
              <label className="block text-sm">
                Available Quantity:{item.quantity}
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="bg-green-500 text-white py-2 px-6 rounded-md">
          Approve Request
        </button>
        <button className="bg-red-500 text-white py-2 px-6 rounded-md ml-4">
          Reject Request
        </button>
      </div>
    </div>
  )
}

export default OrderDetails
