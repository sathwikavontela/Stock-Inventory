import React from 'react'
import { MdEdit } from 'react-icons/md' // Importing an edit icon from react-icons

const FICards = ({ item }) => {
  return (
    <div className="p-4 shadow-md rounded-lg bg-white">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="mt-4">
        <h2 className="text-lg font-bold">{item.name}</h2>
        <p className="text-gray-500">{item.description}</p>

        {/* Availability status and Edit icon together */}
        <div className="flex items-center justify-between mt-2">
          <p
            className={`font-semibold ${
              item.isAvailable ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {item.isAvailable ? 'Available' : 'Out of Stock'}
          </p>

          {/* Edit Icon beside availability */}
          <button className="text-gray-500 hover:text-gray-800 ml-2">
            <MdEdit size={20} />
            {/* Edit icon */}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FICards
