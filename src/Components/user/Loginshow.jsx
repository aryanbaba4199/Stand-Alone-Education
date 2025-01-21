import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';

const Loginshow = () => {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex items-center justify-center text-white overflow-hidden shadow-xl">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-300 rounded-full blur-[100px] opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tr from-yellow-400 via-orange-500 to-red-500 rounded-full blur-[120px] opacity-40"></div>
      </div>

      {/* Content */}
      <div className="text-center px-8 md:px-16 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight drop-shadow-lg ">
          Unlock Your NEET Potential
        </h1>
        <p className="text-lg md:text-2xl font-medium text-gray-300 mb-8 leading-relaxed">
          Experience personalized learning, state-of-the-art resources, and expert guidance to help you achieve your dream MBBS seat. Join thousands of students already transforming their NEET preparation journey.
        </p>
        
      </div>
    </div>
  );
};

export default Loginshow;
