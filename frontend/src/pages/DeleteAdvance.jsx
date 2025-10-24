import { useState } from 'react';
import API from '../api/axios.js';
import { useNavigate } from 'react-router-dom';

export default function DeleteAdvance() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    name: ""
  });

  const handleDelete = async () => {
    try {
      await API.delete('/advance', { params : formData });
      alert("Advance deleted Successfully.");
      setFormData({
        date: "",
        name: ""
      });
    } catch (error) {
      console.error("Failed to delete advance.", error);
      alert(error.response?.data?.message || "Failed to delete advance");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center items-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
            Delete Advance
        </h1>

        {/* Filter Section */}
        <div className="w-full bg-gray-50 p-4 rounded-xl shadow-inner flex flex-col md:flex-row flex-wrap gap-4">
          {/* Date */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-gray-700 font-medium mb-1">Enter Date:</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Employee Name */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-gray-700 font-medium mb-1">Employee Name:</label>
            <input
              type="text"
              placeholder="Enter employee name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

        </div>

        {/* Centered Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-all"
          >
            Delete
          </button>
          <button
            onClick={() => navigate("/advance")}
            className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition-all"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
