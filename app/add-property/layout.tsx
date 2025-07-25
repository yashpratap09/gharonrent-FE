import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'List Your Property - RentHaven | Free Property Listing',
  description: 'List your rental property on RentHaven for free. Reach thousands of verified tenants, get professional photography, and manage bookings easily.',
  keywords: 'list property, property listing, rent out property, property owner, rental listing, property management',
  openGraph: {
    title: 'List Your Property - RentHaven',
    description: 'List your rental property for free and reach thousands of verified tenants.',
    url: '/add-property',
  },
  twitter: {
    title: 'List Your Property - RentHaven',
    description: 'List your rental property for free and reach thousands of verified tenants.',
  },
};

export default function AddPropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}