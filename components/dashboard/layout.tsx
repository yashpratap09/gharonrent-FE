import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - RentHaven | Manage Your Properties & Account',
  description: 'Access your personalized RentHaven dashboard. Manage properties, view analytics, track inquiries, and monitor your rental business performance.',
  keywords: 'dashboard, property management, rental analytics, user dashboard, property owner dashboard, tenant dashboard',
  openGraph: {
    title: 'Dashboard - RentHaven',
    description: 'Access your personalized RentHaven dashboard to manage properties and track performance.',
    url: '/dashboard',
  },
  twitter: {
    title: 'Dashboard - RentHaven',
    description: 'Access your personalized RentHaven dashboard to manage properties and track performance.',
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}