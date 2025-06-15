import React, { useState } from "react";
import MessCardBox from "../../components/MessCardBox/MessCardBox";
import { useEffect } from "react";
import { MessDetails } from "../../apiConfig/messlistApiConfig";

const MessLists = () => {
  const [messDetails, setMessDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(true);

  const FetchmessData = async () => {
    try {
      const response = await MessDetails();
      setMessDetails(response);
    } catch (error) {
      console.error("Error fetching mess data:", error);
    }
  };
  useEffect(() => {
    FetchmessData();
  }, []);

  const filteredMess = messDetails
    .filter((mess) => {
      return mess.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      if (sortOption === "low-to-high") return a.monthlyPrice - b.monthlyPrice;
      if (sortOption === "high-to-low") return b.monthlyPrice - a.monthlyPrice;
      return 0;
    });

  console.log("filtered mess data", filteredMess);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="pt-6 pb-10 max-w-6xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">
            Explore Mess Services
          </h1>
          <p className="text-gray-400">
            Browse and select from the best mess options in your area.
          </p>
        </div>

        {/* Search and Sort Controls */}
        <div className="flex flex-col md:flex-row justify-around items-center mb-8 gap-4">
          {/* Search Bar */}
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search by mess name..."
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-yellow-500 focus:outline-none text-white"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="w-full md:w-auto">
            <select
              className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-yellow-500 focus:outline-none"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              {/* <option value="rating">Top Rated</option> */}
            </select>
          </div>
        </div>

        {/* Mess Cards Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMess.map((mess) => {
            return (
              <MessCardBox
                key={mess._id}
                messName={mess.name}
                imageUrl={
                  mess?.imageUrl ||
                  "https://5.imimg.com/data5/XF/GT/XN/IOS-61267510/thali-meal--500x500.jpeg"
                } // Ensure your API returns this!
                monthlyPrice={mess.monthlyPrice}
                address={`${mess.address.city}, ${mess.address.state}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MessLists;
