import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing Plans - RentHaven | Affordable Property Listing Solutions',
  description: 'Choose the perfect plan for your rental business. Free basic plan available. Professional plans starting at ₹999/month with advanced features and priority support.',
  keywords: 'renthaven pricing, property listing plans, rental platform cost, subscription plans, property management pricing',
  openGraph: {
    title: 'Pricing Plans - RentHaven',
    description: 'Choose the perfect plan for your rental business. Free basic plan available.',
    url: '/pricing',
  },
  twitter: {
    title: 'Pricing Plans - RentHaven',
    description: 'Choose the perfect plan for your rental business. Free basic plan available.',
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}