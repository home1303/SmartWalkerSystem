import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaCog, FaSignOutAlt, FaChartPie, FaWheelchair, FaUser,FaBroadcastTower } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("username");
    // localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col p-4 fixed top-0 left-0">
      {/* Logo */}
      <div className="flex items-center mb-6">
        <img src="/images/walker.png" alt="Logo" className="w-10 h-10 mr-2" />
      </div>

      {/* Menu */}
      <nav className="flex flex-col flex-grow space-y-2">
      <Link 
          to="/home" 
          className={`flex items-center justify-center p-3 hover:bg-gray-700 rounded-lg ${selected === "/home" ? "bg-gray-700 text-blue-400" : ""}`} 
          onClick={() => setSelected("/home")}
        >
          <FaHome size={24} />
        </Link>


        <Link 
          to="/dashboard" 
          className={`flex items-center justify-center p-3 hover:bg-gray-700 rounded-lg ${selected === "/dashboard" ? "bg-gray-700 text-blue-400" : ""}`} 
          onClick={() => setSelected("/dashboard")}
        >
          <FaChartPie size={24} />
        </Link>
        
        <Link 
          to="/profile" 
          className={`flex items-center justify-center p-3 hover:bg-gray-700 rounded-lg ${selected === "/profile" ? "bg-gray-700 text-blue-400" : ""}`} 
          onClick={() => setSelected("/profile")}
        >
          <FaUser size={24} />
        </Link>

        <Link 
          to="/setting" 
          className={`flex items-center justify-center p-3 hover:bg-gray-700 rounded-lg ${selected === "/setting" ? "bg-gray-700 text-blue-400" : ""}`} 
          onClick={() => setSelected("/setting")}
        >
          <FaCog size={24} />
        </Link>

        <Link 
          to="/control" 
          className={`flex items-center justify-center p-3 hover:bg-gray-700 rounded-lg ${selected === "/control" ? "bg-gray-700 text-blue-400" : ""}`} 
          onClick={() => setSelected("/control")}
        >
          <FaWheelchair size={24} />
        </Link>

        <Link 
          to="/connect" 
          className={`flex items-center justify-center p-3 hover:bg-gray-700 rounded-lg ${selected === "/connect" ? "bg-gray-700 text-blue-400" : ""}`} 
          onClick={() => setSelected("/connect")}
        >
          <FaBroadcastTower size={24} />
        </Link>
        
      </nav>

      {/* Logout Button */}
      <button 
        onClick={handleLogout} 
        className="flex items-center justify-center p-3 hover:bg-gray-700 rounded-lg"
      >
        <FaSignOutAlt size={24} />
      </button>
    </div>
  );
};

export default Sidebar;
