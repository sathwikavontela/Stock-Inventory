import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi' // Import back icon
import { BASE_URL } from '../helper'

const ProductUpdateForm = () => {
  const { productId } = useParams() // Get productId from URL
  const navigate = useNavigate()

  const [product, setProduct] = useState({
    name: '',
    description: '',
    stock: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch the product details based on productId
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response1 = await fetch(
          `${BASE_URL}/api/v1/products/${productId}`,
          { credentials: 'include' }
        )
        if (!response1.ok) {
          throw new Error('Failed to fetch product details.')
        }
        const productData = await response1.json()
        setProduct({
          name: productData.product.name,
          description: productData.product.description,
          quantity: productData.product.quantity,
        })
      } catch (error) {
        console.error('Error fetching product details:', error)
        setError('Failed to load product details.')
      } finally {
        setLoading(false) // Set loading to false after fetching
      }
    }

    fetchProductDetails()
  }, [productId]) // Fetch new details if productId changes

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${BASE_URL}/api/v1/products/editProduct`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          ...product,
        }),
      })
      console.log(await response.json())
      if (!response.ok) {
        throw new Error('Failed to update product.')
      }

      alert('Product updated successfully!')
      navigate('/fic-home') // Redirect to another page after successful update
    } catch (error) {
      console.error('Error updating product:', error)
      setError('Failed to update the product.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center mt-10">Loading product details...</div>
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => navigate('/fic-home')}
          className="absolute top-[-20px] left-0 text-blue-500 flex items-center gap-1 mt-6"
        >
          <BiArrowBack size={24} />
          <span>Back</span>
        </button>

        {/* Form */}
        <form
          className="bg-white p-6 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-bold mb-4 text-center">Update Product</h2>

          {/* Product Name */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="name"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          {/* Product Description */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="description"
            >
              Product Description
            </label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Product Stock */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="stock"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProductUpdateForm
