import { useState, useRef, useEffect } from "react";
import {
  FaCalendarAlt,
  FaUtensils,
  FaSun,
  FaMoon,
  FaUser,
  FaBell,
  FaSignOutAlt,
  FaClipboardList,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logout } from "../../apiConfig/authApiConfig";
import { ToastContainer, toast } from "react-toastify";

const UserNav = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleUserLogout = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        alert("No token found. Please login again.");
        return;
      }
      const data = await logout(token);
      if (data.success) {
        // localStorage.removeItem("token");
        // localStorage.removeItem("userId");
        Cookies.remove("token");
        Cookies.remove("userId");
        setIsDropdownOpen(false);
        // Check if cookies are cleared, then redirect
        if (!Cookies.get("token")) {
          navigate("/auth/login");
        }
        toast.success(data.message || "Logout successful");
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.message || "Logout failed"
      );
      // Also check cookies in case of error
      if (!Cookies.get("token")) {
        navigate("/auth/login");
      }
    }
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <FaUtensils className="text-yellow-400 text-xl" />
        <span className="font-bold text-lg">Ranchi Mess</span>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="hover:text-yellow-400 p-2 rounded-full hover:bg-gray-700"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <button className="hover:text-yellow-400 p-2 rounded-full hover:bg-gray-700 relative">
          <FaBell />
          <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </button>

        {/* Profile & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={toggleDropdown}
            className="flex items-center gap-2 cursor-pointer hover:text-yellow-400"
          >
            <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-yellow-400 font-bold">
              U
            </div>
            <span className="hidden sm:block font-medium">User</span>
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-gray-700 rounded-md shadow-xl py-2 z-50">
              <a
                href="#profile"
                className="block px-4 py-2 hover:bg-gray-600 flex items-center text-sm"
              >
                <FaUser className="mr-2" /> Profile
              </a>
              <a
                href="#orders"
                className="block px-4 py-2 hover:bg-gray-600 flex items-center text-sm"
              >
                <FaClipboardList className="mr-2" /> Orders
              </a>
              <a
                className="block px-4 py-2 hover:bg-gray-600 flex items-center text-sm"
                onClick={handleUserLogout}
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </a>
            </div>
          )}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default UserNav;
