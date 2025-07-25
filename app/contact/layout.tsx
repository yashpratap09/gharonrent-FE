import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - RentHaven | Get Help & Support',
  description: 'Need help with your rental property search or listing? Contact RentHaven support team. We provide 24/7 assistance for property owners and tenants across India.',
  keywords: 'contact renthaven, customer support, rental help, property assistance, real estate support',
  openGraph: {
    title: 'Contact Us - RentHaven',
    description: 'Get help with your rental property needs. 24/7 customer support available.',
    url: '/contact',
  },
  twitter: {
    title: 'Contact Us - RentHaven',
    description: 'Get help with your rental property needs. 24/7 customer support available.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}