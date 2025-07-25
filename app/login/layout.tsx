import { Header } from '@/components/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In - RentHaven | Access Your Rental Account',
  description: 'Sign in to your RentHaven account to manage property listings, view inquiries, and access premium features. Secure login for property owners and tenants.',
  keywords: 'login, sign in, user account, rental account, property owner login, tenant login',
  openGraph: {
    title: 'Sign In - RentHaven',
    description: 'Sign in to your RentHaven account to manage properties and access premium features.',
    url: '/login',
  },
  twitter: {
    title: 'Sign In - RentHaven',
    description: 'Sign in to your RentHaven account to manage properties and access premium features.',
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return  <div>
        <Header />
        {children}
      </div>
}