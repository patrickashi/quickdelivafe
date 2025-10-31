import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import api from "../utils/api";
import Sidebar from "../components/Sidebar";

const driverIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function LiveTracking() {
  const orderId = 1; // 🔧 Replace dynamically (e.g., from props/route)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [driverPos, setDriverPos] = useState([6.462, 8.530]);

  // 🕒 Poll backend every 5 seconds
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await api.get(`/orders/${orderId}/location/`);
        const { latitude, longitude } = res.data;
        setDriverPos([latitude, longitude]);
      } catch (err) {
        console.error("Unable to fetch location", err);
      }
    };
    fetchLocation();
    const timer = setInterval(fetchLocation, 5000);
    return () => clearInterval(timer);
  }, [orderId]);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <main className="relative z-0 flex-1 lg:ml-64 p-6 font-comfortaa text-gray-900 dark:text-gray-100">
        <h1 className="text-2xl font-bold text-quickdeliva mb-4">
          Live Order Tracking
        </h1>

        <div className="relative z-0 mt-4 h-[70vh] w-full rounded-xl overflow-hidden shadow-lg ring-1 ring-gray-200 dark:ring-gray-700">
          <MapContainer
            center={driverPos}
            zoom={14}
            className="h-full w-full"
            scrollWheelZoom
            style={{ zIndex: 0 }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={driverPos} icon={driverIcon}></Marker>
          </MapContainer>
        </div>
      </main>
    </div>
  );
}