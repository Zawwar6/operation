import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const initialDumperData = [
  { id: 1, name: 'Dumper Alpha', status: 'Active', type: 'Type A' },
  { id: 2, name: 'Dumper Beta', status: 'Inactive', type: 'Type B' },
  { id: 3, name: 'Dumper Gamma', status: 'Repair', type: 'Type C' },
  { id: 4, name: 'Dumper Delta', status: 'Active', type: 'Type A' },
  { id: 5, name: 'Dumper Zeta', status: 'Inactive', type: 'Type B' },
];

const statusColors = {
  Active: 'text-green-600',
  Inactive: 'text-yellow-600',
  Repair: 'text-red-600',
};

const Dumper = () => {
  const [dumperData, setDumperData] = useState(initialDumperData);
  const [showForm, setShowForm] = useState(false);
  const [newDumper, setNewDumper] = useState({ id: '', name: '', status: '', type: '' });

  const handleAddDumper = () => {
    if (!newDumper.id || !newDumper.name || !newDumper.status || !newDumper.type) return;
    const newEntry = {
      id: parseInt(newDumper.id),
      name: newDumper.name,
      status: newDumper.status,
      type: newDumper.type,
    };
    setDumperData([...dumperData, newEntry]);
    setNewDumper({ id: '', name: '', status: '', type: '' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    const filtered = dumperData.filter((d) => d.id !== id);
    setDumperData(filtered);
  };

  const statusChartData = ['Active', 'Inactive', 'Repair'].map((status) => ({
    name: status,
    value: dumperData.filter((d) => d.status === status).length,
  }));

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Dumper List</h1>

        {/* Line Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Dumper Status Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={statusChartData}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={3}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Create Dumper Button */}
        <button
          onClick={() => setShowForm(true)}
          className="mb-4 px-4 py-2 bg-blue-600 cursor-pointer text-white rounded shadow cursor-pointer hover:bg-blue-700"
        >
          Create Dumper
        </button>

        {/* Add Dumper Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition-all">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 border-b pb-3">Create New Dumper</h3>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">ID</label>
                <input
                  type="number"
                  placeholder="Enter ID"
                  value={newDumper.id}
                  onChange={(e) => setNewDumper({ ...newDumper, id: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Name</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={newDumper.name}
                  onChange={(e) => setNewDumper({ ...newDumper, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Status</label>
                <select
                  value={newDumper.status}
                  onChange={(e) => setNewDumper({ ...newDumper, status: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Repair">Repair</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Type</label>
                <input
                  type="text"
                  placeholder="Enter Type"
                  value={newDumper.type}
                  onChange={(e) => setNewDumper({ ...newDumper, type: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddDumper}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
                >
                  Add Dumper
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dumperData.map((dumper) => (
                <tr key={dumper.id}>
                  <td className="px-6 py-4">{dumper.id}</td>
                  <td className="px-6 py-4">{dumper.name}</td>
                  <td className={`px-6 py-4 font-medium ${statusColors[dumper.status]}`}>
                    {dumper.status}
                  </td>
                  <td className="px-6 py-4">{dumper.type}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(dumper.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dumper;
