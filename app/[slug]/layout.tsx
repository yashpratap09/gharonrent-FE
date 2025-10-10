import type { Metadata } from 'next';

// This will be generated dynamically on the client side
export const metadata: Metadata = {
  title: 'Property Details - RentHaven',
  description: 'View detailed information about this rental property.',
};

export default function PropertySlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}