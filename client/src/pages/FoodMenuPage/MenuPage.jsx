import { useState } from "react";
import {
  FaCalendarAlt,
  FaUtensils,
  FaChevronLeft,
  FaChevronRight,
  FaInfoCircle,
} from "react-icons/fa";
// import UserNav from "../../components/userNav/UserNav.jsx";

const MealPlanPage = () => {
  const [viewMode, setViewMode] = useState("weekly");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  // Weekly meal plan data (repeats every week)
  const weeklyMealPlan = [
    {
      day: "Monday",
      breakfast: "Dahi Chura, Banana",
      lunch: "Rice, Dal, Aloo Sabzi, Papad",
      dinner: "Roti, Palak Paneer, Salad",
      special: "",
    },
    {
      day: "Tuesday",
      breakfast: "Poha, Tea",
      lunch: "Jeera Rice, Rajma, Raita",
      dinner: "Paratha, Curd, Pickle",
      special: "",
    },
    {
      day: "Wednesday",
      breakfast: "Sandwich, Juice",
      lunch: "Khichdi, Kadhi, Papad",
      dinner: "Roti, Chana Masala, Salad",
      special: "Ice Cream",
    },
    {
      day: "Thursday",
      breakfast: "Idli, Sambar, Chutney",
      lunch: "Rice, Sambar, Beans Porial",
      dinner: "Dosa, Chutney, Sambar",
      special: "",
    },
    {
      day: "Friday",
      breakfast: "Cornflakes, Milk",
      lunch: "Fried Rice, Manchurian",
      dinner: "Noodles, Soup",
      special: "",
    },
    {
      day: "Saturday",
      breakfast: "Paratha, Curd",
      lunch: "Biryani, Raita",
      dinner: "Roti, Dal Fry, Salad",
      special: "Sweet Dish",
    },
    {
      day: "Sunday",
      breakfast: "Aloo Paratha, Pickle",
      lunch: "Thali (Roti, Rice, 3 Sabzi, Dal, Salad)",
      dinner: "Light Snacks",
      special: "Special Dessert",
    },
  ];

  const dailyMealPlan = {
    date: selectedDay || currentDate,
    meals:
      weeklyMealPlan.find(
        (day) =>
          day.day ===
          selectedDay?.toLocaleDateString("en-US", { weekday: "long" })
      ) ||
      weeklyMealPlan[currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1],
  };

  const changeWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    setCurrentDate(newDate);
  };

  const changeDay = (direction) => {
    const newDate = new Date(selectedDay || currentDate);
    newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    setSelectedDay(newDate);
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setViewMode("daily");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="pt-6 pb-10 px-4 max-w-6xl mx-auto">
        {/* View Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center">
            <FaUtensils className="text-yellow-400 text-xl mr-3" />
            <h1 className="text-2xl font-bold">Meal Plan</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-gray-800 rounded-full p-1 flex">
              <button
                onClick={() => setViewMode("weekly")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  viewMode === "weekly"
                    ? "bg-yellow-500 text-gray-900"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                Weekly View
              </button>
              <button
                onClick={() => {
                  setViewMode("daily");
                  if (!selectedDay) setSelectedDay(currentDate);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  viewMode === "daily"
                    ? "bg-yellow-500 text-gray-900"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                Daily View
              </button>
            </div>

            <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-full text-sm font-medium transition-colors">
              Print Plan
            </button>
          </div>
        </div>

        {/* Date Navigation */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6 flex justify-between items-center">
          <button
            onClick={() =>
              viewMode === "weekly" ? changeWeek("prev") : changeDay("prev")
            }
            className="text-gray-300 hover:text-yellow-400 p-2 rounded-full hover:bg-gray-700"
          >
            <FaChevronLeft />
          </button>

          <div className="flex items-center text-lg font-medium">
            <FaCalendarAlt className="text-yellow-400 mr-2" />
            {viewMode === "weekly"
              ? `Week of ${currentDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}`
              : dailyMealPlan.date.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
          </div>

          <button
            onClick={() =>
              viewMode === "weekly" ? changeWeek("next") : changeDay("next")
            }
            className="text-gray-300 hover:text-yellow-400 p-2 rounded-full hover:bg-gray-700"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Repetition Notice */}
        <div className="bg-gray-800 bg-opacity-50 border-l-4 border-yellow-500 text-yellow-400 p-4 mb-6 rounded-lg flex items-start">
          <FaInfoCircle className="mr-2 mt-1 flex-shrink-0" />
          <p>
            This meal plan repeats every week. Special items are marked
            accordingly.
          </p>
        </div>

        {/* Meal Plan Content */}
        {viewMode === "weekly" ? (
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Day
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Breakfast
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Lunch
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Dinner
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Special
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {weeklyMealPlan.map((day, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-700 transition-colors"
                      onClick={() => {
                        // Find next occurrence of this weekday
                        const today = new Date();
                        const daysUntilNext =
                          (index + 1 - today.getDay() + 7) % 7;
                        const nextDate = new Date();
                        nextDate.setDate(today.getDate() + daysUntilNext);
                        handleDaySelect(nextDate);
                      }}
                    >
                      <td className="px-4 py-3 whitespace-nowrap cursor-pointer">
                        <div className="text-sm font-medium text-yellow-400">
                          {day.day}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-normal text-sm text-gray-300">
                        {day.breakfast}
                      </td>
                      <td className="px-4 py-3 whitespace-normal text-sm text-gray-300">
                        {day.lunch}
                      </td>
                      <td className="px-4 py-3 whitespace-normal text-sm text-gray-300">
                        {day.dinner}
                      </td>
                      <td className="px-4 py-3 whitespace-normal text-sm text-yellow-400">
                        {day.special}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-yellow-400">
                {dailyMealPlan.date.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </h2>
              <button
                onClick={() => setViewMode("weekly")}
                className="text-sm text-yellow-400 hover:underline"
              >
                Back to Weekly View
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors">
                <h3 className="text-lg font-medium text-yellow-400 mb-3 flex items-center gap-2">
                  <span>🍳</span> Breakfast
                </h3>
                <p className="text-gray-300">{dailyMealPlan.meals.breakfast}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors">
                <h3 className="text-lg font-medium text-yellow-400 mb-3 flex items-center gap-2">
                  <span>🍲</span> Lunch
                </h3>
                <p className="text-gray-300">{dailyMealPlan.meals.lunch}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors">
                <h3 className="text-lg font-medium text-yellow-400 mb-3 flex items-center gap-2">
                  <span>🌙</span> Dinner
                </h3>
                <p className="text-gray-300">{dailyMealPlan.meals.dinner}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors">
                <h3 className="text-lg font-medium text-yellow-400 mb-3 flex items-center gap-2">
                  <span>🍎</span> Snacks
                </h3>
                <p className="text-gray-300">Fruits or light snacks</p>
              </div>
              {dailyMealPlan.meals.special && (
                <div className="md:col-span-2 bg-gray-700 p-4 rounded-lg border-l-4 border-yellow-500 hover:bg-gray-600 transition-colors">
                  <h3 className="text-lg font-medium text-yellow-400 mb-3 flex items-center gap-2">
                    <span>🎂</span> Special Item
                  </h3>
                  <p className="text-gray-300">{dailyMealPlan.meals.special}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealPlanPage;
