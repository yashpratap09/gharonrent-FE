import { Header } from "@/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - RentHaven | Create Your Rental Account",
  description:
    "Join RentHaven today! Create your free account to list properties, search rentals, and connect with verified users. Start your rental journey now.",
  keywords:
    "sign up, create account, register, join renthaven, property owner registration, tenant registration",
  openGraph: {
    title: "Sign Up - RentHaven",
    description:
      "Join RentHaven today! Create your free account to start your rental journey.",
    url: "/signup",
  },
  twitter: {
    title: "Sign Up - RentHaven",
    description:
      "Join RentHaven today! Create your free account to start your rental journey.",
  },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
