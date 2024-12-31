import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../helper';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [request, setRequest] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/requests/getRequestById/${orderId}`,
          { credentials: 'include' }
        );
        const data = await response.json();
        setRequest(data.request);
      } catch (error) {
        console.error('Error fetching request details:', error);
      }
    };

    fetchRequestDetails();
  }, [orderId]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDetails = {};

        for (let item of request.items) {
          const productResponse = await fetch(
            `${BASE_URL}/api/v1/products/getProductByName/${item.item}`,
            { credentials: 'include' }
          );
          const productData = await productResponse.json();
          productDetails[item._id] = productData.product || {};
        }
        setProducts(productDetails);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (request?.items) {
      fetchProductDetails();
    }
  }, [request]);

  const handleSubmit = async (status) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/requests/updateStatus/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP Error: ${response.status}, ${error}`);
      }
      const data = await response.json();
      setRequest((prevRequest) => ({ ...prevRequest, status: data.data.status }));
      alert("Request status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      alert(`Error: ${error.message}`);
    }
  };
  

  if (!request) {
    return <div>Loading request details...</div>;
  }

  const handleRequestedQuantityChange = (itemName, newQuantity) => {
    setRequest((prevRequest) => ({
      ...prevRequest,
      items: prevRequest.items.map((item) =>
        item.item === itemName
          ? { ...item, requestedQuantity: newQuantity }
          : item
      ),
    }));
  };

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
            className="p-6  border border-purple-300 rounded-lg shadow-md transition-all hover:scale-105 hover:shadow-xl bg-purple-50"
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

      <div className="mt-8 flex justify-center gap-6">
        <button
          className="bg-green-500 text-white py-3 px-6 rounded-md shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
          onClick={() => handleSubmit('Approved')}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Approve Request'}
        </button>
        <button
          className="bg-red-500 text-white py-3 px-6 rounded-md shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
          onClick={() => handleSubmit('Rejected')}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Reject Request'}
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
