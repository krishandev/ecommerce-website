"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill required fields");
      return;
    }

    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="bg-zinc-50">

      {/* HERO */}
      <section className="relative h-[300px] flex items-center justify-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1600"
          alt="Contact"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative text-center">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-2">We’d love to hear from you</p>
        </div>
      </section>

      {/* FORM */}
      <section className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">

        {/* INFO */}
        <div className="space-y-4">
          <InfoCard icon={<MapPin />} title="Address" value="New York, USA" />
          <InfoCard icon={<Mail />} title="Email" value="support@martfury.com" />
          <InfoCard icon={<Phone />} title="Phone" value="+1 234 567 890" />
          <InfoCard icon={<Clock />} title="Hours" value="Mon–Sat, 9AM–6PM" />
        </div>

        {/* FORM */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Send Message</h2>

          {submitted && (
            <p className="text-green-600 mb-4">Message sent successfully!</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="input" />
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="input" />
            <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} className="input min-h-[120px]" />

            <button className="w-full bg-[#ff6a00] text-white py-2 rounded">
              Send Message
            </button>
          </form>
        </div>

      </section>
    </main>
  );
}

/* COMPONENT */
function InfoCard({ icon, title, value }: any) {
  return (
    <div className="flex gap-3 p-4 bg-white rounded shadow-sm">
      <div className="text-[#ff6a00]">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}