import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

export default function VerifyPayment() {
  const { reference } = useParams();
  const [msg, setMsg] = useState("Verifying payment...");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await api.get(`/orders/paystack/verify/${reference}/`);
        setMsg(res.data.status === "success" ? "Payment successful ✅" : "Payment failed ❌");
      } catch (err) {
        console.error(err);
        setMsg("Verification failed ❌");
      }
    };
    verify();
  }, [reference]);

  return (
    <div className="text-center mt-40 font-comfortaa text-xl text-gray-800 dark:text-gray-100">
      {msg}
    </div>
  );
}