import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  FaTruckMoving, FaPlayCircle, FaPauseCircle, FaTools, FaWrench
} from 'react-icons/fa';

const categories = [
  { label: 'Mini Trippers', key: 'miniTrippers', icon: <FaTruckMoving className="text-blue-600 text-3xl" />, value: 15 },
  { label: 'Dumpers', key: 'dumpers', icon: <FaPlayCircle className="text-green-600 text-3xl" />, value: 18 },
  { label: 'Compactors', key: 'compactors', icon: <FaPauseCircle className="text-yellow-600 text-3xl" />, value: 12 },
  { label: 'Tractors', key: 'tractors', icon: <FaTools className="text-red-600 text-3xl" />, value: 10 },
  { label: 'Excavators', key: 'excavators', icon: <FaWrench className="text-purple-600 text-3xl" />, value: 8 }
];

const TOTAL = 30;

const COLORS = ['#22c55e', '#facc15', '#ef4444'];

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('miniTrippers');

  const generateBarData = () => {
    return Array.from({ length: 30 }, (_, i) => ({
      day: `Day ${i + 1}`,
      value: Math.floor(Math.random() * 10 + 5) // dummy values
    }));
  };

  const pieData = [
    { name: 'Active', value: 18 },
    { name: 'Inactive', value: 7 },
    { name: 'Repair', value: 5 },
  ];

const tableData = Array.from({ length: 30 }, (_, i) => ({
  id: `#${i + 1}`,
  name: `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} ${i + 1}`,
  status: i % 3 === 0 ? 'Inactive' : 'Active'  // Har 3rd item inactive, baaki active
}));


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {categories.map((cat) => (
          <div
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`cursor-pointer bg-white p-6 rounded-lg shadow flex items-center gap-4 transition hover:shadow-lg ${
              selectedCategory === cat.key ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            {cat.icon}
            <div>
              <p className="text-gray-500">{cat.label}</p>
              <h2 className="text-xl font-bold">{cat.value} / {TOTAL}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">{categories.find(c => c.key === selectedCategory)?.label} - 30 Day Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={generateBarData()}>
              <XAxis dataKey="day" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4A90E2" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={90}
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
      </div>

      {/* Table Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">{categories.find(c => c.key === selectedCategory)?.label} Details</h3>
        <div className="overflow-y-auto max-h-96">
          <table className="min-w-full table-auto text-sm text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-white ${item.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                      Description
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
