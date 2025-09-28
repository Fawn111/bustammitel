import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CountriesTabs = () => {
  const [activeTab, setActiveTab] = useState("local");
  const [items, setItems] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchItems = async () => {
    setLoading(true);
    try {
      let url;

      if (activeTab === "local") {
        url = `${API_URL}/countries/local?limit=1000&page=1`;
      } else if (activeTab === "global") {
        url = `${API_URL}/countries/global?limit=1000&page=1`;
      } else if (activeTab === "discoverplus") {
        url = `${API_URL}/countries/global/discover?limit=1000&page=1`;
      }

      const token = localStorage.getItem("token");

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

      const data = await response.json();
      const newItems =
        activeTab === "local"
          ? data.countries
          : activeTab === "discoverplus"
          ? data.regions
          : data.regions;

      setItems(newItems || []);
    } catch (err) {
      console.error("❌ Error fetching items:", err.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    setShowAll(false);
  }, [activeTab]);

  const displayedItems = showAll ? items : items.slice(0, 10);

  const handleItemClick = (item) => {
    if (activeTab === "local") {
      const slug = item.slug || item.country_code.toLowerCase();
      navigate(`/${slug}-esims?type=local`);
    } else {
      const slug = item.slug;
      navigate(`/region/${slug}`, { state: { type: "global" } });
    }
  };

  const renderSkeletons = () =>
    Array.from({ length: 8 }).map((_, idx) => (
      <div
        key={idx}
        className="flex flex-col items-center justify-center gap-2 bg-white p-4 rounded-2xl shadow-lg animate-pulse"
      >
        <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
        <div className="h-4 w-16 bg-gray-300 rounded mt-2"></div>
      </div>
    ));

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <div className="bg-[#faf4ef] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-extrabold mb-10 text-center text-gray-900"
        >
          Explore eSIMs
        </motion.h1>

        {/* Tabs */}
        <div className="flex justify-center space-x-6 mb-10">
          {["local", "global", "discoverplus"].map((tab) => (
            <button
              key={tab}
              className={`text-lg font-semibold pb-2 transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? "border-b-4 border-orange-500 text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "local"
                ? "Local eSIMs"
                : tab === "global"
                ? "Regional eSIMs"
                : "Discover+ eSIMs"}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {renderSkeletons()}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedItems.map((item, idx) => (
                <motion.div
                  key={item.country_code || item.slug}
                  custom={idx}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center justify-center gap-2 bg-white p-4 rounded-2xl shadow-lg cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-full border-2 border-orange-400 shadow-md"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-500 font-bold text-xl">
                        {item.title[0]}
                      </span>
                    </div>
                  )}
                  <div className="text-center font-semibold text-gray-900 text-sm sm:text-base mt-2">
                    {item.title}
                  </div>
                </motion.div>
              ))}
            </div>

            {!showAll && items.length > 10 && (
              <div className="flex justify-center mt-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAll(true)}
                  className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 shadow-lg transition font-semibold"
                >
                  Show All
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CountriesTabs;
