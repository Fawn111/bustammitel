import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const CountriesTabs = () => {
  const [activeTab, setActiveTab] = useState("local");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  // Track latest request
  const currentRequestId = useRef(0);

  const normalizeData = (arr, type) =>
    (arr || []).map((item) => ({
      id: item.id || item.slug || item.country_code,
      title: item.title,
      slug: item.slug || item.country_code?.toLowerCase(),
      imageUrl: item.imageUrl,
      country_code: item.country_code,
      type,
    }));

  const fetchItems = async (tab) => {
    const requestId = ++currentRequestId.current; // unique id for this request
    setLoading(true);
    setItems([]); // clear immediately

    try {
      let url =
        tab === "local"
          ? `${API_URL}/countries/local?limit=1000&page=1`
          : tab === "global"
          ? `${API_URL}/countries/global?limit=1000&page=1`
          : `${API_URL}/countries/global/discover?limit=1000&page=1`;

      const token = localStorage.getItem("token");

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) throw new Error(`Failed: ${response.status}`);

      const data = await response.json();

      const newItems =
        tab === "local"
          ? normalizeData(data.countries, "local")
          : normalizeData(data.regions, tab);

      // ✅ only update if this is still the latest request
      if (requestId === currentRequestId.current) {
        setItems(newItems);
      }
    } catch (err) {
      console.error("❌ Error:", err.message);
      if (requestId === currentRequestId.current) {
        setItems([]);
      }
    } finally {
      if (requestId === currentRequestId.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchItems(activeTab);
    setShowAll(false);
    setSearch("");
  }, [activeTab]);

  const displayedItems = (showAll ? items : items.slice(0, 16)).filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleItemClick = (item) => {
    if (item.type === "local") {
      navigate(`/${item.slug}-esims?type=local`);
    } else {
      navigate(`/region/${item.slug}`, { state: { type: "global" } });
    }
  };

  const gridClass =
    activeTab === "local"
      ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2";

  const headingText =
    activeTab === "local"
      ? "Popular Local Countries"
      : activeTab === "global"
      ? "Regional eSIMs"
      : "Global eSIMs";

  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-extrabold mb-10 text-center text-gray-900"
      >
        Explore eSIMs
      </motion.h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4">
        {["local", "global", "discoverplus"].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 text-lg font-medium transition-all duration-300 
              ${
                activeTab === tab
                  ? "bg-gray-100 "
                  : "bg-white text-gray-500 hover:bg-gray-100 "
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "local"
              ? "Local eSIMs"
              : tab === "global"
              ? "Regional eSIMs"
              : "Global eSIMs"}
          </button>
        ))}
      </div>

      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto pb-6">
          <h2 className="text-2xl font-bold mb-2 pt-5 text-gray-900 text-center">
            {headingText}
          </h2>

          {/* Grid */}
          {loading ? (
            <div className={`grid ${gridClass} gap-4 bg-gray-100 p-20`}>
              {Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-white p-4 rounded-lg animate-pulse"
                >
                  <div className="w-8 h-5 bg-gray-200 rounded-sm"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className={`grid ${gridClass} gap-4 bg-gray-100 px-20 py-6`}>
                {displayedItems.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between bg-white rounded-lg px-4 py-4 shadow-lg cursor-pointer hover:shadow-md transition"
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-8 h-6 object-cover rounded-sm"
                      />
                      <span className="font-medium text-gray-900">
                        {item.title}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </motion.div>
                ))}
              </div>

              {!showAll && items.length > 16 && (
                <div className="flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAll(true)}
                    className="bg-gray-600 text-white px-6 py-3 rounded-sm hover:bg-orange-600 shadow-md text-sm transition font-semibold"
                  >
                    Show All Countries
                  </motion.button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CountriesTabs;
