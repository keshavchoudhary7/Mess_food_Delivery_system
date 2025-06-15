import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaIdCard, FaEye, FaEyeSlash } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { register } from "../../apiConfig/authApiConfig";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const data = await register(formData);
      console.log("Registration successful:", data);
      setSuccess(data.message || "Registration successful!");

      console.log("Registration status:", data.status);
      if (data.success === true) {
        setTimeout(() => {
          navigate("/auth/login");
        }, 1000);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Logo Section - Identical to SignIn */}
        <div className="w-full lg:w-2/5 bg-yellow-500 flex flex-col items-center justify-center p-8">
          <div className="mb-6 w-40 h-40 rounded-full bg-white flex items-center justify-center shadow-lg">
            <img
              src="/dabbawala.png"
              alt="MessEase Logo"
              className="w-full h-full object-contain p-2"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ranchi Mess</h1>
          <p className="text-gray-800 text-center">
            Home Cooked Food At Your Doorstep
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-3/5 p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-white text-center mb-6">
            Create Your Account
          </h2>

          {success && (
            <div className="bg-green-700/50 border border-green-500 text-white px-4 py-3 rounded mb-6 text-sm">
              {success}
            </div>
          )}
          {error && (
            <div className="bg-red-700/50 border border-red-500 text-white px-4 py-3 rounded mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="block text-gray-300 text-sm">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaIdCard className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-gray-300 text-sm">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-gray-300 text-sm">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-400 hover:text-yellow-400" />
                  ) : (
                    <FaEye className="text-gray-400 hover:text-yellow-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-gray-300 text-sm">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-gray-400 hover:text-yellow-400" />
                  ) : (
                    <FaEye className="text-gray-400 hover:text-yellow-400" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-gray-900 bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                "Please wait..."
              ) : (
                <>
                  <FiUserPlus className="mr-2" />
                  Register
                </>
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                onClick={() => navigate("/auth/login")}
                className="w-full flex justify-center py-2 px-4 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
              >
                Sign In to Your Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
