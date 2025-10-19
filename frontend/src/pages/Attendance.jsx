import {useNavigate} from 'react-router-dom';

export default function Attendance() {

  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center items-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Attendance Management
        </h1>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-xl shadow-md hover:bg-blue-700 transition duration-200 cursor-pointer"
            onClick={() => navigate("/view-attendance")}
          >
            View Attendance
          </button>

          <button
            className="w-full bg-green-600 text-white text-lg font-semibold py-3 rounded-xl shadow-md hover:bg-green-700 transition duration-200 cursor-pointer"
            onClick={() => navigate("/add-attendance")}
          >
            Add Attendance
          </button>
        </div>
      </div>
    </div>
  );
}
