import type { Metadata } from "next";
import ContactClient from "./ContactClient"; // 👈 import client file

export const metadata: Metadata = {
  title: "Contact MartFury | Get in Touch",
  description:
    "Contact MartFury for support, inquiries, or feedback. We are here to help you.",
};

export default function ContactPage() {
  return <ContactClient />;
}