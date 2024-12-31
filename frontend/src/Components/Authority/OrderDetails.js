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
    <div className="container mx-auto mt-8 p-6 bg-purple-200 rounded-lg shadow-lg max-w-4xl">
    <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Order Details</h1>
  
    <div className="mb-6 p-6 bg-purple-50 border border-purple-200 rounded-lg shadow-sm">
  <h2 className="text-2xl font-semibold text-purple-700 mb-2">Request ID: {request._id}</h2>
  <p className="text-lg text-purple-700 mb-1">
    Status: <span className={`font-medium ${request.status === 'Approved' ? 'text-green-600' : 'text-red-600'}`}>{request.status}</span>
  </p>
  <p className="text-lg text-purple-700 mb-1">Department: {request.userId?.department || 'N/A'}</p>
  <p className="text-lg text-purple-700">Requested Date: {new Date(request.createdAt).toLocaleString()}</p>
</div>

  
    <h3 className="text-xl font-semibold text-purple-700 mb-4">Items:</h3>
    <div className="space-y-6">
      {request.items?.map((item, index) => (
        <div
          key={index}
          className="p-6 bg-white border border-purple-300 rounded-lg shadow-md transition-all hover:scale-105 hover:shadow-xl bg-purple-50"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="text-xl font-semibold text-purple-800">{item.item}</div>
          </div>
  
          <div className="mt-4">
            <label className="block text-sm text-purple-600">Requested Quantity:</label>
            <input
              type="number"
              value={item.quantity}
              className="w-full px-4 py-3 border border-purple-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              onChange={(e) =>
                handleRequestedQuantityChange(item.item, e.target.value)
              }
            />
          </div>
        </div>
      ))}
    </div>
  
    <h3 className="text-xl font-semibold text-purple-700 mb-4 mt-6">Available Items:</h3>
    <div className="space-y-6">
      {products.items?.map((item, index) => (
        <div
          key={index}
          className="p-6  border border-purple-300 rounded-lg shadow-md transition-all hover:scale-105 hover:shadow-xl bg-purple-300"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="text-xl font-semibold text-purple-800">{item.item}</div>
          </div>
  
          <div className="mt-4">
            <label className="block text-sm text-purple-600">
              Available Quantity: <span className="font-medium text-purple-700">{item.quantity}</span>
            </label>
          </div>
        </div>
      ))}
    </div>
  
    <div className="mt-8 flex justify-center gap-6">
      <button className="bg-green-500 text-white py-3 px-6 rounded-md shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all">
        Approve Request
      </button>
      <button className="bg-red-500 text-white py-3 px-6 rounded-md shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all">
        Reject Request
      </button>
    </div>
  </div>
  
  
  )
}

export default OrderDetails
