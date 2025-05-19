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
import { useNavigate } from 'react-router-dom';

const initialDumperData = [
  { id: 1, name: 'Dumper Alpha', status: 'Active', type: 'Type A' },
  { id: 2, name: 'Dumper Beta', status: 'Inactive', type: 'Type B' },
  { id: 3, name: 'Dumper Gamma', status: 'Repair', type: 'Type C' },
  { id: 4, name: 'Dumper Delta', status: 'Active', type: 'Type A' },
  { id: 5, name: 'Dumper Zeta', status: 'Inactive', type: 'Type B' },
];

const statusColors = {
  Active: 'text-green-500',
  Inactive: 'text-yellow-500',
  Repair: 'text-red-500',
};

const Dumper = () => {
  const [dumperData, setDumperData] = useState(initialDumperData);
  const [showForm, setShowForm] = useState(false);
  const [newDumper, setNewDumper] = useState({ id: '', name: '', status: '', type: '' });

  const [showDescriptionForm, setShowDescriptionForm] = useState(false);
  const [selectedDumper, setSelectedDumper] = useState(null);
  const [descriptionData, setDescriptionData] = useState({ reason: '', description: '', image: null });

  const navigate = useNavigate();

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

  const handleOpenDescriptionForm = (dumper) => {
    setSelectedDumper(dumper);
    setShowDescriptionForm(true);
  };

  const handleDescriptionSubmit = () => {
    if (!descriptionData.reason) {
      alert('Please enter a reason or description!');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      navigate('/dumper-details', {
        state: {
          dumper: selectedDumper,
          reason: descriptionData.reason,
          description: descriptionData.description,
          image: reader.result,
        },
      });
    };

    if (descriptionData.image) {
      reader.readAsDataURL(descriptionData.image);
    } else {
      navigate('/dumper-details', {
        state: {
          dumper: selectedDumper,
          reason: descriptionData.reason,
          description: descriptionData.description,
          image: null,
        },
      });
    }

    setShowDescriptionForm(false);
    setDescriptionData({ reason: '', description: '', image: null });
    setSelectedDumper(null);
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
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        >
          Create Dumper
        </button>

        {/* Add Dumper Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 border-b pb-3">Create New Dumper</h3>

              {['id', 'name', 'type'].map((field) => (
                <div className="space-y-2" key={field}>
                  <label className="block text-sm font-medium text-gray-600 capitalize">{field}</label>
                  <input
                    type={field === 'id' ? 'number' : 'text'}
                    placeholder={`Enter ${field}`}
                    value={newDumper[field]}
                    onChange={(e) => setNewDumper({ ...newDumper, [field]: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}

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

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddDumper}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Add Dumper
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Description Form Modal */}
        {showDescriptionForm && selectedDumper && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-xl w-full max-w-xl space-y-4">
              <h3 className="text-2xl font-bold border-b border-gray-700 pb-3">Add Description</h3>

              <p className="text-gray-300">
                <span className="font-semibold">Dumper:</span> {selectedDumper.name} ({selectedDumper.status})
              </p>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Reason / Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe the reason or issue..."
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={descriptionData.reason}
                  onChange={(e) => setDescriptionData({ ...descriptionData, reason: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Detailed Description (optional)</label>
                <textarea
                  rows={3}
                  placeholder="Add detailed points separated by dots."
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={descriptionData.description}
                  onChange={(e) => setDescriptionData({ ...descriptionData, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Upload Image (optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setDescriptionData({ ...descriptionData, image: e.target.files[0] })}
                  className="w-full text-gray-200"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  onClick={() => setShowDescriptionForm(false)}
                  className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDescriptionSubmit}
                  className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dumper Table */}
        <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Type</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dumperData.map((dumper) => (
              <tr key={dumper.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{dumper.id}</td>
                <td className="border border-gray-300 px-4 py-2">{dumper.name}</td>
                <td className={`border border-gray-300 px-4 py-2 font-semibold ${statusColors[dumper.status]}`}>
                  {dumper.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">{dumper.type}</td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleOpenDescriptionForm(dumper)}
                    className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Description
                  </button>
                  <button
                    onClick={() => handleDelete(dumper.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Dumper;
