// src/components/Layout.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optionally: Clear any auth data here
    navigate('/'); // Redirect to home or login
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-700 mb-6">Operation Dashboard</h2>
          <nav className="flex flex-col space-y-4">
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-700 font-medium">Dashboard</Link>
            <Link to="/dumper" className="text-gray-700 hover:text-blue-700 font-medium">Dumpers</Link>
            <a href="#" className="text-gray-700 hover:text-blue-700 font-medium">Maintenance</a>
            <a href="#" className="text-gray-700 hover:text-blue-700 font-medium">Reports</a>
            <a href="#" className="text-gray-700 hover:text-blue-700 font-medium">Settings</a>
          </nav>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="mt-2 mb-22 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};

export default Layout;
