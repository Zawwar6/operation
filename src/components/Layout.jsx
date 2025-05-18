// src/components/Layout.js
import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-blue-700">Operation Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <Link to="/dashboard" className="text-gray-700 hover:text-blue-700 font-medium">Dashboard</Link>
          <Link to="/dumper" className="text-gray-700 hover:text-blue-700 font-medium">Dumpers</Link>
          <a href="#" className="text-gray-700 hover:text-blue-700 font-medium">Maintenance</a>
          <a href="#" className="text-gray-700 hover:text-blue-700 font-medium">Reports</a>
          <a href="#" className="text-gray-700 hover:text-blue-700 font-medium">Settings</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};

export default Layout;
