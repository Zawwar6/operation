import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { FaTruckMoving, FaPlayCircle, FaPauseCircle, FaTools } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const barData = [
  { name: 'Mon', dumpers: 45 },
  { name: 'Tue', dumpers: 52 },
  { name: 'Wed', dumpers: 38 },
  { name: 'Thu', dumpers: 60 },
  { name: 'Fri', dumpers: 49 },
];

const TOTAL_DUMPERS = 500;
const ACTIVE_DUMPERS = 380;
const INACTIVE_DUMPERS = 95;
const REPAIR_DUMPERS = 25;

const pieData = [
  { name: 'Active', value: ACTIVE_DUMPERS },
  { name: 'Inactive', value: INACTIVE_DUMPERS },
  { name: 'Repair', value: REPAIR_DUMPERS },
];

const COLORS = ['#22c55e', '#facc15', '#ef4444']; // green, yellow, red

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
   
     

      {/* Main Content */}
      <main className="flex-1 ">
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
            <FaTruckMoving className="text-blue-600 text-3xl" />
            <div>
              <p className="text-gray-500">Total Dumpers</p>
              <h2 className="text-xl font-bold">{TOTAL_DUMPERS}</h2>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
            <FaPlayCircle className="text-green-600 text-3xl" />
            <div>
              <p className="text-gray-500">Active Dumpers</p>
              <h2 className="text-xl font-bold">{ACTIVE_DUMPERS} / {TOTAL_DUMPERS}</h2>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
            <FaPauseCircle className="text-yellow-600 text-3xl" />
            <div>
              <p className="text-gray-500">Inactive Dumpers</p>
              <h2 className="text-xl font-bold">{INACTIVE_DUMPERS} / {TOTAL_DUMPERS}</h2>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
            <FaTools className="text-red-600 text-3xl" />
            <div>
              <p className="text-gray-500">Dumpers in Repair</p>
              <h2 className="text-xl font-bold">{REPAIR_DUMPERS} / {TOTAL_DUMPERS}</h2>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-semibold mb-4">Daily Dumper Usage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#4A90E2" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="dumpers" fill="#4A90E2" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Dumper Status Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
