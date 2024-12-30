import React, { useState, useEffect } from 'react'
// import FICards from './FICards'
import { BASE_URL } from '../helper'
import { MdEdit } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const FICBody = () => {
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/products/getAllProductsForFic`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`)
        }

        const data = await response.json()
        setProducts(data.products)
        setFilteredProducts(data.products)
      } catch (error) {
        setError('Failed to load products. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)

    setTimeout(() => {
      const lowerCaseQuery = query.toLowerCase()
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(lowerCaseQuery)
      )
      setFilteredProducts(results)
    }, 300)
  }

  const handleEditClick = (product) => {
    navigate(`/fic/update-product/${product._id}`) // Pass the product ID in the URL
  }

  return (
    <div className="p-6">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for items..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200 ease-in-out"
        />
      </div>

      {/* Loading State */}
      {isLoading && <p className="text-gray-500">Loading products...</p>}

      {/* Error State */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Products Grid */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div key={item.id} className="p-4 shadow-md rounded-lg bg-white">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="mt-4">
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p className="text-gray-500">{item.description}</p>

                  <div className="flex items-center justify-between mt-2">
                    <p
                      className={`font-semibold ${
                        item.quantity > 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {item.quantity}
                    </p>
                    <button
                      onClick={() => handleEditClick(item)}
                      className="text-gray-500 hover:text-gray-800 ml-2"
                    >
                      <MdEdit size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No items available.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default FICBody
