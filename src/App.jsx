import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SubNavbar from "./components/Navbar-links/Navbar-links";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import AFeatureSection from "./components/AiraloFeature/AFeature";
import FaqSupportSection from "./components/Supportcard/SupportCard";
import Homeplan from "./components/Home-plans/Homeplans";
import CountryPackages from "./components/PackagesPage/Packagespage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ServicesPage from "./components/Services/Service";
import Why from "./components/WhyBusta/Why";
import Order from "./components/Order/Order";
import RegionPackagesPage from "./components/RegionsPackages/Region";
import MyOrders from "./components/Myorders/Myorders";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SubNavbar />

      <main className="flex-grow">
         <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          {/* Home page */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <div id="estore">
        <Homeplan />
      </div>
                <AFeatureSection />
                <div id="why-bustammitel">
  <Why />
</div>
                <FaqSupportSection />
              </>
            }
          />


<Route path="/region/:slug" element={<RegionPackagesPage />} />
          <Route path="/:countrySlug" element={<CountryPackages />} />
            <Route path="/services" element={<ServicesPage />} />
             <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/order-confirmation" element={<Order />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
