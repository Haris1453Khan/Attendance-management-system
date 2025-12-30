import {useNavigate} from 'react-router-dom';

export default function Advance() {

  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center items-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Advance Management
        </h1>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-xl shadow-md hover:bg-blue-700 transition duration-200 cursor-pointer"
            onClick={() => navigate("/view-advance")}
          >
            View Advance
          </button>

          <button
            className="w-full bg-green-600 text-white text-lg font-semibold py-3 rounded-xl shadow-md hover:bg-green-700 transition duration-200 cursor-pointer"
            onClick={() => navigate("/add-advance")}
          >
            Add Advance
          </button>

          <button
            className="w-full bg-red-500 text-white text-lg font-semibold py-3 rounded-xl shadow-md hover:bg-red-600 transition duration-200 cursor-pointer"
            onClick={() => navigate("/delete-advance")}
          >
            Delete Advance
          </button>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-600 underline text-sm hover:text-blue-800 mt-2 self-start"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
