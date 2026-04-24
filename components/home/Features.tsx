"use client";

import { FaTruck, FaUndo, FaLock, FaHeadset } from "react-icons/fa";

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: <FaTruck />,
    title: "Free Delivery",
    description: "Free shipping on all orders",
  },
  {
    icon: <FaUndo />,
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: <FaLock />,
    title: "Secure Payment",
    description: "100% secure payment",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    description: "Dedicated support team",
  },
];

export default function Features() {
  return (
    <section className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Heading (SEO + AEO) */}
        <div className="text-center md:text-left mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Why Shop With Us
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Enjoy fast delivery, easy returns, and secure payments when you shop with us.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300"
            >
              {/* Icon */}
              <div className="text-[#ff6a00] text-xl">
                {feature.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}