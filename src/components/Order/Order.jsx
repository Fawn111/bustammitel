import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBitcoin, FaUniversity, FaCreditCard, FaTicketAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Hooks
  const [paymentMethod, setPaymentMethod] = useState("binance");
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;
  const { package: pkg, operator, region = null, country = null, cardType } = location.state || {};

  // Fetch available coupons
  useEffect(() => {
    fetch(`${API_URL}/coupons/`)
      .then((res) => res.json())
      .then((data) => setAvailableCoupons(data))
      .catch((err) => console.error("Error fetching coupons:", err));
  }, []);

  // Apply coupon
  const applyCoupon = () => {
    if (!coupon.trim()) return toast.error("Please enter a coupon code");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const found = availableCoupons.find(c => {
      const expiry = new Date(c.expiryDate);
      expiry.setHours(23, 59, 59, 999);
      return c.code.toLowerCase() === coupon.toLowerCase() && expiry >= today && c.active;
    });

    if (!found) return toast.error("Invalid or expired coupon");

    setAppliedCoupon(found);
    toast.success(`Coupon "${found.code}" applied!`);
  };

  const getDiscountedPrice = () => {
    if (!appliedCoupon) return pkg.price;

    if (appliedCoupon.type === "percentage") {
      return (pkg.price - (pkg.price * appliedCoupon.value) / 100).toFixed(2);
    } else {
      return Math.max(pkg.price - appliedCoupon.value, 0).toFixed(2);
    }
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error("You must be logged in to place an order");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/orders/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          username: user.name,
          cardType: cardType || "eSIM",
          package: pkg,
          operator: { title: operator.title, image: operator.image?.url },
          country: { title: country.title },
          region: region ? { title: region.title } : null,
          paymentMethod,
          coupon: appliedCoupon ? appliedCoupon.code : null,
        }),
      });

      if (!response.ok) throw new Error("Failed to place order");
      const data = await response.json();
      setOrderDetails(data);
      setShowPopup(true);
      toast.success("Order placed successfully!");
    } catch (err) {
      console.error("Error creating order:", err.message);
      toast.error("Failed to place order");
    }
  };

  const paymentOptions = [
    { id: "binance", name: "Binance Pay", icon: <FaBitcoin size={24} />, description: "Pay instantly using Binance Pay." },
    { id: "bank", name: "Bank Transfer", icon: <FaUniversity size={24} />, description: "Transfer the amount from your bank account." },
    { id: "card", name: "Credit/Debit Card", icon: <FaCreditCard size={24} />, description: "Pay using your card securely." },
  ];

  if (!pkg || !operator || !country) {
    return (
      <div className="text-center mt-10 text-gray-600">
        No order details found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8 relative">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-6">
        Secure Checkout
      </h1>

      {/* Package Summary */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg space-y-4 border border-gray-200 flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 w-full md:w-48 h-48 md:h-auto">
          <img
            src={operator.image?.url || "https://via.placeholder.com/150"}
            alt={pkg.title}
            className="w-full h-full object-cover rounded-xl shadow-md"
          />
        </div>
        <div className="flex-1 space-y-2">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">{pkg.title}</h2>
          <p className="text-gray-700">{pkg.short_info || pkg.description}</p>

          <div className="flex flex-wrap gap-2 md:gap-3 mt-2">
            {region && (
              <span className="bg-gray-100 text-gray-800 px-2 md:px-3 py-1 rounded-full font-semibold text-xs md:text-sm">
                Region: {region.title}
              </span>
            )}
            <span className="bg-gray-100 text-gray-800 px-2 md:px-3 py-1 rounded-full font-semibold text-xs md:text-sm">
              Country: {country.title}
            </span>
            <span className="bg-gray-100 text-gray-800 px-2 md:px-3 py-1 rounded-full font-semibold text-xs md:text-sm">
              Data: {pkg.data} GB
            </span>
            <span className="bg-gray-100 text-gray-800 px-2 md:px-3 py-1 rounded-full font-semibold text-xs md:text-sm">
              Validity: {pkg.day} {pkg.day > 1 ? "Days" : "Day"}
            </span>
            <span className="bg-gray-100 text-gray-800 px-2 md:px-3 py-1 rounded-full font-semibold text-xs md:text-sm">
              Type: {pkg.type.toUpperCase()}
            </span>
          </div>

          <div className="mt-3 flex justify-between items-center">
            <p className="text-lg font-semibold">Price:</p>
            <p className="text-xl font-bold">${pkg.price} USD</p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Choose Payment Method</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentOptions.map((option) => (
            <div
              key={option.id}
              className={`border rounded-2xl p-4 cursor-pointer flex flex-col items-center transition hover:shadow-lg ${
                paymentMethod === option.id ? "border-orange-500 bg-red-50" : "border-gray-300"
              }`}
              onClick={() => setPaymentMethod(option.id)}
            >
              <div className="text-orange-500 mb-2">{option.icon}</div>
              <h3 className="font-semibold text-gray-900">{option.name}</h3>
              {paymentMethod === option.id && (
                <p className="text-gray-700 text-sm mt-2 text-center">{option.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Coupon */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg space-y-3 border border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
          <FaTicketAlt className="text-orange-500" /> Apply Coupon
        </h2>

        <div className="flex flex-col md:flex-row gap-3 items-center">
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Enter coupon code"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            disabled={appliedCoupon}
          />

          {appliedCoupon ? (
            <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
              Applied: {appliedCoupon.code} (
              {appliedCoupon.type === "percentage" ? `${appliedCoupon.value}%` : `$${appliedCoupon.value}`})
              <button
                onClick={() => {
                  setAppliedCoupon(null);
                  setCoupon("");
                }}
                className="ml-2 text-green-700 hover:text-green-900 font-bold"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={applyCoupon}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition font-semibold"
            >
              Apply
            </button>
          )}
        </div>

        {appliedCoupon && (
          <p className="text-sm text-green-700 mt-1">
            Discount applied: {appliedCoupon.type === "percentage"
              ? `${appliedCoupon.value}% off`
              : `$${appliedCoupon.value} off`}
          </p>
        )}
      </div>

      {/* Total Price */}
      <div className="bg-gray-50 p-4 md:p-6 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-center border border-gray-200 text-lg font-semibold space-y-2 md:space-y-0">
        <span>Total Price:</span>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">${getDiscountedPrice()} USD</span>
          {appliedCoupon && <span className="text-green-600 text-sm line-through">${pkg.price} USD</span>}
        </div>
      </div>
<p className="text-sm text-gray-500"> Before completing this order, please confirm your device is eSIM compatible and network-unlocked. <span className="underline cursor-pointer">Learn More</span> </p>
      <button
        onClick={handlePlaceOrder}
        className="w-full bg-gradient-to-r py-3 font-bold cursor-pointer from-orange-500 to-orange-400 text-white rounded-2xl hover:from-orange-600 hover:to-orange-500 transition text-lg"
      >
        COMPLETE ORDER
      </button>

      {/* Confirmation Popup */}
      {showPopup && orderDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Order Placed!</h2>
            <p className="text-gray-700">Your order has been successfully placed.</p>

            <div className="text-left border-t border-gray-200 pt-3 space-y-1">
              <p><span className="font-semibold">Order ID:</span> {orderDetails._id}</p>
              <p><span className="font-semibold">Package:</span> {orderDetails.package.title}</p>
              <p><span className="font-semibold">Country:</span> {orderDetails.country.title}</p>
              <p><span className="font-semibold">Status:</span> {orderDetails.status}</p>
            </div>

            <button
              onClick={() => {
                navigate("/my-orders");
                setShowPopup(false);
              }}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
            >
              View My Orders
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
