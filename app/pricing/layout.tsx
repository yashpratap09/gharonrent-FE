import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing Plans - RentHaven | Choose Your Plan',
  description: 'Explore RentHaven pricing plans for both property owners (hosts) and tenants. Find the perfect plan for your needs.',
  keywords: 'renthaven pricing, property owner plans, tenant plans, rental platform pricing, subscription plans',
  openGraph: {
    title: 'Pricing Plans - RentHaven',
    description: 'Explore RentHaven pricing plans for both property owners (hosts) and tenants.',
    url: '/pricing',
  },
  twitter: {
    title: 'Pricing Plans - RentHaven',
    description: 'Explore RentHaven pricing plans for both property owners (hosts) and tenants.',
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
