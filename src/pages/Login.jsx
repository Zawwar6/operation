import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [registeredUser, setRegisteredUser] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      if (!registeredUser) {
        toast.error('First create an account!');
        return;
      }

      if (
        email === registeredUser.email &&
        password === registeredUser.password
      ) {
        toast.success('Login successful!');
        localStorage.setItem('loggedIn', true);

        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        toast.error('Invalid email or password!');
      }
    } else {
      if (!fullName || !email || !password) {
        toast.error('Please fill all fields!');
        return;
      }

      setRegisteredUser({ fullName, email, password });
      toast.success('Account created successfully! You can now login.');
      setTimeout(() => {
        setIsLogin(true);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <ToastContainer position="top-center" theme="dark" />
      <div className="bg-gray-900 shadow-2xl rounded-2xl w-full max-w-md p-8 transition-all duration-300 border border-gray-700">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-300 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="you@fleetx.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            {isLogin ? 'Login to Dashboard' : 'Create Account'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-400 mt-5">
          {isLogin ? "Don't have an account?" : 'Already registered?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 font-medium hover:underline cursor-pointer"
          >
            {isLogin ? 'Sign up here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
