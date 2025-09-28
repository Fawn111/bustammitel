import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { FaBox, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";

export default function MyOrders() {
  const { user } = useAuth(); 
  const [orders, setOrders] = useState([]);

    const API_URL = import.meta.env.VITE_API_URL;

  const fetchUserOrders = async () => {
    try {
      if (!user?._id) return; // no user
      const res = await axios.get(`${API_URL}/orders/user/${user._id}`);
      console.log("Fetched orders:", res.data);
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching user orders:", err.message);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [user?._id]);

   const [selectedOrder, setSelectedOrder] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
            <FaCheckCircle className="text-green-600" /> Completed
          </span>
        );
      case "Pending":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
            <FaHourglassHalf className="text-yellow-600" /> Pending
          </span>
        );
      case "Cancelled":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
            <FaTimesCircle className="text-red-600" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
            {status}
          </span>
        );
    }
  };

  return (
        <div className="p-10 bg-gradient-to-br from-orange-50 to-white min-h-screen">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-900 tracking-tight">
        My eSIM Orders
      </h2>

      {orders.length === 0 && (
        <p className="text-center text-gray-500 mt-20 text-lg">
          You don’t have any eSIM orders yet.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 p-6 border border-gray-100 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                <FaBox className="text-orange-500" />
                {order.package?.title || order.package?.name}
              </h3>
              {getStatusBadge(order.status)}
            </div>

            <p className="text-xs text-gray-400 mb-3">Order ID: {order._id}</p>

            <div className="bg-gray-50 rounded-xl p-4 space-y-1 text-sm text-gray-700 shadow-inner">
              <p>📶 {order.package?.data} GB Data</p>
              <p>⏳ {order.package?.day} {order.package?.day > 1 ? "Days" : "Day"} Validity</p>
              <p>💳 {order.package?.type?.toUpperCase()}</p>
            </div>

            {order.operator?.image && (
              <div className="mt-5 flex items-center gap-3">
                <img
                  src={order.operator.image}
                  alt={order.operator?.title}
                  className="w-14 h-14 object-contain rounded-full border shadow-sm"
                />
                <div>
                  <p className="text-gray-800 font-semibold">{order.operator?.title}</p>
                  <p className="text-gray-500 text-sm">
                    {order.country?.title}
                    {order.region ? `, ${order.region?.title}` : ""}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-between items-center">
              <p className="text-xl font-bold text-gray-900">${order.package?.price} USD</p>
              <button
                onClick={() => setSelectedOrder(order)}
                className="bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative animate-fadeIn">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>

            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              {selectedOrder.package?.title || selectedOrder.package?.name}
            </h3>

            <p className="text-sm text-gray-500 mb-4">Order ID: {selectedOrder._id}</p>

            <div className="space-y-2 text-gray-700">
              <p>📶 Data: <span className="font-semibold">{selectedOrder.package?.data} GB</span></p>
              <p>⏳ Validity: <span className="font-semibold">{selectedOrder.package?.day} Days</span></p>
              <p>💳 Type: <span className="font-semibold">{selectedOrder.package?.type?.toUpperCase()}</span></p>
              <p>💲 Price: <span className="font-semibold">${selectedOrder.package?.price} USD</span></p>
              <p>Status: {getStatusBadge(selectedOrder.status)}</p>
            </div>

            {selectedOrder.operator?.image && (
              <div className="mt-5 flex items-center gap-3">
                <img
                  src={selectedOrder.operator.image}
                  alt={selectedOrder.operator?.title}
                  className="w-16 h-16 object-contain rounded-full border shadow"
                />
                <div>
                  <p className="text-gray-800 font-semibold">{selectedOrder.operator?.title}</p>
                  <p className="text-gray-500 text-sm">
                    {selectedOrder.country?.title}
                    {selectedOrder.region ? `, ${selectedOrder.region?.title}` : ""}
                  </p>
                </div>
              </div>
            )}

            {selectedOrder.qrCode && (
               <div className="mt-6 flex justify-center">
    <img
      src={selectedOrder.qrCode}
      alt="QR Code"
      className="w-32 h-32 border rounded-xl shadow-md"
    />
  </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-gray-200 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}