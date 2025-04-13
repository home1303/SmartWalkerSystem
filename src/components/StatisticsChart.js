// StatisticsChart.jsx
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const StatisticsChart = ({ offset }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "zzWalker");
    const q = query(colRef, orderBy("Timestamp", "desc"), limit(100));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const raw = snapshot.docs.map((doc) => doc.data());

      const grouped = {};
      raw.forEach((item) => {
        const date = new Date(item.Timestamp.seconds * 1000);
        const key = `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
        grouped[key] = (grouped[key] || 0) + item.Distance1;
      });

      const allData = Object.entries(grouped)
        .map(([name, distance]) => ({ name, distance }))
        .sort((a, b) => a.name.localeCompare(b.name));

      const now = new Date();
      const labels = [];
      for (let i = 6 + offset * 7; i >= offset * 7; i--) {
        const d = new Date(now.getTime() - i * 60 * 1000);
        labels.push(`${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`);
      }

      const filled = labels.map((label) => {
        const match = allData.find((d) => d.name === label);
        return { name: label, distance: match ? match.distance : 0 };
      });

      setChartData(filled);
    });

    return () => unsubscribe();
  }, [offset]);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `${value} cm`} />
        <Tooltip formatter={(value) => `${value} cm`} />
        <Bar dataKey="distance" fill="#ff6384"  barSize={45} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatisticsChart;
