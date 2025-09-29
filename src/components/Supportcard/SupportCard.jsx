import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import supportimg from '../../assets/support.avif';
const faqs = [
  {
    q: "How do I check if my iOS device supports eSIM?",
    a: (
      <div>
        <p>
          Go to <strong>Settings → Cellular or Mobile Data</strong>. If you see an option for{" "}
          <em>“Add eSIM”</em> or <em>“Add Cellular Plan”</em>, your device supports eSIM.
        </p>
        <p className="mt-2">
          iPhone XS and later models generally support eSIM (except some regional versions like Mainland China).
        </p>
        <p className="mt-2">
          👉 You can also check our{" "}
          <a
            href="/compatibility"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 font-semibold hover:underline"
          >
            compatibility list here
          </a>
          .
        </p>
      </div>
    ),
  },
  {
    q: "How do I install and set up an eSIM on my iOS device?",
    a: "Open Settings → Cellular → Add eSIM. You can scan the QR code provided by your carrier or enter the details manually. Once installed, choose your default line for calls, messages, and data in the same menu.",
  },
  {
    q: "When does my eSIM data package expire?",
    a: "eSIM data plans typically expire based on the duration or data allowance, whichever comes first. For example, a 7-day 1GB plan ends after 7 days or once you’ve used 1GB. Always check your provider’s validity terms.",
  },
  {
    q: "How do I install and set up an eSIM on my Android device?",
    a: "Go to Settings → Connections → SIM Manager → Add eSIM (steps may vary by brand). Scan your provider’s QR code or input activation details. Samsung Galaxy S20+, Google Pixel 3+, and most recent Android models support eSIM.",
  },
  {
    q: "How can I get an eSIM?",
    a: (
      <div>
        <p>
          You can get an eSIM online at our website{" "}
          <a
            href="https://www.bustammitel.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 font-semibold hover:underline"
          >
            bustammitel.net
          </a>{" "}
          or through the Bustammitel app.
        </p>
        <p className="mt-2 font-medium">On our website:</p>
        <ul className="list-disc list-inside text-gray-600 mt-1 space-y-1">
          <li>Sign up for a Bustammitel account, or log in if you already have one.</li>
          <li>Search for available eSIMs for your desired country or region.</li>
          <li>Select your preferred data plan.</li>
          <li>Choose your payment method, agree with the required items, and click on <strong>“Complete the Order”</strong>.</li>
          <li>You will be directed to a confirmation page and also receive a confirmation email.</li>
          <li>Go to <strong>eSIM Detail</strong> to view your eSIM. You can also find it under the <strong>My eSIMs</strong> tab.</li>
          <li>Install your new eSIM on your device by following the instructions from your eSIM details page.</li>
        </ul>
      </div>
    ),
  },
];


const FaqSupportSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* FAQ Section */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-6 text-orange-600">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 shadow cursor-pointer transition-all border border-gray-100 hover:shadow-md"
                onClick={() => toggleFaq(index)}
              >
                <div className="flex justify-between items-center text-black font-medium">
                  <span>{item.q}</span>
                  <FaChevronDown
                    className={`transition-transform duration-300 text-orange-500 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                {openIndex === index && (
                  <div className="mt-2 text-gray-600 text-sm leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between border border-gray-100">
          <div>
            <h3 className="text-lg text-orange-600 mb-2 font-extrabold">Support</h3>
            <p className="text-xl font-semibold text-black mb-4">
              Need help? We offer 24/7, multi-language support
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-black font-medium cursor-pointer hover:underline">
                Reach out to support <span className="text-xl">→</span>
              </div>
              <div className="flex items-center justify-between text-black font-medium cursor-pointer hover:underline">
                Chat on WhatsApp <span className="text-xl">→</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <img
              src={supportimg}
              alt="Support Agent"
              className="max-w-[180px] w-full rounded-lg object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSupportSection;
