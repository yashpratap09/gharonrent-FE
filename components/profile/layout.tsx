import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Profile - RentHaven | Manage Your Account',
  description: 'Manage your RentHaven profile, update personal information, view your plan details, and customize your account settings.',
  keywords: 'user profile, account settings, personal information, plan management, profile update',
  openGraph: {
    title: 'User Profile - RentHaven',
    description: 'Manage your RentHaven profile and account settings.',
    url: '/profile',
  },
  twitter: {
    title: 'User Profile - RentHaven',
    description: 'Manage your RentHaven profile and account settings.',
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}