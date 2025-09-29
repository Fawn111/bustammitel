import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Heroimg from "../../assets/hero.avif";

function Hero() {
  return (
    <div className="overflow-hidden bg-white">
      <div className="w-full bg-primary min-h-[650px] md:min-h-[900px] lg:min-h-[650px]">
        <div className="flex flex-col lg:flex-row justify-around items-center h-full px-6 lg:px-16 gap-10 py-12 lg:py-0">
          
          {/* Left: Text section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col max-w-xl text-center lg:text-left"
          >
            <h2 className="w-full sm:w-[557px] sm:text-[60px] text-[32px] text-black font-extrabold font-deal sm:leading-[70px] leading-[40px] tracking-tight">
              Welcome to Bustammitel (Pvt) Ltd
            </h2>
            <p className="w-full sm:w-[545px] text-[16px] mt-4 text-gray-500 font-deal font-extralight">
              Bustammitel delivers innovative and reliable telecom solutions worldwide, from eSIM to VoIP and DID numbers, connecting people and businesses since 2013.
            </p>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 mt-8 bg-orange-500 text-white rounded-full text-lg font-medium hover:bg-orange-600 transition"
              >
                Shop Now
              </motion.button>
            </Link>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="sm:border-r-2 border-gray-200"
              >
                <h2 className="text-[36px] sm:text-[40px] text-black font-bold">200+</h2>
                <p className="text-gray-500 text-sm sm:text-base">International Sims</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="sm:border-r-2 border-gray-200"
              >
                <h2 className="text-[36px] sm:text-[40px] text-black font-bold">200+</h2>
                <p className="text-gray-500 text-sm sm:text-base">Countries</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <h2 className="text-[36px] sm:text-[40px] text-black font-bold">30,000+</h2>
                <p className="text-gray-500 text-sm sm:text-base">Happy Customers</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Floating Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex justify-center items-center w-full lg:w-auto"
          >
            <motion.img
              src={Heroimg}
              alt="Hero"
              className="w-full max-w-sm md:max-w-md lg:max-w-lg rounded-lg object-cover"
              transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
