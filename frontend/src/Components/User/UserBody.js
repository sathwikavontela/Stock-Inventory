import React, { useState, useEffect } from 'react';
import InventoryCard from '../utils/InventoryCard'; // Ensure this path is correct
import UserStockDisplay from '../Data/UserStockDisplay.json';

const UserBody = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Initialize with all products when component mounts
  useEffect(() => {

    const fetchProducts = async () => {
      try {
        // const response = await fetch(UserStockDisplay);
        // const data=await response.json();
        console.log(UserStockDisplay);
        setProducts(UserStockDisplay);
        setFilteredProducts(UserStockDisplay);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
    //--------------
  }, []);

const searchProducts = (query) => {
  const lowerCaseQuery = query.toLowerCase();
  const results = products.filter(products =>
    products.name.toLowerCase().includes(lowerCaseQuery));
    setFilteredProducts(results);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchProducts(query);
  };

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for items..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200 ease-in-out"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <InventoryCard key={item.id} item={item} />
          ))
        ) : (
          <p className="text-gray-500">No items available.</p>
        )}
      </div>
    </div>
  );
};

export default UserBody;
