import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbarlog";
import Header from "../components/Header";
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight, FaPause, FaPowerOff } from "react-icons/fa";
import useCheckUser from "../hooks/Checklogin";
import Moblie from "../hooks/MoblieMenu";

const Control = () => {
    useCheckUser();
    const isMobile = Moblie();

    const [ledState, setLedState] = useState("OFF");
    const [batteryLevel, setBatteryLevel] = useState(Math.floor(Math.random() * 101)); // 🔋 กำหนดระดับแบตเตอรี่ (ทดสอบเปลี่ยนค่าดู)

    const CLIENT_ID = "0e01f7ba-ce71-4f50-ba2c-88004562dea5";
    const TOKEN = "915y5BmnrCoP5kNn7M16TpxGxSneWyB2";
    const API_URL = "https://api.netpie.io/v2/device/message?topic=led/control";

    const toggleLED = async () => {
        const newState = ledState === "ON" ? "OFF" : "ON";
        setLedState(newState);

        try {
            const response = await fetch(API_URL, {
                method: "PUT",
                headers: {
                    "Authorization": `Device ${CLIENT_ID}:${TOKEN}`,
                    "Content-Type": "text/plain",
                },
                body: newState,
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            console.log(`✅ LED turned ${newState}`);
        } catch (error) {
            console.error("❌ Error controlling LED:", error);
        }
    };

    // ✅ ฟังก์ชันเลือกสีแบตเตอรี่ และขนาดของแท่งพลังงาน
    const getBatteryColor = () => {
        if (batteryLevel >= 80) return "bg-green-500 h-full";  // 4/4 🟩
        if (batteryLevel >= 50) return "bg-yellow-400 h-3/4";  // 3/4 🟨
        if (batteryLevel > 20) return "bg-yellow-400 h-2/4";  // 2/4 🟨
        return "bg-red-500 h-1/4";  // 1/4 🟥
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {isMobile ? <Navbar className="fixed top-0 w-full" /> : <Sidebar />}
            <div className={`p-4 w-full sm:pl-32 ${isMobile ? "pt-20" : ""}`}>
                <Header />

                {/* Battery Status */}
                <div className="flex items-center gap-2">
                    <div className="w-5 h-10 border-2 border-gray-700 rounded-lg flex flex-col-reverse overflow-hidden">
                        <div className={`w-full rounded-md ${getBatteryColor()}`}></div>
                    </div>
                    <p className="text-lg font-semibold">{batteryLevel}%</p>
                </div>

                {/* Control Panel 🎮 */}
                <div className="flex flex-col items-center mt-12 space-y-6">
                    {/* Forward */}
                    <button className="bg-black text-white p-12 sm:p-16 rounded-full shadow-lg hover:bg-gray-700 transition w-auto">
                        <FaArrowUp size={30} />
                    </button>

                    <div className={`flex justify-between ${isMobile ? "gap-10" : "space-x-32"}`}>
                        {/* Left */}
                        <button className="bg-black text-white p-12 sm:p-16 rounded-full shadow-lg hover:bg-gray-700 transition w-auto">
                            <FaArrowLeft size={30} />
                        </button>

                        {/* Right */}
                        <button className="bg-black text-white p-12 sm:p-16 rounded-full shadow-lg hover:bg-gray-700 transition w-auto">
                            <FaArrowRight size={30} />
                        </button>
                    </div>

                    {/* Back */}
                    <button className="bg-black text-white p-12 sm:p-16 rounded-full shadow-lg hover:bg-gray-700 transition w-auto">
                        <FaArrowDown size={30} />
                    </button>

                    {/* Pause & Shutdown (LED Control) */}
                    <div className="flex gap-4 justify-between w-full">
                        <button className="bg-black text-white p-12 sm:p-16 rounded-full shadow-lg hover:bg-gray-700 transition w-auto">
                            <FaPause size={30} />
                        </button>

                        {/* LED Control Button */}
                        <button
                            className={`bg-black text-white p-12 sm:p-16 rounded-full shadow-lg transition w-auto ${ledState === "ON" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                                }`}
                            onClick={toggleLED}
                        >
                            <FaPowerOff size={30} />
                        </button>
                    </div>

                    {/* LED Status */}
                    <p className="mt-6 text-lg sm:text-xl font-semibold text-center">
                        LED Status: <span className={ledState === "ON" ? "text-green-600" : "text-red-600"}>{ledState}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Control;