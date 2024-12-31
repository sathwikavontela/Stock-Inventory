import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
        // const response = await fetch(`${BASE_URL}/api/v1/products/${productId}`)
        const response1 = await fetch(
          `${BASE_URL}/api/v1/products/${productId}`,
          { credentials: 'include' }
        )
        if (!response1.ok) {
          throw new Error('Failed to fetch product details.')
        }
        const productData = await response1.json()
        // console.log(productData)
        setProduct({
          name: productData.product.name,
          description: productData.product.description,
          quantity: productData.product.quantity,
        })
        //console.log(product)
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
  // console.log(product)
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
      navigate('/authority-home') // Redirect to another page after successful update
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
    <div className="flex items-center justify-center min-h-screen mt-[-4%] bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
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
  )
}

export default ProductUpdateForm
