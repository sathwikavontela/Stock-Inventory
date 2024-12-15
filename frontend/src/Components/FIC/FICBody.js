import React, { useState, useEffect } from "react";
import FICards from "./FICards";
import { BASE_URL } from "../helper";

const FICBody = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/products/getAllProductsForFic`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        setProducts(data.products); // Update state with fetched products
        setFilteredProducts(data.products); // Initialize filtered list
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchProducts();
  }, []);

  const searchProducts = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(results);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Debounced search functionality
    setTimeout(() => {
      searchProducts(query);
    }, 300);
  };

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
              <FICards key={item.id} item={item} />
            ))
          ) : (
            <p className="text-gray-500">No items available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FICBody;
