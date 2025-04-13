import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbarlog";
import Header from "../components/Header";
import { FaBell, FaTimes, FaPhoneAlt } from "react-icons/fa";
import useCheckUser from "../hooks/Checklogin";

import Moblie from "../hooks/MoblieMenu";

const Notification = () => {
  const [user, setUser] = useState(null);
  useCheckUser(setUser);
  const isMobile = Moblie();

  const [notifications, setNotifications] = useState([
    { id: 1, message: "อุปกรณ์เกิดการล้ม", time: "เมื่อสักครู่" },
    { id: 2, message: "อุปกรณ์เกิดการล้ม", time: "15 นาทีที่ผ่านมา" },
  ]);

  const handleRemoveNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {isMobile ? <Navbar className="fixed top-0 w-full" /> : <Sidebar />}
      <div className={`p-4 w-full sm:pl-32 ${isMobile ? "pt-20" : ""}`}>
        <Header />

        {/* Notification List */}
        <div className="mt-6 space-y-4">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="flex flex-col lg:flex-row items-start justify-between p-4 bg-white shadow-md rounded-lg"
            >
              <div className="flex items-center gap-4">
                <FaBell className="text-red-500 text-2xl" />
                <div>
                  <p className="font-semibold">Notification: {notif.message}</p>
                  <p className="text-gray-500 text-sm">{notif.time}</p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mt-2 lg:mt-0">
                <span className="text-gray-600">23/07/24</span>
                <button className="flex items-center text-red-500 font-semibold">
                  <FaPhoneAlt className="mr-2" /> โปรดติดต่อ: 1669
                </button>
                <button onClick={() => handleRemoveNotification(notif.id)}>
                  <FaTimes className="text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Notification };
