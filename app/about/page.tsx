import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About MartFury | Premium Furniture Store",
  description:
    "Learn about MartFury, your trusted destination for modern, affordable furniture.",
};

export default function AboutPage() {
  return (
    <main className="bg-zinc-50">
      
      {/* HERO */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600"
          alt="Furniture"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold">
            About MartFury
          </h1>
          <p className="mt-4 text-sm md:text-lg max-w-2xl mx-auto">
            Bringing modern, stylish, and affordable furniture to every home.
          </p>

          <Link
            href="/products"
            className="inline-block mt-6 bg-[#ff6a00] px-6 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition"
          >
            Explore Products
          </Link>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Our Story
        </h2>
        <p className="text-gray-600 leading-relaxed">
          MartFury started with a simple idea — to make modern, high-quality
          furniture accessible to everyone. From humble beginnings, we’ve grown
          into a trusted brand that delivers stylish and durable furniture
          across homes. Our focus has always been on combining design,
          functionality, and affordability.
        </p>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-8">
          
          <div className="p-6 rounded-xl shadow-sm bg-zinc-50">
            <h3 className="text-xl font-semibold mb-2 text-[#ff6a00]">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To provide premium furniture at affordable prices while ensuring
              quality, durability, and customer satisfaction.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-sm bg-zinc-50">
            <h3 className="text-xl font-semibold mb-2 text-[#ff6a00]">
              Our Vision
            </h3>
            <p className="text-gray-600">
              To become a globally recognized home furniture brand that inspires
              modern living and comfort.
            </p>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Why Choose Us
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          {[
            "High Quality Products",
            "Fast Delivery",
            "Secure Payments",
            "24/7 Customer Support",
            "Affordable Pricing",
            "Modern Designs",
          ].map((item, index) => (
            <div
              key={index}
              className="p-5 bg-white rounded-xl shadow hover:shadow-md transition text-center"
            >
              <p className="font-medium text-gray-800">{item}</p>
            </div>
          ))}

        </div>
      </section>

      {/* VALUES */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Our Values
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {["Trust", "Quality", "Innovation", "Customer First"].map(
              (value, i) => (
                <div
                  key={i}
                  className="bg-zinc-50 p-5 rounded-xl text-center shadow-sm"
                >
                  <p className="font-semibold text-gray-800">{value}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Meet Our Team
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          {[
            { name: "John Smith", role: "Founder", img: "https://randomuser.me/api/portraits/men/1.jpg" },
            { name: "Emily Davis", role: "Designer", img: "https://randomuser.me/api/portraits/women/2.jpg" },
            { name: "Michael Lee", role: "Operations", img: "https://randomuser.me/api/portraits/men/3.jpg" },
          ].map((member, i) => (
            <div key={i} className="text-center bg-white p-5 rounded-xl shadow">
              <Image
                src={member.img}
                alt={member.name}
                width={100}
                height={100}
                className="rounded-full mx-auto mb-3"
              />
              <h3 className="font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#ff6a00] text-white py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          Ready to Transform Your Home?
        </h2>
        <p className="mt-2 text-sm md:text-base">
          Explore our modern furniture collection today.
        </p>

        <Link
          href="/products"
          className="inline-block mt-6 bg-white text-[#ff6a00] px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition"
        >
          Shop Now
        </Link>
      </section>

    </main>
  );
}