import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByUid } from "../firebase";

export default function useCheckUser() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        const userID = localStorage.getItem("userID");


        if (!userEmail || !userID) {
            navigate("/home");
        }
        else {

            console.log("User email: ", userEmail);
            console.log("User ID: ", userID);

            getUserByUid(userID).then((user) => {
                if (user) {
                    setUserData(user);

                    
                    if (user.role === "admin" && window.location.pathname !== "/admin") {
                        navigate("/admin"); // ถ้าเป็น admin แต่ไม่ได้อยู่ที่ /admin ให้พาไป /admin
                    } else if (user.role === "user" && window.location.pathname === "/admin") {
                        navigate("/dashboard"); // ถ้าเป็น user แล้วพยายามเข้า /admin ให้ redirect กลับ dashboard
                    }

                    // บันทึก role ใน localStorage (ใช้สำหรับเช็คที่อื่นๆ)
                    localStorage.setItem("userRole", user.role);

                } else {
                    setUserData({ email: userEmail, uid: userID });
                }
            });
        }
    }, [navigate]);

    return userData;
}
