import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import api from "../utils/api";

export default function OrdersChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/orders/stats/");
        setData(res.data);
      } catch (err) {
        console.error("Could not load order stats", err.response?.data || err.message);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 font-clash">
        Orders Over Time
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="oklch(63.7% 0.237 25.331)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="oklch(63.7% 0.237 25.331)" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            className="dark:stroke-gray-700"
          />
          <XAxis
            dataKey="month"
            stroke="currentColor"
            tick={{ fill: "currentColor" }}
          />
          <YAxis
            dataKey="total"
            allowDecimals={false}
            stroke="currentColor"
            tick={{ fill: "currentColor" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "none",
              color: "#000",
            }}
            labelStyle={{ fontWeight: "bold" }}
          />

          <Area
            type="monotone"
            dataKey="total"   // ✅ key from backend {"month": "...", "total": N}
            stroke="oklch(63.7% 0.237 25.331)"
            fillOpacity={1}
            strokeWidth={3}
            fill="url(#colorOrders)"
          />
        </AreaChart>
      </ResponsiveContainer>

      {data.length === 0 && (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic text-center">
          Add some orders to see activity 📦
        </p>
      )}
    </div>
  );
}