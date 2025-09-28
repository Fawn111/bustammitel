import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Smartphone,
  Search,
  AlertCircle,
} from "lucide-react";

const devices = {
    
  Apple: [
    "iPhone 17 / 17 Pro / 17 Pro Max / Air",
    "iPhone 16 (all: e, Plus, Pro, Pro Max)",
    "iPhone 15 (all models)",
    "iPhone 14 (all models)",
    "iPhone 13 (Mini, Pro, Pro Max)",
    "iPhone 12 (Mini, Pro, Pro Max)",
    "iPhone 11 (all models)",
    "iPhone XS / XS Max / XR",
    "iPhone SE (2020 & 2022)",
    "iPad (7th gen+ Wi-Fi + Cellular)",
    "iPad Air (3rd gen+)",
    "iPad Pro 11'' (1st gen+)",
    "iPad Pro 12.9'' (3rd gen+)",
    "iPad Mini (5th gen+)",
  ],
  Samsung: [
    "Galaxy A56, A55 5G, A54 5G, A36, A35 5G, A23 5G", 
    "Galaxy XCover7 Pro",
    "Galaxy Z Flip (all gens: Flip, 5G, 3, 4, 5, 6)",
    "Galaxy Z Fold (all gens: Fold, Fold2, 3, 4, 5, 6)",
    "Galaxy Note 20 / 20 5G / 20 Ultra / Ultra 5G",
    "Galaxy S20 / S20+ / Ultra (with 5G variants)",
    "Galaxy S21 / S21+ / Ultra 5G",
    "Galaxy S22 / S22+ / Ultra 5G",
    "Galaxy S23 / S23+ / Ultra / FE",
    "Galaxy S24 / S24+ / Ultra / FE",
    "Galaxy S25 / Edge / Slim / Ultra / Plus",
    "*Some USA, FE, and Asia models excluded",
  ],
  Google: [
    "Pixel 2 / 2 XL",
    "Pixel 3 / 3a / 3 XL / 3a XL*",
    "Pixel 4 / 4a / 4a 5G / 4 XL",
    "Pixel 5 / 5a / 5a 5G",
    "Pixel 6 / 6a / 6 Pro",
    "Pixel 7 / 7a / 7 Pro",
    "Pixel 8 / 8a / 8 Pro",
    "Pixel 9 / 9a / 9 Pro / 9 Pro XL / 9 Pro Fold",
    "Pixel 10",
    "Pixel Fold",
    "*Some regional exclusions apply",
  ],
  Hammer: [
    "Explorer PRO",
    "Blade 3",
    "Blade 5G",
    "myPhone NOW eSIM",
    "myPhone Hammer Construction",
    "*eSIM support region-dependent",
  ],
  Honor: [
    "HONOR 90",
    "HONOR 200 / 200 Pro",
    "HONOR 400 Lite / 400 / 400 Pro",
    "Magic7 Pro / Magic7 Lite",
    "Magic6 Pro / Magic6 Pro RSR",
    "Magic Vs3 / Magic V2 / Magic V3",
    "Magic5 Pro / Magic4 Pro",
    "*Region-dependent eSIM support",
  ],
  Huawei: ["Huawei P40 / P40 Pro*", "Mate 40 Pro", "*P40 Pro+ excluded, no China support"],
  Motorola: [
    "Moto G34 / G35 / G53 / G54 / G54 Power / G55",
    "Moto G75 / G85 / G86",
    "Moto G (2024 & 2025), G Power (2024), G Stylus 5G",
    "Edge 50 / Fusion / Pro / Neo / Ultra",
    "Edge 60 / Fusion / Pro / Stylus",
    "Edge+ (2022, 2023, 2024)",
    "Razr (2019, 2022, 2024, 2025 variants)",
    "Razr+, Ultra, 5G models",
    "ThinkPhone 25",
    "*Region-dependent support",
  ],
  Nokia: ["G60", "XR21", "X30", "*Region-dependent support"],
  OnePlus: [
    "OnePlus 11",
    "OnePlus 12",
    "OnePlus 13 / 13R",
    "OnePlus Open",
    "*Region-dependent support",
  ],
  Oppo: [
    "Find N2 Flip, Find N5",
    "Find X3 / X3 Pro",
    "Find X5 / X5 Pro",
    "Find X8 / X8 Pro",
    "Reno14 / Reno14 Pro",
    "Watch X2 Mini",
    "*Japan + select regions only",
  ],
  Rakuten: [
    "Rakuten Big / Big S",
    "Rakuten Mini",
    "Rakuten Hand / Hand 5G",
    "*Japan only",
  ],
  Sharp: [
    "AQUOS sense9 / sense8 / sense7 / sense7 plus",
    "AQUOS R10 / R9 / R9 Pro",
    "AQUOS R8 / R8 pro / R8s pro",
    "AQUOS wish, zero6",
    "*Japan only",
  ],
  Sony: [
    "Xperia 1 IV / V / VI / VII",
    "Xperia 5 IV / V",
    "Xperia 10 III Lite, 10 IV*, 10 V, 10 VI",
    "*10 IV only in Europe",
  ],
  TCL: ["TCL 60, 60 XE NxtPaper", "TCL 50 (5G, NxtPaper, Pro)", "TCL 40 XL"],
  TMobile: ["Revvl 7", "Revvl 7 Pro"],
  Vivo: [
    "X200 Pro / X200 / FE / X200s",
    "X100 Pro",
    "X90 Pro*",
    "V29 / V29 Lite 5G (EU & LatAm only)",
    "V40 / V40 Lite (EU only)",
    "V50",
    "Watch 5",
  ],
  Xiaomi: [
    "Xiaomi 12T Pro",
    "Xiaomi 13 / 13 Pro / 13T / 13T Pro / 13 Lite",
    "Xiaomi 14 / 14 Pro / 14T / 14T Pro",
    "Xiaomi 15 / 15 Ultra",
    "Xiaomi Poco X7",
    "Redmi Note 11 Pro 5G*, Note 13 Pro / Pro+, Note 14 Pro / Pro+ / 5G",
    "*Region-dependent",
  ],
  Others: [
    "Fairphone 4 / 5",
    "Gemini PDA 4G+Wi-Fi",
    "Nothing Phone (3a) Pro",
    "Nuu Mobile X5",
    "Realme 14 Pro+",
    "ASUS Zenfone 12 Ultra",
    "ZTE nubia Flip2",
    "alcatel V3 Ultra",
  ],
  Windows: [
    "Acer Swift 3 / 7",
    "Acer TravelMate (P2, Spin P4, P6)",
    "ASUS Mini Transformer T103HAF",
    "ASUS NovaGo TP370QL",
    "ASUS Vivobook Flip 14",
    "Dell Latitude (5410/11, 5511, 7310, 7410, 7440, 9410, 9510, 7210 2-in-1)",
    "HP Elitebook G5, Probook G5, Zbook G5, Spectre Folio 13",
    "Lenovo ThinkPad X1 series (Carbon Gen9, Titanium Yoga, Fold, Nano, X12)",
    "Lenovo Flex 5G, Yoga C630, Miix 630, Yoga 520, Yoga 720",
  ],
  Surface: ["Surface Pro 9", "Surface Go 3", "Surface Pro X", "Surface Duo / Duo 2"],
};
function Highlight({ text, query }) {
  if (!query) return <>{text}</>;
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-yellow-200 text-black rounded px-0.5">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function EsimDevicesPage() {

        useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const [search, setSearch] = useState("");

  // filter brands + models
  const filteredDevices = Object.entries(devices).reduce(
    (acc, [brand, models]) => {
      const matchedModels = models.filter((m) =>
        m.toLowerCase().includes(search.toLowerCase())
      );
      if (
        brand.toLowerCase().includes(search.toLowerCase()) ||
        matchedModels.length > 0
      ) {
        acc[brand] = matchedModels.length > 0 ? matchedModels : models;
      }
      return acc;
    },
    {}
  );

  return (
    <div className="min-h-screen bg-[#faf4ef] relative overflow-hidden">
      {/* background gradients */}
      <div className="absolute top-[-100px] left-[-150px] w-[400px] h-[400px] bg-gradient-to-br from-orange-200 via-pink-200 to-red-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-120px] right-[-100px] w-[350px] h-[350px] bg-gradient-to-tr from-yellow-200 via-orange-300 to-red-300 rounded-full blur-3xl opacity-30 animate-float"></div>

      <div className="relative max-w-6xl mx-auto p-6 z-10">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-4 drop-shadow-sm">
            eSIM Compatible Devices
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Not sure if your device supports{" "}
            <span className="font-semibold">Bustammitel eSIM</span>? Explore our
            up-to-date list of supported smartphones, tablets, and laptops. If
            your device is listed here and carrier-unlocked, you’re ready to go!
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 flex items-center bg-white border border-orange-200 rounded-xl shadow-md px-4 py-3 hover:shadow-lg transition">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search your device..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full ml-2 outline-none text-sm md:text-base"
          />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(filteredDevices).length > 0 ? (
            Object.entries(filteredDevices).map(([brand, models], i) => (
              <div
                key={i}
                className="bg-white border border-orange-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Smartphone className="w-5 h-5 text-orange-600" />
                  <h2 className="text-lg font-bold text-orange-600">
                    <Highlight text={brand} query={search} />
                  </h2>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-gray-700 text-sm list-disc list-inside">
                  {models.map((m, i) => (
                    <li key={i}>
                      <Highlight text={m} query={search} />
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-6 col-span-2">
              No devices found matching your search.
            </p>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-10 text-sm md:text-base text-gray-700 bg-orange-50 border border-orange-200 p-5 rounded-xl shadow-md flex items-start gap-3">
          <AlertCircle className="text-orange-500 w-5 h-5 mt-0.5" />
          <p>
            <span className="font-semibold">Important:</span> Some regional
            models (China, Hong Kong, Taiwan, Turkey, Korea, etc.) may not
            support eSIM. Please confirm with your device manufacturer or
            carrier before purchasing.
          </p>
        </div>
      </div>
    </div>
  );
}