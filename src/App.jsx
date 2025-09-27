import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SubNavbar from "./components/Navbar-links/Navbar-links";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import AiraloFeatureSection from "./components/AiraloFeature/AiraloFeature";
import FaqSupportSection from "./components/Supportcard/SupportCard";
import Video from "./components/VideoSection/Video";
import Homeplan from "./components/Home-plans/Homeplans";
import CountryPackages from "./components/PackagesPage/Packagespage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ServicesPage from "./components/Services/Service";
import Why from "./components/WhyBusta/Why";
import Order from "./components/Order/Order";
import RegionPackagesPage from "./components/RegionsPackages/Region";
import AdminLayout from "./components/Admin/AdminLayout";
import Dashboard from "./components/Admin/Dashboard";
import AdminOrders from "./components/Admin/Orders";
import AdminCoupon from "./components/Admin/Coupon";
import User from "./components/Admin/User";
import MyOrders from "./components/Myorders/Myorders";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SubNavbar />

      <main className="flex-grow">
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
                <AiraloFeatureSection />
                <div id="why-bustammitel">
  <Why />
</div>
                <Video />
                <FaqSupportSection />
              </>
            }
          />

          <Route path="/admin" element={<AdminLayout />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="orders" element={<AdminOrders />} />
      <Route path="coupon" element={<AdminCoupon />} />
      <Route path="users" element={<User />} />
    </Route>

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
