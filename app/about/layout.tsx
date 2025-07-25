import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - RentHaven | Trusted Rental Platform Since 2020',
  description: 'Learn about RentHaven\'s mission to revolutionize rental property search in India. Discover our story, values, and commitment to connecting property owners with quality tenants.',
  keywords: 'about renthaven, rental platform, property management, real estate technology, rental services india',
  openGraph: {
    title: 'About Us - RentHaven',
    description: 'Learn about RentHaven\'s mission to revolutionize rental property search in India.',
    url: '/about',
  },
  twitter: {
    title: 'About Us - RentHaven',
    description: 'Learn about RentHaven\'s mission to revolutionize rental property search in India.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}