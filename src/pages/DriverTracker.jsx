import { useState, useEffect } from "react";
import api from "../utils/api";

export default function DriverTracker({ orderId = 1 }) {
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const [status, setStatus] = useState("Idle");

  useEffect(() => {
    // watchPosition → sends update every few seconds when device moves
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lng: longitude });
          try {
            await api.post(`/orders/${orderId}/location/`, {
              latitude,
              longitude,
            });
            setStatus("Updated ✅");
          } catch (err) {
            console.error(err);
            setStatus("❌ Failed");
          }
        },
        (err) => {
          console.error(err);
          setStatus("Permission denied");
        },
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setStatus("Geolocation not supported");
    }
  }, [orderId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-quickdeliva mb-4">
        Driver Live Update
      </h1>
      <p>Lat: {coords.lat.toFixed(5)} Lng: {coords.lng.toFixed(5)}</p>
      <p className="mt-2">{status}</p>
    </div>
  );
}