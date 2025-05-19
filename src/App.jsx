import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Dumper from './pages/Dumper';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Login />} />

        {/* Protected routes with sidebar layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dumper"
          element={
            <ProtectedRoute>
              <Layout>
                <Dumper />
              </Layout>
            </ProtectedRoute>
          }
        />
     
      </Routes>
    </Router>
  );
};

export default App;
