import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbarlog";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Area, AreaChart, } from "recharts";
import Header from '../components/Header';
import StatisticsChart from "../components/StatisticsChart";
import { FaHeartbeat, FaRoute, FaWalking } from "react-icons/fa";
import useCheckUser from "../hooks/Checklogin";

import Moblie from "../hooks/MoblieMenu";

import '../styles/Dashboard.css';

const CLIENT_ID = "0e01f7ba-ce71-4f50-ba2c-88004562dea5";
const TOKEN = "915y5BmnrCoP5kNn7M16TpxGxSneWyB2";
const API_URL = "https://api.netpie.io/v2/device/shadow/data";

const activeTimeData = [
  { name: "Afternoon", value: 45, color: "#F4B8FF" },
  { name: "Evening", value: 35, color: "#FFC882" },
  { name: "Morning", value: 20, color: "#74ACFF" },
];

const heartRateChartData = [
  { value: 80 }, { value: 82 }, { value: 85 }, { value: 83 }, { value: 98 },
];

const distanceChartData = [
  { value: 2 }, { value: 5 }, { value: 3 }, { value: 6 }, { value: 10 },
];

const stepsChartData = [
  { value: 10 }, { value: 12 }, { value: 15 }, { value: 18 }, { value: 20 },
];

const Dashboard = () => {
  useCheckUser();
  const [distance, setDistance] = useState("--");
  const [heartrate, setHeartrate] = useState("--");
  const [steps, setSteps] = useState("--");
  const isMobile = Moblie();
  const [offset, setOffset] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const maxOffset = 10;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Device ${CLIENT_ID}:${TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data?.data) {
          setDistance(`${data.data.Distance || "--"} `);
          setHeartrate(`${data.data.Heartrate || "--"} `);
          setSteps(`${data.data.Steps || "--"}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container ">
      {isMobile ? <Navbar className="fixed top-0 w-full" /> : <Sidebar />}
      <div className={`p-4 w-full sm:pl-32 ${isMobile ? "pt-20" : ""}`}>
        <Header />
        <div className={`${isMobile ? "grid grid-cols-1 gap-4" : "dashboard-grid"}`}>
          {/* Heart Rate */}
          <div className="dashboard-card heart-rate-card sm:col-span-2 sm:row-span-2">
            <div className="dashboard-icon">
              <FaHeartbeat />
            </div>
            <h2>Heart Rate</h2>
            <p>{heartrate} <span className="dashboard-unit">bpm</span></p>
            <span className="status-label">Normal</span>

            {/* Line Chart */}
            <ResponsiveContainer width="100%" height={50}>
              <AreaChart data={heartRateChartData}>
                <defs>
                  <linearGradient id="colorHeart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f87171" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#f87171" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#f87171"
                  fill="url(#colorHeart)"
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Distance */}
          <div className="dashboard-card distance-card sm:col-span-2 sm:row-span-2">
            <div className="dashboard-icon">
              <FaRoute />
            </div>
            <h2>Distance</h2>
            <p>{distance} <span className="dashboard-unit">m</span></p>
            <span className="status-label">Normal</span>

            {/* Line Chart */}
            <ResponsiveContainer width="100%" height={50}>
              <AreaChart data={distanceChartData}>
                <defs>
                  <linearGradient id="colorDistance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D83FF3" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#D83FF3" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#c084fc"
                  fill="url(#colorDistance)"
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Steps */}
          <div className="dashboard-card steps-card sm:col-span-2 sm:row-span-2">
            <div className="dashboard-icon">
              <FaWalking />
            </div>
            <h2>Steps</h2>
            <p>{steps} <span className="dashboard-unit">once/min</span></p>
            <span className="status-label">Normal</span>

            {/* Line Chart */}
            <ResponsiveContainer width="100%" height={50}>
              <AreaChart data={stepsChartData}>
                <defs>
                  <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#38bdf8"
                  fill="url(#colorSteps)"
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          {/* Active Time - Donut Chart */}
          <div className="dashboard-card active-time-card sm:col-span-6 sm:row-span-6 sm:col-start-7">
            <h3>Active Time</h3>
            <span className="dashboard-time text-sm">From 1–23 July, 2024</span>
            <PieChart width={450} height={450}>
              <Pie
                data={activeTimeData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={160}
                innerRadius={110}
                label
              >
                {activeTimeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <div className="pie-legend">
              {activeTimeData.map((entry, index) => (
                <div key={index} className="legend-item">
                  <span className="circle" style={{ backgroundColor: entry.color }}></span>
                  <span>{entry.name} ({entry.value}%)</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sm:col-span-6 sm:row-span-2 sm:col-start-1 sm:row-start-3 text-gray-500 text-[30px] font-[400]">
            Statistics
          </div>

          {/* Weekly Distance Chart */}
          <div className="dashboard-card weekly-distance-card sm:col-span-6 sm:row-span-2 sm:col-start-1 sm:row-start-5">
            <div className="relative mb-2 mr-auto">
              {/* Clickable Header */}
              <button
                onClick={toggleDropdown}
                className="w-full flex items-center justify-between px-4 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-200 rounded-md transition-all duration-300 ease-in-out"
              >
                <span>Weekly Distance</span>

                {/* Animation for the dropdown icon */}
                <span
                  className={`text-gray-500 transform transition-all duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                >
                  {isDropdownOpen ? "▲" : "⏷"}
                </span>
              </button>

              {/* Dropdown Options */}
              {isDropdownOpen && (
                <div
                  className="absolute z-10 mt-2 bg-white border rounded-lg shadow-lg w-64 max-h-60 overflow-y-auto transition-all duration-300 ease-in-out transform"
                  style={{ opacity: isDropdownOpen ? 1 : 0, transform: isDropdownOpen ? "scale(1)" : "scale(0.9)" }}
                >
                  {[...Array(maxOffset + 1).keys()].map((i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setOffset(i);
                        setIsDropdownOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${offset === i ? "bg-gray-100 font-semibold" : ""} transition-colors duration-200`}
                    >
                      ({i * 7} นาทีที่ผ่านมา)
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Chart */}
            <StatisticsChart offset={offset} />
          </div>


        </div>
      </div>
    </div>

  );
  
};

export { Dashboard };
