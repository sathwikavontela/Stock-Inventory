import React from 'react';

const InventoryCard = ({ item }) => {
  return (
    <div className="p-4 shadow-xl rounded-lg bg-gr">
      <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-lg" />
      <div className="mt-4">
        <h2 className="text-lg font-bold">{item.name}</h2>
        <p className="text-gray-500">{item.description}</p>
        <p className={`mt-2 font-semibold ${item.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
          {item.isAvailable ? 'Available' : 'Out of Stock'}
        </p>
      </div>
    </div>
  );
};

export default InventoryCard;
