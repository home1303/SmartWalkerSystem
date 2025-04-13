import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBell } from 'react-icons/fa';
import RealTimeClock from "../components/RealTimeClock";

const Header = () => {
  const navigate = useNavigate();

  const handleBellClick = () => {
    // Navigate to a different page when the bell icon is clicked
    navigate('/notification'); // You can replace '/notifications' with the desired route
  };

  return (
    <div>
      {/* Header Title and Bell Icon */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Smart Walker</h1>
        <div
          className="border border-gray-400 p-2 rounded-md flex items-center justify-center w-10 h-10 shadow-md hover:bg-gray-200 cursor-pointer"
          onClick={handleBellClick}
        >
          <FaBell className="text-gray-500 text-xl" />
        </div>
      </div>

      {/* RealTimeClock below the title */}
      <div  style={{ position: 'relative',right: '60px' }}>
        <RealTimeClock />
      </div>
    </div>
  );
};

export default Header;
