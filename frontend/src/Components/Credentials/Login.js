import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Logo from '../../img/Logo.jpg';
import Navbar from '../LandingPage/Navbar'
import Footer from '../LandingPage/Footer'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log({ email, fullName, password });
  };

  return (
    <>
    <Navbar />
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-700 to-blue-500">
      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full md:w-3/4 lg:w-2/3">
        
        {/* Left Section: Form */}
        <div className="md:w-1/2 p-6 md:p-8 lg:p-10">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">Log in</h2>

          <button
            className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg mb-4 flex justify-center items-center text-sm md:text-base"
          >
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google Icon" className="mr-2" />
            Login with Google
          </button>

          <p className="text-center mb-4">or</p>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A7FB6] text-sm md:text-base"
              />
            </div>


            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A7FB6] text-sm md:text-base"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-900 font-bold tracking-wide text-white py-2 px-4 rounded-lg hover:bg-[#5b6ca4] transition-colors text-sm md:text-base"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-4 text-sm md:text-base">
             Have an Account?{' '}
            <Link to="/signup" className="text-blue-900 hover:underline">
              Signup
            </Link>
          </p>
        </div>

        {/* Right Section: Image */}
        <div className="hidden md:flex md:w-1/2 p-6 md:p-8 lg:p-10">
          <img 
            src={Logo} // Replace with the image URL you want
            alt="SignUp Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Login;
