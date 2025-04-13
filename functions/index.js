const {onSchedule} = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp();
const db = admin.firestore();

const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

const deviceId = "0e01f7ba-ce71-4f50-ba2c-88004562dea5";
const deviceToken = "915y5BmnrCoP5kNn7M16TpxGxSneWyB2";

exports.fetchDistanceAndId = onSchedule("every 1 minutes", async (event) => {
  console.log("🕒 Scheduled function triggered");
  try {
    console.log("🌐 Sending request to NETPIE...");
    const response = await fetch("https://api.netpie.io/v2/feed/api/v1/datapoints/query", {
      method: "POST",
      headers: {
        "Authorization": `Device ${deviceId}:${deviceToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start_relative: {value: 30, unit: "seconds"},
        metrics: [
          {
            name: deviceId,
            tags: {attr: ["Distance1", "ID_Distance1"]},
            limit: 99,
          },
        ],
      }),
    });
    console.log("✅ Fetch succeeded. Parsing JSON...");

    const data = await response.json();
    const results = data.queries[0]?.results || [];

    const distances = [];
    const ids = [];

    // ดึงค่า Distance1 และ ID_Distance1
    results.forEach((result) => {
      const attr = result.tags?.attr?.[0];
      result.values.forEach(([timestamp, value]) => {
        if (attr === "Distance1") {
          distances.push({timestamp, value});
        } else if (attr === "ID_Distance1") {
          ids.push({timestamp, value});
        }
      });
    });

    // จับคู่ข้อมูลโดยใช้การจัดลำดับ (ตาม index)
    const combined = distances.map((dist, index) => {
      const match = ids[index]; // จับคู่ตามลำดับ
      return match ? {
        Distance1: dist.value,
        ID_Distance1: match.value,
        Timestamp: new Date(dist.timestamp),
      } : null;
    }).filter((item) => item !== null);

    // บันทึกข้อมูลใน Firestore
    if (combined.length > 0) {
      for (const entry of combined) {
        await db.collection("zzWalker").add(entry);
        console.log("✅ บันทึก:", entry);
      }
    } else {
      console.log("⛔️ ไม่พบคู่ข้อมูลที่ตรงกัน");
    }
  } catch (error) {
    console.error("❌ Error fetching from NETPIE:", error);
  }
});

const cors = require("cors")({origin: true});
exports.deleteUserByEmail = functions.https.onRequest(async (req, res) => {
  console.log("Request body:", req.body);
  cors(req, res, async () => {
    const userEmail = req.body.data.userEmail;
    console.log(" user with email:", userEmail);

    try {
      // ดึงข้อมูลผู้ใช้จากอีเมล
      const userRecord = await admin.auth().getUserByEmail(userEmail);
      console.log("User found:", userRecord); // แสดงข้อมูลของผู้ใช้ที่พบ

      const uid = userRecord.uid;
      console.log(`User UID: ${uid} will be deleted`);

      // ลบผู้ใช้จาก Firebase Auth
      await admin.auth().deleteUser(uid);
      console.log("User successfully deleted");

      // ส่งการตอบกลับเป็น JSON object ที่มี data field
      res.status(200).send({data: {message: "Deleted user"}});
    } catch (error) {
      console.error("Error fetching user", error);
      res.status(500).send({data: {error: "Failed to delete user"}});
    }
  });
});
