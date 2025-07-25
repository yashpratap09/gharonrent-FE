import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Properties - RentHaven | Find Your Perfect Rental',
  description: 'Search thousands of verified rental properties across India. Filter by location, price, amenities, and more. Find apartments, houses, and commercial spaces.',
  keywords: 'property search, rental properties, apartments for rent, houses for rent, property finder, rental search',
  openGraph: {
    title: 'Search Properties - RentHaven',
    description: 'Search thousands of verified rental properties across India.',
    url: '/search',
  },
  twitter: {
    title: 'Search Properties - RentHaven',
    description: 'Search thousands of verified rental properties across India.',
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}