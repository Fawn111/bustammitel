import { Globe, Zap, MessageCircle, ShieldCheck } from "lucide-react";
import newAboutImg from "../../assets/real.svg"; // Replace with a modern illustration
import { Link } from "react-router-dom";
import "../AboutPage.css"; // we'll add custom animation here

export default function AboutPage() {
  return (
    <div className="bg-[#faf4ef] min-h-screen py-16 px-6 relative overflow-hidden">
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-300 via-pink-300 to-purple-400 rounded-full blur-3xl opacity-40 animate-float"></div>
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-yellow-200 via-orange-200 to-red-300 rounded-full blur-3xl opacity-30 animate-float-slow"></div>

      {/* Rotating SVG Blob */}
      <svg
        className="absolute right-[-150px] top-20 w-[500px] h-[500px] opacity-20 z-0"
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(300,300)">
          <path
            d="M120,-155C160,-130,200,-95,210,-55C220,-15,200,30,175,75C150,120,120,165,80,185C40,205,-10,200,-60,180C-110,160,-160,125,-190,75C-220,25,-230,-40,-200,-80C-170,-120,-110,-145,-55,-165C0,-185,60,-200,120,-155Z"
            fill="#f97316"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0"
              to="360"
              dur="60s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </svg>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Text */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-2 leading-tight">
            About <span className="text-black">Bustammitel</span>
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            At <span className="font-semibold text-black">Bustammitel</span>, we’re on a mission to 
            make connectivity simpler, smarter, and more accessible for everyone.  
            Whether you’re traveling abroad, managing multiple numbers, or looking 
            for a flexible mobile solution, our 
            <span className="text-orange-600 font-semibold"> eSIM technology </span> 
            keeps you connected — anytime, anywhere.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed">
            With <span className="font-semibold">global coverage</span>, 
            <span className="font-semibold"> instant activation</span>, and 
            <span className="font-semibold"> 24/7 support</span>, we empower travelers, 
            digital nomads, and businesses to stay online without the hassle of 
            physical SIM cards.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            {[
              { icon: Globe, title: "Global Reach", desc: "Access data plans in over 200+ countries." },
              { icon: Zap, title: "Instant Activation", desc: "Get started in minutes, no waiting." },
              { icon: MessageCircle, title: "24/7 Support", desc: "Our team is always here to help." },
              { icon: ShieldCheck, title: "Secure & Reliable", desc: "Trusted worldwide for connectivity." },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white shadow-md rounded-xl p-5 flex items-start gap-3 hover:shadow-lg hover:-translate-y-1 transition"
                >
                  <Icon className="w-7 h-7 text-orange-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-black mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative flex justify-center items-center">
          <img
            src={newAboutImg}
            alt="About Bustammitel"
            className="relative z-10 w-full md:w-3/4 lg:w-full object-contain transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-20 text-center bg-orange-50 border border-orange-200 py-10 px-6 rounded-2xl shadow-md relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
          Ready to experience seamless connectivity?
        </h2>
        <Link
          to="/#estore"
          onClick={() => {
            setTimeout(() => {
              const el = document.getElementById("estore");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
          className="inline-block bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold shadow-md hover:bg-orange-700 hover:shadow-lg transition"
        >
          🚀 Explore Our eSIM Plans
        </Link>
      </div>
    </div>
  );
}
