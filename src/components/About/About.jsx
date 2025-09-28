import { Globe, Zap, MessageCircle, ShieldCheck } from "lucide-react";
import aboutimg from "../../assets/about.svg"; // Replace with your actual image
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="bg-[#faf4ef] min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Section - Text */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-6 leading-tight">
            About <span className="text-black">Bustammitel</span>
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            At <span className="font-semibold text-black">Bustammitel</span>, we’re on a mission to 
            make connectivity simpler, smarter, and more accessible for everyone.  
            Whether you’re traveling abroad, managing multiple numbers, or looking 
            for a flexible mobile solution, our 
            <span className="text-orange-600 font-semibold"> eSIM technology </span> 
            keeps you connected — anytime, anywhere.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            With <span className="font-semibold">global coverage</span>, 
            <span className="font-semibold"> instant activation</span>, and 
            <span className="font-semibold"> 24/7 support</span>, we empower travelers, 
            digital nomads, and businesses to stay online without the hassle of 
            physical SIM cards.
          </p>

          {/* Highlights */}
          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            <div className="bg-white shadow-md rounded-xl p-5 flex items-start gap-3 hover:shadow-lg hover:-translate-y-1 transition">
              <Globe className="w-7 h-7 text-orange-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-black mb-1">Global Reach</h3>
                <p className="text-gray-600 text-sm">
                  Access data plans in over <strong>200+ countries</strong> with just a few clicks.
                </p>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-xl p-5 flex items-start gap-3 hover:shadow-lg hover:-translate-y-1 transition">
              <Zap className="w-7 h-7 text-orange-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-black mb-1">Instant Activation</h3>
                <p className="text-gray-600 text-sm">
                  Purchase and activate your eSIM in <strong>minutes</strong>, no waiting or shipping.
                </p>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-xl p-5 flex items-start gap-3 hover:shadow-lg hover:-translate-y-1 transition">
              <MessageCircle className="w-7 h-7 text-orange-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-black mb-1">24/7 Support</h3>
                <p className="text-gray-600 text-sm">
                  Our multilingual team is always here to help, wherever you are.
                </p>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-xl p-5 flex items-start gap-3 hover:shadow-lg hover:-translate-y-1 transition">
              <ShieldCheck className="w-7 h-7 text-orange-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-black mb-1">Secure & Reliable</h3>
                <p className="text-gray-600 text-sm">
                  Trusted by thousands worldwide for safe and seamless connectivity.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="flex justify-center">
          <img
            src={aboutimg}
            alt="About Bustammitel"
            className="max-w-full md:max-w-md object-contain"
          />
        </div>
      </div>

      {/* Bottom Call to Action */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
          Ready to experience seamless connectivity?
        </h2>
      <Link
  to="/#estore"
  onClick={() => {
    setTimeout(() => {
      const el = document.getElementById("estore");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100); // wait for route to change
  }}
  className="inline-block bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-orange-700 hover:shadow-lg transition"
>
  Explore Our eSIM Plans
</Link>


      </div>
    </div>
  );
}
