// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getStorage } from "firebase/storage";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAH3iZ_a2Zi6M9UuqkFoVTzRjpXA6p5W-w",
  authDomain: "walkertest-a907f.firebaseapp.com",
  databaseURL: "https://walkertest-a907f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "walkertest-a907f",
  storageBucket: "walkertest-a907f.firebasestorage.app",
  messagingSenderId: "4409205974",
  appId: "1:4409205974:web:9b1c10b61f7f7281ebd577"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);
const storage = getStorage(app); 

// ฟังก์ชันดึงข้อมูลผู้ใช้จาก Firestore ตาม UID
export const getUserByUid = async (uid) => {
  try {
    const q = query(collection(db, "user"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();

      console.log(userData.role);

      console.log("✅ User Data from Firestore:", userData);
      return userData;
    } else {
      console.log("⚠️ No user found with this UID!");
      return null;
    }
  } catch (error) {
    console.error("🚨 Error getting user from Firestore:", error);
    return null;
  }
};

// Export Firebase objects
export { db, auth, functions, storage};
