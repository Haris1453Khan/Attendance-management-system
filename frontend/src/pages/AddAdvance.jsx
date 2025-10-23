import { useState } from 'react';
import API from '../api/axios.js';
import { useNavigate } from 'react-router-dom';

export default function AddAdvance() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    name: "",
    amount: "",
    note: ""
  });

  const handleAdd = async () => {
    try {
      await API.post('/advance', formData);
      alert("Advance added Successfully.");
      setFormData({
        date: "",
        name: "",
        amount: "",
        note: ""
      });
    } catch (error) {
      console.error("Failed to add advance.", error);
      alert(error.response?.data?.message || "Failed to add advance");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center items-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Add Advance
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

          {/* Amount */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-gray-700 font-medium mb-1">Enter Amount:</label>
            <input
              type="number"
              placeholder="00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Note */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-gray-700 font-medium mb-1">Note:</label>
            <input
              type="text"
              placeholder="Enter Note(if any)"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Centered Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all"
          >
            Add
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
