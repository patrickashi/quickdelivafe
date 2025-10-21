import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import api from "../utils/api";

export default function OrdersChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/orders/stats/");
        let chartData = res.data || [];

        // Ensure the chart always has something to render
        if (chartData.length === 0) {
          chartData = [{ month: "No Orders Yet", total: 0 }];
        } else if (chartData.length === 1) {
          chartData = [
            { ...chartData[0], month: `${chartData[0].month} (Start)` },
            chartData[0],
          ];
        }
        setData(chartData);
      } catch (err) {
        console.error(
          "Could not load order stats",
          err.response?.data || err.message
        );
        setData([{ month: "Error", total: 0 }]);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 font-comfortaa">
          Orders Over Time
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString(undefined, {
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart
          data={data}
          margin={{ top: 15, right: 20, left: -5, bottom: 10 }}
        >
          {/* Gradient fill */}
          <defs>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="#3b82f6" // Tailwind blue-500
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="#9333ea" // Tailwind purple-600
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          {/* Grid and axes */}
          <CartesianGrid
            strokeDasharray="3 3"
            strokeOpacity={0.2}
            className="dark:stroke-gray-700"
          />
          <XAxis
            dataKey="month"
            tick={{ fill: "currentColor", fontSize: 12 }}
            stroke="currentColor"
            angle={-20}
            dy={10}
            height={40}
          />
          <YAxis
            dataKey="total"
            tick={{ fill: "currentColor", fontSize: 12 }}
            stroke="currentColor"
            allowDecimals={false}
          />

          {/* Tooltip styled for light/dark */}
          <Tooltip
            formatter={(value) => [`${value} Orders`, "Total"]}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              color: "#000",
            }}
            labelStyle={{
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: "4px",
            }}
          />

          <Legend
            verticalAlign="top"
            align="center"
            iconType="circle"
            wrapperStyle={{
              fontSize: 12,
              color: "currentColor",
              marginBottom: 10,
            }}
          />

          {/* Smooth animated curve */}
          <Area
            type="monotone"
            dataKey="total"
            name="Orders"
            stroke="#3b82f6"
            fillOpacity={1}
            strokeWidth={2.5}
            fill="url(#colorOrders)"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>

      {data.every((d) => d.total === 0) && (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic text-center">
          Add some orders to see activity 📦
        </p>
      )}
    </div>
  );
}