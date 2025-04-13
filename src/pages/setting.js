import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbarlog";
import Header from '../components/Header';
import { FaShoePrints, FaRegClock, FaMapMarkerAlt, FaBell } from "react-icons/fa";
import useCheckUser from "../hooks/Checklogin";
import Moblie from "../hooks/MoblieMenu";

const Setting = () => {

    const isMobile = Moblie();

    useCheckUser();

    const settings = [
        {
            title: "Speed",
            description: "Description of Speed",
            min: "10 cm / s",
            max: "80 cm / s",
            suggestion: "76 cm / s",
            options: ["10 cm / s", "20 cm / s", "40 cm / s", "60 cm / s", "80 cm / s"],
            icon: <FaShoePrints className="text-4xl text-red-500" />,
            color: "bg-yellow-100"
        },
        {
            title: "Delay",
            description: "Description of Delay",
            min: "1 Sec.",
            max: "20 Sec.",
            suggestion: "1 Sec.",
            options: ["1 Sec.", "5 Sec.", "10 Sec.", "15 Sec.", "20 Sec."],
            icon: <FaRegClock className="text-4xl text-blue-500" />,
            color: "bg-blue-100"
        },
        {
            title: "Distance",
            description: "Description of Distance",
            min: "10 m",
            max: "1000 m",
            suggestion: "150 m",
            options: ["10 m", "50 m", "100 m", "500 m", "1000 m"],
            icon: <FaMapMarkerAlt className="text-4xl text-purple-500" />,
            color: "bg-purple-100"
        },
        {
            title: "Notification",
            description: "Description of Notification\n2 Types:",
            buttons: [
                { text: "WHEN START DEVICES", className: "bg-teal-400 text-white" },
                { text: "ONLY ALERT WHEN FALLING", className: "bg-yellow-700 text-white" }
            ],
            icon: <FaBell className="text-4xl text-green-500" />,
            color: "bg-green-100"
        }
    ];

    return (
        <div className="flex min-h-screen bg-gray-50 ">
            {isMobile ? <Navbar className="fixed top-0 w-full" /> : <Sidebar />}
            <div className={`p-4 w-full sm:pl-32 ${isMobile ? "pt-20" : ""}`}>
                <Header />

                <div className="flex flex-col items-center bg-gray-50 p-8 sm:p-4 mt-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl ">
                        {settings.map((item, index) => (
                            <div key={index} className="bg-white shadow-md rounded-lg p-4">
                                <div className={`p-3 rounded-full inline-block ${item.color}`}>{item.icon}</div>
                                <h3 className="text-2xl font-semibold mt-2">{item.title}</h3>
                                <p className="text-lg text-gray-600">{item.description}</p>
                                {item.min && <p className="text-sm text-gray-500">Min: {item.min}</p>}
                                {item.max && <p className="text-sm text-gray-500">Max: {item.max}</p>}
                                {item.suggestion && <p className="text-sm text-gray-500">Suggestion: {item.suggestion}</p>}
                                {item.options ? (
                                    <select className="mt-2 w-full border rounded p-2 text-sm">
                                        {item.options.map((option, i) => (
                                            <option key={i} value={option}>{option}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <div className="mt-2">
                                        {item.buttons?.map((btn, i) => (
                                            <button key={i} className={`w-full mt-2 p-2 rounded ${btn.className}`}>{btn.text}</button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md w-full sm:w-auto">
                        SUBMIT
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Setting;
