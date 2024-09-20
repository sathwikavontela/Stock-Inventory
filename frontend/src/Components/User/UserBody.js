import React, { useState } from 'react';
import InventoryCard from '../utils/InventoryCard'; // Ensure this path is correct
import UserStockDisplay from '../Data/UserStockDisplay.json';

const UserBody = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter inventory based on search query
  const filteredItems = UserStockDisplay.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200 ease-in-out"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <InventoryCard key={item.id} item={item} />
          ))
        ) : (
          <p className="text-gray-500">No items found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default UserBody;
