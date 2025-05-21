import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  const handleNavClick = () => {
    // Only close sidebar on small screens
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`
          fixed z-40 top-0 left-0 h-full w-64 bg-white shadow-md p-6 flex flex-col justify-between 
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:flex
        `}
      >
        <div>
          <h2 className="text-2xl font-bold text-blue-700 mb-10 mt-10 whitespace-nowrap">
            Operation  <br /> Dashboard
          </h2>
          <nav className="flex flex-col space-y-4">
            <Link
              to="/dashboard"
              onClick={handleNavClick}
              className="text-gray-700 hover:text-blue-700 font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/dumper"
              onClick={handleNavClick}
              className="text-gray-700 hover:text-blue-700 font-medium"
            >
              Operation
            </Link>
            <a
              href="#"
              onClick={handleNavClick}
              className="text-gray-700 hover:text-blue-700 font-medium"
            >
              Accounts
            </a>
            <a
              href="#"
              onClick={handleNavClick}
              className="text-gray-700 hover:text-blue-700 font-medium"
            >
              Inventory
            </a>
            <a
              href="#"
              onClick={handleNavClick}
              className="text-gray-700 hover:text-blue-700 font-medium"
            >
              HRMS
            </a>
          </nav>
        </div>

        <button
          onClick={() => {
            handleLogout();
            handleNavClick();
          }}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
        >
          Logout
        </button>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-md flex items-center justify-between px-4 py-3 z-50">
        <h2 className="text-xl font-bold text-blue-700">Dashboard</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 mt-14 md:mt-0 w-full overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
