import React from "react";

const MessCardBox = ({ messName, imageUrl, monthlyPrice }) => {
  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-gray-900 border border-gray-800 hover:shadow-yellow-500/10 hover:border-yellow-500/30 transition-all duration-300">
      {/* Mess Image with Dark Overlay */}
      <div className="h-48 bg-gray-800 overflow-hidden relative">
        <img
          className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
          src={imageUrl}
          alt={messName}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
      </div>

      {/* Mess Details */}
      <div className="p-5">
        {/* Title & Subtitle */}
        <h3 className="font-bold text-xl text-white">{messName}</h3>
        <p className="text-sm text-yellow-400 mb-2">PREMIUM MEAL SERVICE</p>

        {/* Price */}
        <p className="text-2xl font-bold text-yellow-500 mb-3">
          ₹{monthlyPrice}
          <span className="text-gray-400 text-sm">/month</span>
        </p>

        {/* Description */}
        <p className="text-sm text-gray-300 mb-5">
          Daily meals with chef-curated menus. Vegan & gluten-free options
          available.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors duration-300">
            View Details
          </button>
          <button className="flex-1 border border-gray-700 hover:border-yellow-500 text-gray-200 hover:text-yellow-500 py-2 px-4 rounded-lg transition-colors duration-300">
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessCardBox;
