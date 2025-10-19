import { useNavigate} from "react-router-dom";
import {useEffect , useState} from 'react';
import API from '../api/axios.js'

export default function AddAttendance() {

  const [attendanceData , setAttendanceData] = useState([]);
  const [fdate , setFdate] = useState('');
  const [employees , setEmployees] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      date: fdate,
      records: attendanceData
    };

    try{
      await API.post('/attendance' , payload);
      alert("Attendance added Successfully...");
    }
    catch(error){
      console.error("Failed while adding attendance.");
      alert("Failed to add attendance.")
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
    try{
      const {data} = await API.get('/employees');
      setEmployees(data);
      const initialAttendance = data.map(emp => ({
        employeeId: emp._id,
        status: 'P', // Default status
        timeIn: '',
        timeOut: '',
        bonus: 0,
        stitches: 0,
        note: ''
      }));
      setAttendanceData(initialAttendance);
    }
    catch(error){
      console.error("Fetch employees error:", error);
      alert(error.response?.data?.message || "Failed to fetch employees");
    }
  };
  fetchEmployees();
  } , []);

  const handleInputChange = (index , event) => {
    const newAttendanceData = [...attendanceData];

    newAttendanceData[index][event.target.name] = event.target.value;

    setAttendanceData(newAttendanceData);
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8 justify-center items-center flex">
        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Attendance Sheet</h1>
            <div className="flex items-center space-x-2 text-gray-500">
              <span className="font-medium">Date:</span>
              <input
                type="date"
                value={fdate}
                onChange={(e) => {setFdate(e.target.value)}}
                required
                className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Employees</th>
                  <th scope="col" className="px-6 py-3 text-center">Status</th>
                  <th scope="col" className="px-6 py-3 text-center">Time In</th>
                  <th scope="col" className="px-6 py-3 text-center">Time Out</th>
                  <th scope="col" className="px-6 py-3 text-center">Bonus</th>
                  <th scope="col" className="px-6 py-3 text-center">Stitches</th>
                  <th scope="col" className="px-6 py-3 text-center">Note</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp , index) => (
                <tr key={emp._id} className="bg-white border-b hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {emp.name}
                  </th>
                  <td className="px-6 py-4 text-center">
                    <select 
                    required
                    onChange={(e) => {handleInputChange(index , e)}} 
                    value={attendanceData[index]?.status || ''} 
                    name="status" 
                    className="text-blue-600 rounded-md focus:ring-blue-500">
                      <option value="P">Present</option>
                      <option value="A" className="text-red-500">Absent</option>
                      <option value="HD">Half Day</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input 
                    onChange={(e) => {handleInputChange(index , e)}}
                    value={attendanceData[index]?.timeIn || ''} 
                    name="timeIn"
                    type="time" className="p-1 border rounded-md focus:ring-blue-500" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input type="time" 
                    onChange={(e) => {handleInputChange(index , e)}} 
                    value={attendanceData[index]?.timeOut || ''} 
                    name="timeOut"
                    className="p-1 border rounded-md focus:ring-blue-500" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input type="number" 
                    onChange={(e) => {handleInputChange(index , e)}} 
                    value={attendanceData[index]?.bonus || ''} 
                    name="bonus"
                    className="p-1 border rounded-md focus:ring-blue-500" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input type="number" 
                    onChange={(e) => {handleInputChange(index , e)}} 
                    value={attendanceData[index]?.stitches || ''} 
                    name="stitches"
                    className="p-1 border rounded-md focus:ring-blue-500" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input type="text" 
                    onChange={(e) => {handleInputChange(index , e)}} 
                    value={attendanceData[index]?.note || ''} 
                    name="note"
                    className="p-1 border rounded-md focus:ring-blue-500" />
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Buttons */}
          <div className="flex flex-col items-center mt-6 gap-3">
            <input
              type="submit"
              value="Add"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
            />
            <button
              type = "button"
              onClick={() => navigate("/attendance")}
              className="text-blue-600 underline text-sm hover:text-blue-800 cursor-pointer"
            >
              ← Back
            </button>
          </div>
        </form>
        
    </div>
  );
}
