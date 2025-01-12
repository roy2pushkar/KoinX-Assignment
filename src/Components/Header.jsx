import React from 'react';
import  { useEffect, useState } from 'react';
import axios from 'axios';
//import TradingViewWidget from 'react-tradingview-widget';
import logo from '../Assests/1. KoinX Logo.png';
import frame from '../Assests/Frame.png';
import frame1 from '../Assests/Frame 1116601921 (1).png';
import frame2 from '../Assests/Frame 1116601921.png';
import frame3 from '../Assests/Rectangle 11947.png';
import frame4 from '../Assests/Rectangle 11947 (2).png';
import team from '../Assests/sandeep.png';
import team1 from '../Assests/sandeep (1).png';
import team2 from '../Assests/sandeep (2).png';

const Header = () => {
  return (
    <div>
    <div className="bg-gray-100 ">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
  {/* Logo */}
  <img 
    src={logo} 
    alt="KoinX Logo" 
    className="w-32"
  />

  {/* Navigation */}
  <div className="flex items-center space-x-8">
    {/* Nav Links */}
    <nav className="hidden md:flex space-x-6">
      <a 
        href="#" 
        className="text-gray-800 hover:text-blue-600 font-medium transition-colors"
      >
        Crypto Taxes
      </a>
      <a 
        href="#" 
        className="text-gray-800 hover:text-blue-600 font-medium transition-colors"
      >
        Free Tools
      </a>
      <a 
        href="#" 
        className="text-gray-800 hover:text-blue-600 font-medium transition-colors"
      >
        Resource Center
      </a>
    </nav>

    {/* Get Started Button */}
    <a 
      href="#" 
      className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-800 font-medium transition-transform transform hover:scale-105"
    >
      Get Started
    </a>

    {/* Mobile Menu Toggle */}
    <button 
      className="block md:hidden text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M4 6h16M4 12h16m-7 6h7" 
        />
      </svg>
    </button>
  </div>
      </header>

    </div>
      </div>
    
  );
};

export default Header;
