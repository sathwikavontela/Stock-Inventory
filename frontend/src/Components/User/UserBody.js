import React from 'react';
import InventoryCard from '../utils/InventoryCard'; // Ensure this path is correct
import UserStockDisplay from '../Data/UserStockDisplay.json';
const UserBody = () => {

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventory Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {UserStockDisplay.map((item) => (
          <InventoryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default UserBody;
